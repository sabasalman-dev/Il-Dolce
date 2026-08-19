import type { CSSProperties } from 'react';
import type { Tart } from '../types';

interface TartCardProps {
  tart: Tart;
  quantity: number;
  onAdd: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function TartCard({ tart, quantity, onAdd, onUpdateQuantity }: TartCardProps) {
  return (
    <article className="tart-card">
      <div className="tart-card__visual" style={{ '--accent': tart.accent } as CSSProperties}>
        <span className="tart-card__category">{tart.category}</span>
      </div>
      <div className="tart-card__body">
        <h3 className="tart-card__name">{tart.name}</h3>
        <p className="tart-card__description">{tart.description}</p>
        <div className="tart-card__footer">
          <span className="tart-card__price">${tart.price}</span>
          {quantity === 0 ? (
            <button type="button" className="btn btn--small" onClick={onAdd}>
              Add to order
            </button>
          ) : (
            <div className="quantity-control">
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => onUpdateQuantity(quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-control__value">{quantity}</span>
              <button
                type="button"
                className="quantity-control__btn"
                onClick={() => onUpdateQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
