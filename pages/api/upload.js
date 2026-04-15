import formidable from "formidable";
import cloudinary from "cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// AUS ENV
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  try {
    const [fields, files] = await form.parse(req);

    const file = files.image?.[0];

    if (!file) {
      return res.status(400).json({
        error: "No file received",
      });
    }

    const result = await cloudinary.v2.uploader.upload(file.filepath, {
      folder: "diy-projects",
    });

    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}
