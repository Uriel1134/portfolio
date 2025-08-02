# Configuration Email pour le Formulaire de Contact

## 📧 Configuration Gmail

Pour que le formulaire de contact fonctionne et vous envoie les emails sur `lissanaurioluriel@gmail.com`, vous devez configurer un **mot de passe d'application Gmail**.

### 🔐 Étapes pour créer un mot de passe d'application Gmail :

1. **Connectez-vous à votre compte Gmail** : `lissanaurioluriel@gmail.com`

2. **Activez la vérification en 2 étapes** (si ce n'est pas déjà fait) :
   - Allez dans [Paramètres de sécurité Google](https://myaccount.google.com/security)
   - Cliquez sur "Validation en 2 étapes"
   - Suivez les instructions pour l'activer

3. **Créez un mot de passe d'application** :
   - Retournez dans [Paramètres de sécurité Google](https://myaccount.google.com/security)
   - Cliquez sur "Mots de passe des applications"
   - Sélectionnez "Autre (nom personnalisé)"
   - Tapez "Portfolio Contact Form"
   - Cliquez sur "Générer"
   - **Copiez le mot de passe généré** (16 caractères)

4. **Ajoutez le mot de passe dans .env.local** :
   ```env
   EMAIL_PASS=votre-mot-de-passe-application-ici
   ```

### 🚀 Test du formulaire

Une fois configuré, le formulaire de contact :
- ✅ Enverra un email formaté à `lissanaurioluriel@gmail.com`
- ✅ Inclura toutes les informations du visiteur
- ✅ Permettra de répondre directement via l'email du visiteur
- ✅ Affichera un message de succès/erreur

### 📋 Format de l'email reçu

L'email que vous recevrez contiendra :
- 👤 **Nom complet** du visiteur
- 📧 **Email** (configuré comme reply-to)
- 🏢 **Entreprise** (si renseignée)
- 📋 **Sujet** du message
- 💰 **Budget** (si renseigné)
- 🛠️ **Services demandés** (si sélectionnés)
- 💬 **Message complet**
- 📅 **Date et heure** de réception

### 🔒 Sécurité

- Le mot de passe d'application est spécifique à cette utilisation
- Il peut être révoqué à tout moment depuis votre compte Google
- Vos identifiants principaux restent sécurisés

### ⚠️ Important

**Ne partagez jamais votre mot de passe d'application !**
Ajoutez `.env.local` à votre `.gitignore` pour éviter de le commiter.

### 🆘 En cas de problème

Si les emails ne sont pas reçus :
1. Vérifiez que le mot de passe d'application est correct
2. Vérifiez vos spams/courriers indésirables
3. Assurez-vous que la validation en 2 étapes est activée
4. Consultez les logs de l'application pour les erreurs
