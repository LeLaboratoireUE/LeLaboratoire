# 🛒 Guide du Panier - Affichage des Quantités

## 📊 Comment Fonctionne le Panier

### Système de Quantités

Le panier affiche les quantités de **3 manières différentes** :

#### 1️⃣ Badge du Panier (en haut de page)
```
🛒 [2]
```
- Affiche le **nombre de LIGNES** dans le panier
- Exemple : Si vous avez ajouté "10g" et "25g", le badge affiche **2**

#### 2️⃣ En-tête du Panier
```
Votre Commande
2 article(s) dans votre panier
```
- Affiche le **nombre de LIGNES** dans le panier
- Texte clair pour l'utilisateur

#### 3️⃣ Dans Chaque Ligne du Panier
```
5F-ADB
📦 10g  ← Quantité sélectionnée
500€
```
- Affiche la **QUANTITÉ EXACTE** sélectionnée (1g, 5g, 10g, 25g, 50g, 100g)
- Badge coloré avec gradient cyan-rose
- Très visible avec l'emoji 📦

#### 4️⃣ Résumé du Panier (colonne droite)
```
📦 Articles dans le panier
2 article(s)
```
- Résumé du nombre total d'articles
- Badge avec fond cyan

---

## 🎯 Exemple Concret

### Scénario : Commande de 2 quantités différentes

**Action de l'utilisateur :**
1. Va sur `product-detail.html`
2. Clique sur "Ajouter au panier" pour **10g (500€)**
3. Retourne sur `product-detail.html`
4. Clique sur "Ajouter au panier" pour **25g (750€)**

**Résultat dans le panier :**

```
┌─────────────────────────────────────────────────────────────┐
│ 🛒 [2]  ← Badge en haut (2 lignes dans le panier)         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Votre Commande                                              │
│ 2 article(s) dans votre panier  ← En-tête                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🧪 5F-ADB                                                   │
│ 📦 10g  ← Quantité visible                                 │
│ 500€                                                        │
│ [Retirer]                                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🧪 5F-ADB                                                   │
│ 📦 25g  ← Quantité visible                                 │
│ 750€                                                        │
│ [Retirer]                                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Résumé de la commande                                       │
│                                                             │
│ 📦 Articles dans le panier                                  │
│ 2 article(s)  ← Résumé                                     │
│                                                             │
│ Sous-total ........................... 1250€                │
│ Livraison ........................... GRATUITE              │
│ Total ................................ 1250€                │
│                                                             │
│ [Passer la commande]                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Améliorations Visuelles

### Badge de Quantité
- **Design** : Gradient cyan-rose avec bordure arrondie
- **Emoji** : 📦 pour identifier rapidement
- **Taille** : Grande et bien visible (1.125rem)
- **Position** : Entre le nom du produit et le prix

### Code de la Quantité
```html
<div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); 
            padding: 0.5rem 1rem; 
            border-radius: var(--radius-full); 
            color: white; 
            font-weight: 700; 
            font-size: 1.125rem;">
    📦 10g
</div>
```

---

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. ✅ Ouvrir `cart.html` avec un panier vide
   - Voir "Votre panier est vide"

2. ✅ Aller sur `product-detail.html`
   - Cliquer sur "Ajouter au panier" pour 10g

3. ✅ Vérifier dans `cart.html` :
   - Badge en haut : `🛒 [1]`
   - En-tête : "1 article(s) dans votre panier"
   - Dans la ligne : `📦 10g` bien visible
   - Résumé : "1 article(s)"
   - Prix : 500€

4. ✅ Ajouter une autre quantité (25g)

5. ✅ Vérifier dans `cart.html` :
   - Badge en haut : `🛒 [2]`
   - En-tête : "2 article(s) dans votre panier"
   - 2 lignes distinctes avec `📦 10g` et `📦 25g`
   - Résumé : "2 article(s)"
   - Total : 1250€

---

## 🔍 Où Chercher l'Information

| Information | Où la trouver |
|-------------|---------------|
| **Nombre total d'articles** | Badge 🛒 en haut à droite |
| **Nombre total d'articles** | En-tête du panier "X article(s)" |
| **Nombre total d'articles** | Résumé "📦 Articles dans le panier" |
| **Quantité de chaque article** | Badge 📦 dans chaque ligne |
| **Prix de chaque article** | En dessous du badge de quantité |
| **Prix total** | En bas du résumé |

---

## 🎯 Comprendre la Logique

### Pourquoi 2 articles = 2 lignes ?

Dans ce système :
- Chaque **sélection de quantité** = 1 ligne dans le panier
- Exemple : "10g" = 1 article, "25g" = 1 article

### Si vous ajoutez 2 fois la même quantité ?

Le système **ne cumule PAS** pour l'instant.
- Si vous ajoutez "10g" deux fois
- Vous aurez 2 lignes avec "10g" à 500€ chacune
- Total = 1000€

### Logique du Badge

Le badge affiche le **nombre de lignes**, pas la somme des grammes.
- ✅ Simple à comprendre
- ✅ Correspond au nombre de lignes visibles
- ✅ Standard pour les sites e-commerce

---

## 🎨 Visuels Clairs

Chaque quantité est maintenant affichée avec :
- ✨ Un **badge coloré** (gradient cyan-rose)
- ✨ Un **emoji** 📦 pour attirer l'œil
- ✨ Une **grande taille** (1.125rem)
- ✨ Un **label explicatif** "Quantité sélectionnée"

**Résultat : Impossible de rater l'information !**

---

## 💡 Pour Aller Plus Loin

Si vous voulez modifier le comportement :

### Option 1 : Cumuler les Quantités
Modifier `js/script.js` ligne ~25 pour additionner au lieu de créer une nouvelle ligne.

### Option 2 : Afficher la Somme en Grammes
Ajouter un calcul pour afficher "Total : 35g" par exemple.

### Option 3 : Système de Quantité Multiple
Ajouter des boutons +/- pour changer la quantité après ajout.

---

## ✅ Conclusion

Le système actuel affiche **clairement** :
- ✅ Le nombre d'articles (lignes) dans le panier : **Badge + En-tête + Résumé**
- ✅ La quantité exacte de chaque article : **Badge 📦 avec gradient**
- ✅ Le prix de chaque article : **En gros sous le badge**
- ✅ Le total : **En bas du résumé**

**Tout est visible et clair pour l'utilisateur !** 🎉