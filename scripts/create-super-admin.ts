import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth/password'

const prisma = new PrismaClient()

async function main() {
  const username = process.env.SUPER_ADMIN_USERNAME || 'admin'
  const password = process.env.SUPER_ADMIN_PASSWORD || 'admin123456'
  const email = process.env.SUPER_ADMIN_EMAIL || null

  // Vérifier si un super admin existe déjà
  const existingAdmin = await prisma.admin.findFirst({
    where: { role: 'SUPER_ADMIN' }
  })

  if (existingAdmin) {
    console.log('⚠️  Un super administrateur existe déjà')
    console.log(`   Username: ${existingAdmin.username}`)
    return
  }

  // Créer le super admin
  const hashedPassword = await hashPassword(password)

  const admin = await prisma.admin.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    }
  })

  console.log('✅ Super administrateur créé avec succès!')
  console.log(`   Username: ${admin.username}`)
  console.log(`   Email: ${admin.email || 'Non défini'}`)
  console.log('\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
