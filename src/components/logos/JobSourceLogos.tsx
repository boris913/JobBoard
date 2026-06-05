"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  colored?: boolean;
}

/* ─── Indeed ─── */
export function IndeedLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 120 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="-1">
        indeed
      </text>
      {!colored && (
        <circle cx="108" cy="6" r="4" fill="currentColor" />
      )}
      {colored && (
        <circle cx="108" cy="6" r="4" fill="#FF5A1F" />
      )}
    </svg>
  );
}

/* ─── LinkedIn ─── */
export function LinkedInLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 120 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <rect x="0" y="2" width="26" height="26" rx="3" fill={colored ? "#0A66C2" : "currentColor"} />
      <text x="3" y="22" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18">in</text>
      <text x="32" y="22" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="20" fill="currentColor">LinkedIn</text>
    </svg>
  );
}

/* ─── Welcome to the Jungle ─── */
export function WTTJLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 140 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="currentColor">
        wttj
      </text>
      <circle cx="115" cy="15" r="8" fill={colored ? "#1DAF8D" : "currentColor"} opacity={colored ? 1 : 0.3} />
      <circle cx="125" cy="15" r="8" fill={colored ? "#1DAF8D" : "currentColor"} opacity={colored ? 0.6 : 0.2} />
      <circle cx="135" cy="15" r="8" fill={colored ? "#1DAF8D" : "currentColor"} opacity={colored ? 0.3 : 0.1} />
    </svg>
  );
}

/* ─── France Travail ─── */
export function FranceTravailLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 160 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <rect x="0" y="5" width="20" height="20" rx="3" fill={colored ? "#0053B3" : "currentColor"} />
      <rect x="5" y="10" width="10" height="10" rx="1" fill="white" opacity="0.4" />
      <text x="26" y="14" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="currentColor">FRANCE</text>
      <text x="26" y="26" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="currentColor">TRAVAIL</text>
    </svg>
  );
}

/* ─── Apec ─── */
export function ApecLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 80 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" letterSpacing="2" fill={colored ? "#E1000F" : "currentColor"}>
        APEC
      </text>
    </svg>
  );
}

/* ─── HelloWork ─── */
export function HelloWorkLogo({ className, colored }: LogoProps) {
  return (
    <svg viewBox="0 0 130 30" className={cn("h-7 w-auto", className)} fill="currentColor">
      <circle cx="10" cy="15" r="10" fill={colored ? "#7C3AED" : "currentColor"} />
      <text x="8" y="20" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14">H</text>
      <text x="26" y="22" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="18" fill="currentColor">HelloWork</text>
    </svg>
  );
}