import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { emailConfig } from "./config"
import { getEmailTranslations, type EmailLanguage } from "./email-translations"

export interface CoachingDiagnosticData {
  name: string
  email: string
  phone: string
  language?: EmailLanguage
}

/**
 * Envoie un email de confirmation à l'utilisateur qui demande un appel diagnostic
 */
async function sendUserConfirmationEmail(
  transporter: nodemailer.Transporter,
  data: CoachingDiagnosticData,
  lang: EmailLanguage = 'fr'
): Promise<void> {
  const t = getEmailTranslations(lang)
  const txt = t.coachingDiagnostic.user

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Bricolage Grotesque', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; margin: 0; padding: 0; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #222C57 0%, #1a2242 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .footer { background: #222C57; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          .info-box { background: #FDC50A20; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .highlight { color: #222C57; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">${txt.title}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">${txt.subtitle}</p>
          </div>

          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">${txt.hello}</p>

            <p style="font-size: 15px; line-height: 1.8;">
              ${txt.thankYou}
            </p>

            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #222C57; font-size: 18px;">${txt.nextSteps}</h3>
              <p style="margin: 10px 0; font-size: 15px;">
                <span class="highlight">1.</span> ${txt.step1}
              </p>
              <p style="margin: 10px 0; font-size: 15px;">
                <span class="highlight">2.</span> ${txt.step2}
              </p>
              <p style="margin: 10px 0; font-size: 15px;">
                <span class="highlight">3.</span> ${txt.step3}
              </p>
            </div>

            <p style="font-size: 15px; line-height: 1.8;">
              ${txt.contactSoon}
            </p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              <strong>${txt.regards}</strong><br>
              <strong>${txt.signature}</strong>
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} ${t.common.cabinetName}. ${t.common.copyright}</p>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
${txt.title}

${txt.hello}

${txt.thankYou}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${txt.nextSteps.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ${txt.step1}
2. ${txt.step2}
3. ${txt.step3}

${txt.contactSoon}

${txt.regards}
${txt.signature}
`

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: data.email,
    replyTo: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    subject: txt.subject,
    text: textContent,
    html: htmlContent,
    headers: {
      'X-Priority': '3',
      'X-Mailer': 'Nodemailer',
      'X-Entity-Ref-ID': `coaching-diagnostic-user-${Date.now()}`,
      'List-Unsubscribe': `<${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}/unsubscribe?email=${encodeURIComponent(data.email)}>`,
      'Precedence': 'bulk',
    },
  })
}

/**
 * Envoie une notification à l'équipe qu'un nouvel utilisateur a demandé un appel diagnostic
 */
async function sendTeamNotificationEmail(
  transporter: nodemailer.Transporter,
  data: CoachingDiagnosticData,
  lang: EmailLanguage = 'fr'
): Promise<void> {
  const t = getEmailTranslations(lang)
  const txt = t.coachingDiagnostic.team

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .alert { background: #FDC50A20; border-left: 4px solid #222C57; padding: 15px 20px; margin-bottom: 20px; border-radius: 5px; }
          .alert-title { font-size: 18px; font-weight: bold; color: #3e2723; margin: 0 0 5px 0; }
          .header { background: linear-gradient(135deg, #222C57 0%, #1a2242 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .info-box { background: #fbe9e7; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #bcaaa4; }
          .label { font-size: 12px; color: #6b7280; font-weight: bold; text-transform: uppercase; margin: 0 0 5px 0; }
          .value { font-size: 16px; color: #222C57; font-weight: bold; word-break: break-word; }
          .footer { background: #222C57; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <div class="alert-title">${txt.alert}</div>
            <p style="margin: 5px 0 0 0; color: #3e2723; font-size: 14px;">${txt.alertMessage}</p>
          </div>

          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">${txt.title}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">${txt.subtitle}</p>
          </div>

          <div class="content">
            <div class="info-box">
              <p class="label">${txt.nameLabel}</p>
              <div class="value">${data.name}</div>
            </div>

            <div class="info-box">
              <p class="label">${txt.emailLabel}</p>
              <div class="value">
                <a href="mailto:${data.email}" style="color: #222C57; text-decoration: none;">${data.email}</a>
              </div>
            </div>

            <div class="info-box">
              <p class="label">${txt.phoneLabel}</p>
              <div class="value">
                <a href="tel:${data.phone}" style="color: #222C57; text-decoration: none;">${data.phone}</a>
              </div>
            </div>

            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #0d47a1; font-size: 14px;">
                ${txt.actionRequired}
              </p>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                <strong>${txt.dateTime}</strong> ${new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                  timeZone: 'Africa/Abidjan'
                })}
              </p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0; font-size: 14px;">${txt.autoNotification}</p>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
${txt.alert}

${txt.alertMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMATIONS DU PROSPECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${txt.nameLabel}: ${data.name}
${txt.emailLabel}: ${data.email}
${txt.phoneLabel}: ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${txt.actionRequired}

${txt.dateTime} ${new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Africa/Abidjan'
})}

---
${txt.autoNotification}
  `

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: emailConfig.to,
    replyTo: data.email,
    subject: txt.subject,
    text: textContent,
    html: htmlContent,
    headers: {
      'X-Priority': '2',
      'X-Mailer': 'Nodemailer',
      'X-Entity-Ref-ID': `coaching-diagnostic-team-${Date.now()}`,
      'Importance': 'high',
    },
  })
}

/**
 * Fonction principale pour gérer l'envoi des emails lors de la demande d'appel diagnostic
 */
export async function sendCoachingDiagnosticEmails(
  data: CoachingDiagnosticData
): Promise<{ success: boolean; error?: string }> {
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

    await transporter.verify()

    const lang = data.language || 'fr'
    await Promise.all([
      sendUserConfirmationEmail(transporter, data, lang),
      sendTeamNotificationEmail(transporter, data, lang),
    ])

    console.log("Emails de demande coaching diagnostic envoyés avec succès pour:", data.email)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi des emails de demande coaching diagnostic:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi des emails",
    }
  }
}
