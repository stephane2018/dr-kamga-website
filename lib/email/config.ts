/**
 * Configuration SMTP pour l'envoi d'emails
 *
 * IMPORTANT: Remplacez les valeurs suivantes par vos propres informations SMTP
 */

export const emailConfig = {
  smtp: {
    host: "smtp.example.com",          // Remplacez par votre serveur SMTP (ex: smtp.gmail.com, smtp.office365.com)
    port: 587,                          // Port SMTP (587 pour TLS, 465 pour SSL)
    secure: false,                      // true pour port 465, false pour les autres ports
    auth: {
      user: "your-email@example.com",   // Remplacez par votre adresse email
      pass: "your-password-here",       // Remplacez par votre mot de passe ou app password
    },
  },
  from: {
    name: "Cabinet DAB",
    email: "noreply@cabinetdab.com",   // Remplacez par votre email d'envoi
  },
  to: "info@cabinetdab.com",           // Remplacez par l'email de réception
}

/**
 * EXEMPLES DE CONFIGURATION SMTP:
 *
 * Gmail:
 * - host: "smtp.gmail.com"
 * - port: 587
 * - secure: false
 * - Créez un "App Password" dans votre compte Google pour plus de sécurité
 *
 * Outlook/Office365:
 * - host: "smtp.office365.com"
 * - port: 587
 * - secure: false
 *
 * SendGrid:
 * - host: "smtp.sendgrid.net"
 * - port: 587
 * - user: "apikey"
 * - pass: "votre-api-key-sendgrid"
 *
 * Mailgun:
 * - host: "smtp.mailgun.org"
 * - port: 587
 */
