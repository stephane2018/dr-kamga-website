import {
  User,
  Users,
  Calendar,
  Video,
  Mail,
  Phone,
  BookOpen,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart,
  CheckCircle,
  Heart,
  Star,
  Briefcase,
  GraduationCap,
  type LucideIcon
} from 'lucide-react'

/**
 * Map icon names to Lucide React icon components
 * @param iconName - The name of the icon (e.g., 'User', 'Calendar')
 * @returns The corresponding Lucide icon component, defaults to User if not found
 */
export function getIconComponent(iconName: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    'User': User,
    'Users': Users,
    'Calendar': Calendar,
    'Video': Video,
    'Mail': Mail,
    'Phone': Phone,
    'BookOpen': BookOpen,
    'Award': Award,
    'TrendingUp': TrendingUp,
    'Target': Target,
    'Lightbulb': Lightbulb,
    'BarChart': BarChart,
    'CheckCircle': CheckCircle,
    'Heart': Heart,
    'Star': Star,
    'Briefcase': Briefcase,
    'GraduationCap': GraduationCap,
  }

  return icons[iconName] || User // Default to User icon if not found
}

/**
 * Get all available icon names
 * @returns Array of available icon names
 */
export function getAvailableIcons(): string[] {
  return [
    'User',
    'Users',
    'Calendar',
    'Video',
    'Mail',
    'Phone',
    'BookOpen',
    'Award',
    'TrendingUp',
    'Target',
    'Lightbulb',
    'BarChart',
    'CheckCircle',
    'Heart',
    'Star',
    'Briefcase',
    'GraduationCap',
  ]
}
