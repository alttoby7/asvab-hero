interface BrandHeroProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
  className?: string;
}

export default function BrandHero({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
  className = "",
}: BrandHeroProps) {
  return (
    <figure className={`my-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className="w-full rounded-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-text-tertiary">{caption}</figcaption>
      )}
    </figure>
  );
}
