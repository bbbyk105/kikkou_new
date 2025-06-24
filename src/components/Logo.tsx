// components/Logo.tsx
import Image from "next/image";

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function Logo({
  src,
  alt,
  width = 120,
  height = 40,
  priority = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-contain h-auto w-auto max-h-12 lg:max-h-14"
      />
    </div>
  );
}
