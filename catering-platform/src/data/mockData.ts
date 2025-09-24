import { format, subDays } from 'date-fns';
import { AuthUser, User } from '../types/auth';
import { CateringEvent } from '../types/events';
import { Ingredient, Menu, Recipe } from '../types/menu';
import { InventoryEntry, Supplier } from '../types/inventory';
import { Notification } from '../types/notifications';

const today = new Date();

export const mockUsers: (AuthUser & { password: string })[] = [
  {
    id: '1',
    name: 'Amelia Reyes',
    email: 'amelia@catering.com',
    role: 'administrator',
    password: 'admin123',
    permissions: ['dashboard:view', 'users:manage', 'reports:view'],
  },
  {
    id: '2',
    name: 'Marco Silva',
    email: 'marco@catering.com',
    role: 'coordinator',
    password: 'coordinator123',
    permissions: ['events:manage', 'menus:manage'],
  },
  {
    id: '3',
    name: 'Lucia Torres',
    email: 'lucia@catering.com',
    role: 'chef',
    password: 'chef123',
    permissions: ['menus:manage'],
  },
  {
    id: '4',
    name: 'Rafael Gomez',
    email: 'rafael@catering.com',
    role: 'purchasing',
    password: 'purchase123',
    permissions: ['inventory:manage', 'purchases:manage'],
  },
  {
    id: '5',
    name: 'Paula Medina',
    email: 'paula@catering.com',
    role: 'client',
    password: 'client123',
    permissions: ['client:portal'],
  },
];

export const mockKpis = {
  eventsScheduled: 12,
  financialSummary: {
    revenue: 48200,
    expenses: 28500,
    profit: 19700,
  },
  inventoryStatus: {
    criticalItems: 3,
    restocksThisWeek: 5,
  },
  recentReservations: [
    { client: 'Hotel Aurora', date: format(today, 'PPP'), guests: 80 },
    { client: 'Cumbre TechCorp', date: format(subDays(today, 1), 'PPP'), guests: 120 },
    { client: 'Boda - Ramírez', date: format(subDays(today, 2), 'PPP'), guests: 150 },
  ],
};

export const mockEvents: CateringEvent[] = [
  {
    id: 'evt-1',
    client: 'Hotel Aurora',
    date: format(subDays(today, -3), 'yyyy-MM-dd'),
    type: 'Gala corporativa',
    attendees: 180,
    status: 'scheduled',
    assignedMenus: [
      { id: 'menu-1', name: 'Elegancia mediterránea', pricePerGuest: 45 },
      { id: 'menu-2', name: 'Postres insignia', pricePerGuest: 12 },
    ],
    staff: ['Marco Silva', 'Lucia Torres', 'Ana Perez'],
    inventoryNeeds: ['Filetes de salmón', 'Verduras de temporada', 'Montaje de estación de postres'],
    notes: 'Se requiere distribución VIP',
    timeline: [
      {
        id: 'tl-1',
        label: 'Confirmación de menú',
        dueDate: format(subDays(today, -5), 'yyyy-MM-dd'),
        completed: true,
      },
      {
        id: 'tl-2',
        label: 'Pedidos a proveedores',
        dueDate: format(subDays(today, -2), 'yyyy-MM-dd'),
        completed: false,
      },
    ],
  },
  {
    id: 'evt-2',
    client: 'Boda - Ramírez',
    date: format(subDays(today, -10), 'yyyy-MM-dd'),
    type: 'Boda',
    attendees: 150,
    status: 'in-progress',
    assignedMenus: [
      { id: 'menu-3', name: 'Huerto fresco', pricePerGuest: 38 },
    ],
    staff: ['Lucia Torres', 'Ana Perez'],
    inventoryNeeds: ['Hierbas frescas', 'Cortes de res premium'],
    timeline: [
      {
        id: 'tl-3',
        label: 'Sesión de degustación',
        dueDate: format(subDays(today, 7), 'yyyy-MM-dd'),
        completed: true,
      },
    ],
  },
  {
    id: 'evt-3',
    client: 'Cumbre TechCorp',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    type: 'Conferencia',
    attendees: 220,
    status: 'completed',
    assignedMenus: [
      { id: 'menu-4', name: 'Buffet ejecutivo', pricePerGuest: 35 },
    ],
    staff: ['Marco Silva', 'Rafael Gomez'],
    inventoryNeeds: ['Café en grano', 'Selección de repostería'],
    timeline: [
      {
        id: 'tl-4',
        label: 'Reunión logística',
        dueDate: format(subDays(today, 12), 'yyyy-MM-dd'),
        completed: true,
      },
    ],
  },
];

export const mockIngredients: Ingredient[] = [
  { id: 'ing-1', name: 'Filete de salmón', unit: 'kg', quantity: 2, cost: 15 },
  { id: 'ing-2', name: 'Espárragos', unit: 'kg', quantity: 1.5, cost: 8 },
  { id: 'ing-3', name: 'Salsa de mantequilla y limón', unit: 'ltr', quantity: 1, cost: 4 },
];

