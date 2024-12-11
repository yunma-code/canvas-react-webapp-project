import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import QuestionEditor from "./QuestionEditor";

export default function QuizQuestionsEditor({
    questionList,
    onUpdateQuestionList,
}: {
    questionList?: any[];
    onUpdateQuestionList: (questionList: any[]) => void;
}) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [creatingNew, setCreatingNew] = useState<boolean>(false);
    const navigate = useNavigate();
    const { cid, qid } = useParams();

    useEffect(() => {
        if (questionList) {
            setQuestions(questionList);
        }
    }, [questionList]);

    const onUpdateQuestion = (updatedQuestion: any) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            )
        );
    };

    const handleCancel = () => {
        if (qid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
        }else{
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        }

    };

    const addNewQuestion = () => {
        const newQuestion = {
            id: Date.now().toString(),
            question_text: "",
            question_type: "multiple_choice",
            options: [],
        };
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setCreatingNew(true);
    };

    const handleSave = () => {
        if (questions && questions.length > 0) {
            const fetchedId = onUpdateQuestionList(questions);
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
        } else {
            console.error("No questions to save.");
        }
    };

    return (
        <div>
            <div className="container mt-4">
                {questions.map((question) => (
                    <QuestionEditor
                        key={question.id}
                        question={question}
                        onUpdate={onUpdateQuestion}
                    />
                ))}

                {creatingNew ? (
                    <QuestionEditor
                        question={questions[questions.length - 1]}
                        onUpdate={onUpdateQuestion}
                    />
                ) : (
                    <div className="d-flex flex-column align-items-end">
                        <button className="btn btn-danger mt-4" onClick={addNewQuestion}>
                            Add Question
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <hr />
                <button onClick={handleCancel} className="btn btn-secondary me-2">
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={handleSave}>
                    Save All Questions
                </button>
            </div>
        </div>
    );
}
