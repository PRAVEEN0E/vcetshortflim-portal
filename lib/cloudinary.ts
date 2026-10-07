import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary server-side
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format?: string;
  bytes?: number;
}

/**
 * Uploads a payment screenshot to Cloudinary under short-film-competition/payments
 * @param buffer - File buffer
 * @param registrationNumber - Generated registration identifier
 * @param mimeType - Image mime type
 */
export async function uploadPaymentScreenshot(
  buffer: Buffer,
  registrationNumber: string,
  mimeType: string = "image/jpeg"
): Promise<string> {
  // If Cloudinary credentials are provided, perform real Cloudinary upload
  if (isCloudinaryConfigured) {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "short-film-competition/payments",
          public_id: `registration-${registrationNumber}`,
          overwrite: true,
          resource_type: "image",
          transformation: [
            { quality: "auto:good" },
            { fetch_format: "auto" },
            { width: 1200, crop: "limit" },
          ],
        },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            reject(new Error(error?.message || "Failed to upload image to Cloudinary"));
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer);
    });
  }

  // Fallback for local development if Cloudinary credentials are not set yet in .env:
  // Convert buffer to data URI so it displays properly without crashing the server
  console.warn(
    "Cloudinary credentials missing in environment. Using fallback data URI for local preview."
  );
  const base64 = buffer.toString("base64");
  return `data:${mimeType};base64,${base64}`;
}
