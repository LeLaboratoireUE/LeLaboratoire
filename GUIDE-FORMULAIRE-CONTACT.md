# 📧 Guide Configuration Formulaire Contact

## ✅ Ce Qui a Été Fait

Le formulaire de contact a été configuré avec **FormSubmit.co**, un service **gratuit** qui permet d'envoyer des emails directement depuis un formulaire HTML sans backend.

---

## 🚀 Configuration Rapide (2 Minutes)

### Étape 1 : Remplacer l'Email

Dans `contact.html`, ligne 85, remplacez :

```html
<form action="https://formsubmit.co/votre-email@example.com" method="POST">
```

Par votre vraie adresse email :

```html
<form action="https://formsubmit.co/votre-email@gmail.com" method="POST">
```

### Étape 2 : Première Soumission (Activation)

1. **Ouvrir** contact.html dans votre navigateur
2. **Remplir** le formulaire avec des données de test
3. **Envoyer** le message
4. **Vérifier** votre boîte mail
5. **Cliquer** sur le lien de confirmation dans l'email reçu
6. ✅ **Votre formulaire est activé !**

### Étape 3 : Personnaliser l'URL de Retour

Dans `contact.html`, ligne 88, remplacez :

```html
<input type="hidden" name="_next" value="https://votre-site.com/contact.html?success=true">
```

Par l'URL de votre site déployé :

```html
<input type="hidden" name="_next" value="https://mon-site.netlify.app/contact.html?success=true">
```

**C'EST TOUT ! Le formulaire fonctionne maintenant 🎉**

---

## 🎨 Fonctionnalités Intégrées

### ✅ Ce Qui Fonctionne

1. **Envoi automatique** à votre adresse email
2. **Template personnalisé** (box style)
3. **Pas de captcha** (pour simplifier)
4. **Message de confirmation** après envoi
5. **Redirection automatique** avec message de succès
6. **Nettoyage d'URL** après 3 secondes

### 📨 Format de l'Email Reçu

Quand quelqu'un remplit le formulaire, vous recevez un email comme ça :

```
De: FormSubmit <noreply@formsubmit.co>
Sujet: Nouveau message - Le Laboratoire du Druide

Nom: Jean Dupont
Email: jean.dupont@exemple.com
Objet: Question sur une commande
Message: Bonjour, je souhaiterais savoir...
```

---

## ⚙️ Options Avancées

### Champs Cachés Configurés

```html
<!-- Sujet de l'email -->
<input type="hidden" name="_subject" value="Nouveau message - Le Laboratoire du Druide">

<!-- Désactiver le captcha -->
<input type="hidden" name="_captcha" value="false">

<!-- Template box (plus joli) -->
<input type="hidden" name="_template" value="box">

<!-- Redirection après envoi -->
<input type="hidden" name="_next" value="URL_DE_VOTRE_SITE">
```

### Autres Options Disponibles

Vous pouvez ajouter d'autres champs cachés :

```html
<!-- Email de copie (CC) -->
<input type="hidden" name="_cc" value="autre-email@example.com">

<!-- Activer le captcha (Google reCAPTCHA) -->
<input type="hidden" name="_captcha" value="true">

<!-- Honeypot anti-spam -->
<input type="hidden" name="_honey" value="">

<!-- Autoréponse automatique -->
<input type="hidden" name="_autoresponse" value="Merci pour votre message !">
```

---

## 🔧 Personnalisation

### Changer le Sujet de l'Email

Dans `contact.html`, modifiez :

```html
<input type="hidden" name="_subject" value="Nouveau message - Le Laboratoire du Druide">
```

Exemples :
- `"Nouvelle commande depuis le site"`
- `"Contact client - Le Laboratoire du Druide"`
- `"Demande d'information"`

### Ajouter des Champs

Vous pouvez ajouter n'importe quel champ au formulaire :

```html
<div class="form-group">
    <label for="phone">Téléphone</label>
    <input type="tel" id="phone" name="phone" placeholder="+33 6 12 34 56 78">
</div>

<div class="form-group">
    <label for="company">Entreprise</label>
    <input type="text" id="company" name="company" placeholder="Nom de votre entreprise">
</div>
```

**Important :** L'attribut `name` détermine le nom du champ dans l'email reçu.

---

## 🎯 Test du Formulaire

### Test Local (Avant Déploiement)

1. Ouvrir `contact.html` dans le navigateur
2. Remplir le formulaire :
   - Nom : Test
   - Email : votre-email@gmail.com
   - Objet : Test
   - Message : Test du formulaire
3. Cliquer "Envoyer le message"
4. Vous serez redirigé vers FormSubmit.co
5. Confirmer l'envoi sur leur page
6. Vérifier votre boîte mail

### Test Après Déploiement

1. Aller sur votre site en ligne
2. Remplir le formulaire
3. Cliquer "Envoyer le message"
4. **Vous restez sur votre site** avec message de succès
5. Vérifier votre boîte mail

---

## 📊 Limites de FormSubmit (Gratuit)

