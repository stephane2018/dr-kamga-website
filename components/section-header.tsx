import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SectionHeaderProps {
  title: string
  description: string
  ctaText?: string
  ctaLink?: string
}

export function SectionHeader({ title, description, ctaText, ctaLink }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
        {title}
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
        {description}
      </p>
      {ctaText && ctaLink && (
        <div className="p-6 max-w-2xl mx-auto">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
