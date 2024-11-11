import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../Database";

const initialState = {
  quizzes: quizzes,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newquiz: any = {
        _id: quiz._id,
        title: quiz.title,
        course: quiz.course,
        points: quiz.points,
        type: quiz.type,
        assignTo: quiz.assignTo,
        available: quiz.available,
        due: quiz.due,
        until: quiz.until,
        description: quiz.description,
      };
      state.quizzes = [...state.quizzes, newquiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    editQuiz: (state, { payload: moduleId }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === moduleId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;

