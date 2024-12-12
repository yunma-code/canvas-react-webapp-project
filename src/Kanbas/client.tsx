import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENT_API, { userId, courseId });
  return response.data;
};

export const getEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENT_API}/${userId}`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(ENROLLMENT_API, { data: { userId, courseId } });
  return response.data;
};