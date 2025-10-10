import nodemailer from "nodemailer"
import { emailConfig } from "./config"

export interface GuideDownloadData {
  email: string
}

/**
 * Envoie un email de confirmation à l'utilisateur qui télécharge le guide
 */
async function sendUserConfirmationEmail(
  transporter: nodemailer.Transporter,
  email: string
): Promise<void> {
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
          .button { display: inline-block; background: #5d4037; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .unsubscribe { margin-top: 15px; font-size: 11px; color: #9ca3af; }
          .unsubscribe a { color: #9ca3af; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">📚 Merci pour votre intérêt !</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Votre guide de la méthode Cabinet DAB</p>
          </div>

          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">Bonjour,</p>

            <p style="font-size: 15px; line-height: 1.8;">
              Merci d'avoir téléchargé notre guide <strong>"De la ferme aux marchés mondiaux"</strong> !
              Nous espérons que ce document vous aidera à transformer votre exploitation agricole locale
              en entreprise exportatrice prospère.
            </p>

            <p style="font-size: 15px; line-height: 1.8;">
              Votre téléchargement a démarré automatiquement. Si ce n'est pas le cas,
              le PDF devrait être disponible dans vos téléchargements récents.
            </p>

            <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0; color: #166534; font-size: 16px;">🎯 Pour aller plus loin</h3>
              <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.6;">
                Découvrez nos masterclass thématiques et notre programme de coaching personnalisé
                pour accélérer votre transformation vers les marchés internationaux.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-kanga.com'}" class="button">
                Découvrir nos services
              </a>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              Cordialement,<br>
              <strong>Dr. Kanga Kouamé</strong><br>
              Cabinet DAB
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} Cabinet DAB - Dr. Kanga Kouamé. Tous droits réservés.</p>
            <div class="unsubscribe">
              <p style="margin: 5px 0;">
                Vous recevez cet email car vous avez téléchargé notre guide.
                <br>
                Pour vous désabonner, <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-kanga.com'}/unsubscribe?email=${encodeURIComponent(email)}">cliquez ici</a>.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
Merci pour votre intérêt !

Bonjour,

Merci d'avoir téléchargé notre guide "De la ferme aux marchés mondiaux" !
Nous espérons que ce document vous aidera à transformer votre exploitation agricole locale en entreprise exportatrice prospère.

Votre téléchargement a démarré automatiquement. Si ce n'est pas le cas, le PDF devrait être disponible dans vos téléchargements récents.

🎯 POUR ALLER PLUS LOIN
Découvrez nos masterclass thématiques et notre programme de coaching personnalisé pour accélérer votre transformation vers les marchés internationaux.

Visitez notre site : ${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}

Cordialement,
Dr. Kanga Kouamé
Cabinet DAB

---
Vous recevez cet email car vous avez téléchargé notre guide.
Pour vous désabonner : ${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}/unsubscribe?email=${encodeURIComponent(email)}
  `

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: email,
    subject: "📚 Votre guide Cabinet DAB - De la ferme aux marchés mondiaux",
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Envoie une notification à l'équipe qu'un nouveau lead a téléchargé le guide
 */
async function sendTeamNotificationEmail(
  transporter: nodemailer.Transporter,
  email: string
): Promise<void> {
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
          .info-box { background: #fbe9e7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #bcaaa4; }
          .email-value { font-size: 18px; color: #5d4037; font-weight: bold; word-break: break-all; }
          .footer { background: #3e2723; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="alert">
            <div class="alert-title">📥 NOUVEAU TÉLÉCHARGEMENT DE GUIDE</div>
            <p style="margin: 5px 0 0 0; color: #3e2723; font-size: 14px;">Un lead vient de télécharger le guide de la méthode Cabinet DAB.</p>
          </div>

          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">📊 Nouveau Lead</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">Téléchargement du Guide Méthode</p>
          </div>

          <div class="content">
            <div class="info-box">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: bold; text-transform: uppercase;">
                📧 Adresse Email du Lead
              </p>
              <div class="email-value">
                <a href="mailto:${email}" style="color: #5d4037; text-decoration: none;">${email}</a>
              </div>
            </div>

            <p style="font-size: 15px; line-height: 1.8;">
              <strong>Action suggérée :</strong><br>
              Considérez d'ajouter ce lead à votre liste de diffusion et de faire un suivi personnalisé
              dans les prochains jours pour maximiser l'engagement.
            </p>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #78350f; font-size: 14px;">
                💡 <strong>Conseil :</strong> Les leads qui téléchargent le guide sont généralement plus engagés.
                Un suivi rapide peut augmenter significativement le taux de conversion.
              </p>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                <strong>Date et heure :</strong> ${new Date().toLocaleString('fr-FR', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                  timeZone: 'Africa/Abidjan'
                })}
              </p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0; font-size: 14px;">Cabinet DAB - Notification automatique</p>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
📥 NOUVEAU TÉLÉCHARGEMENT DE GUIDE

Un lead vient de télécharger le guide de la méthode Cabinet DAB.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 ADRESSE EMAIL DU LEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action suggérée :
Considérez d'ajouter ce lead à votre liste de diffusion et de faire un suivi personnalisé dans les prochains jours pour maximiser l'engagement.

💡 Conseil : Les leads qui téléchargent le guide sont généralement plus engagés. Un suivi rapide peut augmenter significativement le taux de conversion.

Date et heure : ${new Date().toLocaleString('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Africa/Abidjan'
})}

---
Cabinet DAB - Notification automatique
  `

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: emailConfig.to,
    subject: `📥 Nouveau Lead - Téléchargement Guide - ${email}`,
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Fonction principale pour gérer l'envoi des emails lors du téléchargement du guide
 */
export async function sendGuideDownloadEmails(
  data: GuideDownloadData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Créer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.auth.user,
        pass: emailConfig.smtp.auth.pass,
      },
    })

    // Vérifier la connexion SMTP
    await transporter.verify()

    // Envoyer les deux emails en parallèle
    await Promise.all([
      sendUserConfirmationEmail(transporter, data.email),
      sendTeamNotificationEmail(transporter, data.email),
    ])

    console.log("Emails de téléchargement de guide envoyés avec succès pour:", data.email)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi des emails de téléchargement:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi des emails",
    }
  }
}
