import Student from "../models/StudentModel.js";

class StudentController {
  async getStudents(req, res) {
    let { page, limit, sort, asc } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    sort = sort || "createdAt";
    asc = asc || "desc";
    const skip = (page - 1) * limit;
    const sortObj = {};
    sortObj[sort] = asc === "desc" ? -1 : 1;
    try {
      const students = await Student.find()
        .sort(sortObj)
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Students retrieved successfully",
        data: students,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async getStudent(req, res) {
    const { id } = req.params;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `Student with id ${id} does not exist`,
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Student retrieved successfully",
        data: student,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async addStudent(req, res) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      address,
      phoneNumber,
      countryCode,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !address ||
      !phoneNumber ||
      !countryCode
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide all required fields",
      });
    }
    try {
      const student = await Student.create(req.body);
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Student added successfully",
        data: student,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    const { id } = req.params;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `Student with id ${id} does not exist`,
        });
      }
      const result = await student.updateOne(req.body);
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Student updated successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    const { id } = req.params;
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: `Student with id ${id} does not exist`,
        });
      }
      const result = await student.deleteOne();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Student deleted successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
}

const studentController = new StudentController();
export default studentController;