### Ce Qui Est Gratuit

✅ **50 soumissions par mois** (suffisant pour démarrer)
✅ **Emails illimités** (nombre d'emails que vous pouvez configurer)
✅ **Pas de publicité** dans les emails
✅ **Pas de logo FormSubmit** dans les emails
✅ **AJAX/Fetch support** (pour envoi sans rechargement)

### Alternatives Si Besoin

**Si vous dépassez 50 messages/mois**, voici des alternatives :

1. **FormSubmit Pro** (9$/mois)
   - 1000 soumissions/mois
   - Support prioritaire
   - Analytics

2. **EmailJS** (Gratuit jusqu'à 200/mois)
   - Similaire à FormSubmit
   - Plus de templates

3. **Formspree** (Gratuit jusqu'à 50/mois)
   - Alternative populaire
   - Interface similaire

4. **Backend custom** (Node.js + Nodemailer)
   - Illimité
   - Plus complexe à configurer

---

## 🔐 Sécurité

### Anti-Spam Intégré

FormSubmit a plusieurs protections anti-spam :

1. **Rate limiting** : 1 soumission par minute par IP
2. **Email validation** : Vérifie que l'email est valide
3. **Honeypot** : Champ caché pour piéger les bots
4. **CAPTCHA optionnel** : Activable si besoin

### Données Personnelles

- FormSubmit **ne stocke PAS** les messages
- Les emails sont **transférés directement** à vous
- Conforme **RGPD**

---

## 💡 Astuces

### 1. Recevoir sur Plusieurs Emails

```html
<input type="hidden" name="_cc" value="email2@example.com,email3@example.com">
```

### 2. Message de Confirmation Automatique

```html
<input type="hidden" name="_autoresponse" value="Merci pour votre message ! Nous vous répondrons dans les 24h.">
```

### 3. Désactiver le Captcha (Plus Fluide)

```html
<input type="hidden" name="_captcha" value="false">
```

### 4. Personnaliser la Page de Remerciement

Créez `thank-you.html` et redirigez dessus :

```html
<input type="hidden" name="_next" value="https://votre-site.com/thank-you.html">
```

---

## 🐛 Dépannage

### Problème 1 : Pas d'Email Reçu

**Solutions :**
1. Vérifier le **dossier spam**
2. Vérifier l'adresse email dans `action="..."`
3. Faire la **première soumission** pour activer
4. Cliquer sur le **lien de confirmation** dans l'email reçu

### Problème 2 : Redirection Ne Marche Pas

**Solution :**
- Vérifier que `_next` contient l'**URL complète** :
  ```html
  <input type="hidden" name="_next" value="https://mon-site.com/contact.html?success=true">
  ```
- Pas juste `contact.html?success=true`

### Problème 3 : Message "Email Not Confirmed"

**Solution :**
1. Aller sur https://formsubmit.co
2. Entrer votre email
3. Cliquer "Send Confirmation"
4. Vérifier votre boîte mail
5. Cliquer sur le lien de confirmation

---

## 📝 Exemple Complet

Voici comment est configuré le formulaire actuel :

```html
<form action="https://formsubmit.co/VOTRE_EMAIL" method="POST">
    <!-- Configuration -->
    <input type="hidden" name="_subject" value="Nouveau message - Le Laboratoire du Druide">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="box">
    <input type="hidden" name="_next" value="https://votre-site.com/contact.html?success=true">
    
    <!-- Champs visibles -->
    <input type="text" name="name" required placeholder="Votre nom">
    <input type="email" name="email" required placeholder="Votre email">
    <select name="subject" required>
        <option value="Commande">Commande</option>
        <option value="Info">Information</option>
    </select>
    <textarea name="message" required placeholder="Votre message"></textarea>
    
    <button type="submit">Envoyer</button>
</form>
```

---

## ✅ Checklist Configuration

- [ ] Remplacer `votre-email@example.com` par votre vrai email
- [ ] Remplacer `https://votre-site.com` par l'URL de votre site
- [ ] Faire un premier envoi test
- [ ] Confirmer l'email reçu de FormSubmit
- [ ] Tester le formulaire depuis le site déployé
- [ ] Vérifier que le message de succès s'affiche
- [ ] Vérifier que l'email arrive bien

---

## 🎉 Résultat Final

Après configuration, voici ce qui se passe :

1. **Client remplit le formulaire** sur votre site
2. **Clique sur "Envoyer"**
3. **FormSubmit traite** l'envoi (invisible pour le client)
4. **Client reste sur votre site** avec message "✅ Message envoyé !"
5. **Vous recevez un email** avec tous les détails
6. **Vous pouvez répondre** directement depuis votre boîte mail

**Simple, Gratuit, et Efficace ! 🚀**

---

## 📞 Support

**Documentation FormSubmit :** https://formsubmit.co
**Alternatives :** EmailJS, Formspree, Web3Forms

**Pour toute question sur votre formulaire, consultez la documentation de FormSubmit.**