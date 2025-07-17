import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

interface TimesheetSummary {
  week: number;
  date: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
}

const statusColors: Record<string, string> = {
  COMPLETED: 'bg-green-100 text-green-700',
  INCOMPLETE: 'bg-yellow-100 text-yellow-700',
  MISSING: 'bg-red-100 text-red-700',
};

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timesheets, setTimesheets] = useState<TimesheetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/timesheets');
        if (!res.ok) throw new Error('Failed to fetch timesheets');
        const data = await res.json();
        setTimesheets(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    if (status === 'authenticated') fetchData();
  }, [status]);

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold">ticktock</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{session?.user?.name}</span>
          <button onClick={() => signOut()} className="text-blue-600 hover:underline">Sign out</button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-bold mb-6">Your Timesheets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">WEEK #</th>
                <th className="py-2 px-4">DATE</th>
                <th className="py-2 px-4">STATUS</th>
                <th className="py-2 px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((t) => (
                <tr key={t.week} className="border-t">
                  <td className="py-2 px-4">{t.week}</td>
                  <td className="py-2 px-4">{t.date}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${statusColors[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="py-2 px-4">
                    <a
                      href={
                        t.status === 'MISSING'
                          ? `/dashboard/${t.week}?action=create`
                          : t.status === 'INCOMPLETE'
                          ? `/dashboard/${t.week}?action=update`
                          : `/dashboard/${t.week}`
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {t.status === 'MISSING' ? 'Create' : t.status === 'INCOMPLETE' ? 'Update' : 'View'}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 mt-10 mb-4">© 2024 tentwenty. All rights reserved.</footer>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false }); 