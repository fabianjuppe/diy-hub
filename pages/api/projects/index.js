import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();

  // GET ALL PROJECTS
  if (request.method === "GET") {
    const projects = await Project.find().sort({ createdAt: -1 });
    return response.status(200).json(projects);
  }

  //CREATE PROJECT

  if (request.method === "POST") {
    try {
      const projectData = request.body;
      const createdProject = await Project.create(projectData);
      return response.status(201).json(createdProject);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Create failed" });
    }
  }

  return response.status(405).json({ error: "Method not allowed" });
}
