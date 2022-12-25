const departmentModel = require("../../models/department");
const departmentSubModel = require("../../models/department-sub");

exports.create = async (req, res) => {};

exports.getAll = async (req, res) => {};

exports.departments = async (req, res) => {
  const departments = await departmentModel.find();

  res.json(departments);
};

exports.departmentsSubs = async (req, res) => {
  const departmentSubs = await departmentSubModel
    .find({ parent: req.params.id })
    .lean();
  res.json(departmentSubs);
};
