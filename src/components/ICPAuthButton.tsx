import React from 'react';
import { Button } from '@/components/ui/button';
import { useICP } from '@/contexts/ICPContext';
import { LogIn, LogOut, User } from 'lucide-react';

export const ICPAuthButton: React.FC = () => {
  const { isAuthenticated, principal, login, logout, loading } = useICP();

  if (loading) {
    return (
      <Button disabled variant="outline" size="sm">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && principal) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 bg-neon-cyan/20 rounded-lg border border-neon-cyan/50">
          <User size={16} className="text-neon-cyan" />
          <span className="text-sm text-neon-cyan font-mono">
            {principal.toString().slice(0, 8)}...
          </span>
        </div>
        <Button onClick={logout} variant="outline" size="sm">
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={login} className="neon-glow" size="sm">
      <LogIn size={16} className="mr-2" />
      Connect ICP
    </Button>
  );
};
