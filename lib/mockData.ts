// Mock user data
export const mockUser = {
  id: 1,
  name: "Junaid",
  email: "j@example.com",
  password: "pass123",
};

// Mock timesheet summaries
export const timesheetSummaries = [
  { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
  { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
  { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
  { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
  { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
];

// Mock timesheet entries per week
export const timesheetEntries = {
  1: [
    { day: "Jan 1", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 1", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 2", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 3", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 4", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 5", task: "Homepage Development", hours: 4, project: "Project Name" },
    // ... more entries
  ],
  2: [
    { day: "Jan 8", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 9", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 9", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 10", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 11", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 12", task: "Homepage Development", hours: 4, project: "Project Name" },
  ],
  4: [
    { day: "Jan 22", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 23", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 23", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 24", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 24", task: "Homepage Development", hours: 4, project: "Project Name" },
    { day: "Jan 24" },
  ],
  // ... more weeks
}; 