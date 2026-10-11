import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { CartItem, DeliveryOrder, OrderFormData } from '../types';
import { TARTS, DELIVERY_FEE } from '../data/tarts';
import { createOrderId, getMinDeliveryDate, orderService, validateOrderForm } from '../services/orders';

interface OrderSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (tartId: string, quantity: number) => void;
  onOrderComplete: () => void;
}

const EMPTY_FORM: OrderFormData = {
  customerName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  deliveryDate: '',
  deliveryTime: '',
  notes: '',
};

const TIME_SLOTS = [
  '10:00 – 12:00',
  '12:00 – 14:00',
  '14:00 – 16:00',
  '16:00 – 18:00',
  '18:00 – 20:00',
];

export function OrderSection({ cart, onUpdateQuantity, onOrderComplete }: OrderSectionProps) {
  const [form, setForm] = useState<OrderFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [submitted, setSubmitted] = useState<DeliveryOrder | null>(null);

  const lineItems = useMemo(() => {
    return cart
      .map((item) => {
        const tart = TARTS.find((t) => t.id === item.tartId);
        if (!tart) return null;
        return { ...item, tart, lineTotal: tart.price * item.quantity };
      })
      .filter(Boolean) as Array<CartItem & { tart: (typeof TARTS)[0]; lineTotal: number }>;
  }, [cart]);

  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const total = subtotal + (lineItems.length > 0 ? DELIVERY_FEE : 0);

  const minDate = getMinDeliveryDate();

  function handleChange(field: keyof OrderFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (cart.length === 0) return;

    const validationErrors = validateOrderForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order: DeliveryOrder = {
      id: createOrderId(),
      ...form,
      items: cart,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orderService.save(order);
    setSubmitted(order);
    onOrderComplete();
    setForm(EMPTY_FORM);
  }

  if (submitted) {
    return (
      <section id="order" className="order section">
        <div className="container">
          <div className="order-success">
            <div className="order-success__icon">✓</div>
            <h2>Order placed!</h2>
            <p>
              Thank you, {submitted.customerName}. Your order{' '}
              <strong>{submitted.id}</strong> has been received.
            </p>
            <p className="order-success__detail">
              Delivery scheduled for {submitted.deliveryDate} between{' '}
              {submitted.deliveryTime}. Total: <strong>${submitted.total.toFixed(2)}</strong>
            </p>
            <p className="order-success__note">
              We'll confirm by email at {submitted.email}. Orders are stored locally for now —
              a database connection will sync these when your backend is ready.
            </p>
            <button type="button" className="btn btn--primary" onClick={() => setSubmitted(null)}>
              Place another order
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="order section">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Delivery</p>
          <h2 className="section__title">Order for delivery</h2>
          <p className="section__subtitle">
            Flat ${DELIVERY_FEE} delivery fee. Select your tarts above, then fill in your details below.
          </p>
        </div>

        <div className="order__layout">
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="order-form__group">
              <legend>Contact</legend>
              <div className="form-row">
                <label className="form-field">
                  <span>Full name</span>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    className={errors.customerName ? 'input--error' : ''}
                  />
                  {errors.customerName && <em>{errors.customerName}</em>}
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? 'input--error' : ''}
                  />
                  {errors.email && <em>{errors.email}</em>}
                </label>
              </div>
              <label className="form-field">
                <span>Phone</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'input--error' : ''}
                />
                {errors.phone && <em>{errors.phone}</em>}
              </label>
            </fieldset>

            <fieldset className="order-form__group">
              <legend>Delivery address</legend>
              <label className="form-field">
                <span>Street address</span>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={errors.address ? 'input--error' : ''}
                />
                {errors.address && <em>{errors.address}</em>}
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span>City</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={errors.city ? 'input--error' : ''}
                  />
                  {errors.city && <em>{errors.city}</em>}
                </label>
                <label className="form-field">
                  <span>Postal code</span>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className={errors.postalCode ? 'input--error' : ''}
                  />
                  {errors.postalCode && <em>{errors.postalCode}</em>}
                </label>
              </div>
            </fieldset>

            <fieldset className="order-form__group">
              <legend>Delivery schedule</legend>
              <div className="form-row">
                <label className="form-field">
                  <span>Date</span>
                  <input
                    type="date"
                    min={minDate}
                    value={form.deliveryDate}
                    onChange={(e) => handleChange('deliveryDate', e.target.value)}
                    className={errors.deliveryDate ? 'input--error' : ''}
                  />
                  {errors.deliveryDate && <em>{errors.deliveryDate}</em>}
                </label>
                <label className="form-field">
                  <span>Time window</span>
                  <select
                    value={form.deliveryTime}
                    onChange={(e) => handleChange('deliveryTime', e.target.value)}
                    className={errors.deliveryTime ? 'input--error' : ''}
                  >
                    <option value="">Select a slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.deliveryTime && <em>{errors.deliveryTime}</em>}
                </label>
              </div>
              <label className="form-field">
                <span>Special instructions (optional)</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Gate code, dietary notes, gift message..."
                />
              </label>
            </fieldset>

            <button type="submit" className="btn btn--primary btn--full" disabled={cart.length === 0}>
              {cart.length === 0 ? 'Add tarts to your order' : `Place order · $${total.toFixed(2)}`}
            </button>
          </form>

          <aside className="order-summary">
            <h3>Your order</h3>
            {lineItems.length === 0 ? (
              <p className="order-summary__empty">
                Your cart is empty. Browse the{' '}
                <a href="#menu">menu</a> to add tarts.
              </p>
            ) : (
              <>
                <ul className="order-summary__list">
                  {lineItems.map(({ tart, quantity, lineTotal }) => (
                    <li key={tart.id} className="order-summary__item">
                      <div
                        className="order-summary__swatch"
                        style={{ '--accent': tart.accent } as CSSProperties}
                      />
                      <div className="order-summary__details">
                        <span className="order-summary__name">{tart.name}</span>
                        <span className="order-summary__meta">
                          ${tart.price} × {quantity}
                        </span>
                      </div>
                      <div className="quantity-control quantity-control--compact">
                        <button
                          type="button"
                          className="quantity-control__btn"
                          onClick={() => onUpdateQuantity(tart.id, quantity - 1)}
                          aria-label={`Remove one ${tart.name}`}
                        >
                          −
                        </button>
                        <span className="quantity-control__value">{quantity}</span>
                        <button
                          type="button"
                          className="quantity-control__btn"
                          onClick={() => onUpdateQuantity(tart.id, quantity + 1)}
                          aria-label={`Add one ${tart.name}`}
                        >
                          +
                        </button>
                      </div>
                      <span className="order-summary__price">${lineTotal.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="order-summary__totals">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>${subtotal.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>${DELIVERY_FEE.toFixed(2)}</dd>
                  </div>
                  <div className="order-summary__total">
                    <dt>Total</dt>
                    <dd>${total.toFixed(2)}</dd>
                  </div>
                </dl>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
