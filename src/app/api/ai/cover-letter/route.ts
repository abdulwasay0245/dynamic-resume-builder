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

    const { resumeData, jobDescription, companyName } = await req.json();

    if (!resumeData || !jobDescription) {
        return NextResponse.json({ error: 'Resume data and job description are required' }, { status: 400 });
    }

    try {
        const prompt = `
            You are a professional cover letter writer.
            Write a compelling, personalized cover letter based on the following resume data and job description.
            
            Candidate Name: ${resumeData.name}
            Current/Recent Position: ${resumeData.experiences?.[0]?.position || 'N/A'} at ${resumeData.experiences?.[0]?.company || 'N/A'}
            Skills: ${resumeData.skills}
            Education: ${resumeData.education?.[0]?.degName || 'N/A'} from ${resumeData.education?.[0]?.university || 'N/A'}
            Experience Summary: ${resumeData.experiences?.[0]?.jobDescription || 'N/A'}
            
            Company: ${companyName || 'the company'}
            Job Description: "${jobDescription}"
            
            Write a professional cover letter (3-4 paragraphs) that:
            1. Opens with enthusiasm for the specific role
            2. Highlights relevant experience and skills that match the job
            3. Shows knowledge of the company
            4. Closes with a strong call to action
            
            Return ONLY the cover letter text, no additional commentary.
        `;

        const result = await model.generateContent(prompt);
        const coverLetter = result.response.text().trim();

        return NextResponse.json({ coverLetter });
    } catch (error) {
        console.error('Gemini Cover Letter Error:', error);
        return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
    }
}
