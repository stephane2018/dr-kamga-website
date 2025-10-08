# 🔧 Dépannage - Guide de résolution des problèmes

## 🚨 Erreur : "Unknown argument `showOnHome`"

### Cause
Le champ `showOnHome` a été ajouté au schéma Prisma mais le client Prisma n'a pas été mis à jour.

### Solution rapide (3 étapes)

```bash
# 1. Régénérer le client Prisma
npm run db:generate

# 2. Appliquer les changements à la base de données
npm run db:push

# 3. Redémarrer le serveur Next.js
# Arrêter avec Ctrl+C puis relancer
npm run dev
```

### Solution complète

Si le problème persiste après les 3 étapes :

```bash
# 1. Nettoyer complètement
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

# 2. Régénérer
npm run db:generate

# 3. Vérifier que le champ existe dans le schéma
cat prisma/schema.prisma | grep showOnHome

# 4. Appliquer à la base de données
npm run db:push

# 5. Arrêter TOUS les processus Node
pkill -f "next"

# 6. Relancer
npm run dev
```

---

## 🔍 Erreur : Prisma Client Out of Sync

### Symptômes
- Erreur "Prisma Client did not initialize yet"
- Erreur "Unknown argument" sur un champ existant
- Types TypeScript incorrects

### Solution

```bash
# Régénérer le client
npx prisma generate --schema=./prisma/schema.prisma

# Si ça ne fonctionne pas, forcer la suppression
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
npx prisma generate
```

---

## 🗄️ Erreur : Database Connection

### Symptômes
- "Can't reach database server"
- "Connection timeout"
- "Authentication failed"

### Vérifications

**1. PostgreSQL est démarré ?**
```bash
# macOS avec Homebrew
brew services list | grep postgres

# Si arrêté, démarrer
brew services start postgresql
```

**2. Variables d'environnement correctes ?**
```bash
# Vérifier .env
cat .env | grep DATABASE_URL

# Format attendu
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

**3. Base de données existe ?**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Lister les bases
\l

# Si la base n'existe pas
CREATE DATABASE "DRKANGO";
```

---

## 🔐 Erreur : Auth/Session

### Symptôme : "Invalid session" ou "Not authenticated"

**1. Vérifier AUTH_SECRET**
```bash
# Doit être défini dans .env
cat .env | grep AUTH_SECRET

# Si absent, générer
openssl rand -base64 32
```

**2. Vider les cookies**
- Ouvrir DevTools (F12)
- Application → Cookies
- Supprimer tous les cookies du site
- Rafraîchir

**3. Recréer le super admin**
```bash
npm run db:seed
```

---

## 📹 Erreur : Vidéos ne s'affichent pas

### Cas 1 : Aucune vidéo visible sur /masterclass

**Vérifier :**
```bash
# 1. L'API retourne des données
curl http://localhost:3000/api/masterclass/videos

# 2. Les vidéos ont showOnHome = true
# Depuis Prisma Studio
npm run db:studio
# Aller sur MasterclassVideo
# Vérifier le champ showOnHome
```

**Si aucune vidéo en base :**
- C'est normal ! Les données par défaut s'affichent
- Créer des vidéos via `/admin/masterclass-videos`

### Cas 2 : Erreur "showOnHome" dans la console

**Appliquer la solution du haut :** Régénérer Prisma + redémarrer

---

## 🎨 Erreur : Styles ne s'appliquent pas

### Symptômes
- Classes Tailwind non appliquées
- Design cassé
- Couleurs incorrectes

### Solutions

**1. Vérifier Tailwind**
```bash
# Vérifier tailwind.config
cat tailwind.config.ts

# Rebuild CSS
rm -rf .next
npm run dev
```

**2. Classes dynamiques**
Si vous utilisez des classes dynamiques (ex: `bg-${color}`), elles ne fonctionneront pas.

❌ Incorrect :
```tsx
<div className={`bg-${color}`}>
```

✅ Correct :
```tsx
<div className={color === "red" ? "bg-red-500" : "bg-blue-500"}>
```

---

## 🚀 Erreur de Build en Production

### Symptôme : `npm run build` échoue

**1. Erreurs TypeScript**
```bash
# Vérifier les erreurs
npm run lint

# Ignorer temporairement (NOT RECOMMENDED)
# Dans next.config.js
typescript: {
  ignoreBuildErrors: true,
}
```

**2. Variables d'environnement**
```bash
# En production, définir toutes les variables
DATABASE_URL="..."
AUTH_SECRET="..."
AUTH_URL="https://votre-domaine.com"
```

**3. Prisma en production**
```bash
# Générer AVANT le build
npx prisma generate
npm run build
```

---

## 🔄 Commandes de Reset

### Reset complet de la base de données

⚠️ **ATTENTION : Supprime TOUTES les données !**

```bash
# Reset complet
npx prisma migrate reset

# Recréer le super admin
npm run db:seed
```

### Reset du cache Next.js

```bash
# Supprimer .next et node_modules/.cache
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
npm run dev
```

### Reset de Prisma Client

```bash
# Supprimer le client généré
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

# Régénérer
npm run db:generate
```

---

## 📊 Erreurs fréquentes et solutions

| Erreur | Cause | Solution |
|--------|-------|----------|
| Unknown argument | Client Prisma pas à jour | `npm run db:generate` |
| Can't reach database | PostgreSQL arrêté | `brew services start postgresql` |
| Invalid session | AUTH_SECRET manquant | Ajouter dans `.env` |
| Build failed | Types incorrects | `npm run db:generate` puis `npm run build` |
| Styles cassés | Cache Next.js | `rm -rf .next && npm run dev` |
| Port 3000 occupé | Autre processus | `lsof -ti:3000 \| xargs kill -9` |

---

## 🆘 Debug avancé

### Activer les logs Prisma

```typescript
// Dans lib/prisma.ts
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

### Vérifier la version de Prisma

```bash
npx prisma --version
```

### Inspecter la base de données

```bash
# Ouvrir Prisma Studio
npm run db:studio

# Ou directement avec psql
psql -U postgres -d DRKANGO
```

### Logs Next.js détaillés

```bash
# Mode verbose
DEBUG=* npm run dev
```

---

## 📞 Checklist avant de demander de l'aide

- [ ] `npm run db:generate` exécuté
- [ ] `npm run db:push` exécuté
- [ ] Serveur redémarré (Ctrl+C puis `npm run dev`)
- [ ] `.env` configuré correctement
- [ ] PostgreSQL démarré
- [ ] Cookies du navigateur vidés
- [ ] Console navigateur vérifiée (F12)
- [ ] Logs du serveur vérifiés

---

## 🔗 Ressources utiles

- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://authjs.dev)
- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**La plupart des problèmes se résolvent avec un `npm run db:generate` + redémarrage du serveur ! 🚀**
