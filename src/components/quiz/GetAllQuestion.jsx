import React, { useEffect, useState } from "react"
import { deleteQuestion, getAllQuestions } from "../../utils/ApiFunction"
import { getSubjects } from "../../utils/ApiFunction" // Import the getSubjects function
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  )
}

const GetAllQuestion = () => {
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: "", choices: [], subject: "" }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState("")
  const [searchQuery, setSearchQuery] = useState("") // For search functionality
  const [selectedSubject, setSelectedSubject] = useState("") // For filtering by subject
  const [subjects, setSubjects] = useState([]) // To store subjects fetched from the API

  useEffect(() => {
    fetchQuestions()
    fetchSubjects() // Fetch subjects when the component mounts
  }, [])

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions()
      setQuestions(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects() 
			console.log(data)
      setSubjects(data) 
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id)
      setQuestions(questions.filter((question) => question.id !== id))
      setIsQuestionDeleted(true)
      setDeleteSuccess("Question deleted successfully.")
    } catch (error) {
      console.error(error)
    }
    setTimeout(() => {
      setDeleteSuccess("")
    }, 4000)
  }

  const filteredQuestions = questions.filter((question) => {
    // Filter by search query
    const matchesSearch =
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.choices.some((choice) =>
        choice.toLowerCase().includes(searchQuery.toLowerCase())
      )
    // Filter by selected subject
    const matchesSubject = selectedSubject
      ? question.subject === selectedSubject
      : true

    return matchesSearch && matchesSubject
  })

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 px-4 max-w-3xl">
        <Spinner />
        <div className="text-center mt-5">Loading qns...</div>
      </div>
    )
  }

  return (
    <section className="container mx-auto mt-10 px-4 max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          <h4 className="text-xl font-semibold">All Quiz Questions</h4>
        </div>
        <div className="flex justify-end">
          <Link
            to={"/add-question"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <FaPlus /> <span>Add Question</span>
          </Link>
        </div>
      </div>

      {/* Search and Subject Filter */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          className="border border-gray-300 px-4 py-2 rounded-md mr-4 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 px-4 py-2 rounded-md"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">All Subjects</option>
         
          {subjects.map((subject) => (
            <option key={subject.id} value={subjects[subject.id]}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-t border-gray-300 mb-4" />
      {isQuestionDeleted && (
        <div className="alert alert-success text-green-500 mb-4">{deleteSuccess}</div>
      )}

      {filteredQuestions.map((question, index) => (
        <div key={question.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h4 className="text-gray-800 font-semibold mb-2">{`${index + 1}. ${question.question}`}</h4>
          <ul className="list-[upper-alpha] text-gray-500">
            <ul className="space-y-2">
              {question.choices.map((choice, index) => (
                <li key={index}>
                  <span className="font-medium text-gray-700 mr-1 mb-2">
                    {String.fromCharCode(65 + index)})</span>
                  <span className="text-gray-600">{choice}</span>
                </li>
              ))}
            </ul>
          </ul>
          <p className="text-green-500 mt-3">Correct Answer: {question.correctAnswers}</p>
          <div className="flex justify-between mt-4">
            <Link to={`/update-quiz/${question.id}`}>
              <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
                Edit Qn
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => handleDeleteQuestion(question.id)}>
              Delete Qn
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default GetAllQuestion
