# 🔒 Sécurité Admin - Documentation

## ✅ Système de protection complet

Toutes les routes admin sont **entièrement protégées** avec plusieurs couches de sécurité.

---

## 🛡️ Couches de sécurité

### 1. Middleware (Premier niveau)

**Fichier:** [middleware.ts](middleware.ts)

Le middleware intercepte **toutes** les requêtes vers `/admin/*` et vérifie l'authentification.

```typescript
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login"

  // Redirection automatique vers login si non connecté
  if (isOnAdmin && !isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // Redirection vers admin si déjà connecté
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }
})
```

**Protection :**
- ✅ Bloque l'accès à toutes les pages admin sans connexion
- ✅ Redirige automatiquement vers `/admin/login`
- ✅ Empêche l'accès à la page login si déjà connecté
- ✅ S'exécute côté serveur (impossible à contourner)

---

### 2. Layout Admin (Deuxième niveau)

**Fichier:** [app/admin/layout.tsx](app/admin/layout.tsx)

Le layout vérifie la session et adapte l'affichage.

```typescript
export default async function AdminLayout({ children }) {
  const session = await auth()

  // Afficher sans navigation pour la page de login
  if (!session) {
    return <div className="min-h-screen">{children}</div>
  }

  // Afficher avec navigation pour les pages protégées
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav session={session} />
      <main>{children}</main>
    </div>
  )
}
```

**Protection :**
- ✅ Vérifie la session côté serveur
- ✅ Affiche la navigation uniquement si connecté
- ✅ Passe les infos utilisateur à la navigation

---

### 3. Pages protégées (Troisième niveau)

Certaines pages ont une protection supplémentaire (ex: `/admin/users`)

**Fichier:** [app/admin/users/page.tsx](app/admin/users/page.tsx)

```typescript
export default async function UsersPage() {
  const session = await auth()

  // Vérifier que l'utilisateur est un SUPER_ADMIN
  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/admin")
  }

  return <UsersAdmin />
}
```

**Protection :**
- ✅ Vérifie le rôle de l'utilisateur
- ✅ Redirige les SUB_ADMIN vers le dashboard
- ✅ Protection par rôle au niveau de la page

---

## 👤 Affichage des informations utilisateur

### Navigation Admin

**Fichier:** [components/admin/admin-nav.tsx](components/admin/admin-nav.tsx)

La navigation affiche :

**Desktop :**
```
┌─────────────────────────────────────────────┐
│ [Logo] Dr Kanga  |  Dashboard  Masterclasses │
│                  |  Séminaires  Sessions     │
│                  |                     [👤 john_doe ▼] │
└─────────────────────────────────────────────┘
```

**Menu utilisateur (dropdown) :**
```
┌─────────────────────────┐
│ john_doe                │
│ Super Administrateur    │
├─────────────────────────┤
│ ⚙️  Paramètres          │
├─────────────────────────┤
│ 🚪 Déconnexion          │
└─────────────────────────┘
```

**Mobile :**
```
┌──────────────────────┐
│ [Logo]        [👤] [☰]│
└──────────────────────┘
```

**Informations affichées :**
- ✅ Nom d'utilisateur
- ✅ Rôle (Super Administrateur / Administrateur)
- ✅ Bouton de déconnexion
- ✅ Lien vers les paramètres

---

## 🚪 Déconnexion

### Fonctionnement

```typescript
const handleSignOut = async () => {
  await signOut({ callbackUrl: "/admin/login" })
}
```

**Processus :**
1. L'utilisateur clique sur "Déconnexion"
2. NextAuth détruit la session
3. Redirection automatique vers `/admin/login`
4. Le middleware bloque tout accès aux pages admin
5. L'utilisateur doit se reconnecter

**Sécurité :**
- ✅ Session détruite côté serveur
- ✅ Cookies supprimés
- ✅ Impossible de revenir en arrière
- ✅ Redirection automatique

---

## 🔐 Flux de connexion/déconnexion

