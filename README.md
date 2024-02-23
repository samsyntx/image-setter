# Media Toolkit

A versatile npm package providing functionalities to compress, convert file formats, and handle multimedia content seamlessly.

### Installation

```
npm install image-setter
```

## Usage

### compressAndConvertToJPEG

This function compresses and converts an image file to JPEG format based on the specified settings.

```
import { compressAndConvertToJPEG } from 'image-setter';

const file = /* your File object */;
const settings = {
  toWidth: 300,
  toHeight: 300,
  quality: 0.6,
  maxSize: 100 * 1024,
};

compressAndConvertToJPEG({ file, settings })
  .then((compressedBlob) => {
    // Handle the compressed Blob as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```

### convertFileFormat

This function converts the file format of a given file.

```
import { convertFileFormat } from 'image-setter';

const file = /* your File object */;
const targetFormat = 'image/png';

convertFileFormat({ file, targetFormat })
  .then((convertedBlob) => {
    // Handle the converted Blob as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```

### base64ToBinary

Converts a base64-encoded string to a Uint8Array.

```
import { base64ToBinary } from 'image-setter';

const base64String = /* your base64-encoded string */;

const binaryData = base64ToBinary(base64String);
// Use binaryData as needed

```

### convertToBase64

Converts a File object to a base64-encoded string.

```
import { convertToBase64 } from 'image-setter';

const file = /* your File object */;

convertToBase64(file)
  .then((base64String) => {
    // Handle the base64-encoded string as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```

### fileAsArrayBuffer

Converts a Compressed Image into Binary string.

```
import { fileAsArrayBuffer } from 'image-setter';

const file = /* your Image File */;

fileAsArrayBuffer(file)
  .then((bufferData) => {
    // Handle the bufferData string as needed
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```
