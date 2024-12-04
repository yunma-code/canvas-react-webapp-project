import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";



export default function QuizEditor() {

    const [isEditingDetails, setIsEditingDetails] = useState(true);
    

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
                        <QuizDetailsEditor />
                    </div>
                ) : (
                    <div className="tab-pane fade show active">
                        <QuizQuestionsEditor />
                    </div>
                )}
            </div> 

        </div>
    )
}