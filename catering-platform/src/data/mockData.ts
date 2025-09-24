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
    { client: 'TechCorp Summit', date: format(subDays(today, 1), 'PPP'), guests: 120 },
    { client: 'Wedding - Ramirez', date: format(subDays(today, 2), 'PPP'), guests: 150 },
  ],
};

export const mockEvents: CateringEvent[] = [
  {
    id: 'evt-1',
    client: 'Hotel Aurora',
    date: format(subDays(today, -3), 'yyyy-MM-dd'),
    type: 'Corporate Gala',
    attendees: 180,
    status: 'scheduled',
    assignedMenus: [
      { id: 'menu-1', name: 'Mediterranean Elegance', pricePerGuest: 45 },
      { id: 'menu-2', name: 'Signature Desserts', pricePerGuest: 12 },
    ],
    staff: ['Marco Silva', 'Lucia Torres', 'Ana Perez'],
    inventoryNeeds: ['Salmon fillets', 'Seasonal vegetables', 'Dessert station setup'],
    notes: 'VIP seating layout required',
    timeline: [
      {
        id: 'tl-1',
        label: 'Menu confirmation',
        dueDate: format(subDays(today, -5), 'yyyy-MM-dd'),
        completed: true,
      },
      {
        id: 'tl-2',
        label: 'Supplier orders',
        dueDate: format(subDays(today, -2), 'yyyy-MM-dd'),
        completed: false,
      },
    ],
  },
  {
    id: 'evt-2',
    client: 'Wedding - Ramirez',
    date: format(subDays(today, -10), 'yyyy-MM-dd'),
    type: 'Wedding',
    attendees: 150,
    status: 'in-progress',
    assignedMenus: [
      { id: 'menu-3', name: 'Garden Fresh', pricePerGuest: 38 },
    ],
    staff: ['Lucia Torres', 'Ana Perez'],
    inventoryNeeds: ['Fresh herbs', 'Premium beef cuts'],
    timeline: [
      {
        id: 'tl-3',
        label: 'Tasting session',
        dueDate: format(subDays(today, 7), 'yyyy-MM-dd'),
        completed: true,
      },
    ],
  },
  {
    id: 'evt-3',
    client: 'TechCorp Summit',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    type: 'Conference',
    attendees: 220,
    status: 'completed',
    assignedMenus: [
      { id: 'menu-4', name: 'Executive Lunch Buffet', pricePerGuest: 35 },
    ],
    staff: ['Marco Silva', 'Rafael Gomez'],
    inventoryNeeds: ['Coffee beans', 'Pastry assortment'],
    timeline: [
      {
        id: 'tl-4',
        label: 'Logistics briefing',
        dueDate: format(subDays(today, 12), 'yyyy-MM-dd'),
        completed: true,
      },
    ],
  },
];

export const mockIngredients: Ingredient[] = [
  { id: 'ing-1', name: 'Salmon fillet', unit: 'kg', quantity: 2, cost: 15 },
  { id: 'ing-2', name: 'Asparagus', unit: 'kg', quantity: 1.5, cost: 8 },
  { id: 'ing-3', name: 'Lemon butter sauce', unit: 'ltr', quantity: 1, cost: 4 },
];

export const mockRecipes: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Grilled Salmon with Asparagus',
    portionSize: 10,
    ingredients: mockIngredients,
  },
  {
    id: 'rec-2',
    name: 'Roasted Vegetable Couscous',
    portionSize: 12,
    ingredients: [
      { id: 'ing-4', name: 'Couscous', unit: 'kg', quantity: 1, cost: 3 },
      { id: 'ing-5', name: 'Seasonal vegetables', unit: 'kg', quantity: 2, cost: 5 },
      { id: 'ing-6', name: 'Herb dressing', unit: 'ltr', quantity: 0.5, cost: 2 },
    ],
  },
];

