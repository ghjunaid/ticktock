import { useState } from 'react';

export interface AddTaskFormProps {
  onAdd: (entry: { task: string; hours: number; project: string }) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState(1);
  const [project, setProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !project) return;
    onAdd({ task, hours, project });
    setTask('');
    setHours(1);
    setProject('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50 mt-2">
      <input
        className="flex-1 border rounded px-2 py-1 text-sm"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Task name"
        required
      />
      <input
        type="number"
        className="w-16 border rounded px-2 py-1 text-sm"
        value={hours}
        min={1}
        max={24}
        onChange={e => setHours(Number(e.target.value))}
        required
      />
      <input
        className="w-32 border rounded px-2 py-1 text-sm"
        value={project}
        onChange={e => setProject(e.target.value)}
        placeholder="Project name"
        required
      />
      <button type="submit" className="text-xs text-blue-600 hover:underline">Add</button>
      <button type="button" className="text-xs text-gray-400 hover:text-red-600" onClick={onCancel}>Cancel</button>
    </form>
  );
} 