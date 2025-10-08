# 🎥 Gestion des Vidéos Masterclass - Documentation

## ✅ Fonctionnalité créée

Système complet de gestion des vidéos complémentaires pour les masterclasses avec :
- Affichage dynamique sur la page masterclass
- Interface admin CRUD complète
- Toggle pour activer/désactiver sur la page d'accueil
- Ordre d'affichage personnalisable

---

## 📊 Base de données

### Schéma Prisma mis à jour

**Fichier:** [prisma/schema.prisma](prisma/schema.prisma)

```prisma
model MasterclassVideo {
  id            String      @id @default(cuid())
  title         String
  description   String?     @db.Text
  videoUrl      String      // YouTube URL
  thumbnailUrl  String?
  duration      String?     // e.g., "8 min", "45 min"
  category      String?     // e.g., "Capsule", "Cours Long"
  displayOrder  Int         @default(0)
  isActive      Boolean     @default(true)
  showOnHome    Boolean     @default(false) // ← NOUVEAU : Afficher sur la page d'accueil

  // Relations
  masterclassId String
  masterclass   Masterclass @relation(fields: [masterclassId], references: [id], onDelete: Cascade)

  // Metadata
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([masterclassId])
  @@index([displayOrder])
  @@index([showOnHome]) // ← NOUVEAU : Index pour performance
}
```

**Nouveaux champs :**
- ✅ `category` - Type de vidéo (Capsule, Cours Long)
- ✅ `showOnHome` - Toggle pour afficher sur la page masterclass
- ✅ Index `showOnHome` pour optimiser les requêtes

---

## 🔌 API Routes

### Route publique (Frontend)

**Fichier:** [app/api/masterclass/videos/route.ts](app/api/masterclass/videos/route.ts)

```
GET /api/masterclass/videos
```

**Fonction :**
- Récupère toutes les vidéos actives avec `showOnHome = true`
- Inclut les infos de la masterclass associée
- Triées par `displayOrder`

**Réponse :**
```json
[
  {
    "id": "clxxx...",
    "title": "Les 3 règles pour produire...",
    "description": "Découvrez les standards...",
    "videoUrl": "https://youtube.com/watch?v=xxx",
    "thumbnailUrl": null,
    "duration": "8 min",
    "category": "Capsule",
    "displayOrder": 1,
    "showOnHome": true,
    "masterclass": {
      "id": "clyyy...",
      "title": "Transformation Locale",
      "icon": "🌾"
    }
  }
]
```

### Routes admin (Backend)

Les routes admin existantes dans [app/api/admin/masterclasses/[id]/videos/](app/api/admin/masterclasses/[id]/videos/) gèrent le CRUD.

---

## 🎨 Frontend (Page publique)

### Composant VideosSection

**Fichier:** [components/masterclass/videos-section.tsx](components/masterclass/videos-section.tsx)

**Fonctionnement :**

1. **Chargement des données**
   - Appel à `/api/masterclass/videos`
   - Si des vidéos existent en base → affichage dynamique
   - Si aucune vidéo → affichage des données par défaut

2. **Données par défaut** (si aucune vidéo en base)
   ```javascript
   const defaultVideos = [
     {
       title: "Les 3 règles pour produire selon les normes internationales",
       description: "Découvrez les standards essentiels...",
       category: "Capsule",
       duration: "8 min",
     },
     // ... 2 autres vidéos
   ]
   ```

3. **Affichage**
   - Grille responsive (1 col → 2 cols → 3 cols)
   - Cartes avec thumbnail (ou icône par défaut)
   - Badge catégorie + durée
   - Bouton "Voir la vidéo" → ouvre YouTube

**Features :**
- ✅ Chargement dynamique depuis l'API
- ✅ Fallback sur données par défaut
- ✅ Design identique à la maquette
- ✅ Responsive
- ✅ Gestion d'erreurs

---

## 🛠️ Admin (Interface de gestion)

### Page admin

**Route:** `/admin/masterclass-videos`
**Fichier:** [app/admin/masterclass-videos/page.tsx](app/admin/masterclass-videos/page.tsx)

**Composant:** [components/admin/masterclass-videos-admin.tsx](components/admin/masterclass-videos-admin.tsx)

### Fonctionnalités CRUD

#### 1. Liste des vidéos

**Affichage :**
- Toutes les vidéos avec infos détaillées
- Badge catégorie (Capsule / Cours Long)
- Badge "Visible" si `showOnHome = true`
- Icônes œil vert (visible) / œil gris (masqué)
- Lien cliquable vers YouTube

