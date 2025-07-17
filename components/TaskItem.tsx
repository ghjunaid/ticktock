import { useState } from 'react';

export interface TaskItemProps {
  entry: {
    task: string;
    hours: number;
    project: string;
  };
  onEdit: (updated: { task: string; hours: number; project: string }) => void;
  onDelete: () => void;
}

export default function TaskItem({ entry, onEdit, onDelete }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(entry.task);
  const [hours, setHours] = useState(entry.hours);
  const [project, setProject] = useState(entry.project);

  const handleSave = () => {
    onEdit({ task, hours, project });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <input
          type="number"
          className="w-16 border rounded px-2 py-1 text-sm"
          value={hours}
          min={0}
          onChange={e => setHours(Number(e.target.value))}
        />
        <input
          className="w-32 border rounded px-2 py-1 text-sm"
          value={project}
          onChange={e => setProject(e.target.value)}
        />
        <button className="text-xs text-blue-600 hover:underline" onClick={handleSave}>Save</button>
        <button className="text-xs text-gray-400 hover:text-red-600" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50">
      <div className="flex-1">{entry.task}</div>
      <div className="text-xs text-gray-500">{entry.hours} hrs</div>
      <div className="text-xs text-blue-600">{entry.project}</div>
      <button className="text-xs text-gray-400 hover:text-blue-600" onClick={() => setEditing(true)}>Edit</button>
      <button className="text-xs text-red-400 hover:text-red-600" onClick={onDelete}>Delete</button>
    </div>
  );
} 