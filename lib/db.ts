import { mockLeads, mockDeals, type Lead, type Deal } from '@/lib/mock-data';

export async function getLeads(): Promise<Lead[]> {
  return mockLeads;
}

export async function getDeals(): Promise<Deal[]> {
  return mockDeals;
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  return mockLeads.find((l) => l.id === id);
}

export async function getDealById(id: string): Promise<Deal | undefined> {
  return mockDeals.find((d) => d.id === id);
}
