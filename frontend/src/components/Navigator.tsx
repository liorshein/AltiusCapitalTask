import { Button } from './ui/button';
import { useLogout } from '@/hooks/useLogout';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export const Navigator = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { sessionData } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-background border-b border-border px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Website Crawler</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {sessionData?.email && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{sessionData.email}</span>
              {sessionData.website && (
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {sessionData.website.toUpperCase()}
                </span>
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-2"
            data-testid="logout-button"
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};