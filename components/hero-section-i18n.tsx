// components/hero-section-i18n.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DownloadGuideModal } from "@/components/download-guide-modal"
import { useLanguage } from "@/locales/LanguageProvider"

const backgroundImages = [
  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80', animationClass: 'animate-fadeBackground-1' },
  { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80', animationClass: 'animate-fadeBackground-2' },
  { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80', animationClass: 'animate-fadeBackground-3' },
  { url: 'https://www.shutterstock.com/shutterstock/photos/1797691207/display_1500/stock-photo-intensive-agriculture-in-africa-chicken-farming-1797691207.jpg', animationClass: 'animate-fadeBackground-3' },
]

interface ImageCardProps {
  src: string
  alt: string
  iconPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-right"
  className?: string
}

export function ImageCard({
  src,
  alt,
  className = ""
}: ImageCardProps) {
  return (
    <div className={`relative image-hover-effect  ${className}`}>
      <div className="relative h-full">
        <div className={`relative  rounded-4xl  p-1 shadow-2xl h-full`}>
          <img
            src={src}
            alt={alt}
            className=" w-full h-full object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  )
}

interface BackgroundImage {
  url: string
  animationClass: string
}

interface BackgroundSliderProps {
  images: BackgroundImage[]
}

export function BackgroundSlider({ images }: BackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image.url}')` }}
          ></div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary/50 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg shadow-black/25'
                : 'bg-white/50 hover:bg-white/75 hover:scale-110 scale-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="sr-only">Slide {index + 1}</span>
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden z-10">
        <div
          key={currentIndex}
          className="h-full bg-gradient-to-r from-white to-white/80 rounded-full animate-[progressReset_5000ms_ease-out]"
        ></div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language, t } = useLanguage()

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <BackgroundSlider images={backgroundImages} />

      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge
              className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              variant="outline"
            >
              {language === 'fr' ? 'Programme Signature' : 'Signature Program'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-primary-foreground">
              {t.hero.title}
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {language === 'fr' ? 'Découvrir la méthode' : 'Discover the method'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href={`/${language}/masterclass`}>
                  {language === 'fr' ? 'Voir les masterclass' : 'View masterclasses'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DownloadGuideModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}
