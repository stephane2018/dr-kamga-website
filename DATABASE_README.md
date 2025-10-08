# Documentation Base de Données - Dr Kanga Website

## 📋 Table des matières

- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Modèles de données](#modèles-de-données)
- [API Endpoints](#api-endpoints)
- [Authentification](#authentification)
- [Utilisation](#utilisation)

---

## 🏗️ Architecture

La base de données est construite avec :
- **Prisma ORM** - Gestion de la base de données
- **PostgreSQL** - Base de données relationnelle
- **NextAuth v5** - Authentification
- **bcryptjs** - Hachage des mots de passe

### Modèles principaux

1. **Admin** - Gestion des utilisateurs administrateurs
2. **Masterclass** - Gestion des masterclasses
3. **MasterclassVideo** - Vidéos complémentaires des masterclasses
4. **Seminar** - Gestion des séminaires
5. **SeminarProgram** - Programme détaillé des séminaires
6. **Session** - Sessions programmées des séminaires
7. **Registration** - Inscriptions des participants aux sessions

---

## 📦 Installation

### 1. Installer les dépendances

```bash
npm install
```

Les packages suivants ont été ajoutés :
- `prisma` - CLI Prisma
- `@prisma/client` - Client Prisma
- `next-auth` - Authentification
- `@auth/prisma-adapter` - Adaptateur Prisma pour NextAuth
- `bcryptjs` - Hachage de mots de passe
- `@types/bcryptjs` - Types TypeScript

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Modifiez les variables dans `.env` :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"


# NextAuth
AUTH_SECRET="your-secret-key-here"  # Générer avec: openssl rand -base64 32
AUTH_URL="http://localhost:3000"
```

### 3. Générer le client Prisma et créer la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma db push

# OU utiliser les migrations (recommandé pour la production)
npx prisma migrate dev --name init
```

### 4. Créer le premier super administrateur

```bash
# Avec les identifiants par défaut (admin / admin123456)
npx tsx scripts/create-super-admin.ts

# OU avec des identifiants personnalisés
SUPER_ADMIN_USERNAME=votre_username \
SUPER_ADMIN_PASSWORD=votre_password \
SUPER_ADMIN_EMAIL=votre@email.com \
npx tsx scripts/create-super-admin.ts
```

---

## 📊 Modèles de données

### Admin

Gestion des comptes administrateurs avec système de hiérarchie.

```prisma
model Admin {
  id          String    @id @default(cuid())
  username    String    @unique
  email       String?   @unique
  password    String    // Haché avec bcrypt
  role        AdminRole @default(SUB_ADMIN)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  lastLoginAt DateTime?
}

enum AdminRole {
  SUPER_ADMIN  // Peut créer des sous-admins
  SUB_ADMIN    // Accès limité
}
```

### Masterclass

Gestion des modules de formation masterclass.

```prisma
model Masterclass {
  id              String   @id @default(cuid())
  icon            String   // Emoji
  title           String
  description     String
  features        String[] // Tableau de caractéristiques
  cta             String   // Texte du bouton
  backgroundColor String   // Classes Tailwind (ex: "from-amber-50 to-orange-50")
  isActive        Boolean  @default(true)
  displayOrder    Int      @default(0)
  showVideosOnHome Boolean @default(false) // Afficher les vidéos sur l'accueil
}
```

### MasterclassVideo

Vidéos complémentaires pour chaque masterclass.

```prisma
model MasterclassVideo {
  id           String   @id @default(cuid())
  title        String
  description  String?
  videoUrl     String   // URL YouTube
  thumbnailUrl String?
  duration     String?
  displayOrder Int      @default(0)
  isActive     Boolean  @default(true)
}
```

### Seminar

Gestion des séminaires intensifs.

```prisma
model Seminar {
  id           String  @id @default(cuid())
  slug         String  @unique
  duration     String  // Ex: "2 jours"
  participants String  // Ex: "12-15 participants"
  title        String
  subtitle     String
  description  String
  image        String?
  videoUrl     String?
  nextSession  String? // Texte d'affichage
  location     String
  isActive     Boolean @default(true)
  displayOrder Int     @default(0)
}
```

### Session

Sessions programmées pour les séminaires.

```prisma
model Session {
  id              String        @id @default(cuid())
  startDate       DateTime
  endDate         DateTime
  location        String
  maxParticipants Int
  currentParticipants Int   @default(0)
  price           Float?
  currency        String        @default("EUR")
  status          SessionStatus @default(SCHEDULED)
  isPublished     Boolean       @default(false)
}

enum SessionStatus {
  SCHEDULED    // Planifiée
  CONFIRMED    // Confirmée
  IN_PROGRESS  // En cours
  COMPLETED    // Terminée
  CANCELLED    // Annulée
}
```

### Registration

Inscriptions des participants aux sessions.

```prisma
model Registration {
  id            String             @id @default(cuid())
  firstName     String
  lastName      String
  email         String
  phone         String?
  company       String?
  status        RegistrationStatus @default(PENDING)
  paymentStatus PaymentStatus      @default(PENDING)
  paymentAmount Float?
}
```

---

## 🔌 API Endpoints

### Authentification

```
POST   /api/auth/signin        - Connexion
POST   /api/auth/signout       - Déconnexion
GET    /api/auth/session       - Session actuelle
```

### Masterclasses

```
GET    /api/admin/masterclasses              - Liste toutes les masterclasses
POST   /api/admin/masterclasses              - Crée une masterclass
GET    /api/admin/masterclasses/:id          - Récupère une masterclass
PUT    /api/admin/masterclasses/:id          - Met à jour une masterclass
DELETE /api/admin/masterclasses/:id          - Supprime une masterclass

GET    /api/admin/masterclasses/:id/videos        - Liste les vidéos
POST   /api/admin/masterclasses/:id/videos        - Ajoute une vidéo
PUT    /api/admin/masterclasses/:id/videos/:videoId    - Met à jour une vidéo
DELETE /api/admin/masterclasses/:id/videos/:videoId    - Supprime une vidéo
```

### Séminaires

```
GET    /api/admin/seminars              - Liste tous les séminaires
POST   /api/admin/seminars              - Crée un séminaire
GET    /api/admin/seminars/:id          - Récupère un séminaire
PUT    /api/admin/seminars/:id          - Met à jour un séminaire
DELETE /api/admin/seminars/:id          - Supprime un séminaire
```

### Sessions

```
GET    /api/admin/sessions              - Liste toutes les sessions
       ?seminarId=xxx                   - Filtre par séminaire
       ?status=SCHEDULED                - Filtre par statut
POST   /api/admin/sessions              - Crée une session
GET    /api/admin/sessions/:id          - Récupère une session
PUT    /api/admin/sessions/:id          - Met à jour une session
DELETE /api/admin/sessions/:id          - Supprime une session
```

### Administrateurs (SUPER_ADMIN uniquement)

```
GET    /api/admin/users                 - Liste tous les admins
POST   /api/admin/users                 - Crée un sous-admin
GET    /api/admin/users/:id             - Récupère un admin
PUT    /api/admin/users/:id             - Met à jour un admin
DELETE /api/admin/users/:id             - Supprime un admin
```

---

## 🔐 Authentification

### Connexion

L'authentification utilise NextAuth v5 avec le provider Credentials.

```typescript
// Exemple de connexion
import { signIn } from "next-auth/react"

await signIn("credentials", {
  username: "admin",
  password: "admin123456",
  redirect: true,
  callbackUrl: "/admin"
})
```

### Protection des routes

Les routes `/admin/*` sont automatiquement protégées par le middleware NextAuth.

### Récupérer la session

```typescript
import { auth } from "@/auth"

// Server Component
const session = await auth()

// API Route
export async function GET() {
  const session = await auth()
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
}
```

---

## 💡 Utilisation

### Créer une masterclass

```typescript
const response = await fetch('/api/admin/masterclasses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    icon: "🌾",
    title: "Transformation Locale",
    description: "Apprenez à transformer vos produits...",
    features: [
      "Techniques de conservation",
      "Packaging et branding"
    ],
    cta: "Commencer",
    backgroundColor: "from-amber-50 to-orange-50",
    showVideosOnHome: false
  })
})
```

### Activer/désactiver les vidéos sur l'accueil

```typescript
await fetch(`/api/admin/masterclasses/${masterclassId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    showVideosOnHome: true  // Active l'affichage sur l'accueil
  })
})
```

### Créer une session programmée

```typescript
const response = await fetch('/api/admin/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    seminarId: "xxx",
    startDate: "2025-03-15T09:00:00Z",
    endDate: "2025-03-16T17:00:00Z",
    location: "Paris, France",
    maxParticipants: 15,
    price: 1500,
    currency: "EUR",
    isPublished: true,
    status: "SCHEDULED"
  })
})
```

### Créer un sous-admin

```typescript
// Réservé aux SUPER_ADMIN
const response = await fetch('/api/admin/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: "john_doe",
    email: "john@example.com",
    password: "securePassword123",
    role: "SUB_ADMIN"
  })
})
```

---

## 🛠️ Commandes utiles Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les changements du schéma
npx prisma db push

# Créer une migration
npx prisma migrate dev --name nom_de_la_migration

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Voir l'état des migrations
npx prisma migrate status
```

