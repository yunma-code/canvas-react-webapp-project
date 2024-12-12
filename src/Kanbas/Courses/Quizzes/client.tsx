import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSE_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/quizzes/attempts`;
console.log("ATTEMPTS_API: ", ATTEMPTS_API);

const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateQuiz = async (quizId: string, quizUpdates: any) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quizUpdates);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
  console.log(response);
  return response.data;
};

export const fetchQuizzesForCourse = async (cid: any) => {
	if (!cid) {
    throw new Error("courseId is required");
  }
	// console.log("Fetching quizzes in client for cid:", cid);
  const response = await axiosWithCredentials.get(`${COURSE_API}/${cid}/quizzes`);
	// console.log("fetched quizzes: ", response.data);
  return response.data;
};


export const fetchQuizById = async (quizId: string) => {
  if (!quizId) {
    throw new Error("quizId is required");
  }
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};


export const updateAttemptForQuiz = async (attemptId: any, attemptUpdates: any) => {
  try {
    const response = await axiosWithCredentials.put(`${ATTEMPTS_API}/${attemptId}`, attemptUpdates);
    return response.data;
  } catch (error) {
    console.error("Error updating attempt:", error);
    throw error;
  }
};

export const fetchAttemptForQuiz = async (quizId: string) => {
  if (!quizId) {
    throw new Error("quizId is required");
  }
  console.log("fetching attempt for quiz: ", quizId);
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempt`);
  console.log("fetched attempt: ", response.data);
  return response.data;
};

export const createAttempt = async (attempt: any) => {
  if (!attempt || !attempt.quiz ) {
    throw new Error("Attempt data with quiz id is required");
  }
  attempt.current_attempt = 1;
  const response = await axiosWithCredentials.post(`${ATTEMPTS_API}`, attempt);
  return response.data;
}

export const togglePublishQuiz = async (quizId: string, is_published: boolean) => {
  const response = await axiosWithCredentials.patch(`${QUIZZES_API}/${quizId}`, {
    is_published: is_published,
  });
  return response.data;
};

