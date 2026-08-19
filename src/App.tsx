import { useState, useCallback } from 'react';
import type { CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { OrderSection } from './components/OrderSection';
import { Footer } from './components/Footer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((tartId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.tartId === tartId);
      if (existing) {
        return prev.map((item) =>
          item.tartId === tartId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { tartId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((tartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.tartId !== tartId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.tartId === tartId ? { ...item, quantity } : item)),
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <Menu cart={cart} onAddToCart={addToCart} onUpdateQuantity={updateQuantity} />
        <OrderSection cart={cart} onUpdateQuantity={updateQuantity} onOrderComplete={clearCart} />
      </main>
      <Footer />
    </>
  );
}
