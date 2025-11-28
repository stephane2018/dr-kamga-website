import nodemailer from "nodemailer"

export interface WelcomeEmailData {
  email: string
  name: string
  password: string
  role: string
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as any)

    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/login`
    const roleLabel = data.role === "admin" ? "Administrateur" : "Gestionnaire"

    const mailOptions = {
      from: `"Cabinet DAB" <${process.env.SMTP_FROM}>`,
      to: data.email,
      replyTo: `"Cabinet DAB" <${process.env.SMTP_FROM}>`,
      subject: "Bienvenue - Vos identifiants d'accès",
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'Nodemailer',
        'X-Entity-Ref-ID': `welcome-${Date.now()}`,
        'Importance': 'high',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Bricolage Grotesque', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #222C57 0%, #1a2242 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Bienvenue !</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                        Bonjour <strong>${data.name}</strong>,
                      </p>

                      <p style="margin: 0 0 20px; color: #666666; font-size: 15px; line-height: 1.6;">
                        Votre compte <strong>${roleLabel}</strong> a été créé avec succès. Vous pouvez maintenant accéder à l'interface d'administration du Cabinet DAB.
                      </p>

                      <!-- Credentials Box -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #222C57;">
                        <tr>
                          <td style="padding: 20px;">
                            <p style="margin: 0 0 15px; color: #333333; font-size: 14px; font-weight: bold;">
                              Vos identifiants de connexion :
                            </p>
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                              <strong>Email :</strong> ${data.email}
                            </p>
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                              <strong>Mot de passe temporaire :</strong> ${data.password}
                            </p>
                            <p style="margin: 15px 0 0; color: #dc3545; font-size: 13px; font-style: italic;">
                              ⚠️ Veuillez changer votre mot de passe après votre première connexion.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${loginUrl}" style="display: inline-block; padding: 14px 40px; background: #FDC50A; color: #222C57; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                              Se connecter maintenant
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 20px 0 0; color: #999999; font-size: 13px; line-height: 1.5;">
                        Si vous avez des questions, n'hésitez pas à contacter l'administrateur principal.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                      <p style="margin: 0; color: #999999; font-size: 13px;">
                        © ${new Date().getFullYear()} Cabinet DAB - Dr. KANGAH Alain Desire Boigny
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    return { success: true }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error: "Erreur lors de l'envoi de l'email" }
  }
}
