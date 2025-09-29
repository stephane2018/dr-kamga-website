// components/HeroSection.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Wheat, Tractor, Leaf } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"


const backgroundImages = [
  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80', animationClass: 'animate-fadeBackground-1' },
  { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80', animationClass: 'animate-fadeBackground-2' },
  { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80', animationClass: 'animate-fadeBackground-3' }
]

const imageGalleryData = [
  {
    src: "https://media.istockphoto.com/id/520010076/photo/vegetable-farmer.jpg?s=1024x1024&w=is&k=20&c=m59VaBmaT2JGAZUuV3_i6o55CwEUQ1-DTMKnYnJOWxg=",
    alt: "Agriculteurs travaillant dans les champs",
    icon: Wheat,
    iconColor: "text-secondary-foreground",
    iconBgColor: "bg-secondary",
    gradientFrom: "from-primary-foreground",
    gradientTo: "to-secondary/20",
    backdropFrom: "from-secondary/30",
    backdropTo: "to-accent/30",
    rotation: "rotate-1",
    iconPosition: "top-left" as const
  },
  {
    src: "https://media.gettyimages.com/id/1190135202/video/he-has-interests-in-investing-in-her-farm.jpg?s=640x640&k=20&c=rwEd4oyzMptVLSJNx8FEazF5LjmGpZZbq1fsJRbZDd8=",
    alt: "Expert agricole consultant les agriculteurs",
    icon: Tractor,
    iconColor: "text-accent-foreground",
    iconBgColor: "bg-accent",
    gradientFrom: "from-primary-foreground",
    gradientTo: "to-accent/20",
    backdropFrom: "from-accent/30",
    backdropTo: "to-primary/30",
    rotation: "-rotate-1",
    iconPosition: "top-right" as const
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
    alt: "Personnel d'exportation préparant les produits pour les marchés internationaux",
    icon: Leaf,
    iconColor: "text-primary-foreground",
    iconBgColor: "bg-primary/80",
    gradientFrom: "from-primary-foreground",
    gradientTo: "to-primary/20",
    backdropFrom: "from-primary/30",
    backdropTo: "to-secondary/30",
    rotation: "rotate-2",
    iconPosition: "bottom-left" as const
  }
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
        
        {/* Image container with gradient border */}
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      {/* Background Images */}
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

      {/* Dot Indicators */}
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
            {/* Pulse animation for active dot */}
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar Animation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden z-10">
        <div
          key={currentIndex} // Force re-render for animation reset
          className="h-full bg-gradient-to-r from-white to-white/80 rounded-full animate-[progressReset_5000ms_ease-out]"
        ></div>
      </div>
    </div>
  )
}


export function HeroSection() {
  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <BackgroundSlider images={backgroundImages} />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge
              className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              variant="outline"
            >
              Programme Signature
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-primary-foreground">
              De la ferme aux <span className="text-secondary">Marchés Mondiaux</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
              Transformez votre exploitation agricole locale en entreprise exportatrice grâce à la méthode éprouvée de
              Cabinetdab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/methode-cabinetdab-guide.pdf" download="Methode-Cabinetdab-Guide.pdf" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Découvrir la méthode
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/masterclass">Voir les masterclass</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

