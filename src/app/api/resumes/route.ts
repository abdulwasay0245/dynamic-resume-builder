import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/option';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const resumes = await prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { id, name, templateId, content } = body;

    try {
        if (id) {
            // Update existing
            const updated = await prisma.resume.update({
                where: { id, userId },
                data: {
                    name: name || 'Untitled Resume',
                    templateId: templateId || 'modern',
                    content: JSON.stringify(content)
                }
            });
            return NextResponse.json(updated);
        } else {
            // Create new
            const created = await prisma.resume.create({
                data: {
                    userId,
                    name: name || 'Untitled Resume',
                    templateId: templateId || 'modern',
                    content: JSON.stringify(content)
                }
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        console.error('Error saving resume:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
