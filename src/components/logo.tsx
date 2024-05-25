import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';  // Adjust the path as necessary

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img src={logo} className="h-8" alt="Logo" />
      <h1 className="text-2xl font-bold text-secondary-foreground">
        <Link to={'/'}>ClearList</Link>
      </h1>
    </div>
  );
}
