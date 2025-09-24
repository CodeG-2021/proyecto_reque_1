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
  { value: 'client', label: 'Cliente' },
  { value: 'administrator', label: 'Administrador/a' },
  { value: 'coordinator', label: 'Coordinador/a de eventos' },
  { value: 'chef', label: 'Chef' },
  { value: 'purchasing', label: 'Encargado/a de compras' },
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
          <h1 className="text-2xl font-semibold text-primary">Únete a la plataforma de catering</h1>
          <p className="text-sm text-neutral-500">Crea una cuenta para colaborar con tu equipo.</p>
        </div>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <InputField
            label="Nombre completo"
            placeholder="María López"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="tu@empresa.com"
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <InputField
            label="Contraseña"
            type="password"
            placeholder="Crea una contraseña segura"
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
          <SelectField
            label="Rol"
            value={formState.role}
            onChange={(event) => setFormState((prev) => ({ ...prev, role: event.target.value as UserRole }))}
            options={roleOptions}
          />
          {error && <p className="rounded-xl bg-primary/10 p-3 text-sm text-primary">{error}</p>}
          <Button type="submit" className="w-full" isLoading={loading}>
            Crear cuenta
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </Card>
    </div>
  );
};