---

## 🔒 Sécurité

### Bonnes pratiques

1. **Mots de passe** : Tous les mots de passe sont hachés avec bcrypt (10 rounds)
2. **Variables d'environnement** : Ne jamais committer le fichier `.env`
3. **AUTH_SECRET** : Utiliser une clé forte générée aléatoirement
4. **Validation** : Toutes les routes API valident les données entrantes
5. **Permissions** : Système de rôles SUPER_ADMIN / SUB_ADMIN
6. **Session** : Les sessions sont gérées par NextAuth avec cookies sécurisés

### Permissions

| Action | SUB_ADMIN | SUPER_ADMIN |
|--------|-----------|-------------|
| Gérer masterclasses | ✅ | ✅ |
| Gérer séminaires | ✅ | ✅ |
| Gérer sessions | ✅ | ✅ |
| Créer sous-admins | ❌ | ✅ |
| Gérer admins | ❌ | ✅ |
| Modifier son profil | ✅ | ✅ |

---

## 📝 Notes importantes

1. **Slug unique** : Chaque séminaire doit avoir un slug unique pour l'URL
2. **Cascade delete** : La suppression d'une masterclass supprime ses vidéos
3. **Soft delete** : Utilisez `isActive: false` plutôt que de supprimer
4. **DisplayOrder** : Permet de réorganiser l'ordre d'affichage
5. **showVideosOnHome** : Toggle pour afficher les vidéos sur la page d'accueil

---

## 🚀 Prochaines étapes

Pour utiliser cette base de données dans vos composants admin existants :

1. Remplacez les `useState` avec des appels API
2. Utilisez `useSession` de next-auth pour l'authentification
3. Ajoutez des loaders pendant les requêtes
4. Implémentez la gestion d'erreurs
5. Ajoutez des toasts de confirmation

Exemple :

```typescript
// Avant (état local)
const [masterclasses, setMasterclasses] = useState([])

// Après (API)
const { data: masterclasses, isLoading } = useSWR(
  '/api/admin/masterclasses',
  fetcher
)
```
