// Modals Component: Contact Us, Feedback & Reviews, and Tasting Tray (Cart)
const { useState, useEffect } = React;

// 1. Contact Us Modal with Instagram, Facebook, YouTube links
window.ContactModal = function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <span className="portal-badge">Concierge & Socials</span>
            <h3>Contact Crème & Cone</h3>
            <p>Connect with our master gelatiers, visit our lounge, or reach table service.</p>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {/* Social Channels Required by Prompt */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--c-deep-burgundy)' }}>
              Official Social Channels
            </h4>
            <div className="social-channels-grid">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-channel-card"
                id="link-instagram"
              >
                <span className="channel-icon">📸</span>
                <span className="channel-name">Instagram</span>
                <span className="channel-handle">@cremeandcone.gelato</span>
                <span className="channel-action-badge">Follow & Tag Us ↗</span>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-channel-card"
                id="link-facebook"
              >
                <span className="channel-icon">👥</span>
                <span className="channel-name">Facebook</span>
                <span className="channel-handle">/CremeAndConeLounge</span>
                <span className="channel-action-badge">Like Our Page ↗</span>
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-channel-card"
                id="link-youtube"
              >
                <span className="channel-icon">▶️</span>
                <span className="channel-name">YouTube</span>
                <span className="channel-handle">@CremeAndConeTV</span>
                <span className="channel-action-badge">Watch Masterclasses ↗</span>
              </a>
            </div>
          </div>

          {/* Café Visit Details */}
          <div className="contact-meta-cards">
            <div className="meta-info-card">
              <div className="meta-icon-box">📍</div>
              <div className="meta-text-wrap">
                <h5>Lounge Address</h5>
                <p>Sharma Ice Cream Lounge & Gelateria, Heritage Promenade, Luxury Dessert Lane</p>
              </div>
            </div>

            <div className="meta-info-card">
              <div className="meta-icon-box">⏰</div>
              <div className="meta-text-wrap">
                <h5>Opening Hours</h5>
                <p>Mon – Sun: 11:00 AM – 11:30 PM<br /><strong style={{ color: 'var(--c-mocha-dark)' }}>● Open Now for Dine-in</strong></p>
              </div>
            </div>
          </div>

          {/* Direct Concierge Line */}
          <div className="contact-meta-cards">
            <div className="meta-info-card">
              <div className="meta-icon-box">📞</div>
              <div className="meta-text-wrap">
                <h5>Table Concierge</h5>
                <p><a href="tel:+919876543210" style={{ color: 'var(--c-deep-burgundy)', fontWeight: '700' }}>+91 98765 43210</a><br />For catering or private tastings</p>
              </div>
            </div>

            <div className="meta-info-card">
              <div className="meta-icon-box">💬</div>
              <div className="meta-text-wrap">
                <h5>WhatsApp Table Chat</h5>
                <p><a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-deep-burgundy)', fontWeight: '700' }}>Chat with Manager ↗</a><br />Instant service request</p>
              </div>
            </div>
          </div>

          {/* Table Guest Wi-Fi Access */}
          <div className="wifi-access-banner">
            <div>
              <div className="wifi-label">📶 Guest High-Speed Wi-Fi</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>Scan & browse freely while dining</div>
            </div>
            <div className="wifi-code-box">CremeCone_5G | scoop2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Feedback & Reviews Modal with Interactive 5-Star Scoop Rating
