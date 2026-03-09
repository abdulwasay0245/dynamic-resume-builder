import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/option';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobTitle, currentSkills } = await req.json();

    if (!jobTitle) {
        return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    try {
        const prompt = `
            You are a career expert. Given the job title "${jobTitle}" and the candidate's current skills: "${currentSkills || 'none listed'}",
            suggest 8-10 relevant, in-demand skills that would strengthen their resume for this role.
            
            Only suggest skills they DON'T already have.
            Return the response as a JSON array of strings, e.g. ["Skill 1", "Skill 2"]
            Return ONLY the JSON array, no additional text or markdown.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        
        // Parse the JSON array from the response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const skills = JSON.parse(cleanedText);

        return NextResponse.json({ skills: Array.isArray(skills) ? skills : [] });
    } catch (error) {
        console.error('Gemini Skill Suggestion Error:', error);
        return NextResponse.json({ error: 'Failed to suggest skills' }, { status: 500 });
    }
}
