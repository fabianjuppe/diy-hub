import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();
  const { id, noteId } = request.query;

  if (request.method === "PATCH") {
    try {
      const { content } = request.body;

      await Project.findByIdAndUpdate(
        id,
        {
          $set: { "notes.$[elem].content": content },
        },
        {
          arrayFilters: [{ "elem.id": noteId }],
        }
      );

      response.status(200).json({ status: "Note successfully edited." });
      return;
    } catch (error) {
      response.status(500).json({ status: "Error editing note." });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      await Project.findByIdAndUpdate(id, {
        $pull: { notes: { id: noteId } },
      });

      response.status(200).json({ status: "Note successfully deleted." });
      return;
    } catch (error) {
      response.status(500).json({ status: "Error deleting note." });
      return;
    }
  }
}
