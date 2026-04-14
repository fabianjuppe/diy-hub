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
    const { status } = request.body;

    if (status) {
      await Project.findByIdAndUpdate(id, { status });
    }

    response.status(200).json({ status: "Status successfully updated." });
    return;
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
