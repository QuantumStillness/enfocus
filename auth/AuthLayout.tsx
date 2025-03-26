
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/5 flex flex-col">
      <header className="p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">Mindful Journal</Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
      
      <footer className="p-4 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Mindful Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
