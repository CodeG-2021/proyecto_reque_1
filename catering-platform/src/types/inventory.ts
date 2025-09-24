export interface Supplier {
  id: string;
  name: string;
  contact: string;
  products: string[];
}

export interface InventoryEntry {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minimum: number;
  lastUpdated: string;
}
