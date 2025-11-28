import nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport"
import { emailConfig } from "./config"
import { getEmailTranslations, type EmailLanguage } from "./email-translations"

export interface ContactConfirmationData {
  firstName: string
  email: string
  language?: EmailLanguage
}

/**
 * Fonction pour envoyer un email de confirmation à l'utilisateur
 * après la réception de sa demande de contact
 *
 * @param data - Les données de confirmation
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function sendContactConfirmationEmail(
  data: ContactConfirmationData
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
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.warn("SMTP verification warning (continuing anyway):", verifyError)
    }

    // Contenu de l'email en français
    const frenchContent = `
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
            .info-box { background: #FDC50A20; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #222C57; }
            .info-box-title { font-weight: bold; color: #222C57; margin-bottom: 10px; font-size: 16px; }
            .step { margin: 15px 0; padding-left: 30px; position: relative; }
            .step::before { content: attr(data-step); position: absolute; left: 0; top: 0; background: #222C57; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
            .highlight { color: #222C57; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">✅ Demande Reçue</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Merci de votre intérêt</p>
            </div>

            <div class="content">
              <p style="font-size: 16px; margin-top: 0;">Bonjour ${data.firstName},</p>

              <p style="font-size: 15px; line-height: 1.8;">
                Nous avons bien reçu votre demande de contact. Merci de votre intérêt pour nos services ! 🙏
              </p>

              <div class="info-box">
                <div class="info-box-title">📋 Ce qui se passe maintenant :</div>
                <div class="step" data-step="1">
                  <strong>Examen de votre demande</strong><br>
                  Notre équipe va examiner vos informations dans les prochaines heures.
                </div>
                <div class="step" data-step="2">
                  <strong>Prise de contact</strong><br>
                  Nous vous contacterons par <span class="highlight">téléphone ou email dans les 24 heures</span> pour discuter de vos besoins.
                </div>
                <div class="step" data-step="3">
                  <strong>Proposition personnalisée</strong><br>
                  Nous vous proposerons une solution adaptée à votre situation.
                </div>
              </div>

              <p style="font-size: 15px; line-height: 1.8;">
                En attendant, n'hésitez pas à consulter nos ressources et nos services sur notre site web.
              </p>

              <p style="font-size: 15px; line-height: 1.8;">
                Si vous avez des questions urgentes, vous pouvez nous appeler directement.
              </p>

              <p style="font-size: 15px; margin-top: 30px;">
                Cordialement,<br>
                <strong>Dr. Kanga Kouamé</strong><br>
                Cabinet DAB
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Cabinet DAB - Dr. Kanga Kouamé. Tous droits réservés.
              </p>
              <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.8;">
                Cet email a été envoyé automatiquement suite à votre demande de contact.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Contenu de l'email en anglais
    const englishContent = `
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
            .info-box { background: #FDC50A20; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #222C57; }
            .info-box-title { font-weight: bold; color: #222C57; margin-bottom: 10px; font-size: 16px; }
            .step { margin: 15px 0; padding-left: 30px; position: relative; }
            .step::before { content: attr(data-step); position: absolute; left: 0; top: 0; background: #222C57; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
            .highlight { color: #222C57; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">✅ Request Received</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Thank you for your interest</p>
            </div>

            <div class="content">
              <p style="font-size: 16px; margin-top: 0;">Hello ${data.firstName},</p>

              <p style="font-size: 15px; line-height: 1.8;">
                We have received your contact request. Thank you for your interest in our services! 🙏
              </p>

              <div class="info-box">
                <div class="info-box-title">📋 What happens next:</div>
                <div class="step" data-step="1">
                  <strong>Review your request</strong><br>
                  Our team will examine your information over the next few hours.
                </div>
                <div class="step" data-step="2">
                  <strong>Contact you</strong><br>
                  We will contact you by <span class="highlight">phone or email within 24 hours</span> to discuss your needs.
                </div>
                <div class="step" data-step="3">
                  <strong>Personalized proposal</strong><br>
                  We will offer you a solution tailored to your situation.
                </div>
              </div>

              <p style="font-size: 15px; line-height: 1.8;">
                In the meantime, feel free to explore our resources and services on our website.
              </p>

              <p style="font-size: 15px; line-height: 1.8;">
                If you have any urgent questions, you can call us directly.
              </p>

              <p style="font-size: 15px; margin-top: 30px;">
                Best regards,<br>
                <strong>Dr. Kanga Kouamé</strong><br>
                Cabinet DAB
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0; font-size: 12px;">
                © ${new Date().getFullYear()} Cabinet DAB - Dr. Kanga Kouamé. All rights reserved.
              </p>
              <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.8;">
                This email was sent automatically following your contact request.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    const htmlContent = lang === 'en' ? englishContent : frenchContent

    // Déterminer le sujet de l'email
    const subject = lang === 'en' 
      ? '✅ Your Contact Request Has Been Received'
      : '✅ Votre Demande de Contact a été Reçue'

    // Envoyer l'email
    console.log(`Sending confirmation email to: ${data.email}`)
    const info = await transporter.sendMail({
      from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
      to: data.email,
      replyTo: `${emailConfig.from.name} <${emailConfig.from.email}>`,
      subject,
      html: htmlContent,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Nodemailer',
        'X-Entity-Ref-ID': `contact-confirmation-${Date.now()}`,
        'List-Unsubscribe': `<${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}/unsubscribe?email=${encodeURIComponent(data.email)}>`,
        'Precedence': 'bulk',
      },
    })
    console.log(`Confirmation email sent successfully. Message ID: ${info.messageId}`)

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de confirmation:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    }
  }
}
