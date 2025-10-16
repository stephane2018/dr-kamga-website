export type EmailLanguage = 'fr' | 'en'

export interface EmailTranslations {
  // Contact Email
  contact: {
    subject: string
    newRequest: string
    actionRequired: string
    formTitle: string
    quickSummary: string
    contact: string
    interestedIn: string
    email: string
    phone: string
    replyByEmail: string
    call: string
    fullDetails: string
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    serviceRequested: string
    currentSituation: string
    fullMessage: string
    actionRequiredFooter: string
    responseTime: string
  }
  
  // Guide Download Email
  guideDownload: {
    user: {
      subject: string
      thankYou: string
      guideTitle: string
      hello: string
      thankYouMessage: string
      downloadStarted: string
      goFurther: string
      goFurtherDescription: string
      discoverServices: string
      regards: string
      signature: string
      unsubscribeText: string
      unsubscribeLink: string
    }
    team: {
      subject: string
      newDownload: string
      newLead: string
      guideDownload: string
      emailLead: string
      suggestedAction: string
      tip: string
      tipMessage: string
      dateTime: string
      autoNotification: string
    }
  }
  
  // Newsletter Subscription Email
  newsletter: {
    user: {
      subject: string
      welcome: string
      newsletterTitle: string
      hello: string
      welcomeMessage: string
      whatYouReceive: string
      benefit1: string
      benefit2: string
      benefit3: string
      benefit4: string
      waitingMessage: string
      discoverServices: string
      seeYouSoon: string
      signature: string
      unsubscribeText: string
      unsubscribeLink: string
    }
    team: {
      subject: string
      newSubscription: string
      newSubscriber: string
      newsletterSubscription: string
      emailSubscriber: string
      suggestedAction: string
      tip: string
      tipMessage: string
      dateTime: string
      autoNotification: string
    }
  }
  
  // Unsubscribe Email
  unsubscribe: {
    subject: string
    alert: string
    alertMessage: string
    title: string
    subtitle: string
    emailAddress: string
    actionRequired: string
    actionMessage: string
    important: string
    importantMessage: string
    dateTime: string
    autoNotification: string
  }

  // Common
  common: {
    cabinetName: string
    copyright: string
  }
}

