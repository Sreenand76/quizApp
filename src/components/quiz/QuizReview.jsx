import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const QuizReview = () => {
  const { state } = useLocation();
  const navigate=useNavigate();
  const { quizQuestions, selectedAnswers,totalScores } = state;

  const [currentIndex, setCurrentIndex] = useState(0); // State for current question index

  const getAnswerStyle = (isCorrect, isSelected) => {
    if (isCorrect && isSelected) {
      return "bg-green-200 text-green-600 border-2 border-blue-600"; // Correct and selected
    }
    if (isCorrect) {
      return "bg-green-200 text-green-600"; // Correct
    }
    if (!isCorrect && isSelected) {
      return "bg-red-200 text-red-600 border-2 border-blue-600"; // Incorrect and selected
    }
    return "bg-gray-100 text-gray-600"; // Default style for unselected answers
  };

  const isOptionCorrect = (option, correctAnswers) => {
    return Array.isArray(correctAnswers)
      ? correctAnswers.includes(option)
      : correctAnswers === option;
  };

  // Handlers for Next and Previous buttons
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleBack = () => {
    navigate("/quiz-result", { state: { quizQuestions, selectedAnswers ,totalScores} }); 
  };
  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = selectedAnswers.find(
    (answer) => answer.id === currentQuestion.id
  );

  return (
    <div className="p-6 max-h-[90vh] flex flex-col items-center mt-8">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-4xl lg:w-2/3">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6">Quiz Review</h3>

        <div key={currentIndex} className="mb-6">
          <h4 className="text-lg font-medium">{currentQuestion.question}</h4>
          <div className="mt-2">
            {currentQuestion.choices.map((option, optionIndex) => {
              const isSelected =
                selectedAnswer && selectedAnswer.answer === option;
              const isCorrect = isOptionCorrect(
                option,
                currentQuestion.correctAnswers
              );

              return (
                <div
                  key={optionIndex}
                  className={`flex items-center p-2 my-2 rounded ${getAnswerStyle(
                    isCorrect,
                    isSelected
                  )}`}
                >
                  <p className="md:text-lg">{option}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 bg-gray-300 text-white rounded-md ${currentIndex === 0 ? "bg-gray-300": "bg-gray-500"}`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 bg-blue-600 text-white rounded-md  ${currentIndex === quizQuestions.length - 1 ? "bg-blue-300": "bg-blue-600"}`}
            onClick={handleNext}
            disabled={currentIndex === quizQuestions.length - 1}
          >
            Next
          </button>
        </div>
        
      </div>
      <div className="w-full max-w-4xl flex justify-start">
      <button className="mt-5 bg-purple-600 px-3 py-1 rounded-lg text-white text-lg" onClick={handleBack}>Back</button>
      </div>
      
      
    </div>
  );
};

export default QuizReview;
