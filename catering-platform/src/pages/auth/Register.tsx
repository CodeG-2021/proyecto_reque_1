import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/auth';
import { getDefaultRouteForRole } from '../../utils/navigation';

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'client', label: 'Client' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'coordinator', label: 'Event Coordinator' },
  { value: 'chef', label: 'Chef' },
  { value: 'purchasing', label: 'Purchasing Manager' },
];

export const RegisterPage: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' as UserRole,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const created = await register(formState);
      navigate(getDefaultRouteForRole(created.role));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-white to-neutral-100 px-4 py-10">
      <Card className="w-full max-w-xl p-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-primary">Join the Catering Platform</h1>
          <p className="text-sm text-neutral-500">Create an account to collaborate with your team.</p>
        </div>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <InputField
            label="Full name"
            placeholder="Maria Lopez"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
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
            placeholder="Create a secure password"
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
          <SelectField
            label="Role"
            value={formState.role}
            onChange={(event) => setFormState((prev) => ({ ...prev, role: event.target.value as UserRole }))}
            options={roleOptions}
          />
          {error && <p className="rounded-xl bg-primary/10 p-3 text-sm text-primary">{error}</p>}
          <Button type="submit" className="w-full" isLoading={loading}>
            Create account
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};
