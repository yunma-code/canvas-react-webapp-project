import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import QuestionEditor from "./QuestionEditor";

export default function QuizQuestionsEditor({
    questionList,
    onUpdateQuestionList,
}: {
    questionList: any[];
    onUpdateQuestionList: (questionList: any[]) => void;
}) {
    const [creatingNew, setCreatingNew] = useState<boolean>(false);
    const navigate = useNavigate();
    const { cid, qid } = useParams();

    useEffect(() => {
        if (questionList) {
            console.log("questionList:", questionList)
        }
    }, [questionList]);

    const onUpdateQuestion = (updatedQuestion: any) => {
        const newQuestionList =
            questionList.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            );
        console.log("newQuestionList:", newQuestionList)
        onUpdateQuestionList(newQuestionList);
    };

    const onDeleteQuestion = (updatedQuestion: any) => {
        const newQuestionList =
            questionList.filter((q) =>
                q.id !== updatedQuestion.id
            );
        console.log("newQuestionList:", newQuestionList)
        onUpdateQuestionList(newQuestionList);
    };

    const handleCancel = () => {
        if (qid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
        } else {
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
        setCreatingNew(true);
        onUpdateQuestionList([...questionList, newQuestion]);
    };

    const handleSave = () => {
        if (questionList && questionList.length > 0) {
            const fetchedId = onUpdateQuestionList(questionList);
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
        } else {
            console.error("No questions to save.");
        }
    };

    return (
        <div>
            <div className="container mt-4">
                {questionList.map((question) => (
                    <QuestionEditor
                        key={question.id}
                        question={question}
                        onUpdate={onUpdateQuestion}
                        onDelete={onDeleteQuestion}
                    />
                ))}

                {creatingNew ? (
                    <QuestionEditor
                        question={questionList[questionList.length - 1]}
                        onUpdate={onUpdateQuestion}
                        onDelete={onDeleteQuestion}
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
