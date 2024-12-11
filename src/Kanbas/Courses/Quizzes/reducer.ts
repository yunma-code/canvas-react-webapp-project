import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
  quizzes: quizzes,
};
export type QuizT = {
  id: String,
  course: String,
  title: String,
  points_possible: Number,
  quiz_type: String,
  assignment_group_id: String,
  assignment_group_type: String,
  shuffle_answers: Boolean,
  allowed_attempts: Boolean,
  attempts_number: Number,
  show_correct_answers: Boolean,
  one_question_at_a_time: Boolean,
  has_access_code: Boolean,
  require_lockdown_browser: Boolean,
  cant_go_back: Boolean,
  due_at: String,
  unlock_at: String,
  lock_at: String,
  description: String,
  time_limit: Number,
  questions: QuestionT[],
  is_published: Boolean,

}
export type QuestionT = {
  id: string,
  question_text: string,
  question_type: string,
  options: any,
}
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,

  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newquiz: QuizT = {
        id: quiz.id,
        course: quiz.course,
        title: quiz.title,
        points_possible: quiz.points_possible,
        quiz_type: quiz.quiz_type,
        assignment_group_id: quiz.assignment_group_id,
        assignment_group_type: quiz.assignment_group_type,
        shuffle_answers: quiz.shuffle_answers,
        allowed_attempts: quiz.allowed_attempts,
        attempts_number: quiz.attempts_number,
        show_correct_answers: quiz.show_correct_answers,
        one_question_at_a_time: quiz.one_question_at_a_time,
        has_access_code: quiz.has_access_code,
        require_lockdown_browser: quiz.require_lockdown_browser,
        cant_go_back: quiz.cant_go_back,
        due_at: quiz.due_at,
        unlock_at: quiz.unlock_at,
        lock_at: quiz.lock_at,
        description: quiz.description,
        time_limit: quiz.time_limit,
        questions: quiz.quesions,
        is_published: quiz.is_published,

      };
      console.log("add quiz triggerd", newquiz)
      state.quizzes = [...state.quizzes, newquiz] as any;
    },
    
    addQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      console.log('quiz', quiz)
      return {
        ...state,
        quizzes: state.quizzes.map((a: any) => {
          console.log('a', a)
          if (a.id === quiz.id) {
            return quiz
          }
          else {
            return a
          }

        }) as any
      }

    },

    editQuiz: (state, { payload: moduleId }) => {
      state.quizzes = state.quizzes.map((a: any) =>

        a._id === moduleId ? { ...a, editing: true } : a

      ) as any;
    },

    publishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.id === quizId
          ? { ...quiz, is_published: !quiz.is_published }
          : quiz
      );
    },
  },

});

export const { addQuiz,addQuizzes, deleteQuiz, updateQuiz, editQuiz, publishQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;

