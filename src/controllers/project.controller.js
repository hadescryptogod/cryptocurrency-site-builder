// import model
const Project = require("../models/project.model");

// function to create project
exports.createProject = async (req, res, next) => {
  try {
    // create project with req body payload
    const project = await Project.create(req.body);

    // return res with project data
    res.status(201).json({
      project: project,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// function to get all projects
exports.getAllProjects = async (req, res, next) => {
  try {
    // get all projects
    const projects = await Project.find();

    // return res with all projects data
    res.status(200).json({ projects: projects });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to get project by slug ex. abc-coin
exports.getProjectBySlug = async (req, res, next) => {
  try {
    // get project by slug
    const project = await Project.findOne({ slug: req.params.slug });

    // check if project exists
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    // return res with project data
    res.status(200).json({
      project: project,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to update project by slug ex. abc-coin
exports.updateProjectBySlug = async (req, res, next) => {
  try {
    // update project by slug
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // check if project exists
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    res.status(200).json({
      project: project,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to delete project by slug ex. abc-coin
exports.deleteProjectBySlug = async (req, res, next) => {};
