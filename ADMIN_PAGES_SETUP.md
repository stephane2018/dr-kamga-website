# 📄 Pages Admin - Documentation

## ✅ Pages créées

Toutes les pages admin sont maintenant accessibles via la navigation :

### 1. Dashboard
**Route:** `/admin`
**Fichier:** [app/admin/page.tsx](app/admin/page.tsx)

**Fonctionnalités:**
- Vue d'ensemble avec statistiques
- Actions rapides vers toutes les sections
- Informations utilisateur et permissions
- Accessible à tous les admins

---

### 2. Gestion des Masterclasses
**Route:** `/admin/masterclasses`
**Fichier:** [app/admin/masterclasses/page.tsx](app/admin/masterclasses/page.tsx)
**Composant:** [components/admin/masterclass-admin.tsx](components/admin/masterclass-admin.tsx)

**Fonctionnalités:**
- ✅ Créer une masterclass
- ✅ Modifier une masterclass
- ✅ Supprimer une masterclass
- ✅ Liste avec aperçu visuel
- ✅ Gestion de l'icône (emoji)
- ✅ Gestion du gradient de couleur
- ✅ Caractéristiques (features)
- ✅ Call-to-action personnalisable

**Champs:**
- `icon` - Emoji représentant la masterclass
- `title` - Titre de la masterclass
- `description` - Description détaillée
- `features` - Liste de caractéristiques (une par ligne)
- `cta` - Texte du bouton d'action
- `backgroundColor` - Classes Tailwind pour le gradient

---

### 3. Gestion des Séminaires
**Route:** `/admin/seminaires`
**Fichier:** [app/admin/seminaires/page.tsx](app/admin/seminaires/page.tsx)
**Composant:** [components/admin/seminaires-admin.tsx](components/admin/seminaires-admin.tsx)

**Fonctionnalités:**
- ✅ Créer un séminaire
- ✅ Modifier un séminaire
- ✅ Supprimer un séminaire
- ✅ Gestion du programme par jour
- ✅ Support des médias (images, vidéos)
- ✅ Badge de statut

**Champs:**
- Titre, sous-titre, description
- Durée (ex: "2 jours")
- Participants (ex: "12-15 participants")
- Lieu
- Programme détaillé par jour
- Image et vidéo URL
- Date de la prochaine session

---

### 4. Gestion des Sessions
**Route:** `/admin/sessions`
**Fichier:** [app/admin/sessions/page.tsx](app/admin/sessions/page.tsx)
**Composant:** [components/admin/sessions-admin.tsx](components/admin/sessions-admin.tsx)

**Fonctionnalités:**
- ✅ Programmer une nouvelle session
- ✅ Modifier une session existante
- ✅ Supprimer une session
- ✅ Gestion des dates (début/fin)
- ✅ Gestion de la capacité (participants max/actuels)
- ✅ Gestion du prix
- ✅ Statuts multiples
- ✅ Publication/dépublication

**Champs:**
- `seminarTitle` - Nom du séminaire
- `startDate` / `endDate` - Dates de la session
- `location` - Lieu de la session
- `maxParticipants` - Capacité maximale
- `price` - Prix en EUR
- `status` - Statut de la session
- `isPublished` - Visible sur le site public

**Statuts disponibles:**
- 🔵 **SCHEDULED** - Planifiée
- 🟢 **CONFIRMED** - Confirmée
- 🟣 **IN_PROGRESS** - En cours
- ⚪ **COMPLETED** - Terminée
- 🔴 **CANCELLED** - Annulée

---

### 5. Gestion des Administrateurs
**Route:** `/admin/users`
**Fichier:** [app/admin/users/page.tsx](app/admin/users/page.tsx)
**Composant:** [components/admin/users-admin.tsx](components/admin/users-admin.tsx)

**⚠️ Accès restreint:** Réservé aux **SUPER_ADMIN** uniquement

**Fonctionnalités:**
- ✅ Créer un sous-administrateur
- ✅ Modifier un administrateur
- ✅ Supprimer un administrateur
- ✅ Activer/désactiver un compte
- ✅ Changer le rôle
- ✅ Réinitialiser le mot de passe
- ✅ Voir la dernière connexion

**Champs:**
- `username` - Nom d'utilisateur (unique)
- `email` - Email (optionnel)
- `password` - Mot de passe (min 8 caractères)
- `role` - SUPER_ADMIN ou SUB_ADMIN
- `isActive` - Statut du compte

**Rôles:**
- **SUPER_ADMIN** - Accès complet + gestion des admins
- **SUB_ADMIN** - Accès limité aux contenus

---

## 🎯 Navigation

La navigation est gérée automatiquement par [components/admin/admin-nav.tsx](components/admin/admin-nav.tsx)

**Menu desktop:**
- Barre horizontale en haut
- Liens vers toutes les sections
- Menu utilisateur (dropdown)

**Menu mobile:**
- Bouton hamburger
- Menu déroulant
- Responsive et tactile

**Items de navigation:**
- Dashboard (tous)
- Masterclasses (tous)
- Séminaires (tous)
- Sessions (tous)
- Administrateurs (SUPER_ADMIN uniquement)

---

## 🔐 Permissions

| Page | SUB_ADMIN | SUPER_ADMIN |
|------|-----------|-------------|
| Dashboard | ✅ | ✅ |
| Masterclasses | ✅ | ✅ |
| Séminaires | ✅ | ✅ |
| Sessions | ✅ | ✅ |
| Administrateurs | ❌ | ✅ |

---

## 🎨 Design

