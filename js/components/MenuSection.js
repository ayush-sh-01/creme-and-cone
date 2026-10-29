// Digital Menu Section with Editorial Dessert Photography Cards
const { useState } = React;

window.MenuSection = function MenuSection({ onAddToTray }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');

  const categories = [
    { id: 'all', name: 'All Delights 🍨' },
    { id: 'scoops', name: 'Artisanal Scoops 🍦' },
    { id: 'sundaes', name: 'Coupe Sundaes 🍧' },
    { id: 'waffles', name: 'Warm Waffles 🧇' },
    { id: 'sorbets', name: 'Vegan Sorbets 🥭' }
  ];

  const dietaryFilters = [
    { id: 'all', name: 'All Dietary' },
    { id: 'Eggless', name: '🌱 100% Eggless' },
    { id: 'Vegan', name: '🌿 Vegan' },
    { id: 'Gluten-Free', name: '🌾 Gluten-Free' }
  ];

  const filteredItems = window.MENU_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary = selectedDietary === 'all' || item.dietary.includes(selectedDietary);
    return matchesCategory && matchesDietary;
  });

  return (
    <div className="digital-menu-wrapper" id="menu-digital-showcase">
      {/* Category Controls & Search/Filters */}
      <div className="menu-controls-header">
        <div className="menu-section-title-wrap">
          <div>
            <span className="portal-badge">
              Table Menu • Digital QR Edition
            </span>
            <h2>Digital Dessert Menu</h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
            Showing {filteredItems.length} Handcrafted Delights
          </span>
        </div>

        {/* Category Pills */}
        <div className="category-tabs-scroll">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="dietary-tags-row">
          <span className="filter-label">Filter:</span>
          {dietaryFilters.map(filter => (
            <button
              key={filter.id}
              className={`filter-pill ${selectedDietary === filter.id ? 'active' : ''}`}
              onClick={() => setSelectedDietary(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Item Cards */}
      <div className="menu-items-grid">
        {filteredItems.map(item => {
          return (
            <div 
              key={item.id} 
              className="menu-item-card"
              id={`menu-item-${item.id}`}
            >
              <div className="item-thumb-container">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="item-thumb-img" 
                  loading="lazy" 
                />
                {item.isSignature && (
                  <span className="item-chef-badge">Signature</span>
                )}
              </div>

              <div className="item-info">
                <div className="item-title-row">
                  <h3 className="item-title">{item.name}</h3>
                  <span className="item-calories">{item.calories}</span>
                </div>
                
                <p className="item-description">{item.description}</p>

                <div className="item-tags-taste-row">
                  <div className="taste-meter-bar">
                    <span>Creaminess:</span>
                    <div className="taste-dots">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`taste-dot ${i < item.creaminess ? 'filled' : ''}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '5px' }}>
                    {item.dietary.map(d => (
                      <span key={d} className="diet-icon-pill">{d}</span>
                    ))}
                  </div>
                </div>

                <div className="item-actions-row">
                  <div className="item-price">{item.priceStr}</div>
                  
                  <button 
                    className="add-tray-btn"
                    onClick={() => onAddToTray(item)}
                    title="Add to your tasting flight"
                  >
                    + Add to Tray
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