export const mockMenus: Menu[] = [
  {
    id: 'menu-1',
    name: 'Mediterranean Elegance',
    dishes: mockRecipes,
    estimatedPrice: 52,
  },
  {
    id: 'menu-2',
    name: 'Signature Desserts',
    dishes: [
      {
        id: 'rec-3',
        name: 'Chocolate Fountain Selection',
        portionSize: 20,
        ingredients: [
          { id: 'ing-7', name: 'Dark chocolate', unit: 'kg', quantity: 2, cost: 12 },
          { id: 'ing-8', name: 'Fresh fruits', unit: 'kg', quantity: 3, cost: 9 },
        ],
      },
    ],
    estimatedPrice: 18,
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Gourmet Provisions',
    contact: 'contact@gourmetprovisions.com',
    products: ['Seafood', 'Premium meats', 'Cheeses'],
  },
  {
    id: 'sup-2',
    name: 'Fresh Farms',
    contact: 'sales@freshfarms.com',
    products: ['Vegetables', 'Fruits', 'Herbs'],
  },
];

export const mockInventory: InventoryEntry[] = [
  {
    id: 'inv-1',
    name: 'Salmon fillet',
    quantity: 45,
    unit: 'kg',
    minimum: 30,
    lastUpdated: format(subDays(today, 1), 'PPP'),
  },
  {
    id: 'inv-2',
    name: 'Coffee beans',
    quantity: 15,
    unit: 'kg',
    minimum: 20,
    lastUpdated: format(subDays(today, 2), 'PPP'),
  },
  {
    id: 'inv-3',
    name: 'Dessert platters',
    quantity: 8,
    unit: 'units',
    minimum: 10,
    lastUpdated: format(subDays(today, 3), 'PPP'),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'ntf-1',
    title: 'New reservation request',
    message: 'Paula Medina requested a corporate brunch for 75 guests.',
    timestamp: new Date().toISOString(),
    category: 'reservations',
    read: false,
  },
  {
    id: 'ntf-2',
    title: 'Inventory alert',
    message: 'Coffee beans stock below minimum threshold.',
    timestamp: subDays(today, 1).toISOString(),
    category: 'inventory',
    read: false,
  },
  {
    id: 'ntf-3',
    title: 'Event update',
    message: 'Timeline updated for Hotel Aurora corporate gala.',
    timestamp: subDays(today, 2).toISOString(),
    category: 'events',
    read: true,
  },
];

export const mockServicesCatalog = [
  {
    id: 'svc-1',
    name: 'Corporate Packages',
    description: 'Buffet-style menus optimized for corporate gatherings.',
    priceRange: '$35 - $60 per guest',
  },
  {
    id: 'svc-2',
    name: 'Wedding Experience',
    description: 'Full-service wedding catering with bespoke menus and décor.',
    priceRange: '$55 - $90 per guest',
  },
  {
    id: 'svc-3',
    name: 'Private Events',
    description: 'Intimate gatherings, chef tables, and themed celebrations.',
    priceRange: '$40 - $75 per guest',
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
    event: 'TechCorp Summit',
    revenue: 12500,
    expenses: 7800,
    profit: 4700,
    date: format(subDays(today, 6), 'yyyy-MM-dd'),
    client: 'TechCorp',
  },
  {
    id: 'rep-3',
    event: 'Wedding - Ramirez',
    revenue: 15200,
    expenses: 9800,
    profit: 5400,
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    client: 'Ramirez Family',
  },
];

export const mockReservations = [
  {
    id: 'res-1',
    service: 'Corporate Packages',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    guests: 75,
    status: 'Pending',
  },
  {
    id: 'res-2',
    service: 'Wedding Experience',
    date: format(subDays(today, 20), 'yyyy-MM-dd'),
    guests: 150,
    status: 'Confirmed',
  },
];

export const roleLabels: Record<User['role'], string> = {
  administrator: 'Administrator',
  coordinator: 'Event Coordinator',
  chef: 'Chef',
  purchasing: 'Purchasing Manager',
  client: 'Client',
};
