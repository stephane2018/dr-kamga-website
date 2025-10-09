/**
 * Configuration SMTP pour l'envoi d'emails
 *
 * IMPORTANT: Remplacez les valeurs suivantes par vos propres informations SMTP
 */

export const emailConfig = {
  smtp: {
    host: "smtp.hostinger.com",          
    port: 465,                          
    secure: true,                      
    auth: {
      user: "mailing@cabinetdab.com",  
      pass: "MonMailing2025@",      
    },
  },
  from: {
    name: "Cabinet DAB",
    email: "mailing@cabinetdab.com",  
  },
  to: "mailing@cabinetdab.com",        
}