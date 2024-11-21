import React, { useEffect, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { createQuestion, getSubjects } from "../../utils/ApiFunction"
import { toast } from "react-toastify"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])
	const navigate=useNavigate();

	useEffect(() => {
		fetchSubjects()
	}, []);

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			console.log(subjectsData)
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
		const lastChoice = choices[choices.length - 1]
		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
		const newChoice = `${newChoiceLetter}.`
		setChoices([...choices, newChoice])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		if (questionType === "single") {
			setCorrectAnswers([value]);
		} else {
			setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
		}
	};

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers: correctAnswers
					.map((answer) => {
						// Match the exact choice
						const choiceIndex = choices.indexOf(answer);
						return choiceIndex !== -1 ? choices[choiceIndex] : null;
					})
					.filter(Boolean), 
				subject,
			};
	
			await createQuestion(result);
	    toast.success("Question added successfully")
			setQuestionText("");
			setQuestionType("single");
			setChoices([""]);
			setCorrectAnswers([""]);
			setSubject("");
		} catch (error) {
			console.error(error);
		}
	};
	
	

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}
const handleBack=()=>{
	navigate(-1);
}
	return (
		<div class="max-w-4xl mx-auto px-4 mt-10">
			<div class="bg-white shadow-lg rounded-lg overflow-hidden">
				<div class="bg-blue-500 text-white p-4">
					<h5 class="text-xl font-semibold">Add New Questions</h5>
				</div>
				<div class="p-6 space-y-6">
					<form onSubmit={handleSubmit} class="space-y-4">


						<div>
							<label htmlFor="subject" class="block text-gray-700">Select a Subject</label>
							<select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} class="w-full p-2 border rounded-md">
								<option value="">Select subject</option>
								<option value="New">Add New</option>
								{subjectOptions.map(option => (
									<option key={option} value={option}>{option}</option>
								))}
							</select>
						</div>


						{subject === "New" && (
							<div>
								<label htmlFor="new-subject" class="block text-gray-700">Add New Subject</label>
								<input type="text" id="new-subject" value={newSubject} onChange={(event) => setNewSubject(event.target.value)} class="w-full p-2 border rounded-md" />
								<button type="button" onClick={handleAddSubject} class="mt-2 bg-green-500 text-white py-2 px-4 rounded-md">Add Subject</button>
							</div>
						)}


						<div>
							<label htmlFor="question-text" class="block text-gray-700">Question</label>
							<textarea class="w-full p-2 border rounded-md" rows={4} value={question} onChange={(e) => setQuestionText(e.target.value)}></textarea>
						</div>


						<div>
							<label htmlFor="question-type" class="block text-gray-700">Question type</label>
							<select id="question-type" value={questionType} onChange={(e) => setQuestionType(e.target.value)} class="w-full p-2 border rounded-md">
								<option value="single">Single Answer</option>
								<option value="multiple">Multiple Answer</option>
							</select>
						</div>


						<div>
							<label htmlFor="choices" class="block text-gray-700">Choices</label>
							{choices.map((choice, index) => (
								<div key={index} class="flex items-center space-x-2">
									<input type="text" value={choice} onChange={(e) => handleChoiceChange(index, e.target.value)} class="w-full p-2 border rounded-md" />
									<button type="button" onClick={() => handleRemoveChoice(index)} class="bg-red-500 text-white py-2 px-4 rounded-md">Remove</button>
								</div>
							))}
							<button type="button" onClick={handleAddChoice} class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">Add Choice</button>
						</div>


						{questionType === "single" && (
							<div>
								<label htmlFor="answer" class="block text-gray-700">Correct Answer</label>
								<input
									type="text"
									class="w-full p-2 border rounded-md"
									id="answer"
									value={AddQuestion.correctAnswers} 
									onChange={(e) => handleCorrectAnswerChange(0, e.target.value)} 
								/>
							</div>
						)}


						{questionType === "multiple" && (
							<div>
								<label htmlFor="answers" class="block text-gray-700">Correct Answers</label>
								{correctAnswers.map((answer, index) => (
									<div key={index} class="flex items-center space-x-2">
										<input type="text" value={answer} onChange={(e) => handleCorrectAnswerChange(index, e.target.value)} class="w-full p-2 border rounded-md" />
										<button type="button" onClick={() => handleRemoveCorrectAnswer(index)} class="bg-red-500 text-white py-2 px-4 rounded-md">Remove</button>
									</div>
								))}
								<button type="button" onClick={handleAddCorrectAnswer} class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md">Add Correct Answer</button>
							</div>
						)}


						<div class="text-center">
							<button type="submit" onClick={handleSubmit} class="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">Save Question</button>
						</div>
					</form>


					<div class="text-center">
						<button onClick={handleBack} class="text-blue-500 hover:text-blue-700">Back to existing questions</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddQuestion