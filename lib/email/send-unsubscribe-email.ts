import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { emailConfig } from "./config"
import { getEmailTranslations, type EmailLanguage } from "./email-translations"

export interface UnsubscribeData {
  email: string
  language?: EmailLanguage
}

/**
 * Envoie une notification à l'équipe qu'un utilisateur s'est désabonné
 */
export async function sendUnsubscribeNotification(
  data: UnsubscribeData
): Promise<{ success: boolean; error?: string }> {
  const lang = data.language || 'fr'
  const t = getEmailTranslations(lang)
  try {
    // Créer le transporteur SMTP
    const transportOptions: SMTPTransport.Options = {
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.auth.user,
        pass: emailConfig.smtp.auth.pass,
      },
    }
    
    const transporter = nodemailer.createTransport(transportOptions)

    // Vérifier la connexion SMTP
    await transporter.verify()

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Bricolage Grotesque', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; }
            .container { max-width: 650px; margin: 0 auto; padding: 20px; }
            .alert { background: #fee; border-left: 4px solid #dc2626; padding: 15px 20px; margin-bottom: 20px; border-radius: 5px; }
            .alert-title { font-size: 18px; font-weight: bold; color: #991b1b; margin: 0 0 5px 0; }
            .header { background: linear-gradient(135deg, #222C57 0%, #1a2242 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
            .info-box { background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #fecaca; }
            .email-value { font-size: 18px; color: #dc2626; font-weight: bold; word-break: break-all; }
            .footer { background: #222C57; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              <div class="alert-title">${t.unsubscribe.alert}</div>
              <p style="margin: 5px 0 0 0; color: #991b1b; font-size: 14px;">${t.unsubscribe.alertMessage}</p>
            </div>

            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">${t.unsubscribe.title}</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">${t.unsubscribe.subtitle}</p>
            </div>

            <div class="content">
              <div class="info-box">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: bold; text-transform: uppercase;">
                  ${t.unsubscribe.emailAddress}
                </p>
                <div class="email-value">
                  <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email}</a>
                </div>
              </div>

              <p style="font-size: 15px; line-height: 1.8;">
                <strong>${t.unsubscribe.actionRequired}</strong><br>
                ${t.unsubscribe.actionMessage}
              </p>

              <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0; color: #78350f; font-size: 14px;">
                  ${t.unsubscribe.important} <strong></strong> ${t.unsubscribe.importantMessage}
                </p>
              </div>

              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                  <strong>${t.unsubscribe.dateTime}</strong> ${new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long',
                    timeZone: 'Africa/Abidjan'
                  })}
                </p>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0; font-size: 14px;">${t.unsubscribe.autoNotification}</p>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
🔕 DÉSINSCRIPTION

Un utilisateur s'est désabonné de la liste de diffusion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 ADRESSE EMAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action requise :
Veuillez retirer cette adresse email de votre liste de diffusion et de votre CRM pour respecter la demande de désinscription de l'utilisateur.

⚠️ Important : Conformément au RGPD, vous devez traiter cette demande de désinscription rapidement et ne plus envoyer d'emails marketing à cette adresse.

Date et heure : ${new Date().toLocaleString('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Africa/Abidjan'
})}

---
Cabinet DAB - Notification automatique
    `

    // Envoyer l'email à l'équipe
    await transporter.sendMail({
      from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
      to: emailConfig.to,
      replyTo: data.email,
      subject: `${t.unsubscribe.subject} - ${data.email}`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '2',
        'X-Mailer': 'Nodemailer',
        'X-Entity-Ref-ID': `unsubscribe-${Date.now()}`,
        'Importance': 'high',
      },
    })

    console.log("Email de désinscription envoyé avec succès pour:", data.email)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de désinscription:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi de l'email",
    }
  }
}
