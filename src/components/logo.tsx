import {Link} from 'react-router-dom';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img src="/src/assets/images/logo.svg" className="h-8" alt="Logo" />
      <h1 className="text-2xl font-bold text-secondary-foreground">
        <Link to={'/'}>ClearList</Link>
      </h1>
    </div>
  );
}
