/**
 * Configuration SMTP pour l'envoi d'emails
 *
 * Les valeurs sont chargées depuis les variables d'environnement
 */


export const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "mailing@cabinetdab.com",
      pass: process.env.SMTP_PASSWORD || "MonMailing2025@",
    },
  },
  from: {
    name: process.env.SMTP_FROM_NAME || "Cabinet DAB",
    email: process.env.SMTP_FROM_EMAIL || "mailing@cabinetdab.com",
  },
  to: process.env.SMTP_TO || "mailing@cabinetdab.com",
}