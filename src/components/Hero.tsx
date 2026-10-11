const HERO_IMAGES = [
  '/hero/lemon-meringue.jpg',
  '/hero/red-velvet.jpg',
  '/hero/lemon-meringue-overhead.jpg',
  '/hero/salted-caramel.jpg',
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <p className="hero__eyebrow">Artisan Bakery · Est. 2026</p>
        <h1 className="hero__title">
          Fifteen Flavours of
          <em> Handcrafted tarts</em>
        </h1>
        <p className="hero__subtitle">
          Baked fresh each morning with seasonal ingredients. Order today for
          next-day delivery across the city.
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
        <div className="hero__carousel">
          <div className="hero__track">
            {/* Images are rendered twice so the scroll loops seamlessly */}
            {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
              <img key={i} src={src} alt="" className="hero__slide" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
