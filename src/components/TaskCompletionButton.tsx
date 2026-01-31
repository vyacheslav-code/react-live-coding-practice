import { useState, useEffect } from 'react';

const STORAGE_KEY = 'completed-tasks';

interface TaskCompletionButtonProps {
  taskId: string;
}

export function getCompletedTasks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function setCompletedTasks(tasks: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function isTaskCompleted(taskId: string): boolean {
  return getCompletedTasks().includes(taskId);
}

export function toggleTaskCompletion(taskId: string): boolean {
  const completed = getCompletedTasks();
  const isCompleted = completed.includes(taskId);

  if (isCompleted) {
    setCompletedTasks(completed.filter(id => id !== taskId));
    return false;
  } else {
    setCompletedTasks([...completed, taskId]);
    return true;
  }
}

export function clearAllCompleted(): void {
  setCompletedTasks([]);
}

export default function TaskCompletionButton({ taskId }: TaskCompletionButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsCompleted(isTaskCompleted(taskId));
    setIsHydrated(true);
  }, [taskId]);

  const handleToggle = () => {
    const newState = toggleTaskCompletion(taskId);
    setIsCompleted(newState);

    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('task-completion-changed', {
      detail: { taskId, isCompleted: newState }
    }));
  };

  if (!isHydrated) {
    return (
      <button
        disabled
        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 bg-gray-800 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
        isCompleted
          ? 'bg-green-600 hover:bg-green-700 text-white border border-green-500'
          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 hover:border-gray-500'
      }`}
    >
      {isCompleted ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Completed
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
          </svg>
          Mark Complete
        </>
      )}
    </button>
  );
}
