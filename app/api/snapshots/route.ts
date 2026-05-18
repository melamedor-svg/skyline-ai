import { NextResponse } from 'next/server';
import { getSnapshotsByProject, addSnapshot } from '@/lib/projects-db';
import type { QuarterlySnapshot } from '@/lib/projects-data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  if (!projectId) {
    return NextResponse.json({ error: 'projectId query param required' }, { status: 400 });
  }
  const snapshots = await getSnapshotsByProject(projectId);
  return NextResponse.json(snapshots);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<QuarterlySnapshot, 'id' | 'isLocked'>;

  if (!body.projectId || !body.quarterReported) {
    return NextResponse.json(
      { error: 'projectId and quarterReported are required' },
      { status: 400 },
    );
  }

  const result = await addSnapshot(body);
  if (!result.ok) {
    const messages: Record<string, string> = {
      QUARTER_ALREADY_EXISTS: 'A snapshot for this quarter already exists.',
      QUARTER_LOCKED_HISTORY: 'Cannot insert a snapshot before the last locked quarter.',
    };
    return NextResponse.json({ error: messages[result.error] }, { status: 409 });
  }

  return NextResponse.json(result.snapshot, { status: 201 });
}