window.ReviewModal = function ReviewModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [tableNo, setTableNo] = useState('Table 04');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Super Creamy', 'Aesthetic Presentation']);
  const [reviewsList, setReviewsList] = useState(window.INITIAL_REVIEWS);
  const [submitted, setSubmitted] = useState(false);

  const availableTags = [
    'Super Creamy', 'Crispy Waffle', 'Perfect Sweetness', 
    'Aesthetic Presentation', 'Best Pistachio', 'Fast Service', 
    'Great Ambience', 'Value for Money'
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Please enter your name and a brief review.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      date: 'Just now',
      comment: comment.trim(),
      tags: selectedTags
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <span className="portal-badge">Customer Voice</span>
            <h3>Feedback & Reviews</h3>
            <p>Tell us how your scoops tasted! Your review shapes our artisanal menu.</p>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '38px 20px', background: 'var(--c-latte-card)', borderRadius: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍦✨</div>
              <h4 style={{ fontSize: '1.4rem', color: 'var(--c-deep-burgundy)', marginBottom: '8px' }}>Thank You for Your Sweet Words!</h4>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.94rem' }}>
                Your verified table review has been published. Enjoy a complimentary waffle cookie on your next visit!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Interactive Scoop Star Rating */}
              <div className="review-rating-interactive">
                <div className="rating-prompt-title">How would you rate your dessert experience?</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--c-text-muted)' }}>
                  {rating === 5 ? '⭐⭐⭐⭐⭐ Exquisite! Pure culinary bliss.' :
                   rating === 4 ? '⭐⭐⭐⭐ Very delicious & creamy.' :
                   rating === 3 ? '⭐⭐⭐ Satisfactory.' : 'Needs improvement'}
                </div>
                <div className="rating-scoops-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`scoop-star-btn ${rating >= star ? 'selected' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      <span className="scoop-icon-large">🍨</span>
                      <span className="star-number">{star} Scoop{star > 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* What stood out? Tags */}
              <div>
                <label className="form-label-text">What stood out the most?</label>
                <div className="satisfaction-tags-container">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`feedback-tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {selectedTags.includes(tag) ? '✓ ' : '+ '}{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Table Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group-field">
                  <label className="form-label-text">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahil Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input-control"
                  />
                </div>
                <div className="form-group-field">
                  <label className="form-label-text">Table / Order #</label>
                  <input
                    type="text"
                    placeholder="e.g. Table 04"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="form-input-control"
                  />
                </div>
              </div>

              {/* Detailed Review */}
              <div className="form-group-field">
                <label className="form-label-text">Your Review / Suggestions *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Share details of your favorite flavor, texture, waffle crunch, or ambience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea-control"
                />
              </div>

              <button type="submit" className="form-submit-btn" id="btn-submit-review">
                Submit Customer Review 🍨
              </button>
            </form>
          )}

          {/* Customer Reviews Feed */}
          <div className="reviews-feed-section">
            <div className="reviews-feed-header">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c-deep-burgundy)' }}>
                Recent Table Reviews ({reviewsList.length})
              </h4>
              <span style={{ fontSize: '0.84rem', color: 'var(--c-mocha-dark)', fontWeight: '700' }}>★ 4.9 / 5.0 Average</span>
            </div>

            {reviewsList.map((rev) => (
              <div key={rev.id} className="review-item-card">
                <div className="review-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--c-mocha-cream)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
                      {rev.name[0]}
                    </div>
                    <span className="reviewer-name">{rev.name}</span>
                  </div>
                  <div>
                    <span className="review-stars">{'★'.repeat(rev.rating)}</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--c-text-muted)', marginLeft: '8px' }}>{rev.date}</span>
                  </div>
                </div>
                <p className="review-comment">{rev.comment}</p>
                {rev.tags && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {rev.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.7rem', background: '#fff', border: '1px solid var(--c-latte-border)', padding: '2px 10px', borderRadius: '12px', color: 'var(--c-text-muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Tasting Tray (Order Cart Simulator)
window.TastingTrayModal = function TastingTrayModal({ isOpen, onClose, trayItems, onUpdateQty, onClear }) {
  const [tableNum, setTableNum] = useState('Table 04');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const subtotal = trayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handlePlaceOrder = () => {
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      onClear();
      onClose();
    }, 3500);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-title-wrap">
            <span className="portal-badge">Digital Table Order</span>
            <h3>Your Tasting Tray</h3>
            <p>Ready to indulge? Send your selection directly to the kitchen counter.</p>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {orderSent ? (
            <div style={{ textAlign: 'center', padding: '42px 20px', background: 'var(--c-latte-card)', borderRadius: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛎️🍧</div>
              <h4 style={{ fontSize: '1.4rem', color: 'var(--c-deep-burgundy)', marginBottom: '8px' }}>Order Sent to Server!</h4>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.94rem' }}>
                Your order for <strong>{tableNum}</strong> is being churned and prepared fresh with your artisanal toppings.
              </p>
            </div>
          ) : trayItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '42px 20px' }}>
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>🍨</div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--c-deep-burgundy)' }}>Your tray is empty</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', marginBottom: '20px' }}>
                Browse our artisanal scoops in the menu and tap "+ Add to Tray".
              </p>
              <button 
                onClick={onClose}
                className="add-tray-btn" 
                style={{ margin: '0 auto' }}
              >
                Explore Digital Menu
              </button>
            </div>
          ) : (
            <>
              <div className="tray-items-list">
                {trayItems.map((item) => (
                  <div key={item.id} className="tray-row-item">
                    <div>
                      <div className="tray-item-title">{item.name}</div>
                      <div className="tray-item-sub">{item.priceStr} each • Fresh Baked Waffle Cone Included</div>
                    </div>
                    <div className="tray-qty-counter">
                      <button className="qty-step-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                      <span style={{ fontWeight: '700', minWidth: '22px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-step-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                      <span style={{ fontWeight: '700', marginLeft: '14px', minWidth: '60px', textAlign: 'right', color: 'var(--c-deep-burgundy)' }}>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Number selection */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#fff', border: '1px solid var(--c-latte-border)', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--c-deep-burgundy)' }}>Serving to Table:</span>
                <input 
                  type="text" 
                  value={tableNum} 
                  onChange={(e) => setTableNum(e.target.value)} 
                  style={{ width: '120px', textAlign: 'right', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--c-latte-border)', fontWeight: '700', color: 'var(--c-deep-burgundy)' }}
                />
              </div>

              {/* Bill Summary */}
              <div className="tray-summary-box">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Café Service & GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="summary-row total">
                  <span>Estimated Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="form-submit-btn" 
                style={{ width: '100%', marginTop: '6px' }}
                id="btn-confirm-order"
              >
                Confirm & Send to Kitchen (₹{total}) 🛎️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
