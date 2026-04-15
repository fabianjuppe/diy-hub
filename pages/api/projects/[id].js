import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUBLIC_ID AUS CLOUDINARY URL RAUS ZIEHEN
function getPublicId(url) {
  try {
    const parts = url.split("/upload/")[1];
    const withoutVersion = parts.split("/").slice(1).join("/");
    const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
    return publicId;
  } catch (e) {
    return null;
  }
}

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  //GET
  if (request.method === "GET") {
    const project = await Project.findById(id);

    if (!project) {
      return response.status(404).json({ error: "Not found" });
    }

    return response.status(200).json(project);
  }

  if (request.method === "PATCH") {
    const { status } = request.body;

    if (status) {
      await Project.findByIdAndUpdate(id, { status });
    }

    response.status(200).json({ status: "Status successfully updated." });
    return;
  }

  //DELETE
  if (request.method === "DELETE") {
    try {
      const project = await Project.findById(id);

      if (!project) {
        return response.status(404).json({ error: "Not found" });
      }

      //DELETE AUCH VON CLOUDINARY
      for (const url of project.imageUrl || []) {
        const publicId = getPublicId(url);

        if (publicId) {
          await cloudinary.v2.uploader.destroy(publicId);
        }
      }

      await Project.findByIdAndDelete(id);

      return response.status(200).json({
        status: "Project + images deleted",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Delete failed" });
    }
  }

  // PUT (Update)
  if (request.method === "PUT") {
    try {
      const updatedData = request.body;

      //BILDER DIE GELÖSCHT WURDEN AUS CLOUDINARY RAUS
      const existing = await Project.findById(id);
      const oldUrls = existing?.imageUrl || [];
      const newUrls = updatedData.imageUrl || [];
      const deletedUrls = oldUrls.filter((url) => !newUrls.includes(url));

      for (const url of deletedUrls) {
        const publicId = getPublicId(url);
        if (publicId) await cloudinary.v2.uploader.destroy(publicId);
      }

      await Project.findByIdAndUpdate(id, updatedData);
      return response.status(200).json({ status: "Updated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Update failed" });
    }
  }

  return response.status(405).json({ error: "Method not allowed" });
}
