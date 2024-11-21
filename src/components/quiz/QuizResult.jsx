import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import the CSS for the circular progress bar
import { submitQuiz } from "../../utils/ApiFunction";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, totalScores, selectedAnswers, selectedSubject } = location.state;
  const numQuestions = quizQuestions.length;

  const percentage = numQuestions > 0 ? Math.round((totalScores / numQuestions) * 100) : 0;

  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (!scoreSubmitted && !hasSubmitted.current) {
      hasSubmitted.current = true;
      SetUserScore();
    }
  }, [scoreSubmitted]);

  const SetUserScore = async () => {
    if (scoreSubmitted) return;
    try {
      const email = localStorage.getItem("email");
      if (email && selectedSubject) {
        const updatedScoreDetails = {
          userEmail: email,
          subject: selectedSubject,
          correctAnswer: totalScores,
          totalQns: numQuestions,
        };
        const response = await submitQuiz(updatedScoreDetails);
        console.log(response);
        setScoreSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting quiz score:", error);
    }
  };

  function handleQuizReview() {
    navigate("/quiz-review", {
      state: { quizQuestions, selectedAnswers, totalScores, selectedSubject },
    });
  }

  return (
    <section className="container mx-auto mt-5 md:mt-14 p-5 min-h-[80vh] text-center bg-gray-50 shadow-lg rounded-lg max-w-xl">
      <h3 className="text-3xl font-bold text-gray-700 mb-6">Quiz Result Summary</h3>
      <hr className="border-gray-300 mb-6" />

      {/* Circular Progress Bar */}
      <div className="mb-8 flex justify-center md:mt-14">
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={10}
            styles={{
              path: { stroke: "#2563eb", strokeLinecap: "round" },
              text: { fill: "#2563eb", fontSize: "24px", fontWeight: "bold" },
              trail: { stroke: "#e5e7eb" },
            }}
          />
        </div>
      </div>

      <h5 className="text-xl text-gray-600 mb-3 md:mt-16">
        You answered <span className="text-green-500 font-bold">{totalScores}</span> out of{" "}
        <span className="text-blue-500 font-bold">{numQuestions}</span> questions correctly.
      </h5>
      <p className="text-lg text-gray-500 mb-8">Your total score is <span className="font-bold">{percentage}%</span>.</p>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:mt-16">
        <button
          onClick={handleQuizReview}
          className="w-full max-w-[60vw] m-auto h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Review Quiz
        </button>
        <Link to={"/quiz-step"}>
          <button
            className="w-full max-w-[60vw] h-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Retake Quiz
          </button>
        </Link>
        <Link to={"/"}>
          <button
            className="w-full max-w-[60vw]  h-12 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default QuizResult;




