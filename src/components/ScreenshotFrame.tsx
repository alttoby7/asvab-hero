interface ScreenshotFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
  className?: string;
}

export default function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
  className = "",
}: ScreenshotFrameProps) {
  return (
    <figure
      className={`my-8 overflow-hidden rounded-xl border border-navy-border bg-navy-light shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-navy-border bg-navy-lighter px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-3 truncate font-mono text-[10px] text-text-tertiary">
          asvabhero.com
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className="block w-full"
      />
      {caption && (
        <figcaption className="border-t border-navy-border bg-navy-light px-4 py-2 text-xs text-text-tertiary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
