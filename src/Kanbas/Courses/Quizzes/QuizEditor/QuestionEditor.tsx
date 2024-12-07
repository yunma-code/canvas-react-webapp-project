import { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
import { BiTrash } from "react-icons/bi";
import "./questionEditor.css"

export default function QuestionEditor({ question, onUpdate }:
    { question?: any; onUpdate: (question: any) => void }
) {
    const [type, setType] = useState<string>();
    const [description, setDescription] = useState<string>("");
    const [points, setPoints] = useState<number>();
    const [options, setOptions] = useState<any[] | undefined>(undefined);
    const [answer, setAnswer] = useState<boolean | undefined>(undefined);
    const [blank, setBlank] = useState<any[] | undefined>(undefined);
    useEffect(
        () => {
            if (question) {
                const {
                    type = "multiple_choice",
                    description = "<p></p>",
                    points = 0,
                    options = undefined,
                    answer = undefined,
                    blank = undefined,
                } = question;

                setType(type);
                setDescription(description);
                setPoints(points);
                setOptions(options);
                setAnswer(answer);
                setBlank(blank);
            }
        }, []
    )

    return (
        <div className="mt-2 border border-1 rounded-1 border-secondary">

            <div className="d-flex justify-content-between align-items-center m-3">
                <span className="me-2">title:</span>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Easy Question"
                    style={{ maxWidth: "60%" }}
                />
                <select className="form-select me-2" style={{ maxWidth: "30%" }}>
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Short Answer</option>
                </select>
                <div className="d-flex align-items-center">
                    <span className="me-2">pts:</span>
                    <input
                        type="number"
                        className="form-control"
                        style={{ width: "60px" }}
                        defaultValue={points}
                    />
                </div>

            </div>
            <hr />
            <div className="mx-3">
                <h4>Question: </h4>
                <QuillEditor initialValue={description} onContentChange={setDescription} />
            </div>

            <div className="mx-3">
                {type === "multiple_choice" &&
                    <div className="answer-container">
                        <h4 className="form-label">Answers:</h4>
                        {options?.map((option) => (
                            <div className="answer-selection-container">

                                <label className={`form-label text-end ${option.is_correct && "text-success"} col-2 me-3`}>{option.is_correct ? "correct answer" : "possible answer"}</label>
                                <input className="form-check me-3" type="checkbox" id={option.id} checked={option.is_correct} ></input>
                                <input className="form-control me-3" type="text" id={option.id} value={option.answer_text}></input>
                                <button className="btn btn-danger float-end"><BiTrash /></button>
                            </div>
                        ))}
                        <hr />
                        <div>
                            <button className="btn btn-outline-danger float-end mb-2 " >
                                + Add Another Answer
                            </button>
                        </div>
                    </div>


                }
                {type === "true_false" &&
                    <div className="answer-container">
                        <h4 className="form-label">Answers:</h4>

                        <div className="answer-selection-container">
                            <label className={`form-label text-end ${answer && "text-success"} col-2 me-3`}>{answer ? "correct answer" : "possible answer"}</label>
                            <input className="form-check me-3" type="checkbox" checked={answer} ></input>
                            <input className="form-control me-3" type="text" value="True"></input>
                        </div>
                        <div className="answer-selection-container">
                            <label className={`form-label text-end ${!answer && "text-success"} col-2 me-3`}>{!answer ? "correct answer" : "possible answer"}</label>
                            <input className="form-check me-3" type="checkbox" checked={!answer} ></input>
                            <input className="form-control me-3" type="text" value="False"></input>
                        </div>
                    </div>
                }
                {
                    type === "fill_in_blank" &&
                    <div>
                        fill in the blank question
                    </div>
                }
            </div>

        </div>
    )
}