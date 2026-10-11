const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

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
          <p>Mon – Sun · 8am – 6pm</p>
          <p>Next day Delivery</p>
        </div>
        <div className="footer__info">
          <h4>Contact</h4>
          <p>
            <a href="mailto:saba.salman@gmail.com">
              <svg {...ICON_PROPS}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              saba.salman@gmail.com
            </a>
          </p>
          <p>
            <a href="https://wa.me/923091282330" target="_blank" rel="noreferrer">
              <svg {...ICON_PROPS}>
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
              0309-1282330
            </a>
          </p>
          <p>
            <a href="https://www.facebook.com/IlDolceKarachi" target="_blank" rel="noreferrer">
              <svg {...ICON_PROPS}>
                <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7" />
              </svg>
              IlDolceKarachi
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/ildolce_karachi" target="_blank" rel="noreferrer">
              <svg {...ICON_PROPS}>
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3" />
                <path d="M16.5 7.5v.01" />
              </svg>
              ildolce_karachi
            </a>
          </p>
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
