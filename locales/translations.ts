export type Language = 'fr' | 'en'

export interface Translations {
  // Navigation
  nav: {
    home: string
    about: string
    masterclass: string
    coaching: string
    contact: string
    login: string
  }

  // Hero Section
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    secondaryCta: string
  }

  // Program Section
  program: {
    title: string
    subtitle: string
    axes: {
      axis1: {
        title: string
        description: string
      }
      axis2: {
        title: string
        description: string
      }
      axis3: {
        title: string
        description: string
      }
      axis4: {
        title: string
        description: string
      }
      axis5: {
        title: string
        description: string
      }
      axis6: {
        title: string
        description: string
      }
    }
  }

  // Progress Path Section
  progressPath: {
    title: string
    subtitle: string
    ctaText: string
    services: {
      masterclass: {
        category: string
        title: string
        subtitle: string
        description: string
        features: {
          feature1: { title: string; description: string }
          feature2: { title: string; description: string }
          feature3: { title: string; description: string }
        }
        ctaText: string
      }
      seminaires: {
        category: string
        title: string
        subtitle: string
        description: string
        features: {
          feature1: { title: string; description: string }
          feature2: { title: string; description: string }
          feature3: { title: string; description: string }
        }
        ctaText: string
      }
      coaching: {
        category: string
        title: string
        subtitle: string
        description: string
        features: {
          feature1: { title: string; description: string }
          feature2: { title: string; description: string }
          feature3: { title: string; description: string }
        }
        ctaText: string
      }
      events: {
        category: string
        title: string
        subtitle: string
        description: string
        features: {
          feature1: { title: string; description: string }
          feature2: { title: string; description: string }
          feature3: { title: string; description: string }
        }
        ctaText: string
      }
    }
  }

  // Why Choose Section
  whyChoose: {
    title: string
    services: {
      management: {
        title: string
        description: string
        ctaText: string
      }
      supplies: {
        title: string
        description: string
        ctaText: string
      }
      mechanization: {
        title: string
        description: string
        ctaText: string
      }
    }
  }

  // CTA Section
  cta: {
    title: string
    description: string
    button: string
  }

  // Footer
  footer: {
    description: string
    quickLinks: {
      title: string
      home: string
      about: string
      videos: string
      masterclass: string
      coaching: string
      contact: string
    }
    contact: {
      title: string
      email: string
      phone: string
      address: string
    }
    social: {
      title: string
    }
    copyright: string
    privacyPolicy: string
    termsOfService: string
  }

  // About Page
  about: {
    hero: {
      badge: string
      title: string
      description: string
      credentials: {
        credential1: string
        credential2: string
        credential3: string
        credential4: string
      }
    }
    expertise: {
      title: string
      subtitle: string
      domains: {
        policies: { title: string; description: string }
        health: { title: string; description: string }
        transformation: { title: string; description: string }
        commercialization: { title: string; description: string }
        management: { title: string; description: string }
        specialties: { title: string; description: string }
      }
      formation: {
        title: string
        items: {
          item1: { title: string; description: string }
          item2: { title: string; description: string }
          item3: { title: string; description: string }
        }
      }
      languages: {
        title: string
        subtitle: string
        international: string
        local: string
      }
    }
    career: {
      title: string
      subtitle: string
      administration: {
        title: string
        subtitle: string
        items: string[]
      }
      international: {
        title: string
        subtitle: string
        agencies: string
        agencyList: string[]
        other: string
        otherList: string[]
      }
      return: {
        title: string
        subtitle: string
        items: string[]
      }
      cabinet: {
        title: string
        subtitle: string
        items: string[]
      }
    }
    signature: {
      badge: string
      title: string
      description: string
      pillars: {
        awareness: { title: string; description: string }
        equip: { title: string; description: string }
        accompany: { title: string; description: string }
      }
      quote: string
      vision: string
    }
  }

  // Coaching Page
  coaching: {
    hero: {
      badge: string
      title: string
      subtitle: string
      description: string
      valueProps: {
        prop1: { value: string; description: string }
        prop2: { value: string; description: string }
        prop3: { value: string; description: string }
      }
      cta: {
        primary: string
        secondary: string
      }
      socialProof: {
        limitedSpots: string
        successCount: string
      }
    }
    positioning: {
      badge: string
      title: string
      description: string
      benefits: string[]
      expert: {
        name: string
        description: string
        rating: string
        basedOn: string
      }
    }
    content: {
      badge: string
      title: string
      subtitle: string
      cards: {
        diagnostic: {
          title: string
          subtitle: string
          items: string[]
        }
        strategy: {
          title: string
          subtitle: string
          items: string[]
        }
        followUp: {
          title: string
          subtitle: string
          items: string[]
        }
      }
      result: string
    }
    stats: {
      title: string
      subtitle: string
      items: {
        experience: { value: string; label: string }
        farmers: { value: string; label: string }
        countries: { value: string; label: string }
        growth: { value: string; label: string }
      }
    }
    testimonials: {
      title: string
      items: {
        testimonial1: {
          name: string
          role: string
          content: string
        }
        testimonial2: {
          name: string
          role: string
          content: string
        }
      }
    }
    booking: {
      title: string
      subtitle: string
      diagnostic: {
        badge: string
        duration: string
        title: string
        description: string
        features: string[]
        slotsTitle: string
        cta: string
      }
      premium: {
        badge: string
        duration: string
        title: string
        description: string
        features: string[]
        programDuration: string
        cta: string
      }
      howItWorks: {
        title: string
        steps: {
          step1: { title: string; description: string }
          step2: { title: string; description: string }
          step3: { title: string; description: string }
          step4: { title: string; description: string }
        }
      }
    }
    cta: {
      title: string
      description: string
      button: string
    }
  }

  // Seminaires Page
  seminaires: {
    hero: {
      badge: string
      title: string
      description: string
    }
    benefits: {
      title: string
      items: {
        collective: { title: string; description: string }
        practical: { title: string; description: string }
        networking: { title: string; description: string }
      }
      intensive: {
        title: string
        description: string
        stats: {
          satisfaction: { value: string; label: string }
          implementation: { value: string; label: string }
        }
      }
    }
    features: {
      title: string
      subtitle: string
      cards: {
        collective: { title: string; description: string }
        practical: { title: string; description: string }
        networking: { title: string; description: string }
      }
    }
    cards: {
      labels: {
        nextSession: string
        location: string
        showProgram: string
        hideProgram: string
        learnMore: string
        detailedProgram: string
      }
    }
    cta: {
      title: string
      description: string
      button: string
    }
  }

  // Contact Page
  contactPage: {
    hero: {
      title: string
      subtitle: string
      description: string
      features: {
        feature1: string
        feature2: string
        feature3: string
      }
    }
    form: {
      title: string
      subtitle: string
      guaranteeResponse: string
      freeConsultation: string
      fields: {
        firstName: { label: string; placeholder: string }
        lastName: { label: string; placeholder: string }
        email: { label: string; placeholder: string }
        phone: { label: string; placeholder: string }
        interest: {
          label: string
          placeholder: string
          options: {
            masterclass: string
            seminaires: string
            coaching: string
            programme: string
            information: string
          }
        }
        situation: { label: string; placeholder: string }
        message: { label: string; placeholder: string }
      }
      submit: string
      sending: string
      disclaimer: string
      success: string
      error: string
    }
    contact: {
      title: string
      email: {
        title: string
        value: string
        subtitle: string
      }
      phone: {
        title: string
        value: string
        subtitle: string
      }
      office: {
        title: string
        value: string
        subtitle: string
      }
    }
    hours: {
      title: string
      weekdays: { label: string; hours: string }
      saturday: { label: string; hours: string }
      sunday: { label: string; hours: string }
    }
    impact: {
      title: string
      subtitle: string
      stats: {
        experience: { value: string; label: string }
        companies: { value: string; label: string }
        countries: { value: string; label: string }
        satisfaction: { value: string; label: string }
      }
    }
  }

  // Masterclass Page
  masterclass: {
    hero: {
      badge: string
      title: string
      description: string
    }
    axisCards: {
      title: string
      subtitle: string
      maxParticipants: string
    }
    axes: {
      axis1: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
      axis2: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
      axis3: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
      axis4: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
      axis5: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
      axis6: {
        title: string
        description: string
        content: string
        features: string[]
        duration: string
        maxParticipants: number
      }
    }
    format: {
      title: string
      online: {
        title: string
        features: string[]
      }
      inPerson: {
        title: string
        features: string[]
      }
    }
    benefits: {
      title: string
      items: {
        interaction: { title: string; description: string }
        casStudies: { title: string; description: string }
        questions: { title: string; description: string }
      }
    }
    videos: {
      title: string
      subtitle: string
      viewButton: string
      comingSoon: string
      video1: {
        badge: string
        duration: string
        title: string
        description: string
      }
      video2: {
        badge: string
        duration: string
        title: string
        description: string
      }
      video3: {
        badge: string
        duration: string
        title: string
        description: string
      }
    }
    registration: {
      title: string
      subtitle: string
      online: string
      inPerson: string
      limitedSeats: string
      fields: {
        date: string
        time: string
        price: string
        seatsLeft: string
      }
      card1: {
        title: string
        description: string
        date: string
        time: string
        seats: string
      }
      card2: {
        title: string
        description: string
        location: string
        date: string
        time: string
        seats: string
      }
      registerButton: string
      modalitiesTitle: string
      step1: {
        title: string
        description: string
      }
      step2: {
        title: string
        description: string
      }
      step3: {
        title: string
        description: string
      }
    }
    cta: {
      title: string
      description: string
      button: string
    }
  }

  // Contact Form (legacy - keep for compatibility)
  contact: {
    title: string
    subtitle: string
    form: {
      name: string
      email: string
      phone: string
      message: string
      submit: string
      sending: string
      success: string
      error: string
    }
  }

  // Common
  common: {
    learnMore: string
    readMore: string
    back: string
    next: string
    previous: string
    loading: string
    error: string
    success: string
  }

  // SEO Metadata
  seo: {
    home: {
      title: string
      description: string
      keywords: string[]
    }
    masterclass: {
      title: string
      description: string
      keywords: string[]
    }
    seminaires: {
      title: string
      description: string
      keywords: string[]
    }
    coaching: {
      title: string
      description: string
      keywords: string[]
    }
    contact: {
      title: string
      description: string
      keywords: string[]
    }
    apropos: {
      title: string
      description: string
      keywords: string[]
    }
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      masterclass: 'Masterclass',
      coaching: 'Coaching Privé',
      contact: 'Nous Contacter',
      login: 'Se connecter',
    },
    hero: {
      title: 'De la ferme aux Marchés Mondiaux',
      subtitle: 'Transformez votre exploitation agricole locale en entreprise exportatrice',
      description: 'Programme complet de formation, coaching et accompagnement pour réussir sur les marchés internationaux',
      cta: 'Commencer Maintenant',
      secondaryCta: 'En Savoir Plus',
    },
    program: {
      title: 'Un parcours structuré en 6 axes stratégiques',
      subtitle: 'pour transformer votre vision agricole et atteindre les marchés internationaux.',
      axes: {
        axis1: {
          title: 'Création de l\'exploitation Agricole',
          description: 'Création d\'une exploitation agricole adaptée à votre projet agricole et à votre niveau de développement.',
        },
        axis2: {
          title: 'Gestion de la production',
          description: 'Ont donne des outils pour structurer et optimiser votre unité pour devenir compétitif et rentable.',
        },
        axis3: {
          title: 'Transformation',
          description: 'Transformez vos matières premières en produits à forte valeur ajoutée avec des équipements adaptés et des processus optimisés.',
        },
        axis4: {
          title: 'Exportation',
          description: 'Maîtrisez les 3 étapes clés pour réussir votre export et préparez un dossier compétitif et crédible.',
        },
        axis5: {
          title: 'Assurances agricoles',
          description: 'Garantissez votre investissement et protégez vos produits pendant la transformation et l\'export.',
        },
        axis6: {
          title: 'Financement agricole',
          description: 'Accédez à des financements adaptés à votre projet agricole et à votre niveau de développement.',
        },
      },
    },
    progressPath: {
      title: 'Votre Chemin de Progression',
      subtitle: 'Attaquer les marchés mondiaux sereinement...Comme des milliers d\'exportateurs de produits locaux, nous vous aidons à organiser toute votre chaine de valeur pour accéder aux marchés mondiaux en boostant ainsi votre chiffre d\'affaires.',
      ctaText: 'Découvrez comment',
      services: {
        masterclass: {
          category: 'Formation Individuelle',
          title: 'Masterclass Thématiques',
          subtitle: 'Commencer par les masterclass',
          description: 'Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets spécifiques avec vidéos complémentaires incluses.',
          features: {
            feature1: { title: 'Sessions live de 2-4h', description: 'Apprentissage en temps réel avec interaction directe' },
            feature2: { title: 'Interaction directe avec l\'expert', description: 'Posez vos questions et obtenez des réponses personnalisées' },
            feature3: { title: 'Replays et vidéos complémentaires', description: 'Révisez à votre rythme, accès illimité' },
          },
          ctaText: 'Voir les masterclass',
        },
        seminaires: {
          category: 'Formation Collective',
          title: 'Séminaires Pratiques',
          subtitle: 'Mettre en pratique via des séminaires',
          description: 'Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.',
          features: {
            feature1: { title: 'Séminaires de 3 jours', description: 'Formation intensive et immersive en présentiel' },
            feature2: { title: 'Exercices pratiques en groupe', description: 'Mettez en application immédiatement vos acquis' },
            feature3: { title: 'Networking avec autres agriculteurs', description: 'Créez votre réseau professionnel et partagez vos expériences' },
          },
          ctaText: 'Rejoindre un séminaire',
        },
        coaching: {
          category: 'Accompagnement Premium',
          title: 'Coaching Privé',
          subtitle: 'Se perfectionner avec du coaching privé',
          description: 'Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux.',
          features: {
            feature1: { title: 'Sessions 1-à-1 personnalisées', description: 'Accompagnement individuel adapté à vos besoins spécifiques' },
            feature2: { title: 'Plan d\'action sur-mesure', description: 'Stratégie personnalisée pour votre exploitation' },
            feature3: { title: 'Suivi continu et ajustements', description: 'Support régulier pour garantir vos résultats' },
          },
          ctaText: 'Réserver un appel',
        },
        events: {
          category: 'Événements Exclusifs',
          title: 'Événements à Venir',
          subtitle: 'Participer aux séminaires présentiels',
          description: 'Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises.',
          features: {
            feature1: { title: 'Séminaires de 3 jours', description: 'Événements intensifs pour transformer votre approche du commerce' },
            feature2: { title: 'Exercices pratiques en groupe', description: 'Travail collaboratif sur des cas réels d\'exportation' },
            feature3: { title: 'Networking avec autres agriculteurs', description: 'Construisez des partenariats stratégiques durables' },
          },
          ctaText: 'Voir les événements',
        },
      },
    },
    whyChoose: {
      title: 'Nos services',
      services: {
        management: {
          title: 'Gestion de l\'exploitation',
          description: 'Optimisez vos rendements et structurez votre exploitation avec nos experts en gestion agricole.',
          ctaText: 'En savoir plus',
        },
        supplies: {
          title: 'Fournitures d\'intrants',
          description: 'Accédez à des intrants de qualité certifiée pour garantir la performance de vos cultures.',
          ctaText: 'En savoir plus',
        },
        mechanization: {
          title: 'Mécanisation agricole',
          description: 'Modernisez vos opérations avec des équipements performants adaptés à vos besoins.',
          ctaText: 'En savoir plus',
        },
      },
    },
    cta: {
      title: 'Prêt à Transformer Votre Exploitation ?',
      description: 'Rejoignez notre programme et commencez votre parcours vers les marchés internationaux',
      button: 'Nous Contacter',
    },
    footer: {
      description: 'Cabinet DAB accompagne les agriculteurs dans leur transformation vers les marchés internationaux.',
      quickLinks: {
        title: 'Liens Rapides',
        home: 'Accueil',
        about: 'À Propos',
        videos: 'Vidéos Pédagogiques',
        masterclass: 'Masterclass',
        coaching: 'Coaching',
        contact: 'Contact',
      },
      contact: {
        title: 'Contact',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse',
      },
      social: {
        title: 'Suivez-nous',
      },
      copyright: 'Tous droits réservés.',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: 'Conditions d\'Utilisation',
    },
    about: {
      hero: {
        badge: 'Parcours Expert',
        title: '40 ans d\'expérience au service de l\'Agriculture Africaine',
        description: 'Docteur vétérinaire et expert reconnu de la transformation locale et de l\'exportation, le Dr Kanga Kouamé a conçu la méthode "De la ferme aux marchés mondiaux" pour accompagner les producteurs vers l\'autonomie et la compétitivité internationale.',
        credentials: {
          credential1: 'Conseiller diplomatique de la CI auprès de la FAO, du PAM et du FIDA',
          credential2: 'Docteur en médecine vétérinaire, diplômé de l\'Université de Liège (Belgique)',
          credential3: 'Point focal OMC pour le système de contrôle sanitaire et phytosanitaire',
          credential4: 'Autorité compétente officielle de la CI pour l\'agrément des établissements',
        },
      },
      expertise: {
        title: 'Expert Reconnu en Agriculture',
        subtitle: 'Dr Kanga et son équipe vous accompagnent dans la conquête des marchés mondiaux',
        domains: {
          policies: {
            title: 'Politiques Agricoles',
            description: 'Analyse des politiques de production, exportation et importation pour la mise en œuvre de l\'AGOA',
          },
          health: {
            title: 'Santé Animale',
            description: 'Lutte contre les maladies animales et zoonotiques, contrôle sanitaire et phytosanitaire',
          },
          transformation: {
            title: 'Transformation',
            description: 'Conservation et transformation (préparations culinaires, emballage, packaging)',
          },
          commercialization: {
            title: 'Commercialisation',
            description: 'Accès aux marchés, études de marché, promotion des produits, valorisation nutritionnelle',
          },
          management: {
            title: 'Gestion d\'Exploitations',
            description: 'Exploitations agro-sylvo-pastorales et halieutiques (plantation, élevage, pêche)',
          },
          specialties: {
            title: 'Spécialités Clés',
            description: 'Chaînes de valeur, transformation locale, marchés internationaux',
          },
        },
        formation: {
          title: 'Formation & Qualifications',
          items: {
            item1: {
              title: 'Docteur en Médecine Vétérinaire',
              description: 'Université de Liège, Belgique - Spécialisé en production et santé animale, hygiène publique',
            },
            item2: {
              title: '40 années d\'expérience',
              description: 'Contribution au développement et promotion de l\'Agriculture Africaine',
            },
            item3: {
              title: 'Autorité Compétente Officielle',
              description: 'Agrément des établissements de traitement et certification des denrées animales',
            },
          },
        },
        languages: {
          title: 'Expert Polyglotte',
          subtitle: 'Communication internationale et terrain',
          international: 'Langues Internationales',
          local: 'Langues Locales Africaines',
        },
      },
      career: {
        title: 'Parcours Professionnel',
        subtitle: '40 années d\'expérience entre administration ivoirienne, institutions internationales et entrepreneuriat',
        administration: {
          title: 'Administration Ivoirienne',
          subtitle: '30 ans de service en qualité de gestionnaire',
          items: [
            'Laboratoires d\'analyses',
            'Exploitation de production animale',
            'Services vétérinaires',
            'Politiques Agricoles Nationales',
            'Coopération sous-régionale et internationale',
            'Centre de formations Agricoles',
          ],
        },
        international: {
          title: 'Institutions Internationales',
          subtitle: '10+ ans à l\'Ambassade de CI à Rome',
          agencies: 'Conseiller agricole auprès des agences Onusiennes :',
          agencyList: [
            'FAO (Organisation des Nations Unies pour l\'Alimentation et l\'Agriculture)',
            'PAM (Programme Alimentaire Mondial)',
            'FIDA (Fond International pour le Développement Agricole)',
          ],
          other: 'Et d\'autre part :',
          otherList: [
            'Coopération bilatérale avec les pays de la circonscription diplomatique',
          ],
        },
        return: {
          title: 'Retour en Côte d\'Ivoire',
          subtitle: 'Chargé des programmes auprès du bureau de la FAO en CI',
          items: [
            'Planification stratégique',
            'Mobilisation des ressources',
            'Validation des programmes PND',
            'Suivi et évaluations',
          ],
        },
        cabinet: {
          title: 'Cabinet DAB',
          subtitle: 'Promoteur et gérant du cabinet Development Agricultural Business',
          items: [
            'Promoteur du programme "De la Ferme aux marchés mondiaux..."',
            'Formations et coaching entrepreneurs agricoles',
            'Représentation (Gestion de l\'exploitation - Fournitures d\'intrants - Mécanisation agricole)',
            'Conférences et séminaires',
          ],
        },
      },
      signature: {
        badge: 'Programme Signature',
        title: '"De la ferme aux marchés mondiaux"',
        description: 'Une méthode conçue pour sensibiliser, équiper et accompagner les producteurs locaux dans le développement durable de leur agro-business.',
        pillars: {
          awareness: {
            title: 'Sensibiliser',
            description: 'Éveiller la conscience entrepreneuriale et identifier les opportunités de marché',
          },
          equip: {
            title: 'Équiper',
            description: 'Fournir les outils techniques et stratégiques pour réussir l\'exportation',
          },
          accompany: {
            title: 'Accompagner',
            description: 'Soutenir dans la durée pour assurer le développement durable',
          },
        },
        quote: '"La réussite individuelle doit nourrir un projet collectif et contribuer au développement de la matière grise africaine."',
        vision: 'Préparer les générations futures à prendre le relais du développement agricole africain.',
      },
    },
    coaching: {
      hero: {
        badge: '⭐ Accompagnement Premium',
        title: 'Coaching Privé',
        subtitle: 'Votre Réussite à l\'Export, Accélérée',
        description: 'Un accompagnement personnalisé pour atteindre vos objectifs avec l\'expertise directe du Dr. Kanga et son équipe.',
        valueProps: {
          prop1: { value: '1-on-1', description: 'Accompagnement exclusif et personnalisé' },
          prop2: { value: '20+ ans', description: 'D\'expertise internationale en agriculture' },
          prop3: { value: '3-6 mois', description: 'Pour voir des résultats concrets' },
        },
        cta: {
          primary: 'Réserver un Appel Découverte →',
          secondary: 'Découvrir le Programme',
        },
        socialProof: {
          limitedSpots: 'Places limitées - Seulement 10 agriculteurs accompagnés par trimestre',
          successCount: '150+ agriculteurs accompagnés avec succès',
        },
      },
      positioning: {
        badge: 'Offre Haut de Gamme',
        title: 'Réservé à Ceux Qui Veulent Accélérer',
        description: 'Le coaching privé est conçu pour les agriculteurs ambitieux qui souhaitent bénéficier d\'un accompagnement sur mesure et atteindre leurs objectifs d\'exportation dans les meilleurs délais.',
        benefits: [
          'Accompagnement 100% personnalisé',
          'Accès direct au Dr. Kanga',
          'Résultats accélérés',
          'Suivi régulier et ajustements',
        ],
        expert: {
          name: 'Dr. Kanga',
          description: 'Expert international en développement agricole avec plus de 20 ans d\'expérience dans l\'accompagnement d\'agriculteurs vers l\'exportation.',
          rating: '(4.9/5)',
          basedOn: 'Basé sur 150+ accompagnements réussis',
        },
      },
      content: {
        badge: 'Programme Sur Mesure',
        title: 'Contenu de l\'Accompagnement',
        subtitle: 'Un programme sur mesure adapté à votre situation et vos objectifs',
        cards: {
          diagnostic: {
            title: 'Diagnostic Personnalisé',
            subtitle: 'Analyse complète de votre situation',
            items: [
              'Audit de votre exploitation actuelle',
              'Évaluation de votre potentiel export',
              'Identification des points forts et axes d\'amélioration',
              'Définition d\'objectifs SMART',
            ],
          },
          strategy: {
            title: 'Stratégie Sur Mesure',
            subtitle: 'Plan d\'action personnalisé',
            items: [
              'Roadmap détaillée vers l\'export',
              'Priorisation des actions selon votre contexte',
              'Adaptation aux 4 axes du programme',
              'Planning de mise en œuvre réaliste',
            ],
          },
          followUp: {
            title: 'Suivi Régulier',
            subtitle: 'Accompagnement continu',
            items: [
              'Appels mensuels avec le Dr. Kanga',
              'Ajustements de stratégie si nécessaire',
              'Résolution des blocages en temps réel',
              'Support par email entre les sessions',
            ],
          },
        },
        result: 'Un parcours unique, conçu pour transformer votre exploitation agricole en entreprise exportatrice prospère',
      },
      stats: {
        title: 'Proximité Directe avec un Expert International',
        subtitle: 'Bénéficiez de l\'expérience et du réseau du Dr. Kanga pour accélérer votre développement',
        items: {
          experience: { value: '20+', label: 'Années d\'expérience' },
          farmers: { value: '150+', label: 'Agriculteurs accompagnés' },
          countries: { value: '30+', label: 'Pays d\'exportation' },
          growth: { value: '3x', label: 'Multiplication du CA moyen' },
        },
      },
      testimonials: {
        title: 'Ce Que Disent Nos Clients',
        items: {
          testimonial1: {
            name: 'Koussi Eboué',
            role: 'Producteur agricole, Yamsoukro',
            content: 'Grâce au coaching du Dr. Kanga, j\'ai pu structurer mon approche export et décrocher mes premiers contrats en Allemagne en seulement 6 mois. Son accompagnement personnalisé a fait toute la différence.',
          },
          testimonial2: {
            name: 'Sofia Kané',
            role: 'Productrice de ferme agricole, Abidjan',
            content: 'Le Dr. Kanga m\'a aidé à transformer complètement mon exploitation. De producteur local, je suis devenu exportateur vers 5 pays. Son expertise et ses conseils sont inestimables.',
          },
        },
      },
      booking: {
        title: 'Réserver Votre Appel Diagnostic',
        subtitle: 'Choisissez le créneau qui vous convient pour un appel diagnostic gratuit de 30 minutes',
        diagnostic: {
          badge: 'GRATUIT',
          duration: '30 minutes',
          title: 'Appel Diagnostic',
          description: 'Évaluation gratuite de votre potentiel export',
          features: [
            'Analyse de votre situation actuelle',
            'Évaluation de votre potentiel export',
            'Conseils personnalisés',
            'Plan d\'action initial',
          ],
          slotsTitle: 'Créneaux disponibles cette semaine:',
          cta: 'Voir plus de créneaux',
        },
        premium: {
          badge: 'PREMIUM',
          duration: 'Programme complet',
          title: 'Coaching Complet',
          description: 'Accompagnement personnalisé de 3 à 6 mois',
          features: [
            'Diagnostic approfondi (2h)',
            'Stratégie sur mesure',
            'Appels mensuels (1h)',
            'Support email illimité',
            'Accès aux ressources exclusives',
          ],
          programDuration: 'Programme de 3 mois',
          cta: 'Demander un devis personnalisé',
        },
        howItWorks: {
          title: 'Comment ça marche ?',
          steps: {
            step1: { title: 'Réservation', description: 'Choisissez votre créneau' },
            step2: { title: 'Préparation', description: 'Questionnaire pré-appel' },
            step3: { title: 'Appel', description: 'Diagnostic avec Dr. Kanga' },
            step4: { title: 'Suivi', description: 'Plan d\'action personnalisé' },
          },
        },
      },
      cta: {
        title: 'Une Question ? Besoin d\'Aide ?',
        description: 'Notre équipe est là pour vous aider à choisir la formule d\'accompagnement qui vous convient le mieux.',
        button: 'Nous contacter',
      },
    },
    seminaires: {
      hero: {
        badge: 'Formation Immersive',
        title: 'Séminaires Pratiques',
        description: 'Vivez une immersion totale et pratique aux côtés d\'experts et d\'autres producteurs pour accélérer votre transformation.',
      },
      benefits: {
        title: 'Pourquoi Choisir Nos Séminaires ?',
        items: {
          collective: {
            title: 'Apprentissage Collectif',
            description: 'Bénéficiez de l\'expérience et des questions des autres participants pour enrichir votre apprentissage.',
          },
          practical: {
            title: 'Pratique Réelle',
            description: 'Exercices concrets, simulations et études de cas pour une application immédiate sur le terrain.',
          },
          networking: {
            title: 'Réseau Professionnel',
            description: 'Créez des liens durables avec d\'autres agriculteurs et experts de la filière.',
          },
        },
        intensive: {
          title: 'Format Intensif',
          description: 'Des sessions concentrées sur 2-3 jours pour maximiser votre temps et votre apprentissage.',
          stats: {
            satisfaction: { value: '95%', label: 'Satisfaction' },
            implementation: { value: '87%', label: 'Mise en pratique' },
          },
        },
      },
      features: {
        title: 'Une Expérience d\'Apprentissage Unique',
        subtitle: 'Sessions collectives orientées pratique terrain pour un apprentissage concret',
        cards: {
          collective: {
            title: 'Sessions Collectives',
            description: 'Apprenez en groupe avec d\'autres agriculteurs motivés et partagez vos expériences.',
          },
          practical: {
            title: 'Orientées Pratique',
            description: 'Exercices concrets, simulations et ateliers pratiques pour une application immédiate.',
          },
          networking: {
            title: 'Networking',
            description: 'Créez des liens durables avec d\'autres acteurs de la filière agricole.',
          },
        },
      },
      cards: {
        labels: {
          nextSession: 'Prochaine session',
          location: 'Lieu',
          showProgram: 'Voir le programme',
          hideProgram: 'Masquer le programme',
          learnMore: 'En savoir plus →',
          detailedProgram: 'Programme détaillé',
        },
      },
      cta: {
        title: 'Rejoignez le Prochain Séminaire',
        description: 'Places limitées pour garantir un accompagnement personnalisé et des échanges de qualité.',
        button: 'Réserver ma place pour le prochain séminaire',
      },
    },
    contactPage: {
      hero: {
        title: 'Parlons de Votre Projet',
        subtitle: 'Prêt à transformer votre agriculture en entreprise d\'exportation ?',
        description: 'Contactez-nous pour découvrir comment notre méthode peut vous accompagner vers les marchés internationaux.',
        features: {
          feature1: 'Réponse sous 24h',
          feature2: 'Appel diagnostic gratuit',
          feature3: 'Accompagnement personnalisé',
        },
      },
      form: {
        title: 'Envoyez-nous un message',
        subtitle: 'Remplissez ce formulaire et nous vous recontacterons dans les 24h',
        guaranteeResponse: 'Réponse garantie sous 24h',
        freeConsultation: 'Consultation gratuite incluse',
        fields: {
          firstName: { label: 'Prénom *', placeholder: 'Votre prénom' },
          lastName: { label: 'Nom *', placeholder: 'Votre nom' },
          email: { label: 'Email *', placeholder: 'votre@email.com' },
          phone: { label: 'Téléphone *', placeholder: '+225 01 41 09 91 90' },
          interest: {
            label: 'Vous êtes intéressé par *',
            placeholder: 'Sélectionnez une option',
            options: {
              masterclass: 'Masterclass Thématiques',
              seminaires: 'Séminaires Pratiques',
              coaching: 'Coaching Privé',
              programme: 'Programme "De la ferme aux marchés mondiaux"',
              information: 'Informations générales',
            },
          },
          situation: {
            label: 'Décrivez votre situation actuelle',
            placeholder: 'Parlez-nous de votre exploitation, vos produits, vos objectifs d\'exportation...',
          },
          message: {
            label: 'Message *',
            placeholder: 'Comment pouvons-nous vous aider à atteindre vos objectifs d\'exportation ?',
          },
        },
        submit: 'Envoyer le message',
        sending: 'Envoi en cours...',
        disclaimer: 'En envoyant ce formulaire, vous acceptez d\'être contacté par notre équipe pour discuter de votre projet.',
        success: 'Votre message a été envoyé avec succès !',
        error: 'Une erreur est survenue lors de l\'envoi du message.',
      },
      contact: {
        title: 'Autres moyens de contact',
        email: {
          title: 'Email',
          value: 'info@cabinetdab.com',
          subtitle: 'Réponse sous 24h',
        },
        phone: {
          title: 'Téléphone',
          value: '+225 01 41 09 91 90',
          subtitle: 'Lun-Ven 9h-18h',
        },
        office: {
          title: 'Bureau',
          value: 'Abidjan, Côte d\'Ivoire',
          subtitle: 'Interventions mondiales',
        },
      },
      hours: {
        title: 'Horaires d\'ouverture',
        weekdays: { label: 'Lundi - Vendredi', hours: '9h00 - 18h00' },
        saturday: { label: 'Samedi', hours: '9h00 - 12h00' },
        sunday: { label: 'Dimanche', hours: 'Fermé' },
      },
      impact: {
        title: 'Notre Impact',
        subtitle: 'Des résultats concrets pour nos partenaires',
        stats: {
          experience: { value: '40+', label: 'Années d\'expérience' },
          companies: { value: '500+', label: 'Entreprises accompagnées' },
          countries: { value: '15', label: 'Pays d\'intervention' },
          satisfaction: { value: '95%', label: 'Taux de satisfaction' },
        },
      },
    },
    masterclass: {
      hero: {
        badge: 'Formation Expert',
        title: 'Masterclass Thématiques',
        description: 'Approfondissez vos connaissances avec des sessions expertes et interactives directement avec le Dr. Kanga.',
      },
      axisCards: {
        title: 'Une Masterclass par Axe Stratégique',
        subtitle: 'Chaque session correspond à un axe du programme pour un apprentissage structuré',
        maxParticipants: 'Max {count} participants',
      },
      axes: {
        axis1: {
          title: 'Axe 1 - Matières Premières',
          description: 'Produire pour l\'export dès le premier jour',
          content: 'Maîtrisez les techniques de production qui répondent aux standards internationaux et optimisez vos rendements.',
          features: [
            'Sélection des variétés adaptées à l\'export',
            'Techniques de culture optimisées',
            'Gestion de la qualité dès la production',
            'Certification et traçabilité',
          ],
          duration: '3h30',
          maxParticipants: 20,
        },
        axis2: {
          title: 'Axe 2 - Transformation',
          description: 'Les clés d\'une transformation rentable et durable',
          content: 'Développez votre unité de transformation pour maximiser la valeur ajoutée de vos produits.',
          features: [
            'Choix des équipements et technologies',
            'Processus de transformation optimisés',
            'Contrôle qualité et normes sanitaires',
            'Calcul de rentabilité et pricing',
          ],
          duration: '4h',
          maxParticipants: 15,
        },
        axis3: {
          title: 'Axe 3 - Exportation',
          description: 'Devenir un exportateur compétitif',
          content: 'Maîtrisez toutes les étapes de l\'exportation, de la prospection à la livraison.',
          features: [
            'Étude de marché et prospection',
            'Négociation et contrats internationaux',
            'Logistique et transport',
            'Gestion des risques à l\'export',
          ],
          duration: '4h30',
          maxParticipants: 12,
        },
        axis4: {
          title: 'Axe 4 - Assurance',
          description: 'Sécuriser vos produits pour inspirer confiance',
          content: 'Protégez votre activité et rassurez vos partenaires avec les bonnes assurances.',
          features: [
            'Types d\'assurances pour l\'export',
            'Évaluation des risques',
            'Négociation avec les assureurs',
            'Gestion des sinistres',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
        axis5: {
          title: 'Axe 5 - Gestion de la production',
          description: 'Préparez votre dossier de production pour inspirer confiance',
          content: 'Préparez votre dossier de production pour inspirer confiance.',
          features: [
            'Préparation du dossier de production',
            'Évaluation des financements',
            'Négociation avec les financements',
            'Gestion des financements',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
        axis6: {
          title: 'Axe 6 - Financement',
          description: 'Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement',
          content: 'Accéder à des financements adaptés à votre projet agricole et à votre niveau de développement.',
          features: [
            'Préparation du dossier de financement',
            'Évaluation des financements',
            'Négociation avec les financements',
            'Gestion des financements',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
      },
      format: {
        title: 'Format des Masterclass',
        online: {
          title: 'En Ligne (Zoom)',
          features: [
            'Sessions interactives en direct',
            'Possibilité de poser des questions',
            'Enregistrement disponible 30 jours',
            'Accessible depuis n\'importe où',
          ],
        },
        inPerson: {
          title: 'Présentiel (Paris)',
          features: [
            'Interaction directe avec Dr. Kanga',
            'Networking avec autres participants',
            'Supports physiques inclus',
            'Pause déjeuner offerte',
          ],
        },
      },
      benefits: {
        title: 'Les Avantages des Masterclass',
        items: {
          interaction: {
            title: 'Interaction Directe',
            description: 'Posez vos questions directement au Dr. Kanga et obtenez des réponses personnalisées.',
          },
          casStudies: {
            title: 'Études de Cas Réels',
            description: 'Analysez des projets concrets et apprenez des succès et échecs d\'autres agriculteurs.',
          },
          questions: {
            title: 'Réponses aux Questions',
            description: 'Clarifiez tous vos doutes et obtenez des conseils adaptés à votre situation.',
          },
        },
      },
      videos: {
        title: 'Vidéos Complémentaires',
        subtitle: 'Découvrez nos vidéos pédagogiques pour approfondir vos connaissances',
        viewButton: 'Voir la vidéo',
        comingSoon: 'Bientôt disponible',
        video1: {
          badge: 'Capsule',
          duration: '8 min',
          title: 'Les 3 règles pour produire selon les normes internationales',
          description: 'Découvrez les standards essentiels pour préparer vos produits à l\'exportation.',
        },
        video2: {
          badge: 'Cours Long',
          duration: '45 min',
          title: 'Comment transformer son produit et allonger sa durée de vie',
          description: 'Techniques de transformation pour maximiser la valeur ajoutée de vos produits.',
        },
        video3: {
          badge: 'Capsule',
          duration: '12 min',
          title: 'Les étapes clés pour réussir son export',
          description: 'Roadmap complète pour structurer votre démarche d\'exportation.',
        },
      },
      registration: {
        title: 'Prochaines Sessions',
        subtitle: 'Choisissez votre masterclass et réservez votre place',
        online: 'EN LIGNE',
        inPerson: 'PRÉSENTIEL',
        limitedSeats: 'Places limitées',
        fields: {
          date: 'Date:',
          time: 'Horaire:',
          price: 'Prix:',
          seatsLeft: 'Places restantes:',
        },
        card1: {
          title: 'Masterclass Production - Axe 1',
          description: 'Produire pour l\'export dès le premier jour',
          date: '15 Décembre 2024',
          time: '14h-17h30 (GMT+1)',
          seats: '8/20',
        },
        card2: {
          title: 'Masterclass Transformation - Axe 2',
          description: 'Les clés d\'une transformation rentable',
          location: 'Paris',
          date: '22 Décembre 2024',
          time: '9h-13h',
          seats: '5/15',
        },
        registerButton: 'S\'inscrire maintenant',
        modalitiesTitle: 'Modalités d\'inscription',
        step1: {
          title: 'Inscription',
          description: 'Cliquez sur "S\'inscrire"',
        },
        step2: {
          title: 'Paiement',
          description: 'Paiement sécurisé par carte',
        },
        step3: {
          title: 'Confirmation',
          description: 'Lien de connexion par email',
        },
      },
      cta: {
        title: 'Questions sur les Masterclass ?',
        description: 'Notre équipe est là pour vous aider à choisir la masterclass qui vous convient.',
        button: 'Nous contacter',
      },
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Nous sommes là pour répondre à vos questions',
      form: {
        name: 'Nom complet',
        email: 'Email',
        phone: 'Téléphone',
        message: 'Message',
        submit: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès!',
        error: 'Une erreur est survenue. Veuillez réessayer.',
      },
    },
    common: {
      learnMore: 'En Savoir Plus',
      readMore: 'Lire Plus',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
    },
    seo: {
      home: {
        title: 'Cabinet DAB - De la ferme aux Marchés Mondiaux',
        description: 'Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice. Masterclass, séminaires et coaching avec le Dr. Kanga.',
        keywords: ['programme signature', 'formation complète', 'méthode cabinetdab', 'formation agricole', 'export agricole'],
      },
      masterclass: {
        title: 'Masterclass Thématiques - Formation Agricole',
        description: 'Sessions expertes et interactives avec le Dr. Kanga. Perfectionnez vos connaissances sur des sujets spécifiques avec vidéos complémentaires incluses.',
        keywords: ['masterclass', 'formation en ligne', 'sessions live', 'expertise agricole', 'formation interactive'],
      },
      seminaires: {
        title: 'Séminaires Pratiques - Formation Agriculture',
        description: 'Immersion totale avec exercices pratiques et networking. Appliquez concrètement les méthodes apprises dans nos séminaires de 3 jours.',
        keywords: ['séminaires', 'formation présentielle', 'networking', 'exercices pratiques', 'formation immersive'],
      },
      coaching: {
        title: 'Coaching Privé Agricole - Accompagnement Personnalisé',
        description: 'Accompagnement personnalisé pour accélérer vos résultats. Service premium pour entrepreneurs ambitieux avec suivi continu.',
        keywords: ['coaching privé', 'accompagnement personnalisé', 'suivi individuel', 'plan sur-mesure', 'coaching agricole'],
      },
      contact: {
        title: 'Contact - Cabinetdab Formation Agricole',
        description: 'Contactez notre équipe pour plus d\'informations sur nos programmes de formation agricole et nos services d\'accompagnement.',
        keywords: ['contact', 'information', 'devis', 'consultation', 'rendez-vous'],
      },
      apropos: {
        title: 'À Propos - Dr. Kanga et Cabinetdab',
        description: 'Découvrez l\'expertise du Dr. Kanga et l\'histoire de Cabinetdab, plus de 20 ans d\'expérience dans l\'accompagnement d\'agriculteurs vers l\'export.',
        keywords: ['Dr Kanga', 'équipe', 'expertise', 'expérience', 'histoire', 'expert agricole'],
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      masterclass: 'Masterclass',
      coaching: 'Private Coaching',
      contact: 'Contact Us',
      login: 'Login',
    },
    hero: {
      title: 'From Farm to Global Markets',
      subtitle: 'Transform your local farm into an export business',
      description: 'Complete training, coaching and support program to succeed in international markets',
      cta: 'Get Started',
      secondaryCta: 'Learn More',
    },
    program: {
      title: 'A structured journey with 6 strategic axes',
      subtitle: 'to transform your agricultural vision and reach international markets.',
      axes: {
        axis1: {
          title: 'Agricultural Farm Creation',
          description: 'Creation of an agricultural farm adapted to your agricultural project and your level of development.',
        },
        axis2: {
          title: 'Production Management',
          description: 'We provide tools to structure and optimize your unit to become competitive and profitable.',
        },
        axis3: {
          title: 'Processing',
          description: 'Transform your raw materials into high value-added products with adapted equipment and optimized processes.',
        },
        axis4: {
          title: 'Export',
          description: 'Master the 3 key steps to succeed in your export and prepare a competitive and credible file.',
        },
        axis5: {
          title: 'Agricultural Insurance',
          description: 'Guarantee your investment and protect your products during processing and export.',
        },
        axis6: {
          title: 'Agricultural Financing',
          description: 'Access financing adapted to your agricultural project and your level of development.',
        },
      },
    },
    progressPath: {
      title: 'Your Path to Success',
      subtitle: 'Attack global markets with confidence...Like thousands of local product exporters, we help you organize your entire value chain to access global markets and boost your revenue.',
      ctaText: 'Discover how',
      services: {
        masterclass: {
          category: 'Individual Training',
          title: 'Thematic Masterclasses',
          subtitle: 'Start with masterclasses',
          description: 'Expert and interactive sessions with Dr. Kanga. Perfect your knowledge on specific topics with complementary videos included.',
          features: {
            feature1: { title: '2-4h live sessions', description: 'Real-time learning with direct interaction' },
            feature2: { title: 'Direct interaction with the expert', description: 'Ask your questions and get personalized answers' },
            feature3: { title: 'Replays and complementary videos', description: 'Review at your own pace, unlimited access' },
          },
          ctaText: 'View masterclasses',
        },
        seminaires: {
          category: 'Group Training',
          title: 'Practical Seminars',
          subtitle: 'Put into practice through seminars',
          description: 'Total immersion with practical exercises and networking. Apply the methods learned concretely.',
          features: {
            feature1: { title: '3-day seminars', description: 'Intensive and immersive in-person training' },
            feature2: { title: 'Practical group exercises', description: 'Apply your knowledge immediately' },
            feature3: { title: 'Networking with other farmers', description: 'Build your professional network and share your experiences' },
          },
          ctaText: 'Join a seminar',
        },
        coaching: {
          category: 'Premium Support',
          title: 'Private Coaching',
          subtitle: 'Perfect yourself with private coaching',
          description: 'Personalized support to accelerate your results. Premium service for ambitious entrepreneurs.',
          features: {
            feature1: { title: 'Personalized 1-on-1 sessions', description: 'Individual support tailored to your specific needs' },
            feature2: { title: 'Custom action plan', description: 'Personalized strategy for your farm' },
            feature3: { title: 'Continuous follow-up and adjustments', description: 'Regular support to guarantee your results' },
          },
          ctaText: 'Book a call',
        },
        events: {
          category: 'Exclusive Events',
          title: 'Upcoming Events',
          subtitle: 'Participate in in-person seminars',
          description: 'Total immersion with practical exercises and networking. Apply the methods learned concretely.',
          features: {
            feature1: { title: '3-day seminars', description: 'Intensive events to transform your approach to trade' },
            feature2: { title: 'Practical group exercises', description: 'Collaborative work on real export cases' },
            feature3: { title: 'Networking with other farmers', description: 'Build lasting strategic partnerships' },
          },
          ctaText: 'View events',
        },
      },
    },
    whyChoose: {
      title: 'Our Services',
      services: {
        management: {
          title: 'Farm Management',
          description: 'Optimize your yields and structure your farm with our agricultural management experts.',
          ctaText: 'Learn more',
        },
        supplies: {
          title: 'Input Supplies',
          description: 'Access certified quality inputs to guarantee the performance of your crops.',
          ctaText: 'Learn more',
        },
        mechanization: {
          title: 'Agricultural Mechanization',
          description: 'Modernize your operations with high-performance equipment adapted to your needs.',
          ctaText: 'Learn more',
        },
      },
    },
    cta: {
      title: 'Ready to Transform Your Farm?',
      description: 'Join our program and start your journey to international markets',
      button: 'Contact Us',
    },
    footer: {
      description: 'Cabinet DAB supports farmers in their transformation towards international markets.',
      quickLinks: {
        title: 'Quick Links',
        home: 'Home',
        about: 'About',
        videos: 'Educational Videos',
        masterclass: 'Masterclass',
        coaching: 'Coaching',
        contact: 'Contact',
      },
      contact: {
        title: 'Contact',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
      },
      social: {
        title: 'Follow Us',
      },
      copyright: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
    about: {
      hero: {
        badge: 'Expert Journey',
        title: '40 years of experience serving African Agriculture',
        description: 'Veterinary doctor and recognized expert in local transformation and export, Dr Kanga Kouamé designed the "From Farm to Global Markets" method to support producers towards autonomy and international competitiveness.',
        credentials: {
          credential1: 'Diplomatic advisor of CI to FAO, WFP and IFAD',
          credential2: 'Doctor of Veterinary Medicine, graduated from the University of Liège (Belgium)',
          credential3: 'WTO focal point for sanitary and phytosanitary control system',
          credential4: 'Official competent authority of CI for establishment approval',
        },
      },
      expertise: {
        title: 'Recognized Expert in Agriculture',
        subtitle: 'Dr Kanga and his team support you in conquering global markets',
        domains: {
          policies: {
            title: 'Agricultural Policies',
            description: 'Analysis of production, export and import policies for AGOA implementation',
          },
          health: {
            title: 'Animal Health',
            description: 'Fight against animal and zoonotic diseases, sanitary and phytosanitary control',
          },
          transformation: {
            title: 'Processing',
            description: 'Conservation and processing (culinary preparations, packaging)',
          },
          commercialization: {
            title: 'Marketing',
            description: 'Market access, market studies, product promotion, nutritional enhancement',
          },
          management: {
            title: 'Farm Management',
            description: 'Agro-sylvo-pastoral and fisheries operations (plantation, livestock, fishing)',
          },
          specialties: {
            title: 'Key Specialties',
            description: 'Value chains, local processing, international markets',
          },
        },
        formation: {
          title: 'Training & Qualifications',
          items: {
            item1: {
              title: 'Doctor of Veterinary Medicine',
              description: 'University of Liège, Belgium - Specialized in animal production and health, public hygiene',
            },
            item2: {
              title: '40 years of experience',
              description: 'Contribution to the development and promotion of African Agriculture',
            },
            item3: {
              title: 'Official Competent Authority',
              description: 'Approval of processing facilities and certification of animal products',
            },
          },
        },
        languages: {
          title: 'Multilingual Expert',
          subtitle: 'International and field communication',
          international: 'International Languages',
          local: 'African Local Languages',
        },
      },
      career: {
        title: 'Professional Career',
        subtitle: '40 years of experience between Ivorian administration, international institutions and entrepreneurship',
        administration: {
          title: 'Ivorian Administration',
          subtitle: '30 years of service as manager',
          items: [
            'Analysis laboratories',
            'Animal production operation',
            'Veterinary services',
            'National Agricultural Policies',
            'Sub-regional and international cooperation',
            'Agricultural training centers',
          ],
        },
        international: {
          title: 'International Institutions',
          subtitle: '10+ years at the CI Embassy in Rome',
          agencies: 'Agricultural advisor to UN agencies:',
          agencyList: [
            'FAO (Food and Agriculture Organization of the United Nations)',
            'WFP (World Food Programme)',
            'IFAD (International Fund for Agricultural Development)',
          ],
          other: 'And on the other hand:',
          otherList: [
            'Bilateral cooperation with countries of the diplomatic constituency',
          ],
        },
        return: {
          title: 'Return to Côte d\'Ivoire',
          subtitle: 'Program officer at the FAO office in CI',
          items: [
            'Strategic planning',
            'Resource mobilization',
            'PND program validation',
            'Monitoring and evaluations',
          ],
        },
        cabinet: {
          title: 'Cabinet DAB',
          subtitle: 'Promoter and manager of Development Agricultural Business cabinet',
          items: [
            'Promoter of the "From Farm to Global Markets..." program',
            'Training and coaching for agricultural entrepreneurs',
            'Representation (Farm management - Input supplies - Agricultural mechanization)',
            'Conferences and seminars',
          ],
        },
      },
      signature: {
        badge: 'Signature Program',
        title: '"From Farm to Global Markets"',
        description: 'A method designed to raise awareness, equip and support local producers in the sustainable development of their agro-business.',
        pillars: {
          awareness: {
            title: 'Raise Awareness',
            description: 'Awaken entrepreneurial consciousness and identify market opportunities',
          },
          equip: {
            title: 'Equip',
            description: 'Provide technical and strategic tools to succeed in export',
          },
          accompany: {
            title: 'Support',
            description: 'Provide long-term support to ensure sustainable development',
          },
        },
        quote: '"Individual success must feed a collective project and contribute to the development of African gray matter."',
        vision: 'Prepare future generations to take over African agricultural development.',
      },
    },
    coaching: {
      hero: {
        badge: '⭐ Premium Support',
        title: 'Private Coaching',
        subtitle: 'Your Export Success, Accelerated',
        description: 'Personalized support to achieve your goals with direct expertise from Dr. Kanga and his team.',
        valueProps: {
          prop1: { value: '1-on-1', description: 'Exclusive and personalized support' },
          prop2: { value: '20+ years', description: 'Of international agricultural expertise' },
          prop3: { value: '3-6 months', description: 'To see concrete results' },
        },
        cta: {
          primary: 'Book a Discovery Call →',
          secondary: 'Discover the Program',
        },
        socialProof: {
          limitedSpots: 'Limited spots - Only 10 farmers supported per quarter',
          successCount: '150+ farmers successfully supported',
        },
      },
      positioning: {
        badge: 'Premium Offer',
        title: 'Reserved for Those Who Want to Accelerate',
        description: 'Private coaching is designed for ambitious farmers who want personalized support and to achieve their export goals as quickly as possible.',
        benefits: [
          '100% personalized support',
          'Direct access to Dr. Kanga',
          'Accelerated results',
          'Regular follow-up and adjustments',
        ],
        expert: {
          name: 'Dr. Kanga',
          description: 'International expert in agricultural development with over 20 years of experience supporting farmers towards export.',
          rating: '(4.9/5)',
          basedOn: 'Based on 150+ successful support cases',
        },
      },
      content: {
        badge: 'Tailored Program',
        title: 'Support Content',
        subtitle: 'A tailored program adapted to your situation and goals',
        cards: {
          diagnostic: {
            title: 'Personalized Diagnostic',
            subtitle: 'Complete analysis of your situation',
            items: [
              'Audit of your current farm',
              'Assessment of your export potential',
              'Identification of strengths and areas for improvement',
              'Definition of SMART objectives',
            ],
          },
          strategy: {
            title: 'Tailored Strategy',
            subtitle: 'Personalized action plan',
            items: [
              'Detailed roadmap to export',
              'Action prioritization according to your context',
              'Adaptation to the 4 program axes',
              'Realistic implementation schedule',
            ],
          },
          followUp: {
            title: 'Regular Follow-up',
            subtitle: 'Continuous support',
            items: [
              'Monthly calls with Dr. Kanga',
              'Strategy adjustments if necessary',
              'Real-time problem solving',
              'Email support between sessions',
            ],
          },
        },
        result: 'A unique journey, designed to transform your farm into a thriving export business',
      },
      stats: {
        title: 'Direct Proximity with an International Expert',
        subtitle: 'Benefit from Dr. Kanga\'s experience and network to accelerate your development',
        items: {
          experience: { value: '20+', label: 'Years of experience' },
          farmers: { value: '150+', label: 'Farmers supported' },
          countries: { value: '30+', label: 'Export countries' },
          growth: { value: '3x', label: 'Average revenue multiplication' },
        },
      },
      testimonials: {
        title: 'What Our Clients Say',
        items: {
          testimonial1: {
            name: 'Koussi Eboué',
            role: 'Farmer Producer, Yamsoukro',
            content: 'Thanks to Dr. Kanga\'s coaching, I was able to structure my export approach and secure my first contracts in Germany in just 6 months. His personalized support made all the difference.',
          },
          testimonial2: {
            name: 'Sofia Kané',
            role: 'Farmer Producer, Abidjan',
            content: 'Dr. Kanga helped me completely transform my farm. From a local producer, I became an exporter to 5 countries. His expertise and advice are invaluable.',
          },
        },
      },
      booking: {
        title: 'Book Your Diagnostic Call',
        subtitle: 'Choose the time slot that suits you for a free 30-minute diagnostic call',
        diagnostic: {
          badge: 'FREE',
          duration: '30 minutes',
          title: 'Diagnostic Call',
          description: 'Free assessment of your export potential',
          features: [
            'Analysis of your current situation',
            'Assessment of your export potential',
            'Personalized advice',
            'Initial action plan',
          ],
          slotsTitle: 'Available slots this week:',
          cta: 'See more slots',
        },
        premium: {
          badge: 'PREMIUM',
          duration: 'Complete program',
          title: 'Complete Coaching',
          description: 'Personalized support for 3 to 6 months',
          features: [
            'In-depth diagnostic (2h)',
            'Tailored strategy',
            'Monthly calls (1h)',
            'Unlimited email support',
            'Access to exclusive resources',
          ],
          programDuration: '3-month program',
          cta: 'Request a personalized quote',
        },
        howItWorks: {
          title: 'How does it work?',
          steps: {
            step1: { title: 'Booking', description: 'Choose your time slot' },
            step2: { title: 'Preparation', description: 'Pre-call questionnaire' },
            step3: { title: 'Call', description: 'Diagnostic with Dr. Kanga' },
            step4: { title: 'Follow-up', description: 'Personalized action plan' },
          },
        },
      },
      cta: {
        title: 'A Question? Need Help?',
        description: 'Our team is here to help you choose the support package that suits you best.',
        button: 'Contact us',
      },
    },
    seminaires: {
      hero: {
        badge: 'Immersive Training',
        title: 'Practical Seminars',
        description: 'Experience total and practical immersion alongside experts and other producers to accelerate your transformation.',
      },
      benefits: {
        title: 'Why Choose Our Seminars?',
        items: {
          collective: {
            title: 'Collective Learning',
            description: 'Benefit from the experience and questions of other participants to enrich your learning.',
          },
          practical: {
            title: 'Real Practice',
            description: 'Concrete exercises, simulations and case studies for immediate field application.',
          },
          networking: {
            title: 'Professional Network',
            description: 'Create lasting connections with other farmers and industry experts.',
          },
        },
        intensive: {
          title: 'Intensive Format',
          description: 'Concentrated sessions over 2-3 days to maximize your time and learning.',
          stats: {
            satisfaction: { value: '95%', label: 'Satisfaction' },
            implementation: { value: '87%', label: 'Implementation' },
          },
        },
      },
      features: {
        title: 'A Unique Learning Experience',
        subtitle: 'Collective sessions focused on practical field work for concrete learning',
        cards: {
          collective: {
            title: 'Collective Sessions',
            description: 'Learn in a group with other motivated farmers and share your experiences.',
          },
          practical: {
            title: 'Practice-Oriented',
            description: 'Concrete exercises, simulations and practical workshops for immediate application.',
          },
          networking: {
            title: 'Networking',
            description: 'Create lasting connections with other actors in the agricultural sector.',
          },
        },
      },
      cards: {
        labels: {
          nextSession: 'Next session',
          location: 'Location',
          showProgram: 'View program',
          hideProgram: 'Hide program',
          learnMore: 'Learn more →',
          detailedProgram: 'Detailed program',
        },
      },
      cta: {
        title: 'Join the Next Seminar',
        description: 'Limited places to ensure personalized support and quality exchanges.',
        button: 'Reserve my spot for the next seminar',
      },
    },
    contactPage: {
      hero: {
        title: 'Let\'s Talk About Your Project',
        subtitle: 'Ready to transform your agriculture into an export business?',
        description: 'Contact us to discover how our method can support you towards international markets.',
        features: {
          feature1: 'Response within 24h',
          feature2: 'Free diagnostic call',
          feature3: 'Personalized support',
        },
      },
      form: {
        title: 'Send us a message',
        subtitle: 'Fill out this form and we will contact you within 24h',
        guaranteeResponse: 'Guaranteed response within 24h',
        freeConsultation: 'Free consultation included',
        fields: {
          firstName: { label: 'First Name *', placeholder: 'Your first name' },
          lastName: { label: 'Last Name *', placeholder: 'Your last name' },
          email: { label: 'Email *', placeholder: 'your@email.com' },
          phone: { label: 'Phone *', placeholder: '+1 234 567 8900' },
          interest: {
            label: 'You are interested in *',
            placeholder: 'Select an option',
            options: {
              masterclass: 'Thematic Masterclasses',
              seminaires: 'Practical Seminars',
              coaching: 'Private Coaching',
              programme: '"From Farm to Global Markets" Program',
              information: 'General information',
            },
          },
          situation: {
            label: 'Describe your current situation',
            placeholder: 'Tell us about your farm, your products, your export goals...',
          },
          message: {
            label: 'Message *',
            placeholder: 'How can we help you achieve your export goals?',
          },
        },
        submit: 'Send message',
        sending: 'Sending...',
        disclaimer: 'By submitting this form, you agree to be contacted by our team to discuss your project.',
        success: 'Your message has been sent successfully!',
        error: 'An error occurred while sending the message.',
      },
      contact: {
        title: 'Other contact methods',
        email: {
          title: 'Email',
          value: 'info@cabinetdab.com',
          subtitle: 'Response within 24h',
        },
        phone: {
          title: 'Phone',
          value: '+225 01 41 09 91 90',
          subtitle: 'Mon-Fri 9am-6pm',
        },
        office: {
          title: 'Office',
          value: 'Abidjan, Ivory Coast',
          subtitle: 'Worldwide interventions',
        },
      },
      hours: {
        title: 'Opening hours',
        weekdays: { label: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
        saturday: { label: 'Saturday', hours: '9:00 AM - 12:00 PM' },
        sunday: { label: 'Sunday', hours: 'Closed' },
      },
      impact: {
        title: 'Our Impact',
        subtitle: 'Concrete results for our partners',
        stats: {
          experience: { value: '40+', label: 'Years of experience' },
          companies: { value: '500+', label: 'Companies supported' },
          countries: { value: '15', label: 'Countries of intervention' },
          satisfaction: { value: '95%', label: 'Satisfaction rate' },
        },
      },
    },
    masterclass: {
      hero: {
        badge: 'Expert Training',
        title: 'Thematic Masterclasses',
        description: 'Deepen your knowledge with expert and interactive sessions directly with Dr. Kanga.',
      },
      axisCards: {
        title: 'One Masterclass per Strategic Axis',
        subtitle: 'Each session corresponds to a program axis for structured learning',
        maxParticipants: 'Max {count} participants',
      },
      axes: {
        axis1: {
          title: 'Axis 1 - Raw Materials',
          description: 'Produce for export from day one',
          content: 'Master production techniques that meet international standards and optimize your yields.',
          features: [
            'Selection of export-adapted varieties',
            'Optimized cultivation techniques',
            'Quality management from production',
            'Certification and traceability',
          ],
          duration: '3h30',
          maxParticipants: 20,
        },
        axis2: {
          title: 'Axis 2 - Processing',
          description: 'Keys to profitable and sustainable processing',
          content: 'Develop your processing unit to maximize the added value of your products.',
          features: [
            'Equipment and technology selection',
            'Optimized processing processes',
            'Quality control and sanitary standards',
            'Profitability calculation and pricing',
          ],
          duration: '4h',
          maxParticipants: 15,
        },
        axis3: {
          title: 'Axis 3 - Export',
          description: 'Become a competitive exporter',
          content: 'Master all export stages, from prospecting to delivery.',
          features: [
            'Market research and prospecting',
            'International negotiation and contracts',
            'Logistics and transport',
            'Export risk management',
          ],
          duration: '4h30',
          maxParticipants: 12,
        },
        axis4: {
          title: 'Axis 4 - Insurance',
          description: 'Secure your products to inspire confidence',
          content: 'Protect your business and reassure your partners with the right insurance.',
          features: [
            'Types of export insurance',
            'Risk assessment',
            'Negotiation with insurers',
            'Claims management',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
        axis5: {
          title: 'Axis 5 - Production Management',
          description: 'Prepare your production file to inspire confidence',
          content: 'Prepare your production file to inspire confidence.',
          features: [
            'Production file preparation',
            'Financing evaluation',
            'Negotiation with financing',
            'Financing management',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
        axis6: {
          title: 'Axis 6 - Financing',
          description: 'Access financing adapted to your agricultural project and development level',
          content: 'Access financing adapted to your agricultural project and development level.',
          features: [
            'Financing file preparation',
            'Financing evaluation',
            'Negotiation with financing',
            'Financing management',
          ],
          duration: '2h30',
          maxParticipants: 25,
        },
      },
      format: {
        title: 'Masterclass Format',
        online: {
          title: 'Online (Zoom)',
          features: [
            'Live interactive sessions',
            'Ability to ask questions',
            'Recording available for 30 days',
            'Accessible from anywhere',
          ],
        },
        inPerson: {
          title: 'In-Person (Paris)',
          features: [
            'Direct interaction with Dr. Kanga',
            'Networking with other participants',
            'Physical materials included',
            'Lunch break offered',
          ],
        },
      },
      benefits: {
        title: 'Masterclass Benefits',
        items: {
          interaction: {
            title: 'Direct Interaction',
            description: 'Ask your questions directly to Dr. Kanga and get personalized answers.',
          },
          casStudies: {
            title: 'Real Case Studies',
            description: 'Analyze concrete projects and learn from the successes and failures of other farmers.',
          },
          questions: {
            title: 'Answers to Questions',
            description: 'Clarify all your doubts and get advice adapted to your situation.',
          },
        },
      },
      videos: {
        title: 'Complementary Videos',
        subtitle: 'Discover our educational videos to deepen your knowledge',
        viewButton: 'Watch video',
        comingSoon: 'Coming Soon',
        video1: {
          badge: 'Short',
          duration: '8 min',
          title: 'The 3 rules to produce according to international standards',
          description: 'Discover the essential standards to prepare your products for export.',
        },
        video2: {
          badge: 'Long Course',
          duration: '45 min',
          title: 'How to transform your product and extend its shelf life',
          description: 'Transformation techniques to maximize the added value of your products.',
        },
        video3: {
          badge: 'Short',
          duration: '12 min',
          title: 'Key steps to succeed in your export',
          description: 'Complete roadmap to structure your export approach.',
        },
      },
      registration: {
        title: 'Upcoming Sessions',
        subtitle: 'Choose your masterclass and reserve your spot',
        online: 'ONLINE',
        inPerson: 'IN-PERSON',
        limitedSeats: 'Limited seats',
        fields: {
          date: 'Date:',
          time: 'Time:',
          price: 'Price:',
          seatsLeft: 'Seats left:',
        },
        card1: {
          title: 'Production Masterclass - Axis 1',
          description: 'Produce for export from day one',
          date: 'October 15, 2025',
          time: '2pm-5:30pm (GMT+1)',
          seats: '8/20',
        },
        card2: {
          title: 'Transformation Masterclass - Axis 2',
          description: 'Keys to profitable transformation',
          location: 'Paris',
          date: 'October 17, 2025',
          time: '9am-1pm',
          seats: '5/15',
        },
        registerButton: 'Register now',
        modalitiesTitle: 'Registration Process',
        step1: {
          title: 'Registration',
          description: 'Click on "Register"',
        },
        step2: {
          title: 'Payment',
          description: 'Secure card payment',
        },
        step3: {
          title: 'Confirmation',
          description: 'Connection link by email',
        },
      },
      cta: {
        title: 'Questions about Masterclasses?',
        description: 'Our team is here to help you choose the masterclass that suits you.',
        button: 'Contact us',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to answer your questions',
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        submit: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'An error occurred. Please try again.',
      },
    },
    common: {
      learnMore: 'Learn More',
      readMore: 'Read More',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    seo: {
      home: {
        title: 'Cabinet DAB - From Farm to Global Markets',
        description: 'Agricultural training program to transform your local farm into an export business. Masterclasses, seminars and coaching with Dr. Kanga.',
        keywords: ['signature program', 'complete training', 'cabinetdab method', 'agricultural training', 'agricultural export'],
      },
      masterclass: {
        title: 'Thematic Masterclasses - Agricultural Training',
        description: 'Expert and interactive sessions with Dr. Kanga. Perfect your knowledge on specific topics with complementary videos included.',
        keywords: ['masterclass', 'online training', 'live sessions', 'agricultural expertise', 'interactive training'],
      },
      seminaires: {
        title: 'Practical Seminars - Agricultural Training',
        description: 'Total immersion with practical exercises and networking. Concretely apply the methods learned in our 3-day seminars.',
        keywords: ['seminars', 'in-person training', 'networking', 'practical exercises', 'immersive training'],
      },
      coaching: {
        title: 'Private Agricultural Coaching - Personalized Support',
        description: 'Personalized support to accelerate your results. Premium service for ambitious entrepreneurs with continuous follow-up.',
        keywords: ['private coaching', 'personalized support', 'individual follow-up', 'custom plan', 'agricultural coaching'],
      },
      contact: {
        title: 'Contact - Cabinetdab Agricultural Training',
        description: 'Contact our team for more information about our agricultural training programs and support services.',
        keywords: ['contact', 'information', 'quote', 'consultation', 'appointment'],
      },
      apropos: {
        title: 'About - Dr. Kanga and Cabinetdab',
        description: 'Discover the expertise of Dr. Kanga and the history of Cabinetdab, over 20 years of experience supporting farmers towards export.',
        keywords: ['Dr Kanga', 'team', 'expertise', 'experience', 'history', 'agricultural expert'],
      },
    },
  },
}
