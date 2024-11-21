import React from "react";

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
  if (!question) {
    return (
      <div className="text-center">
        Loading questions...
      </div>
    );
  }

  const { id, questionType, choices } = question;

  if (questionType === "single") {
    return (
      <div>
        {choices.sort().map((choice) => (
          <div key={choice} className="mb-3 flex items-center mt-3 md:mt-5">
            <input
              className="hidden peer"
              type="radio"
              id={choice}
              name={id}
              value={choice}
              checked={isChecked(id, choice)}
              onChange={() => handleAnswerChange(id, choice)}
            />
            <label
              htmlFor={choice}
              className="cursor-pointer w-full px-4 py-2 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 peer-checked:bg-blue-100 peer-checked:border-blue-300 peer-checked:text-blue-700 transition-all md:text-lg"
            >
              {choice}
            </label>
          </div>
        ))}
      </div>
    );
  } else if (questionType === "multiple") {
    return (
      <div>
        {choices.sort().map((choice) => (
          <div key={choice} className="mb-3 flex items-center ">
            <input
              className="hidden peer"
              type="checkbox"
              id={choice}
              name={id}
              value={choice}
              checked={isChecked(id, choice)}
              onChange={() => handleCheckboxChange(id, choice)}
            />
            <label
              htmlFor={choice}
              className="cursor-pointer w-full px-4 py-2  text-gray-700 border border-gray-200 rounded-lg bg-gray-50 peer-checked:bg-green-100 peer-checked:border-green-300 peer-checked:text-green-700 transition-all"
            >
              {choice}
            </label>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerOptions;

