import { useEffect, useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import * as quizClient from "../client";
import { useParams } from "react-router-dom";

export default function QuizEditor() {

    const [isEditingDetails, setIsEditingDetails] = useState(true);
    const [quiz, setQuiz] = useState<any>();
    const { qid } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Determines if data is still loading
    const [isNewQuiz, setIsNewQuiz] = useState(false); // Determines if we are creating a new quiz

    const saveQuiz = async (updatedQuiz: any) => {
        try {
            if (qid) {
                await quizClient.updateQuiz(qid, updatedQuiz);
                return qid;
            } else {
                console.log("no qid");
                const createdQuiz = await quizClient.createQuiz(updatedQuiz);
                console.log("createdQuiz:", createdQuiz);
                setQuiz(createdQuiz);
                return createdQuiz.id;
            }
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    const onUpdateQuestionList = (questions: any[]) => {
        const updatedQuiz = {
            ...quiz,
            questions,
        };
        setQuiz(updatedQuiz);
        const id = saveQuiz(updatedQuiz);
        return id;

    };

    const onUpdateQuizDetails = (details: Partial<typeof quiz>) => {
        const updatedQuiz = {
            ...quiz,
            ...Object.fromEntries(Object.entries(details).filter(([_, v]) => v !== undefined)),
        };
        setQuiz(updatedQuiz);
        const id = saveQuiz(updatedQuiz);
        console.log("onupdatequestiondetail:", id)
        return id;
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid) {
                try {
                    const fetchedQuiz = await quizClient.fetchQuizById(qid);
                    console.log("fetchedQuiz", fetchedQuiz);
                    setQuiz(fetchedQuiz);
                    setIsNewQuiz(false);
                } catch (error) {
                    console.error("Error fetching quiz:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Handle new quiz creation
                setIsNewQuiz(true);
                setIsLoading(false);
            }
        };

        fetchQuiz();
    }, [qid]);




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
            <div className="tab-content">
                {isLoading ? (
                    <p>Loading...</p>
                ) : isEditingDetails ? (
                    <QuizDetailsEditor
                        quiz={quiz}
                        onUpdateQuizDetails={onUpdateQuizDetails}
                    />
                ) : (
                    <QuizQuestionsEditor
                        questionList={quiz?.questions || []}
                        onUpdateQuestionList={onUpdateQuestionList}
                    />
                )}
            </div>

        </div>
    );

}