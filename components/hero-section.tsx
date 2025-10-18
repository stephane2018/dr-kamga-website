// components/HeroSection.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { DownloadGuideModal } from "@/components/download-guide-modal"
import { useLanguage } from "@/locales/LanguageProvider"


const backgroundImages = [
  { url: '/slide/slide-1.jpeg', animationClass: 'animate-fadeBackground-1' },
  { url: '/slide/slide-2.jpeg', animationClass: 'animate-fadeBackground-2' },
  { url: '/slide/slide-3.jpeg', animationClass: 'animate-fadeBackground-3' },
  { url: '/slide/slide-4.jpeg', animationClass: 'animate-fadeBackground-4' },
  { url: '/slide/slide-5.jpeg', animationClass: 'animate-fadeBackground-5' },
  { url: '/slide/slide-6.jpeg', animationClass: 'animate-fadeBackground-6' },
  { url: '/slide/slide-7.jpeg', animationClass: 'animate-fadeBackground-7' },
  { url: '/slide/slide-8.jpeg', animationClass: 'animate-fadeBackground-8' },
  { url: '/slide/slide-9.jpeg', animationClass: 'animate-fadeBackground-9' },
  
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
    <div className={`relative image-hover-effect ${className}`}>
      <div className="relative h-full">
        {/* Image container with gradient border */}
        <div className="relative rounded-4xl p-1 shadow-2xl h-full">
          <div className="relative w-full h-full rounded-4xl overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// components/BackgroundSlider.tsx
interface BackgroundImage {
  url: string
  animationClass: string
}

interface BackgroundSliderProps {
  images: BackgroundImage[]
}

export function BackgroundSlider({ images }: BackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(images.length).fill(false))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      {/* Background Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.url}
              alt={`Background slide ${index + 1}`}
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              className="object-cover object-center"
              onLoad={() => {
                const newLoaded = [...isLoaded]
                newLoaded[index] = true
                setIsLoaded(newLoaded)
              }}
            />
          </div>
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

