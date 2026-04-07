import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  imageUrl: {
    type: String,
    required: true,
    default: "/placeholder.jpg",
  },
  complexity: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  materials: {
    type: [String],
  },
  steps: {
    type: [String],
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