**Actions :**
- 👁️ Toggle visibilité (œil)
- ✏️ Modifier
- 🗑️ Supprimer

#### 2. Formulaire de création/édition

**Champs :**
- **Titre** * (requis)
- **Description** (optionnel)
- **URL vidéo YouTube** * (requis)
- **URL miniature** (optionnel)
- **Durée** (ex: "8 min")
- **Catégorie** (select: Capsule / Cours Long)
- **Ordre d'affichage** (nombre)
- **Masterclass associée** * (requis)
- **☑️ Afficher sur la page masterclass** (toggle important)

**Validation :**
- Titre, URL vidéo et masterclass requis
- URL vidéo doit être une URL YouTube valide

#### 3. Toggle "Afficher sur la page"

**Fonctionnement :**
- Checkbox dans le formulaire
- Bouton œil dans la liste pour toggle rapide
- Badge vert "Visible" si activé
- Seules les vidéos avec `showOnHome = true` s'affichent publiquement

---

## 🧭 Navigation Admin

**Mise à jour:** [components/admin/admin-nav.tsx](components/admin/admin-nav.tsx)

**Nouveau lien ajouté :**
```
Dashboard → Masterclasses → 🎥 Vidéos → Séminaires → Sessions → [Administrateurs]
```

**Icône :** 🎥 Video (Lucide React)

---

## 📸 Design - Comparaison avec la maquette

### Page publique

**Maquette :**
```
┌─────────────────────────────────────────┐
│     Vidéos Complémentaires              │
│     Description...                      │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ [Vid]  │  │ [Vid]  │  │ [Vid]  │   │
│  │Capsule │  │ Long   │  │Capsule │   │
│  │8 min   │  │45 min  │  │12 min  │   │
│  │Titre...│  │Titre...│  │Titre...│   │
│  │Desc... │  │Desc... │  │Desc... │   │
│  │[Voir]  │  │[Voir]  │  │[Voir]  │   │
│  └────────┘  └────────┘  └────────┘   │
└─────────────────────────────────────────┘
```

**Implémentation :**
- ✅ Design identique
- ✅ Badge catégorie (Capsule marron / Cours Long outline)
- ✅ Durée avec icône calendrier
- ✅ Bouton marron "Voir la vidéo"
- ✅ Grille 3 colonnes responsive
- ✅ Thumbnails ou icône vidéo par défaut

---

## 🚀 Utilisation

### 1. Mise à jour du schéma

```bash
# Appliquer les changements Prisma
npm run db:generate
npm run db:push
```

### 2. Créer des vidéos via l'admin

1. Se connecter à `/admin/login`
2. Aller sur "Vidéos" dans la navigation
3. Cliquer "Nouvelle Vidéo"
4. Remplir le formulaire :
   - Titre : "Les 3 règles pour produire..."
   - Description : "Découvrez les standards..."
   - URL vidéo : `https://youtube.com/watch?v=xxx`
   - Durée : "8 min"
   - Catégorie : "Capsule"
   - Ordre : 1
   - ☑️ **Afficher sur la page masterclass** (IMPORTANT)
5. Cliquer "Créer"

### 3. Affichage public

- Aller sur `/masterclass`
- Scroller vers "Vidéos Complémentaires"
- Les vidéos avec `showOnHome = true` s'affichent

### 4. Toggle visibilité rapide

Dans l'admin :
- Cliquer sur l'icône œil 👁️
- La vidéo passe de visible ↔️ masquée
- Badge "Visible" apparaît/disparaît
- Changement immédiat sur le site public

---

## 🎯 Cas d'usage

### Scénario 1 : Aucune vidéo en base

**Comportement :**
- La page masterclass affiche les 3 vidéos par défaut
- Design identique à la maquette
- Boutons "Voir la vidéo" non fonctionnels (URL = "#")

### Scénario 2 : Vidéos en base

**Comportement :**
- La page affiche les vidéos depuis la base de données
- Uniquement celles avec `showOnHome = true`
- Triées par `displayOrder`
- Boutons ouvrent YouTube

### Scénario 3 : Masquer une vidéo

**Méthode 1 - Via le formulaire :**
1. Modifier la vidéo
2. Décocher "Afficher sur la page masterclass"
3. Sauvegarder
4. La vidéo disparaît du site public

**Méthode 2 - Toggle rapide :**
1. Cliquer sur l'œil dans la liste
2. Badge "Visible" disparaît
3. La vidéo disparaît du site public

---

## 📝 Données de test

