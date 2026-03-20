interface DvidsHeroImageProps {
  src: string;
  alt: string;
  credit: string;
  branch: string;
  dvidsUrl: string;
  width: number;
  height: number;
}

export default function DvidsHeroImage({
  src,
  alt,
  credit,
  branch,
  dvidsUrl,
  width,
  height,
}: DvidsHeroImageProps) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg"
        width={width}
        height={height}
      />
      <figcaption className="mt-2 text-xs text-text-tertiary">
        Photo: U.S. {branch} / {credit} via{" "}
        <a
          href={dvidsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-text-secondary"
        >
          DVIDS
        </a>
      </figcaption>
    </figure>
  );
}
