import { useEffect, useState } from "react";

import QuestionEditor from "./QuestionEditor";

export default function QuizQuestionsEditor({ questionList, onUpdateQuestionList }: { questionList?: any[], onUpdateQuestionList: (questionList: any[]) => void; }) {
    const [questions, setQuestions] = useState<any[]>();
    const [creatingNew, setCreatingNew] = useState<boolean>();
    useEffect(() => {
        if (questionList) {
            setQuestions(questionList);
        }

    }, []
    )
    const onUpdateQuestion = (question: any) => {
        setQuestions(
            (prevQuestions) => {
                return [...(prevQuestions || []), question]
            }
        );
    }

    return (
        <div>
            {
                questionList && (
                    <div className="container mt-4">
                        {questionList.map(
                            (question) => (
                                <QuestionEditor question={question} onUpdate={setQuestions} />
                            )
                        )}
                    </div>
                )
            }
            {
                creatingNew ?
                    <QuestionEditor onUpdate={setQuestions} />
                    : <button className="btn btn-danger"> add question</button>

            }
        </div>
    )
}