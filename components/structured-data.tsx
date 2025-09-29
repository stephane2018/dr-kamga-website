import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'course' | 'person' | 'article'
  data?: any
}

export function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    }

    switch (type) {
      case 'website':
        return {
          ...baseData,
          "@type": "WebSite",
          name: "CabinetDab",
          alternateName: "Cabinet DAB",
          url: "https://www.cabinetDab.com",
          description: "Programme de formation agricole pour transformer votre exploitation locale en entreprise exportatrice",
          publisher: {
            "@type": "Organization",
            name: "CabinetDab",
            logo: {
              "@type": "ImageObject",
              url: "https://www.cabinetDab.com/logo.png"
            }
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.cabinetDab.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }

      case 'organization':
        return {
          ...baseData,
          "@type": "Organization",
          name: "CabinetDab",
          alternateName: "Cabinet DAB",
          url: "https://www.cabinetDab.com",
          logo: "https://www.cabinetDab.com/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+33-1-23-45-67-89",
            contactType: "customer service",
            availableLanguage: "French"
          },
          sameAs: [
            "https://www.facebook.com/cabinetDab",
            "https://www.linkedin.com/company/cabinetDab",
            "https://www.twitter.com/cabinetDab"
          ],
          founder: {
            "@type": "Person",
            name: "Dr. Kanga",
            jobTitle: "Expert en Agriculture et Exportation"
          },
          areaServed: {
            "@type": "Country",
            name: "France"
          },
          knowsAbout: [
            "Formation agricole",
            "Export agricole",
            "Transformation agricole",
            "Assurance agricole",
            "Agriculture internationale"
          ]
        }

      case 'person':
        return {
          ...baseData,
          "@type": "Person",
          name: "Dr. Kanga",
          jobTitle: "Expert en Agriculture et Exportation",
          affiliation: {
            "@type": "Organization",
            name: "CabinetDab"
          },
          knowsAbout: [
            "Agriculture",
            "Exportation",
            "Transformation agricole",
            "Formation agricole",
            "Assurance agricole"
          ],
          hasOccupation: {
            "@type": "Occupation",
            name: "Agricultural Expert",
            occupationLocation: {
              "@type": "Country",
              name: "France"
            }
          }
        }

      case 'course':
        return {
          ...baseData,
          "@type": "Course",
          name: "Programme Cabinetdab - De la ferme aux Marchés Mondiaux",
          description: "Programme de formation agricole structuré en 4 axes stratégiques pour transformer votre exploitation locale en entreprise exportatrice",
          provider: {
            "@type": "Organization",
            name: "Cabinetdab"
          },
          instructor: {
            "@type": "Person",
            name: "Dr. Kanga",
            jobTitle: "Expert en Agriculture"
          },
          courseMode: ["online", "in-person"],
          educationalLevel: "Professional",
          teaches: [
            "Ouverture de champs",
            "Transformation locale",
            "Exportation",
            "Assurances agricoles"
          ],
          audience: {
            "@type": "Audience",
            audienceType: "Agriculteurs"
          },
          offers: [
            {
              "@type": "Offer",
              name: "Masterclass Thématiques",
              description: "Sessions expertes et interactives"
            },
            {
              "@type": "Offer",
              name: "Séminaires Pratiques",
              description: "Immersion totale avec exercices pratiques"
            },
            {
              "@type": "Offer",
              name: "Coaching Privé",
              description: "Accompagnement personnalisé"
            }
          ]
        }

      default:
        return { ...baseData, ...data }
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
}