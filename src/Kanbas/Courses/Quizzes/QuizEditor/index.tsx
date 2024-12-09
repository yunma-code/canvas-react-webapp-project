import { useEffect, useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import * as quizClient from "../client";
import { useParams } from "react-router-dom";

export default function QuizEditor() {

    const [isEditingDetails, setIsEditingDetails] = useState(true);
    const [quiz, setQuiz] = useState<any>();
    const { qid } = useParams();


    const onUpdateQuestionList = (questions: any[]) => {
        setQuiz((prevQuiz: any) => ({
            ...prevQuiz,
            "questions": questions
        }));
    };
    const onUpdateQuizDetails = (details: Partial<typeof quiz>) => {
        setQuiz((prevQuiz: any) => ({
            ...prevQuiz,
            ...Object.fromEntries(Object.entries(details).filter(([_, v]) => v !== undefined)),
        }));
    };

    useEffect(
        () => {
            if(qid){
                try {
                    const quiz = quizClient.fetchQuizById(qid);
                    console.log("quiz:", quiz);
                    if (quiz) {
                        setQuiz(quiz);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        }, []
    );



    return (
        <div>
            <p>Quiz Editor</p>
            <hr />
            {/* tab */}
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className={`nav-link ${isEditingDetails ? "active" : "text-danger"}`}
                        onClick={() => setIsEditingDetails(true)}
                    >
                        Details
                    </button>
                    <button
                        className={`nav-link ${!isEditingDetails ? "active" : "text-danger"}`}
                        onClick={() => setIsEditingDetails(false)}
                    >
                        Questions
                    </button>
                </div>
            </nav>

            {/* Tab Content */}
            <div className="tab-content" id="content">
                {isEditingDetails ? (
                    <div className="tab-pane fade show active">
                        <QuizDetailsEditor quiz={quiz} onUpdateQuizDetails={onUpdateQuizDetails} />
                    </div>
                ) : (
                    <div className="tab-pane fade show active">
                        <QuizQuestionsEditor questionList={quiz?.questions} onUpdateQuestionList={onUpdateQuestionList} />
                    </div>
                )}
            </div>

        </div>
    )
}