import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthUser, User, UserRole } from '../types/auth';
import { mockUsers, roleLabels } from '../data/mockData';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  role?: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  users: AuthUser[];
  loading: boolean;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  upsertUser: (user: Omit<User, 'id'> & { id?: string }) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'catering-auth-user';

const permissionsByRole: Record<UserRole, string[]> = {
  administrator: ['dashboard:view', 'users:manage', 'reports:view', 'notifications:manage'],
  coordinator: ['events:manage', 'menus:manage', 'notifications:manage'],
  chef: ['menus:manage'],
  purchasing: ['inventory:manage', 'purchases:manage'],
  client: ['client:portal'],
};

const sanitizeUser = (user: AuthUser & { password?: string }): AuthUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDatabase, setUserDatabase] = useState<(AuthUser & { password: string })[]>(mockUsers);
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const users = useMemo(() => userDatabase.map((item) => sanitizeUser(item)), [userDatabase]);

  const login = useCallback(async ({ email, password }: LoginPayload) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const found = userDatabase.find((u) => u.email === email && u.password === password);
    if (!found) {
      setLoading(false);
      throw new Error('Invalid email or password.');
    }
    const safeUser = sanitizeUser(found);
    setUser(safeUser);
    setLoading(false);
    return safeUser;
  }, [userDatabase]);

  const register = useCallback(async ({ name, email, password, role = 'client' }: RegisterPayload) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const exists = userDatabase.some((u) => u.email === email);
    if (exists) {
      setLoading(false);
      throw new Error('An account with this email already exists.');
    }
    const newUser: AuthUser & { password: string } = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
      permissions: permissionsByRole[role],
    };
    setUserDatabase((prev) => [...prev, newUser]);
    const safeUser = sanitizeUser(newUser);
    setUser(safeUser);
    setLoading(false);
    return safeUser;
  }, [userDatabase]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: UserRole | UserRole[]) => {
      if (!user) return false;
      if (Array.isArray(role)) {
        return role.includes(user.role);
      }
      return user.role === role;
    },
    [user]
  );

  const upsertUser = useCallback((payload: Omit<User, 'id'> & { id?: string }) => {
    setUserDatabase((prev) => {
      if (payload.id) {
        return prev.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                permissions: permissionsByRole[payload.role],
              }
            : item
        );
      }
      const newRecord: AuthUser & { password: string } = {
        id: crypto.randomUUID(),
        name: payload.name,
        email: payload.email,
        role: payload.role,
        permissions: permissionsByRole[payload.role],
        password: payload.email,
      };
      return [...prev, newRecord];
    });
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUserDatabase((prev) => prev.filter((item) => item.id !== userId));
    setUser((current) => (current?.id === userId ? null : current));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, users, loading, login, register, logout, hasRole, upsertUser, deleteUser }),
    [user, users, loading, login, register, logout, hasRole, upsertUser, deleteUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const getRoleLabel = (role: UserRole): string => roleLabels[role];
