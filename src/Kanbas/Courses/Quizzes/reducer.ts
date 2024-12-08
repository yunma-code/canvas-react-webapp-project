import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
  quizzes: quizzes,
};
export type QuizT = {
  id:string;
  title:string;
  course:string;
  points_possible:number;
  quizType:string;
  assignTo:string|undefined;
  assignmentGroupId:string;
  shuffleAnswers:boolean;
  allowedAttempts:number;
  showCorrectAnswers:boolean;
  oneQuestionAtaTime:boolean;
  hasAccessCode:string;
  requireLockdownBrowser:boolean;
  cantGoBack:boolean;
  dueAt:Date;
  unlockAt:Date;
  lockAt:Date;
  description:string;
  timeLimit:number;
  published:boolean;
  questions:QuestionT[];
}
export type QuestionT = {
  id:string;
  question_text:string;
  question_type:string;
  options: any;
}
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,

  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newquiz: QuizT = {
        id: quiz.id,
        title: quiz.title,
        course: quiz.course,
        points_possible: quiz.points_possible,
        quizType: quiz.type,
        assignTo: quiz.assignTo,
        assignmentGroupId: quiz.assignment_group_id,
        shuffleAnswers: quiz.shuffle_answers,
        lockAt: quiz.lock_at,
        dueAt: quiz.due_at,
        unlockAt: quiz.unlock_at,
        description: quiz.description,
        allowedAttempts: 0,
        showCorrectAnswers: quiz.show_correct_answers,
        oneQuestionAtaTime: quiz.one_question_at_a_time,
        hasAccessCode: quiz.hasAccessCode,
        requireLockdownBrowser: quiz.require_lockdown_browser,
        cantGoBack: quiz.cant_go_back,
        timeLimit: quiz.time_limit,
        published: quiz.published,
        questions: quiz.quesions,
      };
      console.log("add quiz triggerd",newquiz)
      state.quizzes = [...state.quizzes, newquiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      console.log('quiz',quiz)
      return { 
        ...state,
        quizzes:state.quizzes.map((a: any) =>{
          console.log('a',a)
          if(a.id === quiz.id){
            return quiz
          }
          else{
            return a
          }
          
        } ) as any
      }
      
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

