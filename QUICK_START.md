# 🚀 Guide de Démarrage Rapide

## Installation en 5 minutes

### 1️⃣ Installer les dépendances

```bash
npm install --legacy-peer-deps
```

### 2️⃣ Configurer la base de données

Créez un fichier `.env` :

```bash
cp .env.example .env
```

Modifiez `.env` avec vos informations PostgreSQL :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
AUTH_SECRET="générez-une-clé-secrète"  # openssl rand -base64 32
AUTH_URL="http://localhost:3000"
```

### 3️⃣ Initialiser la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Créer le super admin (username: admin, password: admin123456)
npm run db:seed
```

### 4️⃣ Lancer l'application

```bash
npm run dev
```

### 5️⃣ Se connecter

Accédez à : `http://localhost:3000/admin/login`

- **Username:** `admin`
- **Password:** `admin123456`

⚠️ **IMPORTANT:** Changez le mot de passe immédiatement après la première connexion !

---

## 📚 Structure de la base de données

```
┌─────────────────┐
│     Admin       │ ← Comptes administrateurs (SUPER_ADMIN / SUB_ADMIN)
└─────────────────┘
        │
        ├── Masterclass ← Modules de formation
        │       └── MasterclassVideo ← Vidéos complémentaires
        │
        ├── Seminar ← Séminaires intensifs
        │       ├── SeminarProgram ← Programme détaillé
        │       └── Session ← Sessions programmées
        │               └── Registration ← Inscriptions participants
        │
        └── Session (créateur)
```

---

## 🔑 Fonctionnalités principales

### ✅ Gestion des Masterclasses
- CRUD complet
- Vidéos complémentaires
- Toggle pour afficher les vidéos sur la page d'accueil
- Ordre d'affichage personnalisable

### ✅ Gestion des Séminaires
- CRUD complet
- Programme détaillé par jour
- Images et vidéos
- Slug unique pour les URLs

### ✅ Sessions Programmées
- Planification des dates
- Gestion des participants (max/actuels)
- Prix et devise
- Statuts : SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- Publication/dépublication

### ✅ Système d'Administration
- Authentification sécurisée (NextAuth v5)
- Hiérarchie : SUPER_ADMIN / SUB_ADMIN
- Création de sous-comptes
- Gestion des permissions

---

## 🛠️ Commandes utiles

### Base de données

```bash
npm run db:generate    # Générer le client Prisma
npm run db:push        # Appliquer le schéma (dev)
npm run db:migrate     # Créer une migration (prod)
npm run db:studio      # Ouvrir l'interface graphique
npm run db:seed        # Créer le super admin
```

### Développement

```bash
npm run dev           # Lancer en mode développement
npm run build         # Build pour production
npm run start         # Lancer en production
npm run lint          # Vérifier le code
```

---

## 📡 API Endpoints principaux

### Authentification
```
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session
```

### Masterclasses
```
GET    /api/admin/masterclasses
POST   /api/admin/masterclasses
PUT    /api/admin/masterclasses/:id
DELETE /api/admin/masterclasses/:id
```

### Séminaires
```
GET    /api/admin/seminars
POST   /api/admin/seminars
PUT    /api/admin/seminars/:id
DELETE /api/admin/seminars/:id
```

### Sessions
```
GET    /api/admin/sessions?seminarId=xxx
POST   /api/admin/sessions
PUT    /api/admin/sessions/:id
DELETE /api/admin/sessions/:id
```

### Admins (SUPER_ADMIN seulement)
```
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
```

---

## 🎯 Exemples d'utilisation

### Créer une masterclass avec vidéo

```typescript
// 1. Créer la masterclass
const masterclass = await fetch('/api/admin/masterclasses', {
  method: 'POST',
  body: JSON.stringify({
    icon: "🌾",
    title: "Transformation Locale",
    description: "Formation complète...",
    features: ["Point 1", "Point 2"],
    cta: "S'inscrire",
    backgroundColor: "from-amber-50 to-orange-50",
    showVideosOnHome: true  // Afficher sur l'accueil
  })
})

// 2. Ajouter une vidéo
const video = await fetch(`/api/admin/masterclasses/${masterclass.id}/videos`, {
  method: 'POST',
  body: JSON.stringify({
    title: "Introduction",
    description: "Vidéo d'introduction...",
    videoUrl: "https://youtube.com/watch?v=xxx",
    duration: "15:30"
  })
})
```

### Programmer une session de séminaire

```typescript
const session = await fetch('/api/admin/sessions', {
  method: 'POST',
  body: JSON.stringify({
    seminarId: "clxxx...",
    startDate: "2025-03-15T09:00:00Z",
    endDate: "2025-03-16T17:00:00Z",
    location: "Paris, France",
    maxParticipants: 15,
    price: 1500,
    currency: "EUR",
    isPublished: true
  })
})
```

### Créer un sous-admin

```typescript
// Réservé aux SUPER_ADMIN
const subAdmin = await fetch('/api/admin/users', {
  method: 'POST',
  body: JSON.stringify({
    username: "marie_dupont",
    email: "marie@example.com",
    password: "SecurePass123!",
    role: "SUB_ADMIN"
  })
})
```

---

## 🔐 Permissions

| Action | SUB_ADMIN | SUPER_ADMIN |
|--------|:---------:|:-----------:|
| Gérer masterclasses | ✅ | ✅ |
| Gérer séminaires | ✅ | ✅ |
| Gérer sessions | ✅ | ✅ |
| Voir les admins | ❌ | ✅ |
| Créer des sous-admins | ❌ | ✅ |
| Modifier les admins | Soi uniquement | ✅ |
| Supprimer des admins | ❌ | ✅ |

---

## 🐛 Dépannage

### Erreur : "Prisma Client not generated"
```bash
npm run db:generate
```

### Erreur : "Table does not exist"
```bash
npm run db:push
```

### Connexion impossible
1. Vérifiez que le super admin existe : `npm run db:seed`
2. Vérifiez les identifiants (admin / admin123456)
3. Vérifiez que `AUTH_SECRET` est défini dans `.env`

### Port déjà utilisé
```bash
# Tuer le processus sur le port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 📖 Documentation complète

Pour plus de détails, consultez [DATABASE_README.md](./DATABASE_README.md)

---

## ✅ Checklist de production

Avant de déployer en production :

- [ ] Changer le mot de passe du super admin
- [ ] Générer une nouvelle `AUTH_SECRET` forte
- [ ] Configurer une base de données PostgreSQL de production
- [ ] Utiliser `npm run db:migrate` au lieu de `db:push`
- [ ] Configurer les variables d'environnement sur le serveur
- [ ] Activer HTTPS
- [ ] Configurer les backups de la base de données
- [ ] Tester tous les endpoints API
- [ ] Vérifier les permissions et rôles

---

## 🆘 Besoin d'aide ?

1. Consultez [DATABASE_README.md](./DATABASE_README.md) pour la documentation complète
2. Utilisez Prisma Studio pour explorer la base de données : `npm run db:studio`
3. Vérifiez les logs de l'application pour les erreurs détaillées
