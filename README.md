# Le Laboratoire - Site E-Commerce

## 🧪 Aperçu

Site e-commerce moderne et professionnel pour la vente de produits chimiques et scientifiques, avec paiement en cryptomonnaie.

## 📁 Structure des Fichiers

```
le-laboratoire/
├── index.html          # Page principale
├── css/
│   └── styles.css      # Tous les styles CSS
├── js/
│   └── app.js          # Toutes les fonctionnalités JavaScript
└── README.md           # Ce fichier
```

## 🚀 Démarrage Rapide

1. **Ouvrir le site**: Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur
2. **Aucune installation requise**: Le site fonctionne directement dans le navigateur

## ✨ Fonctionnalités

### Interface Utilisateur
- ✅ Design moderne et élégant inspiré de sites professionnels
- ✅ Thème laboratoire/chimie avec animations fluides
- ✅ Navigation responsive (mobile, tablette, desktop)
- ✅ Animations de molécules et effets visuels
- ✅ Modal pour détails produits
- ✅ Système de panier fonctionnel

### E-Commerce
- ✅ Affichage des produits avec détails
- ✅ Ajout/suppression du panier
- ✅ Calcul automatique du total
- ✅ Sauvegarde du panier (localStorage)
- ✅ Gestion des quantités

### Paiement Crypto
- ✅ Support de 4 cryptomonnaies (ETH, BTC, USDT, BNB)
- ✅ Affichage des adresses de paiement
- ✅ Instructions détaillées
- ✅ 100% gratuit (pas de services tiers)

### Autres
- ✅ Formulaire de contact
- ✅ Section "À propos"
- ✅ Animations SVG (fiole de laboratoire)
- ✅ Notifications toast
- ✅ Section de features/caractéristiques

## 🎨 Personnalisation

### Modifier les Couleurs

Éditez les variables CSS dans `css/styles.css` (lignes 6-16):

```css
:root {
    --primary: #0066ff;        /* Couleur principale */
    --secondary: #00d4aa;      /* Couleur secondaire */
    --accent: #ff3366;         /* Couleur d'accent */
    /* ... */
}
```

### Ajouter des Produits

Dans `js/app.js`, modifiez le tableau `products` (ligne 6):

```javascript
const products = [
    {
        id: 1,
        name: "Nom du produit",
        category: "Catégorie",
        description: "Description courte",
        price: 0.005,
        currency: "ETH",
        icon: "🧪",
        badge: "Nouveau",
        specs: {
            purity: "99.9%",
            volume: "100ml",
            // ... autres specs
        },
        longDescription: "Description détaillée..."
    },
    // Ajoutez d'autres produits ici
];
```

### Modifier les Adresses Crypto

Dans `js/app.js`, modifiez l'objet `cryptoAddresses` (ligne 30):

```javascript
const cryptoAddresses = {
    ETH: {
        name: "Ethereum",
        address: "VOTRE_ADRESSE_ETH",
        icon: "Ξ"
    },
    // ... autres cryptos
};
```

### Personnaliser les Textes

#### Header
Éditez `index.html` ligne 16-22 pour modifier le logo et le nom

#### Hero Section
Éditez `index.html` lignes 40-75 pour modifier:
- Le titre principal
- La description
- Les badges
- Les statistiques

#### Section À propos
Éditez `index.html` lignes 130-175

#### Contact
Modifiez l'email et les coordonnées lignes 180-210

## 🔧 Configuration Avancée

### Ajouter Google Analytics

Ajoutez avant `</head>` dans `index.html`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Backend pour Emails

Pour un vrai système d'emails, remplacez la fonction `handleContactForm` dans `js/app.js` par un appel API vers votre backend:

```javascript
function handleContactForm(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    fetch('https://votre-api.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Message envoyé!', 'success');
    });
}
```

## 📱 Responsive

Le site est entièrement responsive et s'adapte automatiquement à:
- 📱 Mobile (< 640px)
- 📱 Tablette (640px - 968px)
- 💻 Desktop (> 968px)

## 🌐 Déploiement

### GitHub Pages (Gratuit)
1. Créez un dépôt GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings
4. Votre site sera accessible à `username.github.io/repo-name`

### Netlify (Gratuit)
1. Créez un compte sur netlify.com
2. Glissez-déposez le dossier entier
3. Votre site est en ligne instantanément

### Vercel (Gratuit)
1. Créez un compte sur vercel.com
2. Connectez votre repo GitHub ou uploadez
3. Déploiement automatique

## ⚠️ Important - Sécurité

### Adresses Crypto
- ⚠️ Remplacez OBLIGATOIREMENT les adresses crypto d'exemple par vos vraies adresses
- ⚠️ Vérifiez plusieurs fois vos adresses avant de mettre en ligne
- ⚠️ Les transactions blockchain sont IRRÉVERSIBLES

### Email de Contact
- Changez `commande@lelaboratoire.com` par votre vraie adresse email
- Considérez un service comme EmailJS ou Formspree pour gérer les soumissions

### HTTPS
- Utilisez toujours HTTPS en production (gratuit avec Netlify/Vercel/GitHub Pages)
- Important pour la confiance des clients

## 🎯 Bonnes Pratiques

1. **Images**: Ajoutez de vraies images de produits dans un dossier `/images/`
2. **SEO**: Ajoutez des meta tags pour le référencement
3. **Performance**: Optimisez les images et les animations
4. **Légal**: Ajoutez CGV, politique de confidentialité, mentions légales
5. **Analytics**: Suivez les conversions et le comportement utilisateur

## 📝 TODO / Améliorations Possibles

- [ ] Système de commande avec backend
- [ ] Vérification automatique des paiements crypto
- [ ] Compte utilisateur et historique
- [ ] Système de recherche/filtres produits
- [ ] Multi-langue
- [ ] Blog/actualités
- [ ] Programme de fidélité
- [ ] Comparateur de produits

## 🆘 Support

Pour toute question ou problème:
- Vérifiez la console du navigateur (F12) pour les erreurs
- Assurez-vous que JavaScript est activé
- Testez sur différents navigateurs

## 📄 Licence

Ce projet est sous licence libre. Vous pouvez l'utiliser et le modifier comme vous le souhaitez.

---

**Fait avec ❤️ pour Le Laboratoire**
