import { compressAndConvertToJPEGProps, convertFileFormatProps } from "./types";

const defaultSettings = {
  toWidth: 300,
  toHeight: 300,
  quality: 0.6,
  maxSize: 100 * 1024,
};

export const compressAndConvertToJPEG = ({
  file,
  settings = defaultSettings,
}: compressAndConvertToJPEGProps): Promise<Blob> => {
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Invalid file type. Expected an image."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Check if e.target.result is null
        const source = e.target?.result as string;
        if (!source) {
          reject(new Error("Unable to read file."));
          return;
        }

        // Calculate the new dimensions for the compressed image
        let newWidth, newHeight;
        if (img.width > img.height) {
          newWidth = settings.toWidth;
          newHeight = (img.height / img.width) * settings.toWidth;
        } else {
          newHeight = settings.toHeight;
          newWidth = (img.width / img.height) * settings.toHeight;
        }

        // Set the dimensions for the compressed image
        canvas.width = newWidth;
        canvas.height = newHeight;

        let quality = settings.quality;
        let compressedDataUrl;

        do {
          // Draw the image on the canvas with compression settings
          ctx?.drawImage(img, 0, 0, newWidth, newHeight); // Check if ctx is not null

          // Convert the canvas content to base64 (JPEG format) with current quality
          compressedDataUrl = canvas?.toDataURL("image/jpeg", quality);

          // Adjust the quality for the next iteration
          quality -= 0.1;
        } while (compressedDataUrl?.length > settings.maxSize && quality > 0);

        if (!compressedDataUrl) {
          reject(new Error("Failed to compress image."));
          return;
        }

        // Convert base64 to Blob
        const byteString = atob(compressedDataUrl.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const compressedBlob = new Blob([uint8Array], { type: "image/jpeg" });

        // Resolve with the compressed Blob
        resolve(compressedBlob);
      };

      img.src = e.target?.result as string; // Use type assertion
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const convertFileFormat = ({
  file,
  targetFormat,
}: convertFileFormatProps): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const source = reader.result;
      if (!source) {
        reject(new Error("Unable to read file."));
        return;
      }

      // Create a new Blob with the converted format
      const convertedBlob = new Blob([source], { type: targetFormat });

      resolve(convertedBlob);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const base64ToBinary = (base64String: string): Uint8Array => {
  const byteString = atob(base64String.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return uint8Array;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const source = e.target?.result as string;
      if (!source) {
        reject(new Error("Unable to read file."));
        return;
      }

      resolve(source);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
