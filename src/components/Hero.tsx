export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <p className="hero__eyebrow">Artisan Bakery · Est. 2026</p>
        <h1 className="hero__title">
          Fifteen flavours of
          <em> handcrafted tarts</em>
        </h1>
        <p className="hero__subtitle">
          Baked fresh each morning with seasonal ingredients. Order for delivery
          across the city — same-day slots available before noon.
        </p>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--primary">
            Browse the menu
          </a>
          <a href="#order" className="btn btn--ghost">
            Order delivery
          </a>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="hero__tart hero__tart--1" />
        <div className="hero__tart hero__tart--2" />
        <div className="hero__tart hero__tart--3" />
      </div>
    </section>
  );
}
