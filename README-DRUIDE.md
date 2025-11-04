# 🧙‍♂️ Le Laboratoire du Druide

## Site e-commerce moderne pour produits chimiques de recherche

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 🎨 Design

- **Thème** : Sombre avec bleu néon cyan (#00d4ff) comme couleur principale
- **Style** : Cartoon/Illustration coloré avec des touches de rose (#ff6b9d), violet (#a855f7), vert (#00ff88)
- **Animations** : Bouteilles de potion flottantes, effets de lueur néon, transitions fluides
- **Responsive** : 100% adaptatif PC et Smartphone avec navigation mobile dédiée

---

## 📁 Structure du Projet

```
le-laboratoire-du-druide/
├── index.html                          # Page d'accueil
├── products.html                       # Liste des produits (Cannabinoids)
├── product-detail.html                 # Détails du produit 5F-ADB
├── cart.html                           # Panier d'achat
├── contact.html                        # Formulaire de contact
├── faq.html                            # Questions fréquentes
├── conditions-vente.html               # Conditions générales de vente
├── politique-confidentialite.html      # Politique RGPD
├── css/
│   └── styles.css                      # Tous les styles
├── js/
│   └── script.js                       # Toutes les fonctionnalités
└── README.md                           # Ce fichier
```

---

## 🛍️ Produit : 5F-ADB

### Informations techniques

- **Nom complet** : 5F-MDMB-PINACA
- **CAS** : 1801338-26-0
- **Formule** : C₂₀H₂₈FN₃O₃
- **Masse molaire** : 377.45 g/mol
- **Pureté** : >99.8%
- **Catégorie** : Cannabinoids

### Tableau de prix

| Quantité | Prix   | Badge             |
|----------|--------|-------------------|
| 1g       | 60€    |                   |
| 5g       | 300€   |                   |
| 10g      | 500€   | 🔥 **POPULAIRE**  |
| 25g      | 750€   |                   |
| 50g      | 1200€  |                   |
| 100g     | 2000€  | ⭐ **MEILLEUR PRIX** |

---

## ✨ Fonctionnalités

### 🛒 Système de Panier Complet
- ✅ Ajout de produits avec sélection de quantité
- ✅ Badge animé de compteur sur l'icône panier
- ✅ Stockage persistant dans localStorage
- ✅ Notifications toast animées
- ✅ Gestion complète des quantités
- ✅ Calcul automatique du total
- ✅ Possibilité de vider le panier

### 🧭 Navigation
- ✅ Menu responsive avec animation hamburger
- ✅ Liens vers toutes les pages
- ✅ Smooth scroll pour ancres
- ✅ Logo animé flottant
- ✅ Navigation mobile en bas d'écran (smartphone)
- ✅ Footer complet (PC uniquement)

### 🎭 Design & Animations
- ✅ 4 bouteilles de potion animées dans le hero
- ✅ Effets de hover avec glow néon sur les cartes
- ✅ Badges colorés dynamiques (pureté, popularité, meilleur prix)
- ✅ Gradients animés sur les titres
- ✅ Transitions fluides partout
- ✅ Scroll reveal pour les éléments

### 📄 Pages Complètes
- ✅ **Index** : Hero avec animations, features, aperçu produit
- ✅ **Products** : Liste avec catégorie Cannabinoids
- ✅ **Product Detail** : Spécifications complètes, tableau de prix, avertissements
- ✅ **Cart** : Gestion du panier avec résumé
- ✅ **Contact** : Formulaire + liens Telegram
- ✅ **FAQ** : Questions/réponses avec accordion
- ✅ **CGV** : Conditions de vente détaillées
- ✅ **RGPD** : Politique de confidentialité conforme

### ⚠️ Avertissements de Sécurité
- ✅ Instructions complètes en cas de contact (yeux, peau, inhalation)
- ✅ Conformité avec les indications de danger
- ✅ Mentions de danger (codes H) et conseils de prudence (codes P)
- ✅ Avertissements visibles sur toutes les pages produits

---

## 🎨 Palette de Couleurs

```css
--primary: #00d4ff      /* Cyan/Bleu néon */
--secondary: #ff6b9d    /* Rose */
--accent: #00ff88       /* Vert néon */
--purple: #a855f7       /* Violet */
--yellow: #ffd700       /* Or (badges) */
--bg-dark: #0a0e1a      /* Fond sombre */
--bg-card: #141824      /* Cartes */
```

---

## 💳 Paiements Acceptés

Le site accepte uniquement les cryptomonnaies :
- ₿ **Bitcoin (BTC)**
- ₮ **Tether (USDT)**
- Ł **Litecoin (LTC)**

---

## 📱 Navigation Mobile

Sur smartphone, un menu de navigation fixe en bas de l'écran permet :
- 🏠 **Accueil** : Retour à la page d'accueil
- ✈️ **Canal** : Redirection vers https://t.me/LeLaboratoireUE
- 💬 **Contact** : Redirection vers https://t.me/Druide
- 🛒 **Panier** : Accès au panier d'achat

Sur PC, ces liens sont dans le footer.

---

## 🚀 Démarrage Rapide

1. **Ouvrir le site** : Double-cliquez sur `index.html`
2. **Aucune installation requise** : Tout fonctionne directement dans le navigateur
3. **Compatible** : Chrome, Firefox, Safari, Edge (dernières versions)

---

## 🔧 Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `css/styles.css` (lignes 5-15) :

```css
:root {
    --primary: #00d4ff;        /* Votre couleur primaire */
    --secondary: #ff6b9d;      /* Votre couleur secondaire */
    /* ... */
}
```

### Ajouter des produits

Éditez le fichier `js/script.js` et ajoutez des produits dans le tableau `PRODUCT_DATA` :

```javascript
const PRODUCT_DATA = {
    id: 'votre-produit',
    name: 'Nom du Produit',
    // ... autres propriétés
};
```

### Modifier les liens Telegram

Recherchez et remplacez dans tous les fichiers HTML :
- `https://t.me/LeLaboratoireUE` → Votre canal
- `https://t.me/Druide` → Votre contact

---

## 📋 Fonctionnement du Panier

1. L'utilisateur sélectionne une quantité sur la page produit
2. Clic sur "Ajouter au panier"
3. Notification de confirmation
4. Redirection automatique vers le panier
5. Possibilité de modifier ou supprimer les articles
6. Clic sur "Passer la commande"
7. Redirection vers la page de contact pour finaliser

---

## 🔒 Sécurité & Conformité

### RGPD
- ✅ Politique de confidentialité complète
- ✅ Utilisation du localStorage uniquement (pas de cookies tiers)
- ✅ Pas de tracking
- ✅ Droits des utilisateurs clairement expliqués

### Avertissements
- ⚠️ Mentions claires : "Recherche uniquement"
- ⚠️ "Non destiné à la consommation"
- ⚠️ Instructions de sécurité détaillées
- ⚠️ Conformité avec les codes H et P

### Mentions légales
- 📋 CGV complètes
- 📋 Politique de confidentialité
- 📋 Informations sur les délais de livraison
- 📋 Conditions de retour

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 640px (1 colonne, menu mobile)
- **Tablette** : 640px - 968px (grid adaptative)
- **Desktop** : > 968px (2-3 colonnes, footer)

### Adaptations
- Menu hamburger sur mobile
- Navigation bottom bar sur mobile
- Footer masqué sur mobile
- Tailles de police adaptées
- Grids responsive

---

## 🌐 Déploiement

### Option 1 : GitHub Pages (Gratuit)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-compte/votre-repo.git
git push -u origin main
```
Puis activez GitHub Pages dans Settings → Pages

### Option 2 : Netlify (Gratuit)
1. Créez un compte sur netlify.com
2. Glissez-déposez le dossier complet
3. Site en ligne instantanément

### Option 3 : Vercel (Gratuit)
1. Créez un compte sur vercel.com
2. Connectez votre repo GitHub
3. Déploiement automatique

---

## 📊 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Variables, Grid, Flexbox, Animations
- **JavaScript Vanilla** : Pas de framework, performant
- **LocalStorage API** : Persistance du panier
- **SVG** : Icônes vectorielles

---

## ✅ Checklist des Pages

- [x] index.html - Page d'accueil
- [x] products.html - Liste des produits
- [x] product-detail.html - Détails du produit 5F-ADB
- [x] cart.html - Panier d'achat
- [x] contact.html - Formulaire de contact
- [x] faq.html - Questions fréquentes
- [x] conditions-vente.html - CGV
- [x] politique-confidentialite.html - RGPD

---

## 🎯 Améliorations Futures

- [ ] Backend pour traiter les commandes réelles
- [ ] Système de paiement crypto intégré
- [ ] Compte utilisateur et historique
- [ ] Plus de produits dans différentes catégories
- [ ] Multi-langue (EN, DE, ES)
- [ ] Système de recherche/filtres
- [ ] Notifications push
- [ ] Programme de fidélité

---

## 📝 Notes Importantes

### ⚠️ Avant Mise en Production

1. **Remplacez les liens Telegram** par vos vrais liens
2. **Ajoutez vos adresses crypto** pour les paiements
3. **Configurez un vrai système d'email** pour les formulaires
4. **Ajoutez Google Analytics** si souhaité
5. **Testez sur tous les navigateurs**
6. **Vérifiez la conformité légale** dans votre juridiction

### 📚 Documentation

- Les fonctions JavaScript sont commentées
- Les classes CSS sont organisées par section
- Les IDs et classes ont des noms explicites

---

## 🆘 Support & Contact

Pour toute question :
- Consultez la FAQ intégrée au site
- Vérifiez la console du navigateur (F12) pour les erreurs
- Assurez-vous que JavaScript est activé

---

## 📄 Licence

Ce projet est fourni "tel quel" sans garantie. Vous êtes libre de l'utiliser et de le modifier pour vos besoins.

---

## 🙏 Crédits

**Développé avec ❤️ pour Le Laboratoire du Druide**

- Design inspiré des meilleurs sites e-commerce modernes
- Thème sombre avec néons pour une ambiance laboratoire
- Animations fluides style cartoon/jeu vidéo
- 100% responsive et accessible

---

**© 2025 Le Laboratoire du Druide - Tous droits réservés**

*Produits destinés exclusivement à la recherche scientifique*