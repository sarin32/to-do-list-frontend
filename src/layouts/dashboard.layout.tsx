import {useState} from 'react';
import {Logo} from '@/components/logo';
import {DashboardRoute} from '@/routes/dashboard.route';
import {Link} from 'react-router-dom';

const routes = [
  {title: 'All', path: 'all'},
  {title: 'Pending', path: 'pending'},
  {title: 'Completed', path: 'completed'},
];

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navigation */}
      <aside
        className={`bg-secondary text-primary-foreground w-64 fixed md:relative inset-y-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:w-64 lg:w-64 z-10`}
      >
        <div className="py-4 px-6">
          <Logo />

          <nav className="mt-10">
            <ul>
              {routes.map(route => (
                <li className="mb-2" key={route.title}>
                  <Link
                    className="block text-secondary-foreground hover:text-primary"
                    to={route.path}
                    onClick={closeSidebar}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 md:hidden">
          <button onClick={toggleSidebar} className="text-primary">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <main className="flex-1 m-5 md:m-2">
          <DashboardRoute />
        </main>
      </div>
    </div>
  );
};
