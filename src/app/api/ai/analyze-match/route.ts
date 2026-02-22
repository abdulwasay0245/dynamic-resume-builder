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

    const { resumeData, jobDescription } = await req.json();

    try {
        const prompt = `
            You are an expert recruiter. Analyze the match between the following Resume Data and Job Description.
            
            Resume Data: ${JSON.stringify(resumeData)}
            Job Description: "${jobDescription}"
            
            Respond STRICTLY in the following JSON format:
            {
                "score": 0 to 100,
                "matched": ["keyword1", "keyword2", ...],
                "missing": ["keyword1", "keyword2", ...],
                "summary": "Brief summary of the match and actionable advice."
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        
        // Extract JSON from potentially markdown-wrapped response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);

        return NextResponse.json(analysis);
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        return NextResponse.json({ 
            error: 'Failed to analyze match',
            score: 0,
            matched: [],
            missing: [],
            summary: "AI Analysis is currently unavailable. Please check your API key."
        }, { status: 500 });
    }
}

