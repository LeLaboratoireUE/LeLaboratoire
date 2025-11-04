// ==========================================
// CONFIGURATION & DONNÉES
// ==========================================

const PRODUCT_DATA = {
    id: '5f-adb',
    name: '5F-ADB',
    fullName: '5F-MDMB-PINACA',
    category: 'Cannabinoids',
    cas: '1801338-26-0',
    formula: 'C₂₀H₂₈FN₃O₃',
    molarMass: '377.45 g/mol',
    purity: '>93.8%',
    description: 'Cannabinoïde synthétique de haute pureté pour la recherche scientifique uniquement. Produit conforme aux normes de laboratoire.',
    longDescription: 'Le 5F-ADB (5F-MDMB-PINACA) est un cannabinoïde synthétique développé pour la recherche en laboratoire. Destiné exclusivement à un usage en recherche scientifique dans des installations agréées.',
    icon: '🧪',
    prices: [
        { quantity: '1g', price: 60, badge: null },
        { quantity: '5g', price: 300, badge: null },
        { quantity: '10g', price: 500, badge: 'popular' },
        { quantity: '25g', price: 750, badge: null },
        { quantity: '50g', price: 1200, badge: null },
        { quantity: '100g', price: 2000, badge: 'best' }
    ],
    warnings: {
        eyes: 'En cas de contact avec les yeux : Rincer immédiatement à l\'eau pendant au moins 15 minutes. Consulter un ophtalmologue.',
        skin: 'En cas de contact avec la peau : Laver immédiatement et abondamment à l\'eau et au savon. Enlever les vêtements contaminés.',
        inhalation: 'En cas d\'inhalation : Transporter la personne à l\'air frais. En cas de difficulté respiratoire, administrer de l\'oxygène et consulter un médecin.',
        general: 'Manipuler uniquement dans un laboratoire équipé d\'une ventilation appropriée. Porter un équipement de protection individuelle (gants, lunettes, blouse). Tenir hors de portée des enfants et des animaux.'
    }
};

// État de l'application
let cart = [];

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadCart();
    updateCartCount();
    setupEventListeners();
    setupAnimations();
    
    // Initialiser les éléments de la page actuelle
    const currentPage = getCurrentPage();
    
    if (currentPage === 'products') {
        renderProductsList();
    } else if (currentPage === 'product-detail') {
        renderProductDetail();
    } else if (currentPage === 'cart') {
        renderCart();
    }
    
    console.log('🧙‍♂️ Le Laboratoire du Druide - Initialisé');
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('product-detail.html')) return 'product-detail';
    if (path.includes('cart.html')) return 'cart';
    if (path.includes('contact.html')) return 'contact';
    return 'home';
}

// ==========================================
// GESTION DU PANIER
// ==========================================

function addToCart(quantity, price) {
    const item = {
        id: PRODUCT_DATA.id,
        name: PRODUCT_DATA.name,
        quantity: quantity,
        price: price,
        icon: PRODUCT_DATA.icon,
        unitPrice: price
    };
    
    // Toujours ajouter l'item, même s'il existe déjà
    cart.push(item);
    
    saveCart();
    updateCartCount();
    showNotification(`✅ ${item.quantity} de ${item.name} ajouté au panier !`);
    
    // NE PAS rediriger automatiquement
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification(`${item.quantity} de ${item.name} retiré du panier`);
}

function removeAllOfQuantity(quantity) {
    // Compter combien on retire
    const countToRemove = cart.filter(item => item.quantity === quantity).length;
    
    // Retirer tous les items avec cette quantité
    cart = cart.filter(item => item.quantity !== quantity);
    saveCart();
    updateCartCount();
    renderCart();
    showNotification(`Tous les ${quantity} retirés du panier (×${countToRemove})`);
}

