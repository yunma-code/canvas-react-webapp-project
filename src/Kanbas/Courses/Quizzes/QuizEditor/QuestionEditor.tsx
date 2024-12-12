
import { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
import { BiTrash } from "react-icons/bi";
import "./questionEditor.css";

export default function QuestionEditor({ question, onUpdate, onDelete}: { question?: any; onUpdate: (question: any) => void; onDelete: (id: string) =>void}) {
    const [type, setType] = useState<string>("multiple_choice");
    const [description, setDescription] = useState<string>("");
    const [points, setPoints] = useState<number>(0);
    const [options, setOptions] = useState<any[]>([]);
    const [answer, setAnswer] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (question) {
            const {
                question_type = "multiple_choice",
                question_text = "<p></p>",
                points = 0,
                options = [],
                answer = undefined,
            } = question;

            setType(question_type);
            setDescription(question_text);
            setPoints(points);
            setOptions(options);
            setAnswer(answer);
        }
    }, [question]);

    const handleUpdate = () => {
        const updatedQuestion = {
            ...question,
            question_type: type,
            question_text: description,
            points: points,
            options: options,
            answer: answer,
        };
        onUpdate(updatedQuestion);
    };

    const handleAddOption = () => {
        const newOptions = [...options, { id: Date.now().toString(), answer_text: "", is_correct: false }];
        setOptions(newOptions);
        const updatedQuestion = {
            ...question,
            options: newOptions
        };
        onUpdate(updatedQuestion);
    };

    const handleDeleteOption = (id: string) => {
        const newOptions = options.filter((option) => option.id !== id);
        setOptions(newOptions);
        const updatedQuestion = {
            ...question,
            options: newOptions
        };
        onUpdate(updatedQuestion);
    };


    const handleOptionChange = (id: string, key: string, value: any) => {
        const newOptions = options.map((option) =>
            option.id === id ? { ...option, [key]: value } : option
        );
        setOptions(newOptions);
        const updatedQuestion = {
            ...question,
            options: newOptions
        };
        onUpdate(updatedQuestion);
    };

    const handleAnswerChange = (value: boolean)=>{
        const updatedQuestion = {
            ...question,
            answer: value
        };
        onUpdate(updatedQuestion);
    }

    const handleQuestionDetailsChange = (key: string, value: any) => {
        const updatedQuestion = {
            ...question,
            [key]: value
        };
        onUpdate(updatedQuestion);
    }

    const renderOptions = () => {
        return options.map((option) => (
            <div key={option.id} className="answer-selection-container">
                <label
                    className={`form-label text-end ${option.is_correct && "text-success"} col-2 me-3`}
                >
                    {option.is_correct ? "correct answer" : "possible answer"}
                </label>
                <input
                    className="form-check me-3"
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={(e) => {
                        handleOptionChange(option.id, "is_correct", e.target.checked);
                    }}
                />
                <input
                    className="form-control me-3"
                    type="text"
                    value={option.answer_text}
                    onChange={(e) =>
                        handleOptionChange(option.id, "answer_text", e.target.value)
                    }
                />
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteOption(option.id)}
                >
                    <BiTrash />
                </button>
            </div>
        ));
    };

    return (
        <div className="mt-2 border border-1 rounded-1 border-secondary">
            <div className="d-flex justify-content-between align-items-center m-3">
                <span className="me-2">Title:</span>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Enter question title"
                    style={{ maxWidth: "60%" }}
                />
                <select
                    className="form-select me-2"
                    style={{ maxWidth: "30%" }}
                    name="question_type"
                    value={type}
                    onChange={(e) => { handleQuestionDetailsChange(e.target.name, e.target.value) }}
                >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="fill_in_blank">Fill in the Blank</option>
                </select>
                <div className="d-flex align-items-center">
                    <span className="me-2">Pts:</span>
                    <input
                        type="number"
                        className="form-control"
                        style={{ width: "60px" }}
                        value={points}
                        name = "pts"
                        onChange={(e) => { handleQuestionDetailsChange(e.target.name, e.target.value) }}
                    />
                </div>
            </div>
            <hr />
            <div className="mx-3">
                <h4>Question:</h4>
                <QuillEditor
                    initialValue={description}
                    onContentChange={(context) =>handleQuestionDetailsChange("question_text", context)}
                />
            </div>

            <div className="mx-3">
                {type === "multiple_choice" && (
                    <div className="answer-container">
                        <h4 className="form-label">Answers:</h4>
                        {renderOptions()}
                        <hr />
                        <div className="d-flex flex-row justify-content-end mb-3">
                            <button
                                className="btn btn-outline-primary me-2"
                                onClick={handleAddOption}
                            >
                                + Add Another Answer
                            </button>
                            <button
                                className="btn btn-danger"
                                name={question.id}
                                onClick={()=>onDelete(question.id)}
                            >
                                Remove Question
                            </button>
                        </div>
                    </div>
                )}
                {type === "true_false" && (
                    <div className="answer-container">
                        <h4 className="form-label">Answers:</h4>
                        <div className="answer-selection-container">
                            <label
                                className={`form-label text-end ${answer && "text-success"} col-2 me-3`}
                            >
                                True
                            </label>
                            <input
                                className="form-check me-3"
                                type="checkbox"
                                checked={answer === true}
                                onChange={() => setAnswer(true)}
                            />
                        </div>
                        <div className="answer-selection-container">
                            <label
                                className={`form-label text-end ${!answer && "text-success"} col-2 me-3`}
                            >
                                False
                            </label>
                            <input
                                className="form-check me-3"
                                type="checkbox"
                                checked={answer === false}
                                onChange={(e) => handleAnswerChange(e.target.checked)}
                            />
                        </div>
                    </div>
                )}
                {type === "fill_in_blank" && (
                    <div className="answer-container">
                        <h4 className="form-label">Answers:</h4>
                        {options.map((option) => (
                            <div key={option.id} className="answer-selection-container">
                                <label className="form-label col-2 me-3">Possible Answer:</label>
                                <input
                                    className="form-control me-3"
                                    type="text"
                                    value={option.answer_text}
                                    onChange={(e) =>
                                        handleOptionChange(option.id, "answer_text", e.target.value)
                                    }
                                />
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteOption(option.id)}
                                >
                                    <BiTrash />
                                </button>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex flex-row justify-content-end mb-3">
                            <button
                                className="btn btn-outline-primary me-2"
                                onClick={handleAddOption}
                            >
                                + Add Another Answer
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setType("multiple_choice"); // Example: reset type
                                }}
                            >
                                Remove Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
