import { NextResponse } from 'next/server';
import { getSnapshotById, getCalculationsForSnapshot } from '@/lib/projects-db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const snapshot = await getSnapshotById(params.id);
  if (!snapshot) {
    return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 });
  }
  const calculations = await getCalculationsForSnapshot(params.id);
  return NextResponse.json({ snapshot, calculations });
}
