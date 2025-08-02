# Guide de Déploiement

## 🚀 Déploiement sur GitHub et Heroku

### 1. Initialiser Git et pousser sur GitHub

```bash
# Initialiser le repository Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "🎉 Initial commit: Portfolio Auriol Uriel Lissan

✨ Fonctionnalités:
- Portfolio public avec projets, branding, contact
- Interface d'administration complète
- Système d'authentification JWT
- Formulaire de contact avec envoi d'emails
- Upload de CV et gestion de fichiers
- Design responsive et moderne

🛠️ Technologies:
- Next.js 14 + TypeScript
- Tailwind CSS
- Nodemailer pour les emails
- JWT pour l'authentification"

# Ajouter l'origine GitHub (remplacez par votre URL)
git remote add origin https://github.com/votre-username/portfolio-auriol.git

# Pousser sur GitHub
git branch -M main
git push -u origin main
```

### 2. Déployer sur Heroku

```bash
# Installer Heroku CLI si pas déjà fait
# https://devcenter.heroku.com/articles/heroku-cli

# Se connecter à Heroku
heroku login

# Créer une nouvelle application Heroku
heroku create portfolio-auriol-lissan

# Configurer les variables d'environnement
heroku config:set JWT_SECRET=your-super-secret-jwt-key-production
heroku config:set EMAIL_USER=lissanaurioluriel@gmail.com
heroku config:set EMAIL_PASS=nqee-qzop-gwvw-yrrk

# Ajouter Heroku comme remote
heroku git:remote -a portfolio-auriol-lissan

# Déployer sur Heroku
git push heroku main

# Ouvrir l'application
heroku open
```

### 3. Variables d'environnement Heroku

Configurez ces variables dans le dashboard Heroku ou via CLI :

```bash
# JWT Secret (générez une clé sécurisée)
heroku config:set JWT_SECRET=your-super-secret-jwt-key-production

# Configuration Email
heroku config:set EMAIL_USER=lissanaurioluriel@gmail.com
heroku config:set EMAIL_PASS=nqee-qzop-gwvw-yrrk

# Vérifier les variables
heroku config
```

### 4. Commandes utiles

```bash
# Voir les logs
heroku logs --tail

# Redémarrer l'application
heroku restart

# Ouvrir l'application
heroku open

# Voir le statut
heroku ps
```

### 5. Mise à jour du code

```bash
# Après modifications
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push origin main
git push heroku main
```

### 6. Domaine personnalisé (optionnel)

```bash
# Ajouter un domaine personnalisé
heroku domains:add www.auriol-portfolio.com

# Voir les domaines
heroku domains
```

## 🔧 Troubleshooting

### Problème de build
```bash
heroku logs --tail
heroku restart
```

### Problème d'email
- Vérifiez que le mot de passe d'application Gmail est correct
- Vérifiez que la validation en 2 étapes est activée

### Problème d'authentification
- Vérifiez que JWT_SECRET est défini
- Régénérez le secret si nécessaire

## 📱 URLs importantes

- **Portfolio** : https://portfolio-auriol-lissan.herokuapp.com
- **Admin** : https://portfolio-auriol-lissan.herokuapp.com/admin/login
- **GitHub** : https://github.com/votre-username/portfolio-auriol
