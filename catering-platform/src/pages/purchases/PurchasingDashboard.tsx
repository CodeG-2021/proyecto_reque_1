import { PlusIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { InputField } from '../../components/forms/InputField';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { mockEvents, mockInventory, mockSuppliers } from '../../data/mockData';
import { InventoryEntry, Supplier } from '../../types/inventory';

export const PurchasingDashboardPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [inventory, setInventory] = useState<InventoryEntry[]>(mockInventory);
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [supplierForm, setSupplierForm] = useState({ name: '', contact: '', products: '' });

  const lowStockItems = useMemo(() => inventory.filter((item) => item.quantity <= item.minimum), [inventory]);

  const shoppingList = useMemo(() => {
    const needs = new Map<string, number>();
    mockEvents.forEach((event) => {
      event.inventoryNeeds.forEach((need) => {
        needs.set(need, (needs.get(need) ?? 0) + 1);
      });
    });
    return Array.from(needs.entries()).map(([name, quantity]) => ({ name, quantity }));
  }, []);

  const inventorySummary = useMemo(
    () => ({
      totalItems: inventory.length,
      underMinimum: lowStockItems.length,
      lastUpdated: inventory.sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1))[0]?.lastUpdated ?? '-',
    }),
    [inventory, lowStockItems]
  );

  const handleAddSupplier = () => {
    if (!supplierForm.name.trim()) return;
    setSuppliers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: supplierForm.name,
        contact: supplierForm.contact,
        products: supplierForm.products.split(',').map((item) => item.trim()),
      },
    ]);
    setSupplierForm({ name: '', contact: '', products: '' });
    setSupplierModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Purchasing & inventory</h1>
          <p className="text-sm text-neutral-500">
            Track stock levels, manage suppliers, and generate shopping lists aligned with upcoming menus.
          </p>
        </div>
        <Button className="inline-flex items-center gap-2" onClick={() => setSupplierModalOpen(true)}>
          <PlusIcon className="h-5 w-5" />
          Add supplier
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-primary">Inventory dashboard</h2>
          <div className="rounded-2xl bg-neutral-200/40 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Total items tracked</p>
            <p className="mt-1 text-2xl font-semibold text-primary">{inventorySummary.totalItems}</p>
          </div>
          <div className="rounded-2xl bg-neutral-200/40 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Below minimum alert</p>
            <p className="mt-1 text-2xl font-semibold text-primary">{inventorySummary.underMinimum}</p>
          </div>
          <div className="rounded-2xl bg-neutral-200/40 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Last update</p>
            <p className="mt-1 text-sm font-semibold text-primary">{inventorySummary.lastUpdated}</p>
          </div>
        </Card>

        <Card className="space-y-3 lg:col-span-2">
          <h2 className="text-lg font-semibold text-primary">Shopping list</h2>
          <p className="text-sm text-neutral-500">
            Automatically generated from menus and upcoming events. Share with your purchasing team or export as needed.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {shoppingList.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-neutral-200/40 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-primary">{item.name}</p>
                  <p className="text-xs text-neutral-500">Required for {item.quantity} event(s)</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">Priority</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">Supplier network</h2>
        <p className="text-sm text-neutral-500">Maintain reliable contacts for ingredients, rentals, and complementary services.</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="rounded-2xl border border-neutral-200/70 bg-white/90 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-primary">{supplier.name}</h3>
              <p className="mt-1 text-xs text-neutral-500">{supplier.contact}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                {supplier.products.map((product) => (
                  <span key={product} className="rounded-full bg-neutral-200/60 px-3 py-1">
                    {product}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">Inventory alerts</h2>
        {lowStockItems.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs">
                  {item.quantity} {item.unit} remaining &middot; minimum {item.minimum}
                </p>
                <p className="text-xs text-red-400">Last updated {item.lastUpdated}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">All inventory levels look healthy.</p>
        )}
      </Card>

      <Modal
        open={supplierModalOpen}
        onClose={() => setSupplierModalOpen(false)}
        title="Add supplier"
        description="Keep supplier information handy for quick reorders and negotiations."
        primaryAction={{ label: 'Save supplier', onClick: handleAddSupplier }}
        secondaryAction={{ label: 'Cancel', onClick: () => setSupplierModalOpen(false) }}
      >
        <InputField
          label="Supplier name"
          placeholder="Gourmet Provisions"
          value={supplierForm.name}
          onChange={(event) => setSupplierForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <InputField
          label="Contact details"
          placeholder="sales@gourmetprovisions.com"
          value={supplierForm.contact}
          onChange={(event) => setSupplierForm((prev) => ({ ...prev, contact: event.target.value }))}
        />
        <TextAreaField
          label="Products / Services"
          placeholder="List main products separated by commas"
          value={supplierForm.products}
          onChange={(event) => setSupplierForm((prev) => ({ ...prev, products: event.target.value }))}
        />
      </Modal>
    </div>
  );
};
