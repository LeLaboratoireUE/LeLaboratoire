# 💳 Guide d'Intégration NOWPayments

## 🎯 Qu'est-ce que NOWPayments ?

**NOWPayments** est une passerelle de paiement en cryptomonnaie qui vous permet d'accepter plus de 150 cryptomonnaies différentes sur votre site e-commerce.

### ✅ Avantages
- ✅ **150+ cryptomonnaies** acceptées (BTC, ETH, USDT, LTC, XMR, etc.)
- ✅ **Frais bas** : 0.5% - 1% par transaction
- ✅ **API facile** à intégrer
- ✅ **Confirmation automatique** des paiements
- ✅ **Dashboard complet** pour suivre les transactions
- ✅ **Support 24/7**

---

## 🚀 Étape 1 : Création du Compte

### 1.1 S'inscrire

1. Allez sur **https://nowpayments.io**
2. Cliquez sur "Sign Up"
3. Remplissez le formulaire :
   - Email
   - Mot de passe
   - Acceptez les conditions
4. Confirmez votre email

### 1.2 Configuration du Compte

1. Connectez-vous au **Dashboard**
2. Complétez votre profil :
   - Nom de l'entreprise
   - Type d'activité
   - Pays
3. Configurez vos **portefeuilles de réception** :
   - Ajoutez vos adresses crypto
   - BTC, ETH, USDT, etc.

---

## 🔑 Étape 2 : Obtenir l'API Key

### 2.1 Générer la Clé

1. Dans le Dashboard, allez dans **Settings**
2. Cliquez sur **API Keys**
3. Cliquez sur **Generate API Key**
4. Copiez et **sauvegardez** votre API Key (ne la partagez jamais !)

Exemple d'API Key :
```
ABC123-DEF456-GHI789-JKL012
```

### 2.2 Configurer l'IPN (Instant Payment Notification)

1. Dans **Settings** → **IPN**
2. Entrez l'URL de callback de votre serveur :
   ```
   https://votre-site.com/api/payment-webhook
   ```
3. Activez l'IPN
4. Sauvegardez

---

## 💻 Étape 3 : Intégration dans le Site

### 3.1 Installation (Backend Node.js)

```bash
npm install @nowpayments/nowpayments-api-js
```

### 3.2 Configuration Backend

Créez un fichier `server.js` :

```javascript
const express = require('express');
const NOWPayments = require('@nowpayments/nowpayments-api-js');

const app = express();
app.use(express.json());

// Configuration NOWPayments
const nowPayments = new NOWPayments('VOTRE_API_KEY_ICI');

// Route pour créer un paiement
app.post('/api/create-payment', async (req, res) => {
    try {
        const { price_amount, price_currency, pay_currency, order_id } = req.body;
        
        const payment = await nowPayments.createPayment({
            price_amount: price_amount, // Montant (ex: 500)
            price_currency: price_currency, // Devise (ex: "EUR")
            pay_currency: pay_currency, // Crypto (ex: "BTC")
            order_id: order_id, // ID de commande
            order_description: "Commande Le Laboratoire du Druide",
            ipn_callback_url: "https://votre-site.com/api/payment-webhook",
            success_url: "https://votre-site.com/success",
            cancel_url: "https://votre-site.com/cancel"
        });
        
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook pour recevoir les confirmations
app.post('/api/payment-webhook', async (req, res) => {
    const { payment_status, order_id, payment_id } = req.body;
    
    if (payment_status === 'finished') {
        // Paiement confirmé !
        console.log(`Paiement confirmé pour la commande ${order_id}`);
        
        // TODO: Mettre à jour votre base de données
        // TODO: Envoyer email de confirmation
        // TODO: Préparer la livraison
    }
    
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
```

### 3.3 Configuration Frontend

Modifiez `js/script.js` dans la fonction `handleCheckout` :

```javascript
async function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !');
        return;
    }
    
    const total = getCartTotal();
    const orderId = 'ORDER-' + Date.now();
    
    try {
        // Appel à votre backend
        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price_amount: total,
                price_currency: 'EUR',
                pay_currency: 'BTC', // ou 'ETH', 'USDT', etc.
                order_id: orderId
            })
        });
        
        const payment = await response.json();
        
        // Rediriger vers la page de paiement NOWPayments
        window.location.href = payment.invoice_url;
        
    } catch (error) {
        showNotification('Erreur lors de la création du paiement');
        console.error(error);
    }
}
```

---

## 🎨 Étape 4 : Widget de Paiement (Alternative Simple)

Si vous ne voulez pas de backend, utilisez le **widget NOWPayments** :

### 4.1 Créer un Widget

1. Dans le Dashboard NOWPayments
2. Allez dans **Payment Tools** → **Widget**
3. Configurez :
   - Montant fixe ou variable
   - Cryptos acceptées
   - Couleurs du widget
4. Copiez le code

### 4.2 Intégrer le Widget

