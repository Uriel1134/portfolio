import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'lissanaurioluriel@gmail.com',
      pass: process.env.EMAIL_PASS // Mot de passe d'application Gmail
    }
  });
};

// POST - Envoyer un email de contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, budget, message, services } = body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Vérification de la configuration email
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your-gmail-app-password-here') {
      console.log('📧 Configuration email manquante - Mode test activé');
      console.log('📋 Données reçues:', {
        name,
        email,
        company: company || 'Non spécifiée',
        subject: subject || 'Non spécifié',
        budget: budget || 'Non spécifié',
        message,
        services: services?.length > 0 ? services : ['Aucun service sélectionné']
      });

      return NextResponse.json({
        success: true,
        message: 'Message reçu avec succès ! Je vous répondrai rapidement. (Mode test - l\'email sera envoyé une fois la configuration terminée)'
      });
    }

    const transporter = createTransporter();

    // Template HTML pour l'email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #4F46E5; margin-bottom: 5px; display: block; }
          .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #3B82F6; }
          .services { display: flex; flex-wrap: wrap; gap: 8px; }
          .service-tag { background: #3B82F6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nouveau Message de Contact</h1>
            <p>Vous avez reçu un nouveau message depuis votre portfolio</p>
          </div>

          <div class="content">
            <div class="field">
              <span class="label">👤 Nom complet :</span>
              <div class="value">${name}</div>
            </div>

            <div class="field">
              <span class="label">📧 Email :</span>
              <div class="value">${email}</div>
            </div>

            ${company ? `
            <div class="field">
              <span class="label">🏢 Entreprise :</span>
              <div class="value">${company}</div>
            </div>
            ` : ''}

            <div class="field">
              <span class="label">📋 Sujet :</span>
              <div class="value">${subject || 'Non spécifié'}</div>
            </div>

            ${budget ? `
            <div class="field">
              <span class="label">💰 Budget :</span>
              <div class="value">${budget}</div>
            </div>
            ` : ''}

            ${services && services.length > 0 ? `
            <div class="field">
              <span class="label">🛠️ Services demandés :</span>
              <div class="value">
                <div class="services">
                  ${services.map((service: string) => `<span class="service-tag">${service}</span>`).join('')}
                </div>
              </div>
            </div>
            ` : ''}

            <div class="field">
              <span class="label">💬 Message :</span>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <div class="footer">
            <p>📅 Reçu le ${new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>🌐 Envoyé depuis votre portfolio - <strong>auriol-portfolio.com</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Configuration de l'email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'lissanaurioluriel@gmail.com'}>`,
      to: 'lissanaurioluriel@gmail.com',
      subject: `🚀 Nouveau contact portfolio: ${subject || name}`,
      html: htmlTemplate,
      replyTo: email
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Je vous répondrai rapidement.'
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}