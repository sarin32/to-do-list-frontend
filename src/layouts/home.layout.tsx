import {Logo} from '@/components/logo';
import {ModeToggle} from '@/components/mode-toggle';
import {HomeRoutes} from '@/routes/home.route';
import {Link} from 'react-router-dom';

// Define the dynamic routes
const routes = [
  {path: '/', name: 'Home'},
  {path: '/signup', name: 'Sign Up'},
  {path: '/login', name: 'Login'},
];

export function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-accent text-secondary-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <nav className="mt-2 sm:mt-0 flex flex-wrap gap-3 justify-end">
            {routes.map((route, index) => (
              <Link key={index} className="hover:text-popover" to={route.path}>
                {route.name}
              </Link>
            ))}
            <ModeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <HomeRoutes />
      </main>

      {/* Footer */}
      <footer className="bg-primary py-4">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-primary-foreground">
            &copy; 2024 ClearList. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