```html
<!-- Dans votre page de paiement -->
<div id="nowpayments-widget"></div>

<script src="https://nowpayments.io/embeds/checkout.js"></script>
<script>
  NOWPayments.init({
    apiKey: 'VOTRE_API_KEY_PUBLIC',
    amount: 500,
    currency: 'EUR',
    successUrl: 'https://votre-site.com/success',
    cancelUrl: 'https://votre-site.com/cancel'
  });
</script>
```

---

## 📱 Étape 5 : Flow de Paiement Complet

### 5.1 Côté Utilisateur

1. **Utilisateur ajoute des produits** au panier
2. **Clique sur "Passer la commande"**
3. **Modal s'ouvre** avec les options de paiement
4. **Sélectionne la crypto** (BTC, ETH, USDT, etc.)
5. **Redirigé vers NOWPayments** pour payer
6. **Effectue le paiement** avec son wallet
7. **Confirmation instantanée**
8. **Retour sur votre site** (page de succès)

### 5.2 Côté Commerçant (Vous)

1. **Webhook reçu** de NOWPayments
2. **Vérification** du statut du paiement
3. **Mise à jour** de la commande dans votre DB
4. **Envoi d'email** de confirmation au client
5. **Préparation** de la livraison
6. **Dashboard NOWPayments** pour tout suivre

---

## 🔒 Étape 6 : Sécurité

### 6.1 Variables d'Environnement

**NE JAMAIS** mettre votre API Key dans le code frontend !

Créez un fichier `.env` :

```bash
NOWPAYMENTS_API_KEY=votre_api_key_ici
NOWPAYMENTS_IPN_SECRET=votre_secret_ici
```

Utilisez dans le backend :

```javascript
require('dotenv').config();

const apiKey = process.env.NOWPAYMENTS_API_KEY;
```

### 6.2 Vérification du Webhook

```javascript
const crypto = require('crypto');

function verifyWebhook(req) {
    const signature = req.headers['x-nowpayments-sig'];
    const body = JSON.stringify(req.body);
    
    const hmac = crypto
        .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET)
        .update(body)
        .digest('hex');
    
    return signature === hmac;
}

app.post('/api/payment-webhook', (req, res) => {
    if (!verifyWebhook(req)) {
        return res.status(401).send('Invalid signature');
    }
    
    // Traiter le webhook...
});
```

---

## 💰 Étape 7 : Frais et Limites

### Frais NOWPayments

| Type | Frais |
|------|-------|
| **Standard** | 0.5% - 1% |
| **Custody** | 0.5% |
| **Non-Custody** | 0.5% |

### Limites

- **Minimum** : Variable selon la crypto
  - BTC : ~0.0001 BTC
  - ETH : ~0.001 ETH
  - USDT : ~10 USDT
- **Maximum** : Aucun

---

## 📊 Étape 8 : Tester l'Intégration

### 8.1 Mode Sandbox

1. Utilisez l'API Key de **sandbox**
2. Testez tous les flows
3. Vérifiez les webhooks

### 8.2 Checklist de Test

- [ ] Création de paiement fonctionne
- [ ] Redirection vers NOWPayments OK
- [ ] Sélection de crypto fonctionne
- [ ] Paiement test réussi
- [ ] Webhook reçu correctement
- [ ] Commande mise à jour
- [ ] Email de confirmation envoyé
- [ ] Retour sur page de succès

---

## 🎓 Ressources Officielles

- 📖 **Documentation** : https://documenter.getpostman.com/view/7907941/S1a32n38
- 💻 **API Reference** : https://documenter.getpostman.com/view/7907941/S1a32n38?version=latest
- 🎨 **Dashboard** : https://account.nowpayments.io
- 💬 **Support** : support@nowpayments.io
- 📚 **Exemples** : https://github.com/nowpayments/nowpayments-api-js

---

## ⚡ Exemple Complet pour Votre Site

Voici le code complet à intégrer dans votre fonction `handleCheckout` :

```javascript
async function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !');
        return;
    }
    
    const total = getCartTotal();
    const orderId = 'LAB-' + Date.now();
    const quantities = cart.map(item => item.quantity).join(', ');
    
    // Pour l'instant, afficher la modal d'information
    // TODO: Remplacer par l'appel API réel quand le backend est prêt
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <h2>Paiement Cryptomonnaie</h2>
            <div style="padding: 2rem;">
                <p>Total : <strong>${total}€</strong></p>
                <p>Quantités : ${quantities}</p>
                <p>Commande : ${orderId}</p>
                <br>
                <p>Intégration NOWPayments en cours...</p>
                <button class="btn btn-primary" onclick="window.open('https://nowpayments.io', '_blank')">
                    En savoir plus sur NOWPayments
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
```

---

## 🎉 Conclusion

Avec NOWPayments, vous pouvez :
- ✅ Accepter 150+ cryptomonnaies
- ✅ Confirmation automatique des paiements
- ✅ Frais bas (0.5% - 1%)
- ✅ Intégration simple
- ✅ Support professionnel

**Prêt à intégrer les paiements crypto sur votre site !** 🚀