import { NextResponse } from 'next/server';
import { getProjectById, getLatestCalculations, getAllCalculationsForProject } from '@/lib/projects-db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const project = await getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const [latestCalc, allCalcs] = await Promise.all([
    getLatestCalculations(params.id),
    getAllCalculationsForProject(params.id),
  ]);

  return NextResponse.json({ project, latestCalc, allCalcs });
}
