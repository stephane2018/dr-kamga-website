"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSortedCountryCodes, getCountryName } from "@/lib/country-codes"

interface PhoneInputProps {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultCountryCode?: string
  language?: "fr" | "en"
  onPhoneChange?: (fullPhone: string) => void
  className?: string
}

export function PhoneInput({
  label,
  placeholder = "XX XX XX XX XX",
  required = false,
  disabled = false,
  defaultCountryCode = "+225",
  language = "fr",
  onPhoneChange,
  className = "",
}: PhoneInputProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode)
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleCountryCodeChange = (value: string) => {
    setSelectedCountryCode(value)
    if (onPhoneChange && phoneNumber) {
      onPhoneChange(`${value} ${phoneNumber}`)
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)
    if (onPhoneChange) {
      onPhoneChange(`${selectedCountryCode} ${value}`)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="phone" className="text-sm font-medium">
          {label}
        </Label>
      )}
      <div className="flex gap-2 my-0 items-center">
        <Select value={selectedCountryCode} onValueChange={handleCountryCodeChange} disabled={disabled}>
          <SelectTrigger className="h-14 w-[120px] border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {getSortedCountryCodes(language).map((country) => (
              <SelectItem key={country.code} value={country.dialCode}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="font-medium">{country.dialCode}</span>
                
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="h-11 flex-1 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
        />
      </div>
    </div>
  )
}
