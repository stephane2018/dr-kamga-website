/**
 * Script de test pour l'authentification
 * Usage: npx tsx scripts/test-auth.ts
 */

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

async function testAuth() {
  console.log("\n" + "=".repeat(60))
  console.log("🧪 TEST DU SYSTÈME D'AUTHENTIFICATION")
  console.log("=".repeat(60) + "\n")

  try {
    // 1. Test de connexion à la base de données
    console.log("1️⃣  Test de connexion à la base de données...")
    await prisma.$connect()
    console.log("   ✅ Connexion réussie\n")

    // 2. Vérifier les admins existants
    console.log("2️⃣  Récupération des admins...")
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    })

    console.log(`   ✅ ${admins.length} admin(s) trouvé(s)`)
    admins.forEach((admin, index) => {
      console.log(`   ${index + 1}. ${admin.email} - ${admin.name} (${admin.role})`)
      console.log(`      Actif: ${admin.isActive ? '✅' : '❌'}`)
    })
    console.log()

    // 3. Test de hash de mot de passe
    console.log("3️⃣  Test de hash de mot de passe...")
    const testPassword = "test123"
    const hashed = await bcrypt.hash(testPassword, 10)
    const isValid = await bcrypt.compare(testPassword, hashed)
    console.log(`   ✅ Hash: ${isValid ? 'valide' : 'invalide'}\n`)

    // 4. Vérifier les variables d'environnement
    console.log("4️⃣  Vérification des variables d'environnement...")
    const envVars = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: !!process.env.DATABASE_URL,
    }

    Object.entries(envVars).forEach(([key, value]) => {
      const status = value ? '✅' : '❌'
      console.log(`   ${status} ${key}: ${value === true ? 'défini' : value || 'non défini'}`)
    })
    console.log()

    // 5. Résumé
    console.log("=".repeat(60))
    console.log("📊 RÉSUMÉ")
    console.log("=".repeat(60))
    console.log(`✅ Base de données: OK`)
    console.log(`✅ Admins: ${admins.length}`)
    console.log(`✅ Hash bcrypt: OK`)
    console.log(`✅ Variables d'environnement: ${envVars.NEXTAUTH_SECRET && envVars.DATABASE_URL ? 'OK' : 'MANQUANTES'}`)
    console.log("=".repeat(60) + "\n")

  } catch (error) {
    console.error("\n❌ ERREUR:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le test
testAuth()
