export interface Tart {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'classic' | 'fruit' | 'chocolate' | 'seasonal';
  accent: string;
}

export interface CartItem {
  tartId: string;
  quantity: number;
}

export interface DeliveryOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

export interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
}
