import { useState } from "react";

type FallbackImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

const getFallbackSrc = (src: string) =>
  src.includes("PhoneItem") ? "/img_PhoneItem/chiikawa2.jpg" : "/img/chiikawa1.jpg";

export const FallbackImage = ({
  src,
  alt,
  className,
  loading = "lazy",
}: FallbackImageProps) => {
  const fallbackSrc = getFallbackSrc(src || "");
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};