export const emailTranslations: Record<EmailLanguage, EmailTranslations> = {
  fr: {
    contact: {
      subject: '🔔 NOUVELLE DEMANDE',
      newRequest: '🔔 NOUVELLE DEMANDE DE CONTACT',
      actionRequired: 'Une personne a rempli le formulaire de contact sur le site web. Veuillez traiter cette demande dans les 24h.',
      formTitle: '📬 Formulaire de Contact',
      quickSummary: '📋 Résumé rapide',
      contact: 'Contact :',
      interestedIn: 'Intéressé par :',
      email: 'Email :',
      phone: 'Téléphone :',
      replyByEmail: '✉️ Répondre par Email',
      call: '📞 Appeler',
      fullDetails: '📝 Détails complets de la demande',
      firstName: '👤 Prénom',
      lastName: '👤 Nom',
      emailAddress: '📧 Adresse Email',
      phoneNumber: '📱 Numéro de Téléphone',
      serviceRequested: '🎯 Service Demandé',
      currentSituation: '📊 Situation Actuelle du Prospect',
      fullMessage: '💬 Message Complet',
      actionRequiredFooter: '⏰ Action requise',
      responseTime: 'Veuillez répondre à cette demande dans les 24 heures pour maintenir notre engagement de qualité envers nos clients.',
    },
    guideDownload: {
      user: {
        subject: '📚 Votre guide Cabinet DAB - De la ferme aux marchés mondiaux',
        thankYou: '📚 Merci pour votre intérêt !',
        guideTitle: 'Votre guide de la méthode Cabinet DAB',
        hello: 'Bonjour,',
        thankYouMessage: 'Merci d\'avoir téléchargé notre guide "De la ferme aux marchés mondiaux" ! Nous espérons que ce document vous aidera à transformer votre exploitation agricole locale en entreprise exportatrice prospère.',
        downloadStarted: 'Votre téléchargement a démarré automatiquement. Si ce n\'est pas le cas, le PDF devrait être disponible dans vos téléchargements récents.',
        goFurther: '🎯 Pour aller plus loin',
        goFurtherDescription: 'Découvrez nos masterclass thématiques et notre programme de coaching personnalisé pour accélérer votre transformation vers les marchés internationaux.',
        discoverServices: 'Découvrir nos services',
        regards: 'Cordialement,',
        signature: 'Dr. Kanga Kouamé\nCabinet DAB',
        unsubscribeText: 'Vous recevez cet email car vous avez téléchargé notre guide.',
        unsubscribeLink: 'Pour vous désabonner, cliquez ici',
      },
      team: {
        subject: '📥 Nouveau Lead - Téléchargement Guide',
        newDownload: '📥 NOUVEAU TÉLÉCHARGEMENT DE GUIDE',
        newLead: '📊 Nouveau Lead',
        guideDownload: 'Téléchargement du Guide Méthode',
        emailLead: '📧 Adresse Email du Lead',
        suggestedAction: 'Considérez d\'ajouter ce lead à votre liste de diffusion et de faire un suivi personnalisé dans les prochains jours pour maximiser l\'engagement.',
        tip: '💡 Conseil :',
        tipMessage: 'Les leads qui téléchargent le guide sont généralement plus engagés. Un suivi rapide peut augmenter significativement le taux de conversion.',
        dateTime: 'Date et heure :',
        autoNotification: 'Cabinet DAB - Notification automatique',
      },
    },
    newsletter: {
      user: {
        subject: '🎉 Bienvenue ! Votre inscription à la newsletter Cabinet DAB',
        welcome: '🎉 Bienvenue dans la communauté !',
        newsletterTitle: 'Cabinet DAB - Newsletter',
        hello: 'Bonjour,',
        welcomeMessage: 'Merci de vous être inscrit(e) à notre newsletter ! Vous faites maintenant partie d\'une communauté d\'agriculteurs qui transforment leur exploitation locale en entreprise exportatrice.',
        whatYouReceive: '📬 Ce que vous allez recevoir :',
        benefit1: 'Stratégies exclusives pour pénétrer les marchés internationaux',
        benefit2: 'Études de cas réels d\'agriculteurs qui ont multiplié leurs revenus',
        benefit3: 'Accès prioritaire aux masterclass et événements exclusifs',
        benefit4: 'Conseils pratiques pour améliorer votre productivité agricole',
        waitingMessage: 'En attendant votre prochain email, découvrez notre méthode complète "De la ferme aux marchés mondiaux".',
        discoverServices: 'Découvrir nos services',
        seeYouSoon: 'À très bientôt,',
        signature: 'Dr. Kanga Kouamé\nCabinet DAB',
        unsubscribeText: 'Vous recevez cet email car vous vous êtes inscrit(e) à notre newsletter.',
        unsubscribeLink: 'Pour vous désabonner, cliquez ici',
      },
      team: {
        subject: '📬 Nouvelle inscription Newsletter',
        newSubscription: '📬 NOUVELLE INSCRIPTION NEWSLETTER',
        newSubscriber: '📊 Nouvel Abonné',
        newsletterSubscription: 'Inscription Newsletter',
        emailSubscriber: '📧 Adresse Email du Nouvel Abonné',
        suggestedAction: 'Ajoutez cette adresse email à votre liste de diffusion newsletter. Un email de bienvenue a été automatiquement envoyé à l\'utilisateur.',
        tip: '💡 Conseil :',
        tipMessage: 'Les abonnés à la newsletter sont des leads qualifiés. Pensez à segmenter vos campagnes email pour maximiser l\'engagement.',
        dateTime: 'Date et heure :',
        autoNotification: 'Cabinet DAB - Notification automatique',
      },
    },
    unsubscribe: {
      subject: '🔕 Désinscription',
      alert: '🔕 DÉSINSCRIPTION',
      alertMessage: 'Un utilisateur s\'est désabonné de la liste de diffusion.',
      title: '📤 Désinscription',
      subtitle: 'Notification de désabonnement',
      emailAddress: '📧 Adresse Email',
      actionRequired: 'Action requise :',
      actionMessage: 'Veuillez retirer cette adresse email de votre liste de diffusion et de votre CRM pour respecter la demande de désinscription de l\'utilisateur.',
      important: '⚠️ Important :',
      importantMessage: 'Conformément au RGPD, vous devez traiter cette demande de désinscription rapidement et ne plus envoyer d\'emails marketing à cette adresse.',
      dateTime: 'Date et heure :',
      autoNotification: 'Cabinet DAB - Notification automatique',
    },
    common: {
      cabinetName: 'Cabinet DAB - Dr. Kanga Kouamé',
      copyright: 'Tous droits réservés.',
    },
  },
  en: {
    contact: {
      subject: '🔔 NEW REQUEST',
      newRequest: '🔔 NEW CONTACT REQUEST',
      actionRequired: 'Someone has filled out the contact form on the website. Please process this request within 24 hours.',
      formTitle: '📬 Contact Form',
      quickSummary: '📋 Quick Summary',
      contact: 'Contact:',
      interestedIn: 'Interested in:',
      email: 'Email:',
      phone: 'Phone:',
      replyByEmail: '✉️ Reply by Email',
      call: '📞 Call',
      fullDetails: '📝 Full Request Details',
      firstName: '👤 First Name',
      lastName: '👤 Last Name',
      emailAddress: '📧 Email Address',
      phoneNumber: '📱 Phone Number',
      serviceRequested: '🎯 Requested Service',
      currentSituation: '📊 Current Prospect Situation',
      fullMessage: '💬 Full Message',
      actionRequiredFooter: '⏰ Action required',
      responseTime: 'Please respond to this request within 24 hours to maintain our quality commitment to our clients.',
    },
    guideDownload: {
      user: {
        subject: '📚 Your Cabinet DAB guide - From Farm to Global Markets',
        thankYou: '📚 Thank you for your interest!',
        guideTitle: 'Your Cabinet DAB method guide',
        hello: 'Hello,',
        thankYouMessage: 'Thank you for downloading our guide "From Farm to Global Markets"! We hope this document will help you transform your local farm into a thriving export business.',
        downloadStarted: 'Your download has started automatically. If not, the PDF should be available in your recent downloads.',
        goFurther: '🎯 To go further',
        goFurtherDescription: 'Discover our thematic masterclasses and personalized coaching program to accelerate your transformation towards international markets.',
        discoverServices: 'Discover our services',
        regards: 'Best regards,',
        signature: 'Dr. Kanga Kouamé\nCabinet DAB',
        unsubscribeText: 'You are receiving this email because you downloaded our guide.',
        unsubscribeLink: 'To unsubscribe, click here',
      },
      team: {
        subject: '📥 New Lead - Guide Download',
        newDownload: '📥 NEW GUIDE DOWNLOAD',
        newLead: '📊 New Lead',
        guideDownload: 'Method Guide Download',
        emailLead: '📧 Lead Email Address',
        suggestedAction: 'Consider adding this lead to your mailing list and doing personalized follow-up in the coming days to maximize engagement.',
        tip: '💡 Tip:',
        tipMessage: 'Leads who download the guide are generally more engaged. Quick follow-up can significantly increase conversion rate.',
        dateTime: 'Date and time:',
        autoNotification: 'Cabinet DAB - Automatic notification',
      },
    },
    newsletter: {
      user: {
        subject: '🎉 Welcome! Your Cabinet DAB newsletter subscription',
        welcome: '🎉 Welcome to the community!',
        newsletterTitle: 'Cabinet DAB - Newsletter',
        hello: 'Hello,',
        welcomeMessage: 'Thank you for subscribing to our newsletter! You are now part of a community of farmers transforming their local farm into an export business.',
        whatYouReceive: '📬 What you will receive:',
        benefit1: 'Exclusive strategies to penetrate international markets',
        benefit2: 'Real case studies of farmers who multiplied their income',
        benefit3: 'Priority access to masterclasses and exclusive events',
        benefit4: 'Practical advice to improve your agricultural productivity',
        waitingMessage: 'While waiting for your next email, discover our complete method "From Farm to Global Markets".',
        discoverServices: 'Discover our services',
        seeYouSoon: 'See you soon,',
        signature: 'Dr. Kanga Kouamé\nCabinet DAB',
        unsubscribeText: 'You are receiving this email because you subscribed to our newsletter.',
        unsubscribeLink: 'To unsubscribe, click here',
      },
      team: {
        subject: '📬 New Newsletter Subscription',
        newSubscription: '📬 NEW NEWSLETTER SUBSCRIPTION',
        newSubscriber: '📊 New Subscriber',
        newsletterSubscription: 'Newsletter Subscription',
        emailSubscriber: '📧 New Subscriber Email Address',
        suggestedAction: 'Add this email address to your newsletter mailing list. A welcome email has been automatically sent to the user.',
        tip: '💡 Tip:',
        tipMessage: 'Newsletter subscribers are qualified leads. Consider segmenting your email campaigns to maximize engagement.',
        dateTime: 'Date and time:',
        autoNotification: 'Cabinet DAB - Automatic notification',
      },
    },
    unsubscribe: {
      subject: '🔕 Unsubscribe',
      alert: '🔕 UNSUBSCRIBE',
      alertMessage: 'A user has unsubscribed from the mailing list.',
      title: '📤 Unsubscribe',
      subtitle: 'Unsubscribe notification',
      emailAddress: '📧 Email Address',
      actionRequired: 'Action required:',
      actionMessage: 'Please remove this email address from your mailing list and CRM to respect the user\'s unsubscribe request.',
      important: '⚠️ Important:',
      importantMessage: 'In accordance with GDPR, you must process this unsubscribe request promptly and no longer send marketing emails to this address.',
      dateTime: 'Date and time:',
      autoNotification: 'Cabinet DAB - Automatic notification',
    },
    common: {
      cabinetName: 'Cabinet DAB - Dr. Kanga Kouamé',
      copyright: 'All rights reserved.',
    },
  },
}

// Helper function to get translations
export function getEmailTranslations(lang: EmailLanguage = 'fr'): EmailTranslations {
  return emailTranslations[lang] || emailTranslations.fr
}

// Helper function to get interest label with translation
export function getInterestLabel(interest: string, lang: EmailLanguage = 'fr'): string {
  const labels: Record<EmailLanguage, Record<string, string>> = {
    fr: {
      masterclass: 'Masterclass Thématiques',
      seminaires: 'Séminaires Pratiques',
      coaching: 'Coaching Privé',
      programme: 'Programme "De la ferme aux marchés mondiaux"',
      information: 'Informations générales',
    },
    en: {
      masterclass: 'Thematic Masterclasses',
      seminaires: 'Practical Seminars',
      coaching: 'Private Coaching',
      programme: '"From Farm to Global Markets" Program',
      information: 'General information',
    },
  }
  return labels[lang][interest] || interest
}
