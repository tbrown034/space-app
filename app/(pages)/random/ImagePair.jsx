"use client";
import Image from "next/image";

export default function ImagePair({
  isNasaFirst,
  imageData,
  selectedImage,
  setSelectedImage,
  hasSubmitted,
  isCorrect,
}) {
  const handleImageClick = (imageType) => {
    if (!hasSubmitted) setSelectedImage(imageType);
  };

  return (
    <div className="grid w-full max-w-lg gap-4 md:grid-cols-2">
      <div
        className={`relative cursor-pointer transition-transform duration-200 ${
          selectedImage === "nasa"
            ? "scale-105 border-4 border-yellow-500"
            : "border-2 border-white"
        } ${
          hasSubmitted && (isCorrect ? "border-green-500" : "border-red-500")
        }`}
        onClick={() => handleImageClick("nasa")}
        style={{ aspectRatio: "1/1", position: "relative" }}
      >
        <Image
          src={isNasaFirst ? imageData.nasaImageUrl : imageData.aiImageUrl}
          alt="NASA Image"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div
        className={`relative cursor-pointer transition-transform duration-200 ${
          selectedImage === "ai"
            ? "scale-105 border-4 border-yellow-500"
            : "border-2 border-white"
        } ${
          hasSubmitted && (!isCorrect ? "border-green-500" : "border-red-500")
        }`}
        onClick={() => handleImageClick("ai")}
        style={{ aspectRatio: "1/1", position: "relative" }}
      >
        <Image
          src={isNasaFirst ? imageData.aiImageUrl : imageData.nasaImageUrl}
          alt="AI Image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
