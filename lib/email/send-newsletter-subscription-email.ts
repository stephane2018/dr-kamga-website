import nodemailer from "nodemailer"
import { emailConfig } from "./config"

export interface NewsletterSubscriptionData {
  email: string
}

/**
 * Envoie un email de confirmation à l'utilisateur qui s'inscrit à la newsletter
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
          .benefits { background: #fbe9e7; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .benefit-item { display: flex; align-items: start; gap: 12px; margin-bottom: 12px; }
          .benefit-dot { width: 8px; height: 8px; background: #5d4037; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
          .unsubscribe { margin-top: 15px; font-size: 11px; color: #9ca3af; }
          .unsubscribe a { color: #9ca3af; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎉 Bienvenue dans la communauté !</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Cabinet DAB - Newsletter</p>
          </div>

          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">Bonjour,</p>

            <p style="font-size: 15px; line-height: 1.8;">
              Merci de vous être inscrit(e) à notre newsletter ! Vous faites maintenant partie d'une communauté
              <strong>d'agriculteurs</strong> qui transforment leur exploitation locale en entreprise exportatrice.
            </p>

            <div class="benefits">
              <h3 style="margin: 0 0 15px 0; color: #5d4037; font-size: 18px;">📬 Ce que vous allez recevoir :</h3>

              <div class="benefit-item">
                <div class="benefit-dot"></div>
                <p style="margin: 0; font-size: 14px;">
                  <strong>Stratégies exclusives</strong> pour pénétrer les marchés internationaux
                </p>
              </div>

              <div class="benefit-item">
                <div class="benefit-dot"></div>
                <p style="margin: 0; font-size: 14px;">
                  <strong>Études de cas réels</strong> d'agriculteurs qui ont multiplié leurs revenus
                </p>
              </div>

              <div class="benefit-item">
                <div class="benefit-dot"></div>
                <p style="margin: 0; font-size: 14px;">
                  <strong>Accès prioritaire</strong> aux masterclass et événements exclusifs
                </p>
              </div>

              <div class="benefit-item">
                <div class="benefit-dot"></div>
                <p style="margin: 0; font-size: 14px;">
                  <strong>Conseils pratiques</strong> pour améliorer votre productivité agricole
                </p>
              </div>
            </div>

            <p style="font-size: 15px; line-height: 1.8;">
              En attendant votre prochain email, découvrez notre méthode complète
              <strong>"De la ferme aux marchés mondiaux"</strong>.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}" class="button">
                Découvrir nos services
              </a>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              À très bientôt,<br>
              <strong>Dr. Kanga Kouamé</strong><br>
              Cabinet DAB
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} Cabinet DAB - Dr. Kanga Kouamé. Tous droits réservés.</p>
            <div class="unsubscribe">
              <p style="margin: 5px 0;">
                Vous recevez cet email car vous vous êtes inscrit(e) à notre newsletter.
                <br>
                Pour vous désabonner, <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}/unsubscribe?email=${encodeURIComponent(email)}">cliquez ici</a>.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const textContent = `
Bienvenue dans la communauté !

Bonjour,

Merci de vous être inscrit(e) à notre newsletter ! Vous faites maintenant partie d'une communauté de +2 000 agriculteurs qui transforment leur exploitation locale en entreprise exportatrice.

📬 CE QUE VOUS ALLEZ RECEVOIR :

• Stratégies exclusives pour pénétrer les marchés internationaux
• Études de cas réels d'agriculteurs qui ont multiplié leurs revenus
• Accès prioritaire aux masterclass et événements exclusifs
• Conseils pratiques pour améliorer votre productivité agricole

En attendant votre prochain email, découvrez notre méthode complète "De la ferme aux marchés mondiaux".

Visitez notre site : ${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}

À très bientôt,
Dr. Kanga Kouamé
Cabinet DAB

---
Vous recevez cet email car vous vous êtes inscrit(e) à notre newsletter.
Pour vous désabonner : ${process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetdab.com'}/unsubscribe?email=${encodeURIComponent(email)}
  `

  await transporter.sendMail({
    from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
    to: email,
    subject: "🎉 Bienvenue ! Votre inscription à la newsletter Cabinet DAB",
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Envoie une notification à l'équipe qu'un nouvel abonné s'est inscrit à la newsletter
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
            <div class="alert-title">📬 NOUVELLE INSCRIPTION NEWSLETTER</div>
            <p style="margin: 5px 0 0 0; color: #3e2723; font-size: 14px;">Un nouvel abonné s'est inscrit à la newsletter.</p>
          </div>

          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">📊 Nouvel Abonné</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">Inscription Newsletter</p>
          </div>

          <div class="content">
            <div class="info-box">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; font-weight: bold; text-transform: uppercase;">
                📧 Adresse Email du Nouvel Abonné
              </p>
              <div class="email-value">
                <a href="mailto:${email}" style="color: #5d4037; text-decoration: none;">${email}</a>
              </div>
            </div>

            <p style="font-size: 15px; line-height: 1.8;">
              <strong>Action suggérée :</strong><br>
              Ajoutez cette adresse email à votre liste de diffusion newsletter. Un email de bienvenue
              a été automatiquement envoyé à l'utilisateur.
            </p>

            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #0d47a1; font-size: 14px;">
                💡 <strong>Conseil :</strong> Les abonnés à la newsletter sont des leads qualifiés.
                Pensez à segmenter vos campagnes email pour maximiser l'engagement.
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
📬 NOUVELLE INSCRIPTION NEWSLETTER

Un nouvel abonné s'est inscrit à la newsletter.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 ADRESSE EMAIL DU NOUVEL ABONNÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action suggérée :
Ajoutez cette adresse email à votre liste de diffusion newsletter. Un email de bienvenue a été automatiquement envoyé à l'utilisateur.

💡 Conseil : Les abonnés à la newsletter sont des leads qualifiés. Pensez à segmenter vos campagnes email pour maximiser l'engagement.

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
    subject: `📬 Nouvelle inscription Newsletter - ${email}`,
    text: textContent,
    html: htmlContent,
  })
}

/**
 * Fonction principale pour gérer l'envoi des emails lors de l'inscription à la newsletter
 */
export async function sendNewsletterSubscriptionEmails(
  data: NewsletterSubscriptionData
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

    console.log("Emails d'inscription newsletter envoyés avec succès pour:", data.email)
    return { success: true }

  } catch (error) {
    console.error("Erreur lors de l'envoi des emails d'inscription newsletter:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi des emails",
    }
  }
}
