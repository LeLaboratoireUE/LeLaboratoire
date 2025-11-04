# 🧪 Tests Rapides - Le Laboratoire du Druide

## ✅ Checklist de Test

### 1. Page d'accueil (index.html)
- [ ] Le site se charge sans erreur
- [ ] Les 4 potions flottent et sont animées
- [ ] Le curseur personnalisé s'affiche et suit la souris
- [ ] Une traînée de particules suit le curseur
- [ ] Des particules flottent en arrière-plan
- [ ] Les particules fuient le curseur quand on s'approche
- [ ] Cliquer crée une onde de propagation
- [ ] Le fond change de couleur progressivement
- [ ] Les cartes features s'inclinent en 3D au survol

### 2. Page Produits (products.html)
- [ ] Le produit 5F-ADB s'affiche
- [ ] Badge "Pureté >99.8%" visible
- [ ] Hover sur la carte → effet 3D + vague
- [ ] Cliquer redirige vers product-detail.html

### 3. Détails Produit (product-detail.html)
- [ ] Tableau de prix avec 6 lignes visible
- [ ] Badge "🔥 POPULAIRE" sur 10g
- [ ] Badge "⭐ MEILLEUR PRIX" sur 100g
- [ ] Toutes les spécifications affichées
- [ ] Avertissements de sécurité visibles
- [ ] Hover sur prix → zoom + glow
- [ ] Cliquer "Ajouter au panier" → notification + redirect

### 4. Panier (cart.html)
- [ ] Si vide : message "Votre panier est vide" affiché
- [ ] Si articles : liste des produits visible
- [ ] Compteur "Articles (X)" correct
- [ ] Prix de chaque article affiché
- [ ] Total calculé correctement
- [ ] Bouton "Retirer" fonctionne
- [ ] Bouton "Vider le panier" fonctionne
- [ ] Bouton "Passer la commande" redirige

### 5. Animations Interactives
- [ ] Curseur cyan avec bordure néon
- [ ] Traînée de 8 particules derrière le curseur
- [ ] Curseur grossit sur les boutons/liens
- [ ] Curseur rétrécit au clic
- [ ] Ripple au clic n'importe où
- [ ] 50 particules colorées flottent
- [ ] Lignes connectent les particules proches
- [ ] Mouvement rapide crée des particules
- [ ] Hover potion → zoom + rotation
- [ ] Clic potion → explosion de particules
- [ ] Hover fiole → bulles remontent
- [ ] Hover carte → inclinaison 3D
- [ ] Hover bouton → effet ripple
- [ ] Badges pulsent

### 6. Responsive
- [ ] Sur mobile : menu hamburger visible
- [ ] Sur mobile : navigation bottom bar visible
- [ ] Sur mobile : footer caché
- [ ] Sur PC : footer visible
- [ ] Sur PC : navigation top bar complète
- [ ] Grids adaptées à toutes les tailles

### 7. Navigation
- [ ] Logo cliquable → retour accueil
- [ ] Tous les liens du menu fonctionnent
- [ ] Badge panier affiche le bon nombre
- [ ] Badge panier cliquable → cart.html
- [ ] Liens Telegram fonctionnent
- [ ] Smooth scroll sur ancres

### 8. Contact & Pages Légales
- [ ] Formulaire contact visible
- [ ] Liens Telegram vers les bons comptes
- [ ] FAQ avec questions dépliables
- [ ] CGV complètes affichées
- [ ] Politique RGPD complète affichée

## 🐛 Problèmes Connus

Aucun problème connu actuellement.

## 📊 Performance

Pour tester la performance :
1. Ouvrir DevTools (F12)
2. Onglet Performance
3. Enregistrer pendant 10 secondes
4. Vérifier que FPS ≥ 55

## 🔍 Console Logs

Messages attendus dans la console :
```
🧙‍♂️ Le Laboratoire du Druide - Initialisé
📦 Produits chargés: 1
🛒 Panier chargé: X articles
🎨 Animations interactives activées !
```

## ⚠️ Si Problème

1. **Animations ne marchent pas**
   - Vérifier que animations.js est chargé
   - Ouvrir la console pour voir erreurs
   - Vider le cache (Ctrl+Shift+R)

2. **Panier vide après ajout**
   - Vérifier localStorage dans DevTools
   - Désactiver bloqueurs de scripts
   - Vérifier que JS est activé

3. **Curseur ne s'affiche pas**
   - Le curseur custom ne marche que sur desktop
   - Vérifier que CSS est chargé
   - Essayer dans un autre navigateur

## ✅ Test Complet Réussi

Si tous les tests sont ✅, le site est prêt pour la production !

Date du test : __________
Testeur : __________
Navigateur : __________
Résolution : __________
Résultat : ⭐⭐⭐⭐⭐
