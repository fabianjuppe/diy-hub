import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const projects = await Project.find();
    response.status(200).json(projects);
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
