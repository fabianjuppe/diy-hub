import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "POST") {
    try {
      const note = request.body;

      await Project.findByIdAndUpdate(id, {
        $push: {
          notes: {
            $each: [note],
            $position: 0,
          },
        },
      });

      response.status(200).json({ status: "Note successfully added." });
      return;
    } catch (error) {
      response.status(500).json({ status: "Error adding note." });
      return;
    }
  }
}
