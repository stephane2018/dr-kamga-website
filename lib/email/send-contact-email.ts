import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { emailConfig } from "./config"
import { getEmailTranslations, getInterestLabel, type EmailLanguage } from "./email-translations"

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  interest: string
  situation?: string
  message: string
  language?: EmailLanguage
}

/**
 * Fonction pour envoyer un email de contact
 *
 * @param data - Les données du formulaire de contact
 * @returns Promise<boolean> - true si l'email est envoyé avec succès
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
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

    // Construire le contenu de l'email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; }
            .container { max-width: 650px; margin: 0 auto; padding: 20px; }
            .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 20px; border-radius: 5px; }
            .alert-title { font-size: 18px; font-weight: bold; color: #92400e; margin: 0 0 5px 0; display: flex; align-items: center; }
            .alert-text { margin: 0; color: #78350f; font-size: 14px; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #4f46e5; display: block; margin-bottom: 5px; font-size: 13px; text-transform: uppercase; }
            .value { background: #f9fafb; padding: 12px 15px; border-radius: 5px; border-left: 3px solid #4f46e5; font-size: 15px; }
            .footer { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
            .action-btn { display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 5px; font-weight: bold; }
            .quick-info { background: #e0e7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .quick-info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .quick-info-label { font-weight: bold; color: #4338ca; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              <div class="alert-title">${t.contact.newRequest}</div>
              <p class="alert-text">${t.contact.actionRequired}</p>
            </div>

            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">${t.contact.formTitle}</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">${t.common.cabinetName}</p>
            </div>

            <div class="content">
              <div class="quick-info">
                <h3 style="margin: 0 0 12px 0; color: #4338ca; font-size: 16px;">${t.contact.quickSummary}</h3>
                <div class="quick-info-row">
                  <span class="quick-info-label">${t.contact.contact}</span>
                  <span>${data.firstName} ${data.lastName}</span>
                </div>
                <div class="quick-info-row">
                  <span class="quick-info-label">${t.contact.interestedIn}</span>
                  <span>${getInterestLabel(data.interest, lang)}</span>
                </div>
                <div class="quick-info-row">
                  <span class="quick-info-label">${t.contact.email}</span>
                  <span><a href="mailto:${data.email}" style="color: #4f46e5;">${data.email}</a></span>
                </div>
                <div class="quick-info-row">
                  <span class="quick-info-label">${t.contact.phone}</span>
                  <span><a href="tel:${data.phone}" style="color: #4f46e5;">${data.phone}</a></span>
                </div>
              </div>

              <div style="text-align: center; margin: 20px 0;">
                <a href="mailto:${data.email}" class="action-btn">${t.contact.replyByEmail}</a>
                <a href="tel:${data.phone}" class="action-btn" style="background: #7c3aed;">${t.contact.call}</a>
              </div>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

              <h3 style="color: #1f2937; margin-bottom: 20px;">${t.contact.fullDetails}</h3>

              <div class="field">
                <span class="label">${t.contact.firstName}</span>
                <div class="value">${data.firstName}</div>
              </div>

              <div class="field">
                <span class="label">${t.contact.lastName}</span>
                <div class="value">${data.lastName}</div>
              </div>

              <div class="field">
                <span class="label">${t.contact.emailAddress}</span>
                <div class="value"><a href="mailto:${data.email}" style="color: #4f46e5; text-decoration: none;">${data.email}</a></div>
              </div>

              <div class="field">
                <span class="label">${t.contact.phoneNumber}</span>
                <div class="value"><a href="tel:${data.phone}" style="color: #4f46e5; text-decoration: none;">${data.phone}</a></div>
              </div>

              <div class="field">
                <span class="label">${t.contact.serviceRequested}</span>
                <div class="value">${getInterestLabel(data.interest, lang)}</div>
              </div>

              ${data.situation ? `
                <div class="field">
                  <span class="label">${t.contact.currentSituation}</span>
                  <div class="value">${data.situation.replace(/\n/g, '<br>')}</div>
                </div>
              ` : ''}

              <div class="field">
                <span class="label">${t.contact.fullMessage}</span>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${t.contact.actionRequiredFooter}</p>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">${t.contact.responseTime}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Contenu texte brut (fallback)
    const textContent = `
${t.contact.newRequest}
${t.common.cabinetName}

⚠️ ${t.contact.actionRequired}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${t.contact.quickSummary}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${t.contact.contact} ${data.firstName} ${data.lastName}
${t.contact.interestedIn} ${getInterestLabel(data.interest, lang)}
${t.contact.email} ${data.email}
${t.contact.phone} ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${t.contact.fullDetails}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${t.contact.firstName} : ${data.firstName}
${t.contact.lastName} : ${data.lastName}
${t.contact.emailAddress} : ${data.email}
${t.contact.phoneNumber} : ${data.phone}
${t.contact.serviceRequested} : ${getInterestLabel(data.interest, lang)}
${data.situation ? `\n${t.contact.currentSituation} :\n${data.situation}\n` : ''}
${t.contact.fullMessage} :
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${t.contact.actionRequiredFooter} ${t.contact.responseTime}
    `

    // Envoyer l'email
    const info = await transporter.sendMail({
      from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
      to: emailConfig.to,
      replyTo: data.email,
      subject: `${t.contact.subject} - ${data.firstName} ${data.lastName} - ${getInterestLabel(data.interest, lang)}`,
      text: textContent,
      html: htmlContent,
    })

    console.log("Email envoyé avec succès:", info.messageId)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi de l'email",
    }
  }
}