### Scénario 1 : Utilisateur non connecté

```
1. Utilisateur accède à /admin
   ↓
2. Middleware détecte : pas de session
   ↓
3. Redirection automatique → /admin/login
   ↓
4. Affichage du formulaire de connexion
   ↓
5. Utilisateur entre username + password
   ↓
6. NextAuth vérifie les identifiants
   ↓
7. Si valides : création de session
   ↓
8. Redirection → /admin
   ↓
9. Navigation admin affichée avec infos utilisateur
```

### Scénario 2 : Utilisateur déjà connecté

```
1. Utilisateur accède à /admin/login
   ↓
2. Middleware détecte : session existe
   ↓
3. Redirection automatique → /admin
   ↓
4. Affichage du dashboard avec navigation
```

### Scénario 3 : Déconnexion

```
1. Utilisateur clique sur "Déconnexion"
   ↓
2. NextAuth détruit la session
   ↓
3. Redirection → /admin/login
   ↓
4. Si l'utilisateur essaie d'accéder à /admin
   ↓
5. Middleware bloque et redirige → /admin/login
```

---

## 🎯 Permissions par rôle

### SUPER_ADMIN

**Accès complet :**
- ✅ Dashboard
- ✅ Masterclasses (CRUD)
- ✅ Séminaires (CRUD)
- ✅ Sessions (CRUD)
- ✅ **Administrateurs (CRUD)** ← Exclusif
- ✅ Paramètres personnels

**Navigation affiche :**
- Lien "Administrateurs" visible

### SUB_ADMIN

**Accès limité :**
- ✅ Dashboard
- ✅ Masterclasses (CRUD)
- ✅ Séminaires (CRUD)
- ✅ Sessions (CRUD)
- ❌ Administrateurs (bloqué)
- ✅ Paramètres personnels (uniquement)

**Navigation affiche :**
- Lien "Administrateurs" masqué

**Protection :**
```typescript
// Dans admin-nav.tsx
if (session?.user?.role === "SUPER_ADMIN") {
  navigation.push({
    name: "Administrateurs",
    href: "/admin/users",
    icon: Users
  })
}
```

**Protection page :**
```typescript
// Dans app/admin/users/page.tsx
if (!session || session.user.role !== "SUPER_ADMIN") {
  redirect("/admin")
}
```

---

## 🧪 Tests de sécurité

### Test 1 : Accès sans connexion

```bash
# 1. Ouvrir navigation privée
# 2. Accéder à http://localhost:3000/admin
# ✅ Doit rediriger vers /admin/login

# 3. Accéder à http://localhost:3000/admin/masterclasses
# ✅ Doit rediriger vers /admin/login

# 4. Accéder à http://localhost:3000/admin/users
# ✅ Doit rediriger vers /admin/login
```

### Test 2 : Double connexion

```bash
# 1. Se connecter sur /admin/login
# ✅ Doit rediriger vers /admin

# 2. Accéder manuellement à /admin/login
# ✅ Doit rediriger vers /admin
```

### Test 3 : Permissions SUB_ADMIN

```bash
# 1. Se connecter avec un compte SUB_ADMIN
# ✅ Dashboard accessible
# ✅ Navigation sans lien "Administrateurs"

# 2. Accéder manuellement à /admin/users
# ✅ Doit rediriger vers /admin
```

### Test 4 : Permissions SUPER_ADMIN

```bash
# 1. Se connecter avec un compte SUPER_ADMIN
# ✅ Dashboard accessible
# ✅ Navigation avec lien "Administrateurs"
# ✅ /admin/users accessible
```

### Test 5 : Déconnexion

```bash
# 1. Être connecté
# 2. Cliquer sur "Déconnexion"
# ✅ Redirection vers /admin/login

# 3. Cliquer sur "Précédent" du navigateur
# ✅ Doit rediriger vers /admin/login
```

### Test 6 : Session expirée

