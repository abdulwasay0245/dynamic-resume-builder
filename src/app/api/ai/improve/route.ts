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

    const { text, type } = await req.json();

    if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    try {
        const prompt = `
            You are a professional resume writer. 
            Improve the following ${type} text to be more impactful, professional, and result-oriented. 
            Use action verbs and quantitative metrics where possible.
            Keep it concise and suitable for a professional resume.
            Original Text: "${text}"
            Improved Text:
        `;

        const result = await model.generateContent(prompt);
        const improvedText = result.response.text().trim();

        return NextResponse.json({ improvedText });
    } catch (error) {
        console.error('Gemini Improvement Error:', error);
        return NextResponse.json({ error: 'Failed to improve text with AI' }, { status: 500 });
    }
}

