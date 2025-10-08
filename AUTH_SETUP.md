# 🔐 Configuration de l'authentification admin

## ✅ Ce qui a été configuré

### 1. Pages créées

- ✅ **[/app/admin/login/page.tsx](app/admin/login/page.tsx)** - Page de connexion avec NextAuth
- ✅ **[/app/admin/page.tsx](app/admin/page.tsx)** - Dashboard principal admin
- ✅ **[/app/admin/layout.tsx](app/admin/layout.tsx)** - Layout avec protection automatique
- ✅ **[/app/not-found.tsx](app/not-found.tsx)** - Page 404 globale
- ✅ **[/app/admin/not-found.tsx](app/admin/not-found.tsx)** - Page 404 admin

### 2. Composants créés

- ✅ **[/components/admin/admin-nav.tsx](components/admin/admin-nav.tsx)** - Navigation admin avec menu
- ✅ **[/components/providers/session-provider.tsx](components/providers/session-provider.tsx)** - Provider NextAuth

### 3. Protection des routes

- ✅ **[/middleware.ts](middleware.ts)** - Middleware NextAuth pour protéger `/admin/*`
- ✅ Redirection automatique vers `/admin/login` si non connecté
- ✅ Redirection vers `/admin` si déjà connecté sur la page login

---

## 🚀 Démarrage

### Étape 1 : Configurer la base de données

```bash
# 1. Copier le fichier .env
cp .env.example .env

# 2. Modifier .env avec vos informations PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
AUTH_SECRET="votre-clé-secrète" # Générer avec: openssl rand -base64 32
AUTH_URL="http://localhost:3000"

# 3. Générer le client Prisma
npm run db:generate

# 4. Créer les tables
npm run db:push

# 5. Créer le premier super admin
npm run db:seed
```

### Étape 2 : Lancer l'application

```bash
npm run dev
```

### Étape 3 : Se connecter

Accédez à : **http://localhost:3000/admin/login**

**Identifiants par défaut :**
- Username: `admin`
- Password: `admin123456`

⚠️ **Changez immédiatement le mot de passe après la première connexion !**

---

## 📋 Fonctionnalités de l'admin

### Navigation

La barre de navigation admin inclut :

1. **Dashboard** - Vue d'ensemble
2. **Masterclasses** - Gestion des masterclasses
3. **Séminaires** - Gestion des séminaires
4. **Sessions** - Programmation des sessions
5. **Administrateurs** - Gestion des sous-admins (SUPER_ADMIN uniquement)

### Permissions

| Fonctionnalité | SUB_ADMIN | SUPER_ADMIN |
|---------------|-----------|-------------|
| Voir le dashboard | ✅ | ✅ |
| Gérer masterclasses | ✅ | ✅ |
| Gérer séminaires | ✅ | ✅ |
| Gérer sessions | ✅ | ✅ |
| Voir les admins | ❌ | ✅ |
| Créer des sous-admins | ❌ | ✅ |

---

## 🎨 Pages 404

### Page 404 globale

- URL : Toute URL inexistante (ex: `/page-inexistante`)
- Design : Moderne avec gradient
- Actions : Retour à l'accueil, page précédente, suggestions de pages

### Page 404 admin

- URL : Routes admin inexistantes (ex: `/admin/inexistant`)
- Design : Cohérent avec l'interface admin
- Actions : Retour au dashboard, page précédente

---

## 🔒 Sécurité

### Protection des routes

Le middleware protège automatiquement toutes les routes `/admin/*` :

```typescript
// middleware.ts
export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login"

  // Redirection si non connecté
  if (isOnAdmin && !isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // Redirection si déjà connecté
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }
})
```

### Authentification

- ✅ Hashage bcrypt des mots de passe (10 rounds)
- ✅ Sessions sécurisées avec NextAuth v5
- ✅ Cookies HttpOnly
- ✅ Protection CSRF automatique
- ✅ Dernière connexion trackée

---

## 🛠️ Personnalisation

### Modifier le logo admin

Dans `components/admin/admin-nav.tsx` :

```tsx
<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-lg">DK</span>
</div>
```

### Ajouter des routes admin

1. Créer un fichier dans `app/admin/ma-route/page.tsx`
2. Ajouter la route dans la navigation (`admin-nav.tsx`)
3. C'est tout ! La protection est automatique

### Modifier les permissions

Dans `components/admin/admin-nav.tsx`, ligne 33 :

```tsx
// Ajouter une condition pour certaines routes
if (session?.user?.role === "SUPER_ADMIN") {
  navigation.push({
    name: "Administrateurs",
    href: "/admin/users",
    icon: Users
  })
}
```

