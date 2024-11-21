import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../utils/ApiFunction";
import { toast } from "react-toastify";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      console.log(questionToUpdate)
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      toast.success("Question Updated Successfully")
      navigate("/manage-questions");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p className="text-center text-xl text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Update Quiz Question</h2>
        <form onSubmit={handleUpdate}>
          {/* Question Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Question:</label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter the question here..."
            ></textarea>
          </div>

          {/* Choices Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choices:</label>
            {choices.map((choice, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e)}
                  placeholder={`Choice ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Correct Answers Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer(s):</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={correctAnswers}
              onChange={handleCorrectAnswerChange}
              placeholder="Enter correct answer(s) separated by commas"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            
            <Link
              to="/manage-questions"
              className="px-3 py-2 md:px-6 md:py-3 text-sm bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Back 
            </Link>
            <button
              type="submit"
              className="px-3 py-2 md:px-6 md:py-3 text-sm bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-400 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Update Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;