**Toutes les pages admin suivent le même design:**

- ✅ Fond blanc pour les cartes
- ✅ Ombres et bordures légères
- ✅ Coins arrondis (rounded-2xl)
- ✅ Icônes Lucide React
- ✅ Badges colorés pour les statuts
- ✅ Formulaires en modal/inline
- ✅ Grilles responsives
- ✅ Animations de transition

**Composants utilisés:**
- Button (shadcn/ui)
- Input (shadcn/ui)
- Badge (shadcn/ui)
- Select (shadcn/ui)
- Lucide Icons

---

## 📱 Responsive

**Toutes les pages sont entièrement responsives:**

- ✅ Grilles adaptatives (1 col → 2 cols → 3 cols)
- ✅ Navigation mobile avec hamburger
- ✅ Formulaires empilables sur mobile
- ✅ Cartes lisibles sur petits écrans
- ✅ Boutons tactiles

**Breakpoints:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

---

## 🔄 Intégration avec l'API

**Les composants actuels utilisent des données de démo.**

Pour connecter à la base de données, remplacez :

```typescript
// Avant (démo)
const [masterclasses, setMasterclasses] = useState([...])

// Après (API)
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const { data: masterclasses, error, mutate } = useSWR('/api/admin/masterclasses', fetcher)

// Pour créer
const handleCreate = async (data) => {
  await fetch('/api/admin/masterclasses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  mutate() // Rafraîchir les données
}

// Pour modifier
const handleUpdate = async (id, data) => {
  await fetch(`/api/admin/masterclasses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  mutate()
}

// Pour supprimer
const handleDelete = async (id) => {
  await fetch(`/api/admin/masterclasses/${id}`, { method: 'DELETE' })
  mutate()
}
```

---

## 🧪 Test des pages

### Tester la navigation

```bash
# 1. Se connecter à /admin/login
# 2. Cliquer sur chaque lien de navigation
# 3. Vérifier que la page se charge correctement
# 4. Vérifier que l'URL change
# 5. Vérifier que le lien actif est surligné
```

### Tester les permissions

```bash
# Avec un compte SUB_ADMIN:
# 1. Le lien "Administrateurs" ne doit PAS apparaître
# 2. Accéder à /admin/users doit rediriger vers /admin

# Avec un compte SUPER_ADMIN:
# 1. Le lien "Administrateurs" doit apparaître
# 2. Accéder à /admin/users doit fonctionner
```

### Tester les formulaires

```bash
# 1. Cliquer sur "Nouvelle [ressource]"
# 2. Remplir tous les champs requis
# 3. Cliquer sur "Créer"
# 4. Vérifier la console (console.log des données)
# 5. Le formulaire doit se fermer

# Pour modifier:
# 1. Cliquer sur l'icône Edit
# 2. Le formulaire doit se pré-remplir
# 3. Modifier et sauvegarder
# 4. Vérifier les changements
```

### Tester le responsive

```bash
# 1. Réduire la fenêtre du navigateur
# 2. Vérifier que le menu hamburger apparaît
# 3. Cliquer sur le hamburger
# 4. Vérifier que le menu déroulant fonctionne
# 5. Vérifier que les grilles s'adaptent
```

---

## 📁 Structure des fichiers

```
app/admin/
├── layout.tsx                    # Layout avec protection
├── page.tsx                      # Dashboard
├── login/
│   └── page.tsx                  # Page de connexion
├── masterclasses/
│   └── page.tsx                  # Gestion masterclasses
├── seminaires/
│   └── page.tsx                  # Gestion séminaires
├── sessions/
│   └── page.tsx                  # Gestion sessions
├── users/
│   └── page.tsx                  # Gestion admins (SUPER_ADMIN)
└── not-found.tsx                 # 404 admin

components/admin/
├── admin-nav.tsx                 # Navigation admin
├── masterclass-admin.tsx         # Composant masterclasses
├── seminaires-admin.tsx          # Composant séminaires
├── sessions-admin.tsx            # Composant sessions
└── users-admin.tsx               # Composant admins
```

---

## 🚀 Prochaines étapes

### 1. Connecter à l'API

Installez SWR pour la gestion des données :

```bash
npm install swr
```

Puis modifiez chaque composant pour utiliser les endpoints API.

### 2. Ajouter des toasts

Installez sonner (déjà présent) :

```typescript
import { toast } from "sonner"

// Succès
toast.success("Masterclass créée avec succès!")

// Erreur
toast.error("Une erreur s'est produite")
```

### 3. Ajouter des confirmations

Utilisez un dialog de confirmation au lieu de `confirm()` :

```typescript
import { AlertDialog } from "@/components/ui/alert-dialog"

// Voir documentation shadcn/ui
```

### 4. Ajouter des loaders

```typescript
const { data, error, isLoading } = useSWR('/api/admin/masterclasses', fetcher)

if (isLoading) return <Spinner />
if (error) return <Error />
```

---

## ✅ Checklist

- [x] Dashboard créé
- [x] Page Masterclasses créée
- [x] Page Séminaires créée
- [x] Page Sessions créée
- [x] Page Admins créée (SUPER_ADMIN)
- [x] Navigation responsive
- [x] Protection des routes
- [x] Permissions par rôle
- [x] Design cohérent
- [ ] Connexion à l'API
- [ ] Gestion d'erreurs
- [ ] Toasts de feedback
- [ ] Upload d'images
- [ ] Pagination

---

**Toutes les pages admin sont prêtes ! 🎉**

Vous pouvez maintenant naviguer entre les différentes sections et gérer votre contenu.
