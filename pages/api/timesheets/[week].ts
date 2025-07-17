import type { NextApiRequest, NextApiResponse } from 'next';
import { timesheetEntries } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { week } = req.query;
  const weekNum = Number(week);
  const entries = timesheetEntries[weekNum as keyof typeof timesheetEntries] || [];
  res.status(200).json(entries);
} 