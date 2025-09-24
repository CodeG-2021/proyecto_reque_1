import { PlusIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';
import { mockMenus } from '../../data/mockData';
import { Ingredient, Menu, Recipe } from '../../types/menu';

interface RecipeFormState {
  name: string;
  portionSize: number;
  ingredients: Ingredient[];
}

export const MenuManagementPage: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>(mockMenus);
  const [selectedMenuId, setSelectedMenuId] = useState<string>(mockMenus[0]?.id ?? '');
  const [recipeForm, setRecipeForm] = useState<RecipeFormState>({
    name: '',
    portionSize: 10,
    ingredients: [],
  });
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState<number>(45);
  const [guestCount, setGuestCount] = useState(50);

  const selectedMenu = useMemo(
    () => menus.find((menu) => menu.id === selectedMenuId) ?? menus[0],
    [menus, selectedMenuId]
  );

  const handleAddMenu = () => {
    if (!newMenuName.trim()) return;
    const newMenu: Menu = {
      id: crypto.randomUUID(),
      name: newMenuName,
      dishes: [],
      estimatedPrice: newMenuPrice,
    };
    setMenus((prev) => [...prev, newMenu]);
    setSelectedMenuId(newMenu.id);
    setNewMenuName('');
  };

  const handleAddRecipe = () => {
    if (!selectedMenu) return;
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name: recipeForm.name,
      portionSize: recipeForm.portionSize,
      ingredients: recipeForm.ingredients,
    };
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === selectedMenu.id
          ? {
              ...menu,
              dishes: [...menu.dishes, recipe],
            }
          : menu
      )
    );
    setRecipeForm({ name: '', portionSize: 10, ingredients: [] });
  };

  const handleAddIngredient = () => {
    setRecipeForm((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          id: crypto.randomUUID(),
          name: `Ingrediente ${prev.ingredients.length + 1}`,
          unit: 'unidad',
          quantity: 1,
          cost: 1.5,
        },
      ],
    }));
  };

  const scaledIngredients = useMemo(() => {
    if (!selectedMenu) return [] as Ingredient[];
    const baseRecipe = selectedMenu.dishes[0];
    if (!baseRecipe) return [] as Ingredient[];
    return baseRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: Number(((ingredient.quantity / baseRecipe.portionSize) * guestCount).toFixed(2)),
      cost: Number(((ingredient.cost / baseRecipe.portionSize) * guestCount).toFixed(2)),
    }));
  }, [guestCount, selectedMenu]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Menús y recetas</h1>
          <p className="text-sm text-neutral-500">
            Diseña experiencias culinarias, calcula costos y escala ingredientes automáticamente según el número de invitados.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Menús disponibles</h2>
          <div className="space-y-3">
            {menus.map((menu) => (
              <button
                key={menu.id}
                type="button"
                onClick={() => setSelectedMenuId(menu.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  menu.id === selectedMenu?.id
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'border-transparent bg-neutral-200/40 text-neutral-600 hover:bg-neutral-200/60'
                }`}
              >
                <span className="font-semibold">{menu.name}</span>
                <span className="text-xs">${menu.estimatedPrice} pp</span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-neutral-200/40 p-4">
            <h3 className="text-sm font-semibold text-primary">Crear nuevo menú</h3>
            <InputField
              label="Nombre del menú"
              placeholder="Selección de temporada"
              value={newMenuName}
              onChange={(event) => setNewMenuName(event.target.value)}
            />
            <InputField
              label="Precio estimado por invitado"
              type="number"
              value={newMenuPrice}
              onChange={(event) => setNewMenuPrice(Number(event.target.value))}
            />
            <Button onClick={handleAddMenu} className="mt-3 w-full" variant="secondary">
              Agregar menú
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary">{selectedMenu?.name}</h2>
              <p className="text-sm text-neutral-500">
                {selectedMenu?.dishes.length
                  ? 'Selecciona un platillo para editar o agrega nuevas recetas.'
                  : 'Comienza agregando una nueva receta.'}
              </p>
            </div>
            <Button className="inline-flex items-center gap-2" onClick={handleAddRecipe}>
              <PlusIcon className="h-5 w-5" />
              Guardar receta
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Nombre de la receta"
              placeholder="Entrada insignia"
              value={recipeForm.name}
              onChange={(event) => setRecipeForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <InputField
              label="Porciones"
              type="number"
              min={1}
              value={recipeForm.portionSize}
              onChange={(event) => setRecipeForm((prev) => ({ ...prev, portionSize: Number(event.target.value) }))}
            />
          </div>

          <div className="rounded-2xl border border-dashed border-primary/30 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-primary">Ingredientes</h3>
              <Button variant="secondary" size="sm" className="inline-flex items-center gap-1" onClick={handleAddIngredient}>
                <PlusIcon className="h-4 w-4" /> Agregar ingrediente
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {recipeForm.ingredients.length ? (
                recipeForm.ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="grid gap-3 md:grid-cols-4">
                    <InputField
                      label="Nombre"
                      value={ingredient.name}
                      onChange={(event) =>
                        setRecipeForm((prev) => {
                          const updated = [...prev.ingredients];
                          updated[index] = { ...ingredient, name: event.target.value };
                          return { ...prev, ingredients: updated };
                        })
                      }
                    />
                    <InputField
                      label="Cantidad"
                      type="number"
                      value={ingredient.quantity}
                      onChange={(event) =>
                        setRecipeForm((prev) => {
                          const updated = [...prev.ingredients];
                          updated[index] = { ...ingredient, quantity: Number(event.target.value) };
                          return { ...prev, ingredients: updated };
                        })
                      }
                    />
                    <InputField
                      label="Unidad"
                      value={ingredient.unit}
                      onChange={(event) =>
                        setRecipeForm((prev) => {
                          const updated = [...prev.ingredients];
                          updated[index] = { ...ingredient, unit: event.target.value };
                          return { ...prev, ingredients: updated };
                        })
                      }
                    />
                    <InputField
                      label="Costo"
                      type="number"
                      value={ingredient.cost}
                      onChange={(event) =>
                        setRecipeForm((prev) => {
                          const updated = [...prev.ingredients];
                          updated[index] = { ...ingredient, cost: Number(event.target.value) };
                          return { ...prev, ingredients: updated };
                        })
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">Aún no hay ingredientes. Agrega el primero desde el botón superior.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-200/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-primary">Escalado automático</h3>
                <p className="text-xs text-neutral-500">
                  Ajusta la cantidad de invitados para recalcular al instante las porciones de cada ingrediente.
                </p>
              </div>
              <InputField
                label="Invitados"
                type="number"
                min={1}
                value={guestCount}
                onChange={(event) => setGuestCount(Number(event.target.value))}
                className="w-28"
              />
            </div>
            <div className="mt-4 space-y-2">
              {scaledIngredients.length ? (
                scaledIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex flex-wrap items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{ingredient.name}</p>
                      <p className="text-xs text-neutral-500">
                        {ingredient.quantity} {ingredient.unit}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">${ingredient.cost.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">
                  Selecciona o crea una receta con ingredientes para habilitar el escalado automático.
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
