import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ shareId: string }> }
) {
    const { shareId } = await params;

    try {
        const resume = await prisma.resume.findUnique({
            where: { shareId },
            select: {
                name: true,
                templateId: true,
                content: true,
                isPublic: true,
            }
        });

        if (!resume || !resume.isPublic) {
            return NextResponse.json({ error: 'Resume not found or not shared' }, { status: 404 });
        }

        return NextResponse.json({
            name: resume.name,
            templateId: resume.templateId,
            content: JSON.parse(resume.content),
        });
    } catch (error) {
        console.error('Fetch shared resume error:', error);
        return NextResponse.json({ error: 'Failed to load resume' }, { status: 500 });
    }
}