function updateCartItemQuantity(index, change) {
    // Cette fonction n'est pas utilisée car nous gérons les quantités via les options de prix
    // Mais gardée pour compatibilité future
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    showNotification('Panier vidé');
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function saveCart() {
    localStorage.setItem('druideCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('druideCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function updateCartCount() {
    // Compter la quantité totale d'items (somme de toutes les quantités)
    const count = cart.length; // Nombre de lignes différentes dans le panier
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// ==========================================
// RENDU DES PAGES
// ==========================================

function renderProductsList() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const productCard = `
        <div class="product-card" onclick="window.location.href='product-detail.html'">
            <div class="product-image">
                <div class="product-icon">${PRODUCT_DATA.icon}</div>
                <div class="product-badges">
                    <span class="badge badge-purity">Pureté ${PRODUCT_DATA.purity}</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${PRODUCT_DATA.category}</div>
                <h3 class="product-name">${PRODUCT_DATA.name}</h3>
                <p class="product-description">${PRODUCT_DATA.description}</p>
                <div class="product-specs">
                    <span class="spec-tag">CAS: ${PRODUCT_DATA.cas}</span>
                    <span class="spec-tag">${PRODUCT_DATA.formula}</span>
                </div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">À partir de ${PRODUCT_DATA.prices[0].price}€</div>
                    </div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); window.location.href='product-detail.html'">
                        Voir les prix
                    </button>
                </div>
            </div>
        </div>
    `;
    
    grid.innerHTML = productCard;
}

function renderProductDetail() {
    // Rendu du tableau de prix
    const priceTableBody = document.getElementById('priceTableBody');
    if (priceTableBody) {
        priceTableBody.innerHTML = PRODUCT_DATA.prices.map((option, index) => `
            <tr>
                <td>${option.quantity}</td>
                <td>${option.price}€</td>
                <td>
                    ${option.badge === 'popular' ? '<span class="badge badge-popular">🔥 POPULAIRE</span>' : ''}
                    ${option.badge === 'best' ? '<span class="badge badge-best">⭐ MEILLEUR PRIX</span>' : ''}
                </td>
                <td>
                    <button class="btn btn-primary" onclick="addToCart('${option.quantity}', ${option.price})">
                        Ajouter au panier
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    // Mettre à jour les informations du produit
    updateElementText('productName', PRODUCT_DATA.name);
    updateElementText('productFullName', PRODUCT_DATA.fullName);
    updateElementText('productCategory', PRODUCT_DATA.category);
    updateElementText('productDescription', PRODUCT_DATA.longDescription);
    updateElementText('productCAS', PRODUCT_DATA.cas);
    updateElementText('productFormula', PRODUCT_DATA.formula);
    updateElementText('productMolarMass', PRODUCT_DATA.molarMass);
    updateElementText('productPurity', PRODUCT_DATA.purity);
    
    // Avertissements
    updateElementText('warningEyes', PRODUCT_DATA.warnings.eyes);
    updateElementText('warningSkin', PRODUCT_DATA.warnings.skin);
    updateElementText('warningInhalation', PRODUCT_DATA.warnings.inhalation);
    updateElementText('warningGeneral', PRODUCT_DATA.warnings.general);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartContainer = document.getElementById('cartContainer');
    const emptyCartMessage = document.getElementById('emptyCart');
    const totalQuantityEl = document.getElementById('totalQuantity');
    const quantitiesListEl = document.getElementById('quantitiesList');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        if (cartContainer) {
            cartContainer.style.display = 'none';
        }
        return;
    }
    
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    if (cartContainer) {
        cartContainer.style.display = 'grid';
    }
    
    // Regrouper les items par quantité et compter
    const groupedItems = {};
    cart.forEach((item, index) => {
        const key = item.quantity; // Regrouper par quantité (1g, 5g, 10g, etc.)
        if (!groupedItems[key]) {
            groupedItems[key] = {
                item: item,
                count: 0,
                indices: []
            };
        }
        groupedItems[key].count++;
        groupedItems[key].indices.push(index);
    });
    
    // Calculer total des quantités (en grammes)
    let totalGrams = 0;
    Object.keys(groupedItems).forEach(key => {
        const grams = parseInt(key.replace('g', ''));
        if (!isNaN(grams)) {
            totalGrams += grams * groupedItems[key].count;
        }
    });
    
    if (totalQuantityEl) {
        totalQuantityEl.textContent = `${totalGrams}g`;
    }
    
    if (quantitiesListEl) {
        if (totalGrams > 0) {
            quantitiesListEl.textContent = `${totalGrams}g`;
            quantitiesListEl.style.fontSize = '1.5rem';
        } else {
            quantitiesListEl.textContent = 'Aucune quantité';
        }
    }
    
    // Rendu des items groupés
    cartItemsContainer.innerHTML = Object.keys(groupedItems).map(key => {
        const group = groupedItems[key];
        const item = group.item;
        const count = group.count;
        const totalPrice = item.price * count;
        
        return `
        <div class="cart-item">
            <div class="cart-item-image">
                <div style="font-size: 3rem;">${item.icon}</div>
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div style="display: flex; align-items: center; gap: 1rem; margin: 0.75rem 0; flex-wrap: wrap;">
                    <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 0.75rem 1.5rem; border-radius: var(--radius-full); color: white; font-weight: 700; font-size: 1.5rem;">
                        ${item.quantity}
                    </div>
                    ${count > 1 ? `
                    <div style="background: rgba(0, 255, 136, 0.2); padding: 0.5rem 1rem; border-radius: var(--radius-md); border: 2px solid var(--accent); color: var(--accent); font-weight: 700;">
                        ×${count} = ${parseInt(item.quantity.replace('g', '')) * count}g
                    </div>
                    ` : ''}
                </div>
                <div class="cart-item-price">${totalPrice}€ ${count > 1 ? `<span style="font-size: 0.875rem; color: var(--text-secondary);">(${item.price}€ × ${count})</span>` : ''}</div>
            </div>
            <div>
                <button class="remove-btn" onclick="removeFromCart(${group.indices[group.indices.length - 1]})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Retirer ${count > 1 ? '1' : ''}
                </button>
                ${count > 1 ? `
                <button class="remove-btn" onclick="removeAllOfQuantity('${item.quantity}')" style="margin-top: 0.5rem; background: rgba(255, 107, 157, 0.2); border-color: var(--secondary);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Tout retirer (${count})
                </button>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
    
    // Mise à jour du résumé
    const total = getCartTotal();
    const totalElements = document.querySelectorAll('#cartTotal, #cartTotal2');
    totalElements.forEach(el => {
        if (el) {
            el.textContent = `${total}€`;
        }
    });
}

// ==========================================
// ÉVÉNEMENTS
// ==========================================

function setupEventListeners() {
    // Menu mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animation du burger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu au clic sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Bouton checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Bouton vider le panier
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
                clearCart();
            }
        });
    }
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Simulation d'envoi
    showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt.');
    
    // Reset du formulaire
    e.target.reset();
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !');
        return;
    }
    
    // Créer une modal d'explication pour le paiement crypto
    document.body.classList.add('modal-open');
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="document.body.classList.remove('modal-open'); this.parentElement.remove()"></div>
        <div class="modal-content payment-modal-content">
            <button class="modal-close" onclick="document.body.classList.remove('modal-open'); this.closest('.modal').remove()">&times;</button>
            <div class="modal-header">
                <h2>💳 Paiement Cryptomonnaie</h2>
            </div>
            <div style="padding: 2rem;">
                <div style="background: rgba(0, 212, 255, 0.1); padding: 1.5rem; border-radius: var(--radius-md); border: 2px solid var(--primary); margin-bottom: 2rem;">
                    <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.5rem;">
                        Total à payer : ${getCartTotal()}€
                    </h3>
                    <p style="color: var(--text-secondary);">
                        Quantités : ${cart.map(item => item.quantity).join(', ')}
                    </p>
                </div>

                <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3 style="color: var(--secondary); margin-bottom: 1.5rem; font-size: 1.25rem;">
                        🔐 Paiement Sécurisé via NOWPayments
                    </h3>
                    <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
                        Nous utilisons <strong style="color: var(--primary);">NOWPayments</strong>, 
                        une plateforme de paiement crypto sécurisée qui accepte plus de 150 cryptomonnaies.
                    </p>
                    
                    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: rgba(0, 255, 136, 0.1); border-radius: var(--radius-sm);">
                            <span style="font-size: 1.5rem;">✅</span>
                            <div>
                                <strong style="color: var(--accent);">Cryptos acceptées :</strong>
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">
                                    BTC, ETH, USDT, LTC, XMR, + 145 autres
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: rgba(0, 212, 255, 0.1); border-radius: var(--radius-sm);">
                            <span style="font-size: 1.5rem;">🔒</span>
                            <div>
                                <strong style="color: var(--primary);">Transaction sécurisée</strong>
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">
                                    Confirmation automatique
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onclick="window.open('https://nowpayments.io', '_blank'); document.body.classList.remove('modal-open'); this.closest('.modal').remove();" 
                            class="btn btn-primary" 
                            style="width: 100%; justify-content: center; font-size: 1.125rem; padding: 1.25rem;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                            <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        Procéder au paiement
                    </button>
                </div>

                <div style="background: rgba(255, 107, 157, 0.1); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid var(--secondary);">
                    <h4 style="color: var(--secondary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>⚙️</span>
                        Configuration pour votre site
                    </h4>
                    <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem;">
                        <p style="margin-bottom: 1rem;">
                            <strong>Pour intégrer NOWPayments :</strong>
                        </p>
                        <ol style="margin-left: 1.5rem;">
                            <li style="margin-bottom: 0.75rem;">
                                Créez un compte sur <a href="https://nowpayments.io" target="_blank" style="color: var(--primary); font-weight: 600;">nowpayments.io</a>
                            </li>
                            <li style="margin-bottom: 0.75rem;">
                                Obtenez votre <strong>API Key</strong> dans le dashboard
                            </li>
                            <li style="margin-bottom: 0.75rem;">
                                Utilisez leur <strong>API de paiement</strong> ou widget
                            </li>
                            <li style="margin-bottom: 0.75rem;">
                                Configurez les <strong>webhooks</strong> pour confirmer les paiements
                            </li>
                        </ol>
                        <p style="margin-top: 1rem; padding: 1rem; background: rgba(0, 0, 0, 0.3); border-radius: var(--radius-sm); font-family: 'Courier New', monospace; font-size: 0.875rem;">
                            npm install @nowpayments/nowpayments-api-js
                        </p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        📧 Après le paiement, un email de confirmation vous sera envoyé<br>
                        avec le numéro de suivi de votre commande.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ==========================================
// ANIMATIONS
// ==========================================

function setupAnimations() {
    // Animation de scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe .fade-in
    document.querySelectorAll('.feature-card, .product-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animation des potions flottantes
    createFloatingPotions();
}

function createFloatingPotions() {
    const container = document.querySelector('.potions-container');
    if (!container) return;
    
    const potions = ['🧪', '⚗️', '🔮', '💊'];
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--purple)'];
    
    potions.forEach((potion, index) => {
        const div = document.createElement('div');
        div.className = 'potion';
        div.textContent = potion;
        div.style.color = colors[index];
        container.appendChild(div);
    });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message) {
    // Supprimer les notifications existantes
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease';
    }, 10);
    
    // Retrait après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter l'animation de sortie
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// UTILITAIRES
// ==========================================

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function formatPrice(price) {
    return `${price}€`;
}

// Détecter si c'est mobile
function isMobile() {
    return window.innerWidth <= 968;
}

// Mise à jour de l'état de la navigation mobile
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 968 && navMenu) {
        navMenu.classList.remove('active');
    }
});

// ==========================================
// FAQ ACCORDION
// ==========================================

function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Fermer toutes les autres réponses
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // Toggle la réponse actuelle
            answer.style.display = isOpen ? 'none' : 'block';
            
            // Animation de rotation de l'icône
            const icon = question.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });
}

// Initialiser FAQ si sur la page FAQ
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.faq-section')) {
        setupFAQ();
    }
});


console.log('🧙‍♂️ Le Laboratoire du Druide - Prêt !');
console.log('📦 Panier:', cart.length, 'articles');