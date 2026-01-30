import { useState, useEffect, useRef } from 'react';

interface Task {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'practice' | 'pet-projects';
}

interface TaskSidebarProps {
  tasks: Task[];
  currentTaskId: string;
}

const difficultyColors = {
  easy: 'bg-green-600',
  medium: 'bg-yellow-600',
  hard: 'bg-red-600',
};

const difficultyDots = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

const SCROLL_STORAGE_KEY = 'sidebar-scroll-position';
const COLLAPSED_STORAGE_KEY = 'sidebar-collapsed';

export default function TaskSidebar({ tasks, currentTaskId }: TaskSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTaskRef = useRef<HTMLAnchorElement>(null);

  // Hydrate collapsed state from sessionStorage after mount
  useEffect(() => {
    const savedCollapsed = sessionStorage.getItem(COLLAPSED_STORAGE_KEY);
    if (savedCollapsed === 'true') {
      setIsCollapsed(true);
    }
    setIsHydrated(true);
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const savedPosition = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    } else if (activeTaskRef.current) {
      // If no saved position, scroll active task into view
      activeTaskRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  // Toggle body class for layout margin and persist collapsed state
  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', isCollapsed);
    document.body.classList.toggle('sidebar-open', !isCollapsed);
    sessionStorage.setItem(COLLAPSED_STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  // Save scroll position on scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      sessionStorage.setItem(SCROLL_STORAGE_KEY, String(container.scrollTop));
    }
  };

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-20 z-30 w-8 h-8 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 ${
          isHydrated ? 'opacity-100 transition-all duration-300' : 'opacity-0'
        } ${isCollapsed ? 'left-3' : 'left-[276px]'}`}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-20 ${
          isHydrated ? 'opacity-100 transition-all duration-300' : 'opacity-0'
        } ${isCollapsed ? '-translate-x-full w-72' : 'translate-x-0 w-72'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Tasks</h2>
        </div>

      {/* Task List */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="overflow-y-auto h-[calc(100vh-65px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-16"
      >
        <nav className="py-2">
          {tasks.map((task) => {
            const isActive = task.id === currentTaskId;
            return (
              <a
                key={task.id}
                ref={isActive ? activeTaskRef : undefined}
                href={`/tasks/${task.id}`}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-primary-600/20 border-r-2 border-primary-500 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {/* Difficulty Indicator */}
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${difficultyDots[task.difficulty]}`}
                  aria-label={task.difficulty}
                />

                {/* Task Title */}
                <span className="flex-1 text-sm truncate">{task.title}</span>

                {/* Difficulty Badge */}
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium text-white flex-shrink-0 ${difficultyColors[task.difficulty]}`}
                >
                  {task.difficulty.charAt(0).toUpperCase()}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Easy
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Hard
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
