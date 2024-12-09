import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const getAssignmentsByCourseId = async (courseId: string) => {
  console.log("fetching data: ", courseId);
  const { data } = await axiosWithCredentials.get(`${COURSE_API}/${courseId}/assignments`);
  return data;
};

export const getAssignmentById = async (assignmentId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${ASSIGNMENT_API}/${courseId}`);
  return data;
};

export const createAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.post(ASSIGNMENT_API, assignment);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ASSIGNMENT_API}/${assignmentId}`);
  return data;
};