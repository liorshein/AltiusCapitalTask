import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { WEBSITES } from '@/config/websites';
import type { LoginRequest, Website } from '../types';

type LoginFormProps = {
  website: Website | "";
  onSubmit: (loginData: LoginRequest) => void;
  loading: boolean;
};

export const LoginForm = ({ website, onSubmit, loading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reset form values when website changes
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [website]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && website) {
      onSubmit({ website: website as Website, email, password });
    }
  };

  const handleTestLogin = () => {
    if (website && website in WEBSITES) {
      const testCreds = WEBSITES[website as Website].test_credentials;
      setEmail(testCreds.email);
      setPassword(testCreds.password);
    }
  };

  if (!website) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login Credentials</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email/email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !email || !password}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="w-full"
              onClick={handleTestLogin}
              disabled={loading}
            >
              Use Test Credentials
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};