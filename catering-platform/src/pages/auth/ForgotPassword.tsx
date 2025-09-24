import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-white to-neutral-100 px-4 py-10">
      <Card className="w-full max-w-lg p-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-primary">Restablece tu contraseña</h1>
          <p className="text-sm text-neutral-500">
            Ingresa el correo asociado a tu cuenta. Te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>
        {sent ? (
          <div className="space-y-6 text-center text-neutral-500">
            <p>
              Enviamos un correo a <span className="font-semibold text-primary">{email}</span> con los siguientes pasos.
            </p>
            <Link to="/login" className="text-primary hover:underline">
              Volver a iniciar sesión
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Correo electrónico"
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Enviar enlace de restablecimiento
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
