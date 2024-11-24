import React from "react";

interface NavigationPathProps {
  courseName: string;
  quizName: string;
}

const NavigationPath: React.FC<NavigationPathProps> = ({ courseName, quizName }) => {
  return (
    <div className="mb-3">
      <span style={{ color: "#d9534f" }}>{courseName}</span> &gt;{" "}
      <span style={{ color: "#d9534f" }}>Quizzes</span> &gt;{" "}
      <span style={{ fontWeight: "bold" }}>{quizName || "Unnamed Quiz"}</span>
    </div>
  );
};

export default NavigationPath;
