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
exports.getProjectBySlug = (req, res, next) => {
  const project = {};
  res.status(200).json({
    project: project,
  });
};

// function to update project by slug ex. abc-coin
exports.updateProjectBySlug = (req, res, next) => {
  const project = {};
  res.status(200).json({
    project: project,
  });
};
