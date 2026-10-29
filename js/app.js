// Main Application Controller for Crème & Cone Artisanal Gelateria
const { useState } = React;

function App() {
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'reviews' | 'tray' | null
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [trayItems, setTrayItems] = useState([
    { ...window.MENU_DATA[0], quantity: 1 },
    { ...window.MENU_DATA[1], quantity: 1 }
  ]);

  const spotlightItems = [
    window.MENU_DATA[0], // Madagascar Bourbon Vanilla
    window.MENU_DATA[1], // Belgian Dark Truffle Chocolate
    window.MENU_DATA[2], // Wild Forest Strawberry
    window.MENU_DATA[3], // Royal Alphonso Mango
    window.MENU_DATA[4]  // Sicilian Roasted Pistachio
  ];

  const currentSpotlight = spotlightItems[spotlightIndex] || spotlightItems[0];

  const handleAddToTray = (item) => {
    setTrayItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    // Provide feedback toast
    const toast = document.createElement('div');
    toast.innerHTML = `🍦 Added <strong>${item.name}</strong> to your Tasting Tray!`;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--c-deep-burgundy);
      color: var(--c-cosmic-latte);
      padding: 14px 24px;
      border-radius: 9999px;
      font-size: 0.88rem;
      z-index: 9999;
      box-shadow: 0 12px 32px rgba(74, 16, 42, 0.25);
      border: 1px solid var(--c-mocha-cream);
      animation: fadeIn 0.25s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2400);
  };

  const handleUpdateTrayQty = (itemId, delta) => {
    setTrayItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-digital-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalTrayCount = trayItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="site-wrapper">
      {/* Ambient background glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Header */}
      <header className="site-header">
        <div className="header-container">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="brand-emblem"></div>
            <div className="brand-text">
              <h1>Crème & Cone</h1>
              <span>Artisanal Gelateria & Lounge</span>
            </div>
          </a>

          {/* Table Arrival Session Badge */}
          <div className="header-qr-badge">
            <span className="pulse-dot"></span>
            <span>Table 04 • QR Verified Dine-in</span>
          </div>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <button 
              className="tray-button"
              onClick={() => setActiveModal('tray')}
              id="header-tray-btn"
            >
              <span>🛎️ Tray</span>
              <span className="tray-count-badge">{totalTrayCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Landing Section with The Three Mandatory Portals */}
      <section className="hero-section">
        <div className="hero-title-area">
          <div className="hero-welcome-tag">
            <span>✨</span>
            <span>Slow-Churned Italian Gelato & Hand-Rolled Waffles</span>
          </div>

          <span className="hero-subscript">Welcome to our Gelato Lounge</span>
          
          <h2 className="hero-main-title">
            Pure Indulgence, <span className="gradient-text">Scooped to Perfection</span>
          </h2>

          <p className="hero-tagline">
            Cold-churned every morning using organic single-origin dairy, Belgian chocolate, 
            and sun-ripened Alphonso mangoes. Select an option below to begin your tasting experience.
          </p>
        </div>

        {/* 
          EXACTLY THREE MAIN LANDING OPTIONS REQUIRED BY USER:
          1. Explore Menu
          2. Feedback & Reviews
          3. Contact Us
        */}
        <div className="three-options-grid">
          {/* Option 1: Explore Menu */}
          <div 
            className="portal-card card-menu"
            id="portal-explore-menu"
            onClick={scrollToMenu}
          >
            <div>
              <div className="portal-icon-wrapper">🍦</div>
              <span className="portal-badge">Artisanal Catalog</span>
              <h3 className="portal-title">Explore Menu</h3>
              <p className="portal-desc">
                Browse our complete digital menu featuring signature cones, artisanal sundaes, 
                and vegan sorbets prepared fresh for your table.
              </p>
            </div>
            <button className="portal-action-btn">
              <span>View Full Menu</span>
              <span>↓</span>
            </button>
          </div>

          {/* Option 2: Feedback & Reviews */}
          <div 
            className="portal-card card-reviews"
            id="portal-feedback-reviews"
            onClick={() => setActiveModal('reviews')}
          >
            <div>
              <div className="portal-icon-wrapper">⭐</div>
              <span className="portal-badge">Customer Voice</span>
              <h3 className="portal-title">Feedback & Reviews</h3>
              <p className="portal-desc">
                Rate your scoops with our 5-star cone rating system, share your dessert thoughts, 
                and view verified reviews from fellow guests.
              </p>
            </div>
            <button className="portal-action-btn">
              <span>Share Review / View Ratings</span>
              <span>↗</span>
            </button>
          </div>

          {/* Option 3: Contact Us */}
          <div 
            className="portal-card card-contact"
            id="portal-contact-us"
            onClick={() => setActiveModal('contact')}
          >
            <div>
              <div className="portal-icon-wrapper">📍</div>
              <span className="portal-badge">Social & Concierge</span>
              <h3 className="portal-title">Contact Us</h3>
              <p className="portal-desc">
                Connect with our master gelatiers on Instagram, Facebook, and YouTube. 
                Find our location, Wi-Fi password, or message table service.
              </p>
            </div>
            <button className="portal-action-btn">
              <span>Social Channels & Info</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Editorial Dessert Spotlight Section (Replacing 3D model) */}
        <div className="editorial-spotlight-wrapper">
          <div className="spotlight-image-stage">
            <img 
              src={currentSpotlight.image} 
              alt={currentSpotlight.name} 
              className="spotlight-main-img" 
              key={currentSpotlight.id}
            />
            <span className="spotlight-photo-badge">Chef's Daily Harvest</span>
          </div>

          <div className="spotlight-content-col">
            <span className="spotlight-curator-label">Signature Tasting Note</span>
            <h3 className="spotlight-title">{currentSpotlight.name}</h3>
            <p className="spotlight-desc">{currentSpotlight.description}</p>

            {/* Flavor Switcher Pills */}
            <div className="spotlight-flavor-pills-row">
              {spotlightItems.map((item, idx) => (
                <button
                  key={item.id}
                  className={`spotlight-flavor-pill ${spotlightIndex === idx ? 'active' : ''}`}
                  onClick={() => setSpotlightIndex(idx)}
                >
                  <span className="spotlight-flavor-dot"></span>
                  <span>{item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}</span>
                </button>
              ))}
            </div>

            <div className="spotlight-action-row">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--c-deep-burgundy)' }}>
                {currentSpotlight.priceStr}
              </span>
              <button 
                className="spotlight-order-btn"
                onClick={() => handleAddToTray(currentSpotlight)}
              >
                + Add to Tasting Flight
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Menu Section */}
      <section style={{ padding: '0 24px' }}>
        <window.MenuSection 
          onAddToTray={handleAddToTray} 
        />
      </section>

      {/* Footer with Brand & Social Links */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h4>Crème & Cone</h4>
            <p>
              Artisanal gelateria committed to authentic Italian slow-churning traditions, 
              single-origin dairy, and premium fair-trade chocolate. Designed for delightful dining.
            </p>
          </div>

          <div className="footer-col">
            <h5>Three Essentials</h5>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToMenu(); }}>Explore Menu</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('reviews'); }}>Customer Reviews</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('contact'); }}>Contact Concierge</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Social Links</h5>
            <ul>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram ↗</a></li>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">👥 Facebook ↗</a></li>
              <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">▶️ YouTube ↗</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Café Hours</h5>
            <p style={{ color: 'rgba(255,248,231,0.82)', fontSize: '0.88rem' }}>
              Monday – Sunday<br />
              11:00 AM – 11:30 PM<br />
              Table QR Dining Active
            </p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© 2026 Crème & Cone Artisanal Gelateria. All rights reserved.</div>
          <div>Mobile-First QR Dining Experience • Curated Artisanal Photography</div>
        </div>
      </footer>

      {/* Modals */}
      <window.ContactModal 
        isOpen={activeModal === 'contact'} 
        onClose={() => setActiveModal(null)} 
      />

      <window.ReviewModal 
        isOpen={activeModal === 'reviews'} 
        onClose={() => setActiveModal(null)} 
      />

      <window.TastingTrayModal 
        isOpen={activeModal === 'tray'} 
        onClose={() => setActiveModal(null)}
        trayItems={trayItems}
        onUpdateQty={handleUpdateTrayQty}
        onClear={() => setTrayItems([])}
      />
    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