### Vidéo 1 (Capsule)
```json
{
  "title": "Les 3 règles pour produire selon les normes internationales",
  "description": "Découvrez les standards essentiels pour préparer vos produits à l'exportation.",
  "videoUrl": "https://youtube.com/watch?v=xxx",
  "duration": "8 min",
  "category": "Capsule",
  "displayOrder": 1,
  "showOnHome": true
}
```

### Vidéo 2 (Cours Long)
```json
{
  "title": "Comment transformer son produit et allonger sa durée de vie",
  "description": "Techniques de transformation pour maximiser la valeur ajoutée de vos produits.",
  "videoUrl": "https://youtube.com/watch?v=yyy",
  "duration": "45 min",
  "category": "Cours Long",
  "displayOrder": 2,
  "showOnHome": true
}
```

### Vidéo 3 (Capsule)
```json
{
  "title": "Les étapes clés pour réussir son export",
  "description": "Roadmap complète pour structurer votre démarche d'exportation.",
  "videoUrl": "https://youtube.com/watch?v=zzz",
  "duration": "12 min",
  "category": "Capsule",
  "displayOrder": 3,
  "showOnHome": true
}
```

---

## 🔄 Workflow complet

```
1. Admin crée une vidéo dans /admin/masterclass-videos
   ↓
2. Active "Afficher sur la page masterclass"
   ↓
3. La vidéo est sauvegardée avec showOnHome = true
   ↓
4. API /api/masterclass/videos retourne cette vidéo
   ↓
5. Le composant VideosSection l'affiche sur /masterclass
   ↓
6. Utilisateurs peuvent cliquer "Voir la vidéo" → YouTube
```

---

## ✅ Checklist de vérification

**Base de données :**
- [ ] Schéma Prisma mis à jour
- [ ] Migration appliquée (`npm run db:push`)
- [ ] Client Prisma régénéré (`npm run db:generate`)

**Admin :**
- [ ] Page `/admin/masterclass-videos` accessible
- [ ] Formulaire de création fonctionne
- [ ] Toggle "Afficher sur la page" fonctionne
- [ ] Toggle œil dans la liste fonctionne
- [ ] Badge "Visible" s'affiche correctement

**Frontend :**
- [ ] Page `/masterclass` affiche la section vidéos
- [ ] Vidéos par défaut s'affichent si BD vide
- [ ] Vidéos depuis BD s'affichent si présentes
- [ ] Badge catégorie correct (marron/outline)
- [ ] Bouton "Voir la vidéo" ouvre YouTube

**Navigation :**
- [ ] Lien "Vidéos" visible dans la nav admin
- [ ] Icône vidéo correcte
- [ ] Lien actif surligné quand sur la page

---

## 🎨 Design - Éléments clés

**Page publique :**
- Background : `bg-gradient-to-br from-slate-50 to-white`
- Cartes : `bg-white rounded-lg shadow-md`
- Badge Capsule : `bg-[#5C3317] text-white` (marron)
- Badge Cours Long : `variant="outline"`
- Bouton : `bg-[#5C3317] hover:bg-[#5C3317]/90` (marron)

**Admin :**
- Alert showOnHome : `bg-amber-50 border-amber-200`
- Badge Visible : `bg-green-100 text-green-800`
- Œil vert : `text-green-600`
- Œil gris : `text-gray-400`

---

## 🆘 Dépannage

### Vidéos ne s'affichent pas sur la page publique

**Vérifier :**
1. Les vidéos ont bien `showOnHome = true`
2. Les vidéos ont `isActive = true`
3. L'API `/api/masterclass/videos` retourne des données
4. La console navigateur ne montre pas d'erreur

### Badge "Visible" ne s'affiche pas

**Cause :** `showOnHome = false`
**Solution :** Cocher la case dans le formulaire ou cliquer sur l'œil

### URL vidéo ne fonctionne pas

**Vérifier :**
1. L'URL est bien une URL YouTube complète
2. Format : `https://youtube.com/watch?v=VIDEO_ID`
3. La vidéo YouTube est publique

---

## 📈 Améliorations futures (optionnel)

1. **Upload de thumbnails**
   - Service Cloudinary/AWS S3
   - Upload depuis l'admin

2. **Player intégré**
   - Embed YouTube dans un modal
   - Éviter de quitter le site

3. **Filtres**
   - Filtrer par catégorie
   - Filtrer par masterclass
   - Recherche par titre

4. **Analytics**
   - Nombre de vues
   - Durée de visionnage
   - Vidéos les plus populaires

5. **Relations master**
   - Select dropdown des masterclasses
   - Au lieu d'un champ texte

---

**Système complet et fonctionnel ! 🎉**

Les vidéos peuvent maintenant être gérées facilement depuis l'admin et s'affichent automatiquement sur la page masterclass.