export const mockRecipes: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Salmón a la parrilla con espárragos',
    portionSize: 10,
    ingredients: mockIngredients,
  },
  {
    id: 'rec-2',
    name: 'Cuscús de vegetales asados',
    portionSize: 12,
    ingredients: [
      { id: 'ing-4', name: 'Cuscús', unit: 'kg', quantity: 1, cost: 3 },
      { id: 'ing-5', name: 'Verduras de temporada', unit: 'kg', quantity: 2, cost: 5 },
      { id: 'ing-6', name: 'Aderezo de hierbas', unit: 'ltr', quantity: 0.5, cost: 2 },
    ],
  },
];

export const mockMenus: Menu[] = [
  {
    id: 'menu-1',
    name: 'Elegancia mediterránea',
    dishes: mockRecipes,
    estimatedPrice: 52,
  },
  {
    id: 'menu-2',
    name: 'Postres insignia',
    dishes: [
      {
        id: 'rec-3',
        name: 'Selección de fuente de chocolate',
        portionSize: 20,
        ingredients: [
          { id: 'ing-7', name: 'Chocolate oscuro', unit: 'kg', quantity: 2, cost: 12 },
          { id: 'ing-8', name: 'Frutas frescas', unit: 'kg', quantity: 3, cost: 9 },
        ],
      },
    ],
    estimatedPrice: 18,
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Provisiones Gourmet',
    contact: 'contacto@provisionesgourmet.com',
    products: ['Mariscos', 'Carnes premium', 'Quesos'],
  },
  {
    id: 'sup-2',
    name: 'Granjas Frescas',
    contact: 'ventas@granjasfrescas.com',
    products: ['Vegetales', 'Frutas', 'Hierbas'],
  },
];

export const mockInventory: InventoryEntry[] = [
  {
    id: 'inv-1',
    name: 'Filete de salmón',
    quantity: 45,
    unit: 'kg',
    minimum: 30,
    lastUpdated: format(subDays(today, 1), 'PPP'),
  },
  {
    id: 'inv-2',
    name: 'Granos de café',
    quantity: 15,
    unit: 'kg',
    minimum: 20,
    lastUpdated: format(subDays(today, 2), 'PPP'),
  },
  {
    id: 'inv-3',
    name: 'Bandejas de postres',
    quantity: 8,
    unit: 'unidades',
    minimum: 10,
    lastUpdated: format(subDays(today, 3), 'PPP'),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'ntf-1',
    title: 'Nueva solicitud de reservación',
    message: 'Paula Medina solicitó un brunch corporativo para 75 invitados.',
    timestamp: new Date().toISOString(),
    category: 'reservations',
    read: false,
  },
  {
    id: 'ntf-2',
    title: 'Alerta de inventario',
    message: 'El stock de granos de café está por debajo del mínimo.',
    timestamp: subDays(today, 1).toISOString(),
    category: 'inventory',
    read: false,
  },
  {
    id: 'ntf-3',
    title: 'Actualización de evento',
    message: 'Se actualizó la línea de tiempo para la gala corporativa del Hotel Aurora.',
    timestamp: subDays(today, 2).toISOString(),
    category: 'events',
    read: true,
  },
];

export const mockServicesCatalog = [
  {
    id: 'svc-1',
    name: 'Paquetes corporativos',
    description: 'Menús tipo buffet optimizados para reuniones empresariales.',
    priceRange: '$35 - $60 por invitado',
  },
  {
    id: 'svc-2',
    name: 'Experiencia de bodas',
    description: 'Catering integral para bodas con menús y decoración a medida.',
    priceRange: '$55 - $90 por invitado',
  },
  {
    id: 'svc-3',
    name: 'Eventos privados',
    description: 'Reuniones íntimas, chef tables y celebraciones temáticas.',
    priceRange: '$40 - $75 por invitado',
  },
];

export const mockFinancialReport = [
  {
    id: 'rep-1',
    event: 'Hotel Aurora',
    revenue: 8200,
    expenses: 4800,
    profit: 3400,
    date: format(subDays(today, 4), 'yyyy-MM-dd'),
    client: 'Hotel Aurora',
  },
  {
    id: 'rep-2',
    event: 'Cumbre TechCorp',
    revenue: 12500,
    expenses: 7800,
    profit: 4700,
    date: format(subDays(today, 6), 'yyyy-MM-dd'),
    client: 'TechCorp',
  },
  {
    id: 'rep-3',
    event: 'Boda - Ramírez',
    revenue: 15200,
    expenses: 9800,
    profit: 5400,
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    client: 'Familia Ramírez',
  },
];

export const mockReservations = [
  {
    id: 'res-1',
    service: 'Paquetes corporativos',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    guests: 75,
    status: 'Pendiente',
  },
  {
    id: 'res-2',
    service: 'Experiencia de bodas',
    date: format(subDays(today, 20), 'yyyy-MM-dd'),
    guests: 150,
    status: 'Confirmada',
  },
];

export const roleLabels: Record<User['role'], string> = {
  administrator: 'Administrador/a',
  coordinator: 'Coordinador/a de eventos',
  chef: 'Chef',
  purchasing: 'Encargado/a de compras',
  client: 'Cliente',
};
