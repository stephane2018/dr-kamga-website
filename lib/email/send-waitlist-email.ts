import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { emailConfig } from "./config"
import { getEmailTranslations, type EmailLanguage } from "./email-translations"

export interface WaitlistData {
  email: string
  phone: string
  expectations: string
  masterclassTitle: string
  masterclassType?: string
  language?: EmailLanguage
}

/**
 * Envoie un email de confirmation à l'utilisateur qui s'inscrit à la liste d'attente
 */
async function sendUserConfirmationEmail(
  transporter: nodemailer.Transporter,
  data: WaitlistData,
  lang: EmailLanguage = 'fr'
): Promise<void> {
  const t = getEmailTranslations(lang)
  const translations = {
    fr: {
      title: 'Inscription Confirmée !',
      subtitle: 'Liste d\'attente - Masterclass',
      hello: 'Bonjour,',
      thankYou: 'Merci de votre inscription à notre liste d\'attente pour la prochaine session de masterclass. Nous avons bien reçu vos informations et nous sommes ravis de votre intérêt.',
      masterclassLabel: 'Masterclass sélectionnée :',
      typeLabel: 'Format :',
      nextSteps: 'Prochaines étapes :',
      step1: 'Vous recevrez un lien de paiement sécurisé dès l\'ouverture des inscriptions',
      step2: 'Nous vous contacterons par email ou téléphone pour confirmer votre participation',
      step3: 'Une fois votre paiement effectué, vous recevrez tous les détails de la session',
      contactSoon: 'Nous vous contacterons très prochainement. En attendant, n\'hésitez pas à consulter nos autres ressources sur notre site.',
      seeYouSoon: 'À très bientôt,',
    },
    en: {
      title: 'Registration Confirmed!',
      subtitle: 'Waiting List - Masterclass',
      hello: 'Hello,',
      thankYou: 'Thank you for signing up for our waiting list for the next masterclass session. We have received your information and are delighted by your interest.',
      masterclassLabel: 'Selected masterclass:',
      typeLabel: 'Format:',
      nextSteps: 'Next steps:',
      step1: 'You will receive a secure payment link as soon as registration opens',
      step2: 'We will contact you by email or phone to confirm your participation',
      step3: 'Once your payment is made, you will receive all session details',
      contactSoon: 'We will contact you very soon. In the meantime, feel free to browse our other resources on our website.',
      seeYouSoon: 'See you soon,',
    }
  }

  const txt = translations[lang]

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; margin: 0; padding: 0; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #5d4037 0%, #6d4c41 100%); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .footer { background: #3e2723; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
          .info-box { background: #fbe9e7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .highlight { color: #5d4037; font-weight: bold; }
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

            <div style="background: #f3f4f6; padding: 15px 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5d4037;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; font-weight: bold; text-transform: uppercase;">
                ${txt.masterclassLabel}
              </p>
              <p style="margin: 0; font-size: 17px; color: #5d4037; font-weight: bold;">
                ${data.masterclassTitle}
              </p>
              ${data.masterclassType ? `
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">
                ${txt.typeLabel} <strong style="color: #333;">${data.masterclassType}</strong>
              </p>
              ` : ''}
            </div>

            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #5d4037; font-size: 18px;">${txt.nextSteps}</h3>
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
              <strong>${txt.seeYouSoon}</strong><br>
              <strong>Dr. Kanga Kouamé</strong><br>
              Cabinet DAB
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
${txt.masterclassLabel.toUpperCase()}
${data.masterclassTitle}
${data.masterclassType ? `${txt.typeLabel} ${data.masterclassType}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${txt.nextSteps.toUpperCase()}

1. ${txt.step1}
2. ${txt.step2}
3. ${txt.step3}

${txt.contactSoon}

${txt.seeYouSoon}
Dr. Kanga Kouamé
Cabinet DAB
`

  const subject = lang === 'fr'
    ? 'Inscription confirmée - Liste d\'attente Masterclass'
    : 'Registration confirmed - Masterclass Waiting List'

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: data.email,
    subject,
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Envoie une notification à l'équipe qu'un nouvel utilisateur s'est inscrit à la liste d'attente
 */
async function sendTeamNotificationEmail(
  transporter: nodemailer.Transporter,
  data: WaitlistData,
  lang: EmailLanguage = 'fr'
): Promise<void> {
  const t = getEmailTranslations(lang)

  const translations = {
    fr: {
      alertTitle: '🎯 Nouvelle Inscription - Liste d\'Attente',
      alertSubtitle: 'Un prospect s\'est inscrit pour la masterclass.',
      title: 'Nouvelle Inscription',
      subtitle: 'Liste d\'Attente Masterclass',
      masterclassLabel: 'Masterclass',
      typeLabel: 'Format',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      expectationsLabel: 'Attentes',
      noExpectations: '<em>Aucune attente spécifiée</em>',
      actionRequired: '<strong>💡 Action requise :</strong> Contactez ce prospect pour lui envoyer un lien de paiement sécurisé.',
      dateTime: 'Date et heure :',
      footer: 'Cabinet DAB - Notification automatique',
      textTitle: '🎯 NOUVELLE INSCRIPTION - LISTE D\'ATTENTE',
      textSubtitle: 'Un prospect s\'est inscrit pour la masterclass.',
      textProspectInfo: '📧 INFORMATIONS DU PROSPECT',
      textMasterclass: 'Masterclass :',
      textType: 'Format :',
      textEmail: 'Email :',
      textPhone: 'Téléphone :',
      textExpectations: 'Attentes :',
      textNoExpectations: 'Aucune attente spécifiée',
      textAction: '💡 Action requise : Contactez ce prospect pour lui envoyer un lien de paiement sécurisé.',
      textDateTime: 'Date et heure :',
    },
    en: {
      alertTitle: '🎯 New Registration - Waiting List',
      alertSubtitle: 'A prospect has signed up for the masterclass.',
      title: 'New Registration',
      subtitle: 'Masterclass Waiting List',
      masterclassLabel: 'Masterclass',
      typeLabel: 'Format',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      expectationsLabel: 'Expectations',
      noExpectations: '<em>No expectations specified</em>',
      actionRequired: '<strong>💡 Action required:</strong> Contact this prospect to send them a secure payment link.',
      dateTime: 'Date and time:',
      footer: 'Cabinet DAB - Automatic notification',
      textTitle: '🎯 NEW REGISTRATION - WAITING LIST',
      textSubtitle: 'A prospect has signed up for the masterclass.',
      textProspectInfo: '📧 PROSPECT INFORMATION',
      textMasterclass: 'Masterclass:',
      textType: 'Format:',
      textEmail: 'Email:',
      textPhone: 'Phone:',
      textExpectations: 'Expectations:',
      textNoExpectations: 'No expectations specified',
      textAction: '💡 Action required: Contact this prospect to send them a secure payment link.',
      textDateTime: 'Date and time:',
    }
  }

  const txt = translations[lang]

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .alert { background: #fbe9e7; border-left: 4px solid #5d4037; padding: 15px 20px; margin-bottom: 20px; border-radius: 5px; }
          .alert-title { font-size: 18px; font-weight: bold; color: #3e2723; margin: 0 0 5px 0; }
          .header { background: linear-gradient(135deg, #5d4037 0%, #6d4c41 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
          .info-box { background: #fbe9e7; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #bcaaa4; }
          .label { font-size: 12px; color: #6b7280; font-weight: bold; text-transform: uppercase; margin: 0 0 5px 0; }
          .value { font-size: 16px; color: #5d4037; font-weight: bold; word-break: break-word; }
          .footer { background: #3e2723; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <div class="alert-title">${txt.alertTitle}</div>
            <p style="margin: 5px 0 0 0; color: #3e2723; font-size: 14px;">${txt.alertSubtitle}</p>
          </div>

          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">${txt.title}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">${txt.subtitle}</p>
          </div>

          <div class="content">
            <div class="info-box">
              <p class="label">${txt.masterclassLabel}</p>
              <div class="value">${data.masterclassTitle}</div>
              ${data.masterclassType ? `
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #6b7280;">
                ${txt.typeLabel}: <strong style="color: #333;">${data.masterclassType}</strong>
              </p>
              ` : ''}
            </div>

            <div class="info-box">
              <p class="label">${txt.emailLabel}</p>
              <div class="value">
                <a href="mailto:${data.email}" style="color: #5d4037; text-decoration: none;">${data.email}</a>
              </div>
            </div>

            <div class="info-box">
              <p class="label">${txt.phoneLabel}</p>
              <div class="value">
                <a href="tel:${data.phone}" style="color: #5d4037; text-decoration: none;">${data.phone}</a>
              </div>
            </div>

            <div class="info-box">
              <p class="label">${txt.expectationsLabel}</p>
              <div style="font-size: 15px; color: #333; line-height: 1.6; margin-top: 10px;">
                ${data.expectations || txt.noExpectations}
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
            <p style="margin: 0; font-size: 14px;">${txt.footer}</p>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
${txt.textTitle}

${txt.textSubtitle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${txt.textProspectInfo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${txt.textMasterclass} ${data.masterclassTitle}
${data.masterclassType ? `${txt.textType} ${data.masterclassType}` : ''}

${txt.textEmail} ${data.email}
${txt.textPhone} ${data.phone}

${txt.textExpectations}
${data.expectations || txt.textNoExpectations}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${txt.textAction}

${txt.textDateTime} ${new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Africa/Abidjan'
})}

---
${txt.footer}
  `

  const subject = lang === 'fr'
    ? `Nouvelle inscription liste d'attente - ${data.email}`
    : `New waiting list registration - ${data.email}`

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: emailConfig.to,
    subject,
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Fonction principale pour gérer l'envoi des emails lors de l'inscription à la liste d'attente
 */
export async function sendWaitlistEmails(
  data: WaitlistData
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

    // Vérifier la connexion SMTP
    await transporter.verify()

    const lang = data.language || 'fr'

    // Envoyer les deux emails en parallèle
    await Promise.all([
      sendUserConfirmationEmail(transporter, data, lang),
      sendTeamNotificationEmail(transporter, data, lang),
    ])

    console.log("Emails de liste d'attente envoyés avec succès pour:", data.email)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi des emails de liste d'attente:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi des emails",
    }
  }
}
