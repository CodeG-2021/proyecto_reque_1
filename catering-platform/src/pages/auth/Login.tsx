import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';
import { useAuth } from '../../hooks/useAuth';
import { getDefaultRouteForRole } from '../../utils/navigation';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authenticated = await login(formState);
      navigate(getDefaultRouteForRole(authenticated.role));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-white to-neutral-100 px-4 py-10">
      <Card className="w-full max-w-lg p-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-primary">Catering Management Platform</h1>
          <p className="text-sm text-neutral-500">Sign in to orchestrate unforgettable events.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
            required
          />

          {error && <p className="rounded-xl bg-primary/10 p-3 text-sm text-primary">{error}</p>}

          <Button type="submit" className="w-full" isLoading={loading}>
            Sign in
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-neutral-500">
          <Link to="/forgot-password" className="hover:text-primary">
            Forgot your password?
          </Link>
          <p>
            New here?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
