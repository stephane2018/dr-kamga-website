import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceFeature {
  title: string
  description: string
}

interface ServiceCardProps {
  icon: LucideIcon
  category: string
  title: string
  subtitle: string
  description: string
  features: ServiceFeature[]
  ctaText: string
  ctaLink: string
  gradientPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function ServiceCard({
  icon: Icon,
  category,
  title,
  subtitle,
  description,
  features,
  ctaText,
  ctaLink,
  gradientPosition = "top-left",
}: ServiceCardProps) {
  const gradientClasses = {
    "top-left": "absolute top-0 left-0 w-2/4 h-2/4 bg-gradient-to-br from-primary/15 to-transparent rounded-br-full",
    "top-right": "absolute top-0 right-0 w-2/4 h-2/4 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-full",
    "bottom-left": "absolute bottom-0 left-0 w-2/4 h-2/4 bg-gradient-to-br from-primary/25 to-transparent rounded-tr-full",
    "bottom-right": "absolute bottom-0 right-0 w-2/4 h-2/4 bg-gradient-to-br from-primary/15 to-transparent rounded-tl-full",
  }

  return (
    <div className="group relative bg-gradient-to-br from-white to-primary/5 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 overflow-hidden">
      <div className={gradientClasses[gradientPosition]}></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-base font-bold text-primary uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>

      <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-primary font-semibold text-base mb-4">{subtitle}</p>

      <p className="text-gray-600 mb-6 leading-relaxed text-base">
        {description}
      </p>

      <div className="bg-gray-50 rounded-2xl p-5 mb-6">
        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
          Ce qui est inclus :
        </h4>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm leading-relaxed">
                <strong>{feature.title}</strong> — {feature.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
        asChild
      >
        <Link href={ctaLink}>{ctaText} →</Link>
      </Button>
    </div>
  )
}
