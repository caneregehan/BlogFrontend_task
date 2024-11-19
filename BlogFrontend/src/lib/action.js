import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getSignedURL(filename) {
  const s3 = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIA6DPOZFMBCG7YJ7NW",
      secretAccessKey: "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",
    },
  });

  const putObjectCommand = new PutObjectCommand({
    Bucket: "my.task00",
    Key: `${filename}`,
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });

  return signedURL;
}

export const uploadToSignedURL = async (file, fileName) => {
  try {
    const signedUrl = await getSignedURL(fileName);
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });

    if (!response.ok) {
      console.error(`Failed to upload ${fileName} `);
      return null;
    }

    return fileName;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    return null;
  }
};
