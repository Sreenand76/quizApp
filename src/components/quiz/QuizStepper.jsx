import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../utils/ApiFunction";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [timerEnabled, setTimerEnabled] = useState(false); // State for timer toggle
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && selectedNumQuestions > 100) {
      setErrorMessage("The maximum number of questions available is 100.");
      return;
    }
    setErrorMessage("");

    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", {
          state: { selectedNumQuestions, selectedSubject, timerEnabled },
        });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setErrorMessage(""); // Clear error message on previous step
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    const value = event.target.value;
    setSelectedNumQuestions(value);
    if (value > 100) {
      setErrorMessage("The maximum number of questions available is 100.");
    } else {
      setErrorMessage("");
    }
  };

  const toggleTimer = () => {
    setTimerEnabled((prev) => !prev); // Toggle timer state
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-5">
              Choose a subject to take the quiz:
            </h3>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mb-4"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h4 className="text-2xl font-semibold text-indigo-600 mb-7">
              How many questions would you like to attempt?
            </h4>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mb-4"
              value={selectedNumQuestions}
              onChange={handleNumQuestionsChange}
              placeholder="Enter the number of questions"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Confirm Your Choices
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Subject:</span> {selectedSubject}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Number of Questions:</span>{" "}
              {selectedNumQuestions}
            </p>
            <div className="mt-4">
              <button
                className={`${
                  timerEnabled
                    ? "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-600 hover:to-red-700"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500"
                } text-white text-sm font-medium py-2 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                onClick={toggleTimer}
              >
                {timerEnabled ? "Disable Timer" : "Enable Timer (1 min/qn)"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="relative w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-8">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center min-h-[90vh] bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full sm:max-w-2xl md:max-w-3xl md:h-[400px] mt-28">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome to Quizmo
        </h3>
        {renderProgressBar()}
        {renderStepContent()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow hover:bg-gray-400 transition-all"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedSubject) ||
                (currentStep === 2 && (!selectedNumQuestions || selectedNumQuestions > 100))
              }
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              className="bg-violet-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-600 transition-all"
              onClick={handleNext}
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizStepper;


