interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo">
          <span className="logo__mark">Il</span>
          <span className="logo__name">Dolce</span>
        </a>
        <nav className="nav">
          <a href="#menu">Menu</a>
          <a href="#order">Order</a>
          <a href="#about">About</a>
        </nav>
        <a href="#order" className="cart-badge" aria-label={`${cartCount} items in cart`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6h15l-1.5 9h-12z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M6 6L5 3H2" />
          </svg>
          {cartCount > 0 && <span className="cart-badge__count">{cartCount}</span>}
        </a>
      </div>
    </header>
  );
}
