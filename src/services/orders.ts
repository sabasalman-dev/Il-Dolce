import type { DeliveryOrder, OrderFormData } from '../types';

const ORDERS_KEY = 'il-dolce-orders';

/** Local storage stub — swap for API calls when backend is ready */
export const orderService = {
  save(order: DeliveryOrder): void {
    const existing = orderService.getAll();
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
  },

  getAll(): DeliveryOrder[] {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      return raw ? (JSON.parse(raw) as DeliveryOrder[]) : [];
    } catch {
      return [];
    }
  },
};

export function createOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export function validateOrderForm(data: OrderFormData): Partial<Record<keyof OrderFormData, string>> {
  const errors: Partial<Record<keyof OrderFormData, string>> = {};

  if (!data.customerName.trim()) errors.customerName = 'Name is required';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  if (!data.address.trim()) errors.address = 'Delivery address is required';
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.postalCode.trim()) errors.postalCode = 'Postal code is required';
  if (!data.deliveryDate) errors.deliveryDate = 'Delivery date is required';
  if (!data.deliveryTime) errors.deliveryTime = 'Delivery time is required';

  return errors;
}
