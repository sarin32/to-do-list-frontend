import {Logo} from '@/components/logo';
import {DashboardRoute} from '@/routes/dashboard.route';
import {Link} from 'react-router-dom';

const routes = [
  {title: 'All', path: 'all'},
  {title: 'Pending', path: 'pending'},
  {title: 'Completed', path: 'completed'},
];

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navigation */}
      <aside className="bg-secondary text-primary-foreground w-64">
        <div className="py-4 px-6">
          <Logo />

          <nav className="mt-10">
            <ul>
              {routes.map(route => (
                <li className="mb-2" key={route.title}>
                  <Link
                    className="block text-secondary-foreground hover:text-primary"
                    to={route.path}
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
      <main className="flex-1 m-5 m-sm-2">
        <DashboardRoute />
      </main>
    </div>
  );
};
