import {ModeToggle} from '@/components/mode-toggle';
import {HomeRoutes} from '@/routes/home.route';
import {Link} from 'react-router-dom';

export function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-accent text-secondary-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/src/assets/images/logo.svg"
                className="h-8"
                alt="Logo"
              />
              <h1 className="text-2xl font-bold text-secondary-foreground">
                ClearList
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="mt-2 sm:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link className="hover:text-popover" to={'/'}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-popover" to={'/signup'}>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-popover" to={'/login'}>
                    Login
                  </Link>
                </li>
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </nav>
          </div>
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
          {/* Additional footer content or links can be added here */}
        </div>
      </footer>
    </div>
  );
}
