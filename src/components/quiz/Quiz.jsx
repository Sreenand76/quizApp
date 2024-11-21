import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser } from "../../utils/ApiFunction";
import AnswerOptions from "../../utils/AnswerOptions";
import { AiOutlineClockCircle } from "react-icons/ai";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScores, setTotalScores] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedNumQuestions, timerEnabled } = location.state;
 
  // Timer state optimization
  const timerRef = useRef(60 * selectedNumQuestions);
  const [timer, setTimer] = useState(timerRef.current);

  
  useEffect(() => {
    if (quizQuestions.length > 0 && timerEnabled) {
      // Start the timer when questions are loaded
      const intervalId = setInterval(() => {
        if (timerRef.current > 0) {
          timerRef.current -= 1;
          setTimer(timerRef.current);
        } else {
          handleSubmit();
        }
      }, 1000);
      return () => clearInterval(intervalId); // Clean up on unmount
    }
  }, [quizQuestions.length, timerEnabled]);

  
  
  useEffect(() => {
    const fetchQuizData = async () => {
      if (selectedNumQuestions && selectedSubject) {
        const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject);
        setQuizQuestions(questions);
        console.log(questions)
      }
      };  
    fetchQuizData();
  }, [selectedNumQuestions, selectedSubject])

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.id === questionId);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { id: questionId, answer };
        return updatedAnswers;
      }
      return [...prevAnswers, { id: questionId, answer }];
    });
  };

  const isChecked = (questionId, choice) => {
    const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId);
    if (!selectedAnswer) return false;
    if (Array.isArray(selectedAnswer.answer)) {
      return selectedAnswer.answer.includes(choice);
    }
    return selectedAnswer.answer === choice;
  };

  const handleSubmit = () => {
    let scores = 0;
    quizQuestions.forEach((question) => {
      const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id);
      if (selectedAnswer) {
        const selectedOptions = Array.isArray(selectedAnswer.answer)
          ? selectedAnswer.answer
          : [selectedAnswer.answer];
        const correctOptions = Array.isArray(question.correctAnswers)
          ? question.correctAnswers
          : [question.correctAnswers];
        const isCorrect =
          selectedOptions.length === correctOptions.length &&
          selectedOptions.every((option) => correctOptions.includes(option));

        if (isCorrect) {
          scores++;
        }
      }
    });
    setTotalScores(scores);
    navigate("/quiz-result", { state: { quizQuestions, totalScores: scores,selectedAnswers:selectedAnswers ,selectedSubject:selectedSubject} });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-[90vh] flex flex-col items-center">
      <div className="text-center mb-6 flex w-full justify-between max-w-4xl lg:w-2/3 mt-7">
        <h3 className="text-2xl font-semibold text-blue-600">
          Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of{" "}
          {quizQuestions.length}
        </h3>
        {timerEnabled && (
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded shadow-md border border-gray-300">
          <AiOutlineClockCircle
            className={`w-6 h-6 ${timer > 30 ? "text-green-500" : timer > 10 ? "text-yellow-600" : "text-red-500"}`}
          />
          <p className={`text-lg font-medium ml-2 ${timer > 30 ? "text-green-500" : timer > 10 ? "text-yellow-500" : "text-red-500"}`}>
            {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
          </p>
        </div>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl lg:w-2/3">
        <h4 className="mb-4 md:mb-6 text-lg md:text-2xl font-medium text-gray-700">
          {quizQuestions[currentQuestionIndex]?.question}
        </h4>
        <AnswerOptions
          question={quizQuestions[currentQuestionIndex]}
          isChecked={isChecked}
          handleAnswerChange={handleAnswerChange}
        />
      </div>

      <div className="mt-6 flex justify-between w-full max-w-4xl lg:w-2/3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${currentQuestionIndex === quizQuestions.length - 1
              ? "bg-orange-500"
              : "bg-green-500"
            } disabled:bg-gray-300`}
          onClick={handleNextQuestion}
          disabled={
            !selectedAnswers.find((answer) => answer.id === quizQuestions[currentQuestionIndex]?.id)
          }
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
