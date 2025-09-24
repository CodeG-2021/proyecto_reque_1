import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { CheckboxField } from '../../components/forms/CheckboxField';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { useAuth } from '../../hooks/useAuth';
import { AuthUser, UserRole } from '../../types/auth';
import { roleLabels } from '../../data/mockData';

const roleOptions = Object.entries(roleLabels).map(([value, label]) => ({ value, label }));

export const UserManagementPage: React.FC = () => {
  const { users, upsertUser, deleteUser } = useAuth();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: 'client' as UserRole,
  });

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      ),
    [search, users]
  );

  const handleCreate = () => {
    setEditingUser(null);
    setFormState({ name: '', email: '', role: 'client' });
    setPermissions([]);
    setModalOpen(true);
  };

  const handleEdit = (user: AuthUser) => {
    setEditingUser(user);
    setFormState({ name: user.name, email: user.email, role: user.role });
    setPermissions(user.permissions);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    upsertUser({
      id: editingUser?.id,
      name: formState.name,
      email: formState.email,
      role: formState.role,
    });
    setModalOpen(false);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Directorio de usuarios</h1>
          <p className="text-sm text-neutral-500">Administra accesos, asigna roles y controla permisos por colaborador.</p>
        </div>
        <Button onClick={handleCreate} className="inline-flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Agregar usuario
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <InputField
            label="Buscar"
            placeholder="Busca por nombre o correo"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:max-w-xs"
          />
          <div className="rounded-2xl bg-neutral-200/40 px-4 py-3 text-sm text-neutral-500">
            {users.length} usuarios en el espacio de trabajo
          </div>
        </div>

        <div className="mt-6">
          <SimpleTable
            columns={[
              { key: 'name', header: 'Nombre' },
              { key: 'email', header: 'Correo' },
              {
                key: 'role',
                header: 'Rol',
                render: (item) => <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{roleLabels[item.role]}</span>,
              },
              {
                key: 'permissions',
                header: 'Permisos',
                render: (item) => (
                  <div className="flex flex-wrap gap-2">
                    {item.permissions.map((permission: string) => (
                      <span key={permission} className="rounded-full bg-neutral-200/60 px-3 py-1 text-xs text-neutral-600">
                        {permission}
                      </span>
                    ))}
                  </div>
                ),
              },
              {
                key: 'actions',
                header: '',
                render: (item) => (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-xl bg-primary/10 p-2 text-primary transition hover:bg-primary/20"
                      onClick={() => handleEdit(item)}
                      aria-label="Editar usuario"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Eliminar usuario"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={filteredUsers}
          />
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Editar usuario' : 'Invitar nuevo usuario'}
        description="Define el nivel de acceso y las responsabilidades para este integrante."
        primaryAction={{ label: editingUser ? 'Guardar cambios' : 'Agregar usuario', onClick: handleSubmit }}
        secondaryAction={{ label: 'Cancelar', onClick: () => setModalOpen(false) }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            label="Nombre completo"
            placeholder="María López"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
          />
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="tu@empresa.com"
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
          />
        </div>
        <SelectField
          label="Rol"
          value={formState.role}
          onChange={(event) => setFormState((prev) => ({ ...prev, role: event.target.value as UserRole }))}
          options={roleOptions}
        />
        <div className="rounded-2xl bg-neutral-200/40 p-4">
          <p className="text-sm font-semibold text-primary">Permisos</p>
          <p className="mt-1 text-xs text-neutral-500">
            Los permisos se ajustan automáticamente según el rol. Activa notificaciones adicionales cuando sea necesario.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {permissions.map((permission) => (
              <CheckboxField key={permission} label={permission} checked readOnly />
            ))}
            {!permissions.length && <p className="text-sm text-neutral-500">No hay permisos personalizados configurados.</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
};
