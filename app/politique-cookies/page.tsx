import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Cookie, Shield, Eye, Settings } from "lucide-react"

export const metadata = {
  title: "Politique de Cookies",
  description: "Découvrez comment Cabinet DAB utilise les cookies pour améliorer votre expérience sur notre site web.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Politique de Cookies
            </h1>
            <p className="text-lg text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* What are cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">Qu'est-ce qu'un cookie ?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web.
                Les cookies nous aident à améliorer votre expérience, à mémoriser vos préférences et à comprendre
                comment vous utilisez notre site.
              </p>
            </div>

            {/* Types of cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">Types de cookies que nous utilisons</h2>
              </div>

              <div className="space-y-6">
                {/* Essential cookies */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">1. Cookies essentiels</h3>
                  <p className="text-muted-foreground mb-4">
                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>cookie_consent</strong> - Mémorise votre choix concernant les cookies</span>
                    </li>
                  </ul>
                </div>

                {/* Functional cookies */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">2. Cookies fonctionnels</h3>
                  <p className="text-muted-foreground mb-4">
                    Ces cookies permettent d'améliorer votre expérience utilisateur en mémorisant vos préférences.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>newsletter_modal_seen</strong> - Mémorise que vous avez vu la fenêtre d'inscription à la newsletter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>newsletter_subscribed</strong> - Mémorise que vous êtes inscrit à notre newsletter</span>
                    </li>
                  </ul>
                </div>

                {/* Analytics cookies */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">3. Cookies analytiques</h3>
                  <p className="text-muted-foreground mb-4">
                    Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Vercel Analytics</strong> - Analyse les performances et l'utilisation du site de manière anonyme</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Managing cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">Gestion de vos cookies</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vous pouvez contrôler et gérer les cookies de plusieurs façons :
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Via notre bannière</strong> - Vous pouvez accepter ou refuser les cookies via la bannière qui s'affiche lors de votre première visite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Via votre navigateur</strong> - La plupart des navigateurs vous permettent de refuser les cookies ou de supprimer les cookies existants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Mode navigation privée</strong> - Utilisez le mode de navigation privée de votre navigateur pour empêcher le stockage des cookies</span>
                </li>
              </ul>
            </div>

            {/* Duration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Durée de conservation</h2>
              <div className="bg-primary/5 rounded-2xl p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>cookie_consent</strong> : 1 an (si accepté) ou 30 jours (si refusé)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>newsletter_modal_seen</strong> : 30 jours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>newsletter_subscribed</strong> : 1 an</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Modifications de cette politique</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous pouvons mettre à jour cette politique de cookies de temps en temps. Nous vous encourageons
                à consulter régulièrement cette page pour rester informé de nos pratiques en matière de cookies.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions ?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Si vous avez des questions concernant notre utilisation des cookies, n'hésitez pas à nous contacter :
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email :</strong>{" "}
                  <a href="mailto:contact@cabinetdab.com" className="text-primary hover:underline">
                    contact@cabinetdab.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Site web :</strong>{" "}
                  <a href="https://www.cabinetdab.com" className="text-primary hover:underline">
                    www.cabinetdab.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
