import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TaskItem from '../../components/TaskItem';
import AddTaskForm from '../../components/AddTaskForm';
import dynamic from 'next/dynamic';

interface TimesheetEntry {
  day: string;
  task: string;
  hours: number;
  project: string;
}

type EntriesByDay = Record<string, TimesheetEntry[]>;

function groupByDay(entries: TimesheetEntry[]): EntriesByDay {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.day]) acc[entry.day] = [];
    acc[entry.day].push(entry);
    return acc;
  }, {} as EntriesByDay);
}

function TimesheetWeek() {
  const router = useRouter();
  const { week } = router.query;
  const { status } = useSession();
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingDay, setAddingDay] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  useEffect(() => {
    if (!week || status !== 'authenticated') return;
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/timesheets/${week}`);
        if (!res.ok) throw new Error('Failed to fetch entries');
        const data = await res.json();
        setEntries(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [week, status]);

  if (loading || status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  const grouped = groupByDay(entries);
  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);

  // Handlers for add/edit/delete
  const handleAdd = (day: string, entry: { task: string; hours: number; project: string }) => {
    setEntries(prev => [...prev, { ...entry, day }]);
    setAddingDay(null);
  };
  const handleEdit = (day: string, idx: number, updated: { task: string; hours: number; project: string }) => {
    setEntries(prev => prev.map((e, i) => (e.day === day && grouped[day].indexOf(e) === idx ? { ...e, ...updated } : e)));
  };
  const handleDelete = (day: string, idx: number) => {
    let count = -1;
    setEntries(prev => prev.filter(e => {
      if (e.day !== day) return true;
      count++;
      return count !== idx;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/dashboard')}>ticktock</div>
      </header>
      <main className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-bold mb-2">This week's timesheet</h2>
        <div className="mb-4 text-gray-500">Week {week}</div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">{Object.keys(grouped).join(', ')}</div>
          <div className="text-xs text-gray-700">{totalHours}/40 hrs</div>
        </div>
        <div className="space-y-6">
          {Object.entries(grouped).map(([day, dayEntries]) => (
            <div key={day}>
              <div className="font-semibold mb-2">{day}</div>
              <div className="space-y-2">
                {dayEntries.map((entry, idx) => (
                  <TaskItem
                    key={idx}
                    entry={entry}
                    onEdit={updated => handleEdit(day, idx, updated)}
                    onDelete={() => handleDelete(day, idx)}
                  />
                ))}
                {addingDay === day ? (
                  <AddTaskForm
                    onAdd={entry => handleAdd(day, entry)}
                    onCancel={() => setAddingDay(null)}
                  />
                ) : (
                  <button
                    className="w-full text-blue-600 text-sm py-1 hover:underline text-left"
                    onClick={() => setAddingDay(day)}
                  >
                    + Add new task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 mt-10 mb-4">© 2024 tentwenty. All rights reserved.</footer>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TimesheetWeek), { ssr: false }); 