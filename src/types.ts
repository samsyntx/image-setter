export type compressAndConvertToJPEGProps = {
  file: File;
  settings?: {
    toWidth: number;
    toHeight: number;
    quality: number;
    maxSize: number;
  };
};

export type convertFileFormatProps = {
  file: File;
  targetFormat: string;
};
