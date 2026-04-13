import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const project = await Project.findById(id);

    if (!project) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json(project);
    return;
  }

  if (request.method === "PUT") {
    const updatedProject = request.body;

    await Project.findByIdAndUpdate(id, updatedProject);

    response.status(200).json({ status: "Project successfully updated." });
    return;
  }

  if (request.method === "PATCH") {
    try {
      const { action, note, noteId, content } = request.body;

      if (action === "addNote") {
        await Project.findByIdAndUpdate(
          id,
          {
            $push: {
              notes: {
                $each: [note],
                $position: 0,
              },
            },
          },
          { new: true }
        );
      }

      if (action === "editNote") {
        await Project.findOneAndUpdate(
          { _id: id, "notes.id": noteId },
          {
            $set: {
              "notes.$.content": content,
            },
          }
        );
      }

      console.log("noteId:", noteId);

      if (action === "deleteNote") {
        await Project.findByIdAndUpdate(id, {
          $pull: { notes: { id: noteId } },
        });
      }

      response.status(200).json({ status: "Note successfully added." });
      return;
    } catch (error) {
      response.status(500).json({ status: "Error adding note." });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      await Project.findByIdAndDelete(id);

      return response
        .status(200)
        .json({ status: "Project successfully deleted." });
    } catch (error) {
      return response.status(500).json({ status: "Error deleting project." });
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
