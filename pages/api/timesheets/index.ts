import type { NextApiRequest, NextApiResponse } from 'next';
import { timesheetSummaries } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(timesheetSummaries);
} 