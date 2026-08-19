export function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="logo__mark">Il</span>
          <span className="logo__name">Dolce</span>
          <p>Handcrafted tarts, baked with care every morning.</p>
        </div>
        <div className="footer__info">
          <h4>Hours</h4>
          <p>Tue – Sun · 8am – 6pm</p>
          <p>Delivery · Tue – Sun · 10am – 8pm</p>
        </div>
        <div className="footer__info">
          <h4>Contact</h4>
          <p>hello@ildolce.com</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Il Dolce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
