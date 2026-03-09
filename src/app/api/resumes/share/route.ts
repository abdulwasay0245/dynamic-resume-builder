import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/option';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await req.json();

    if (!resumeId) {
        return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    try {
        // Check if resume belongs to user
        const resume = await prisma.resume.findFirst({
            where: { id: resumeId, userId: session.user.id }
        });

        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        // If already shared, return existing shareId
        if (resume.shareId) {
            return NextResponse.json({ 
                shareId: resume.shareId, 
                shareUrl: `/share/${resume.shareId}` 
            });
        }

        // Generate new shareId
        const shareId = nanoid(10);
        await prisma.resume.update({
            where: { id: resumeId },
            data: { shareId, isPublic: true }
        });

        return NextResponse.json({ 
            shareId, 
            shareUrl: `/share/${shareId}` 
        });
    } catch (error) {
        console.error('Share error:', error);
        return NextResponse.json({ error: 'Failed to create share link' }, { status: 500 });
    }
}
