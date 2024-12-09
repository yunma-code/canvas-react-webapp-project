import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quizId: string, quizUpdates: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}`, quizUpdates);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(QUIZZES_API, quiz);
  return response.data;
};

export const fetchQuizzesForCourse = async (courseId: string) => {
	if (!courseId) {
    throw new Error("courseId is required");
  }
	//console.log("Fetching quizzes for courseId:", courseId);
  const response = await axios.get(`${COURSE_API}/${courseId}/quizzes`);
	//console.log("fetched quizzes: ", response.data);
  return response.data;
};

export const fetchQuizById = async (quizId: string) => {
  if (!quizId) {
    throw new Error("quizId is required");
  }
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