```bash
# 1. Se connecter
# 2. Attendre l'expiration de la session
# 3. Essayer d'accéder à une page admin
# ✅ Doit rediriger vers /admin/login
```

---

## 🔒 Sécurité des mots de passe

### Hachage

**Fichier:** [lib/auth/password.ts](lib/auth/password.ts)

```typescript
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10) // 10 rounds
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
```

**Protection :**
- ✅ Bcrypt avec 10 rounds de salt
- ✅ Impossible de retrouver le mot de passe d'origine
- ✅ Résistant aux attaques par force brute
- ✅ Chaque hash est unique (salt aléatoire)

### Création de compte

```typescript
// Dans /api/admin/users/route.ts
const hashedPassword = await hashPassword(password)

const newAdmin = await prisma.admin.create({
  data: {
    username,
    password: hashedPassword, // ← Stocké haché
    // ...
  }
})
```

**⚠️ IMPORTANT :**
- Les mots de passe ne sont **JAMAIS** stockés en clair
- Minimum 8 caractères requis
- Validation côté client et serveur

---

## 🔐 Sessions NextAuth

### Configuration

**Fichier:** [auth.config.ts](auth.config.ts)

```typescript
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [Credentials],
  callbacks: {
    authorized({ auth, request }) {
      // Vérification automatique
    },
    jwt({ token, user }) {
      // Personnalisation du JWT
    },
    session({ session, token }) {
      // Ajout des infos utilisateur
    },
  },
}
```

**Sécurité :**
- ✅ Cookies HttpOnly (inaccessibles en JavaScript)
- ✅ Cookies sécurisés (HTTPS en production)
- ✅ Protection CSRF automatique
- ✅ JWT signé et vérifié
- ✅ Expiration automatique

---

## ⚠️ Recommandations de sécurité

### En développement

```env
AUTH_SECRET="clé-de-dev" # OK pour le dev
AUTH_URL="http://localhost:3000"
```

### En production

```env
AUTH_SECRET="[clé très longue et aléatoire générée]"
AUTH_URL="https://votre-domaine.com"
```

**Générer une clé sécurisée :**
```bash
openssl rand -base64 32
```

### Checklist production

- [ ] Générer un nouveau `AUTH_SECRET`
- [ ] Utiliser HTTPS uniquement
- [ ] Changer le mot de passe du super admin
- [ ] Configurer les variables d'environnement
- [ ] Activer les logs de sécurité
- [ ] Configurer un système de backup
- [ ] Limiter les tentatives de connexion
- [ ] Ajouter une authentification à deux facteurs (optionnel)

---

## 📊 Résumé de la sécurité

| Élément | Status | Protection |
|---------|--------|------------|
| Routes admin | ✅ | Middleware NextAuth |
| Page login | ✅ | Redirection si connecté |
| Mots de passe | ✅ | Bcrypt (10 rounds) |
| Sessions | ✅ | NextAuth v5 + JWT |
| Cookies | ✅ | HttpOnly + Secure |
| Permissions | ✅ | Vérification par rôle |
| Navigation | ✅ | Adaptée selon le rôle |
| Déconnexion | ✅ | Destruction de session |
| API Routes | ✅ | Vérification de session |

---

## 🆘 En cas de problème

### Impossible de se connecter

1. Vérifier que `AUTH_SECRET` est défini dans `.env`
2. Vérifier que la base de données est accessible
3. Vérifier que l'admin existe : `npm run db:seed`
4. Regarder les logs de la console navigateur
5. Regarder les logs du serveur

### Session qui expire trop vite

Modifier la durée dans `auth.config.ts` :

```typescript
session: {
  maxAge: 30 * 24 * 60 * 60, // 30 jours
}
```

### Redirection infinie

1. Vérifier le middleware
2. Vérifier que `/admin/login` n'est pas protégé
3. Vider les cookies du navigateur
4. Relancer le serveur

---

**Votre système admin est entièrement sécurisé ! 🔒**

Toutes les routes sont protégées, les mots de passe sont hachés, et les permissions sont correctement gérées.