---

## 📱 Responsive

L'interface admin est **entièrement responsive** :

- ✅ Navigation desktop (barre horizontale)
- ✅ Navigation mobile (menu hamburger)
- ✅ Grilles adaptatives
- ✅ Cartes empilables sur mobile

---

## 🧪 Tests recommandés

### Test de connexion

```bash
# 1. Accéder à /admin (sans être connecté)
# → Doit rediriger vers /admin/login

# 2. Se connecter avec de mauvais identifiants
# → Doit afficher une erreur

# 3. Se connecter avec les bons identifiants
# → Doit rediriger vers /admin

# 4. Accéder à /admin/login (en étant connecté)
# → Doit rediriger vers /admin
```

### Test de déconnexion

```bash
# 1. Cliquer sur le menu utilisateur
# 2. Cliquer sur "Déconnexion"
# → Doit rediriger vers /admin/login

# 3. Essayer d'accéder à /admin
# → Doit rediriger vers /admin/login
```

### Test 404

```bash
# 1. Accéder à /page-inexistante
# → Doit afficher la page 404 globale

# 2. Accéder à /admin/page-inexistante
# → Doit afficher la page 404 admin
```

---

## 📝 Prochaines étapes

### 1. Intégrer avec les composants existants

Modifiez vos composants admin existants pour utiliser l'API :

```typescript
// Dans masterclass-admin.tsx
import { useSession } from "next-auth/react"

export function MasterclassAdmin() {
  const { data: session } = useSession()

  // Remplacer useState par des appels API
  const { data: masterclasses } = useSWR('/api/admin/masterclasses')

  // ...
}
```

### 2. Créer les pages de gestion

- `/admin/masterclasses/page.tsx` - Liste et CRUD des masterclasses
- `/admin/seminaires/page.tsx` - Liste et CRUD des séminaires
- `/admin/sessions/page.tsx` - Liste et CRUD des sessions
- `/admin/users/page.tsx` - Liste et gestion des admins (SUPER_ADMIN)

### 3. Ajouter des statistiques au dashboard

Dans `app/admin/page.tsx`, remplacez les `-` par des requêtes à la DB :

```typescript
const masterclassCount = await prisma.masterclass.count({
  where: { isActive: true }
})
```

---

## 🔍 Structure des fichiers

```
app/
├── admin/
│   ├── layout.tsx              # Layout avec protection
│   ├── page.tsx                # Dashboard
│   ├── login/
│   │   └── page.tsx            # Page de connexion
│   ├── not-found.tsx           # 404 admin
│   └── [autres-routes]/        # À créer
├── not-found.tsx               # 404 global
└── layout.tsx                  # Layout global (avec SessionProvider)

components/
├── admin/
│   └── admin-nav.tsx           # Navigation admin
└── providers/
    └── session-provider.tsx    # Provider NextAuth

middleware.ts                    # Protection des routes
```

---

## 💡 Conseils

1. **Testez toujours en navigation privée** pour vérifier les redirections
2. **Changez le mot de passe par défaut** immédiatement
3. **Créez un SUPER_ADMIN** personnel avant de créer des SUB_ADMIN
4. **Utilisez HTTPS en production** pour sécuriser les cookies
5. **Configurez les variables d'environnement** sur votre serveur de production

---

## 🆘 Dépannage

### Erreur : "Invalid session"

```bash
# Vérifier que AUTH_SECRET est défini
echo $AUTH_SECRET

# Le régénérer si nécessaire
openssl rand -base64 32
```

### Redirection infinie

```bash
# Vérifier le middleware.ts
# S'assurer que /admin/login est exclu de la protection
```

### Ne peut pas se connecter

```bash
# Vérifier que l'admin existe
npm run db:seed

# Vérifier les logs de l'API
# Regarder la console du navigateur
```

---

## ✅ Checklist de production

Avant de déployer :

- [ ] Changer le mot de passe du super admin
- [ ] Configurer AUTH_SECRET unique et fort
- [ ] Configurer AUTH_URL avec votre domaine HTTPS
- [ ] Tester la connexion
- [ ] Tester la déconnexion
- [ ] Tester les permissions (SUPER_ADMIN vs SUB_ADMIN)
- [ ] Tester sur mobile
- [ ] Vérifier que les routes sont protégées
- [ ] Configurer les backups de la base de données

---

**Tout est prêt ! 🎉**

Vous pouvez maintenant vous connecter à votre panneau d'administration et commencer à gérer votre contenu.
