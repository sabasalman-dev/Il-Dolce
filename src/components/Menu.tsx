import { useMemo, useState } from 'react';
import type { CartItem } from '../types';
import { TARTS, CATEGORY_LABELS } from '../data/tarts';
import { TartCard } from './TartCard';

interface MenuProps {
  cart: CartItem[];
  onAddToCart: (tartId: string) => void;
  onUpdateQuantity: (tartId: string, quantity: number) => void;
}

type CategoryFilter = 'all' | keyof typeof CATEGORY_LABELS;

export function Menu({ cart, onAddToCart, onUpdateQuantity }: MenuProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredTarts = useMemo(() => {
    if (filter === 'all') return TARTS;
    return TARTS.filter((t) => t.category === filter);
  }, [filter]);

  const getQuantity = (tartId: string) =>
    cart.find((item) => item.tartId === tartId)?.quantity ?? 0;

  return (
    <section id="menu" className="menu section">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Our Menu</p>
          <h2 className="section__title">15 signature tart flavours</h2>
          <p className="section__subtitle">
            Each tart serves 6–8. All prices in USD. Minimum order of one tart for delivery.
          </p>
        </div>

        <div className="menu__filters" role="tablist" aria-label="Filter by category">
          <button
            type="button"
            role="tab"
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              className={`filter-btn ${filter === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {filteredTarts.map((tart) => (
            <TartCard
              key={tart.id}
              tart={tart}
              quantity={getQuantity(tart.id)}
              onAdd={() => onAddToCart(tart.id)}
              onUpdateQuantity={(qty) => onUpdateQuantity(tart.id, qty)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
