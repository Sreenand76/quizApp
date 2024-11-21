import axios from "axios"

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api/quizzes`
})
export const userDetailsApi = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/users`  
})


export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization : `Bearer ${token}`,
  }
}

export const createQuestion = async(quizQustion) =>{
  try {
    const response = await api.post("/create-new-question", quizQustion,{
      headers:getHeader()
  });
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/all-questions",{
      headers:getHeader()
  });
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`,{
      headers:getHeader()
  })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects",{
      headers:getHeader()
  })
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/question/${id}/update`, question,{
        headers:getHeader()
    });
  
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`,{
      headers:getHeader()
  });
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`,{
      headers:getHeader()
  });
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function registerUser(registration){
  try {
    const response = await api.post("auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login",login);  
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    return null;
  }
}

export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`users/profile/${userId}`,{
        headers:getHeader()
    });
     return response.data;
  } catch (error) {
      throw error;
  }
}

export async function getUser(userId,token){
  try{
    const response=await api.get(`users/${userId}`,{
      headers:getHeader()
    });
    return response.data;
  }catch(error){
      throw error;
  }
}

export async function submitQuiz(scoreDetails){
  try{
    const response=await api.post('/submit',scoreDetails,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}

export async function getUserDetail(email){
  try{
    const response=await userDetailsApi.get(`/${email}`,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function getUserPreviousAttemptsDetail(email){
  try{
    const response=await userDetailsApi.get(`/attempts/${email}`,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function getAllUser(){
  try{
    const response=await userDetailsApi.get("/all",{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function deleteUser(userId){
  try{
    const response=await userDetailsApi.delete(`/delete/${userId}`,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function updateUserRole(userId, roleName) {
  try {
    const token = "your-manually-added-token";  // You can replace this with an actual token

    const response = await userDetailsApi.put(`/${userId}/roles/${roleName}`, null, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcmVlbmFuZDkzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzMxODk2Njg3LCJleHAiOjE3MzE5MDAyODd9.8Fk45l6qxPdEH_nzkCm5ijdGNcw0a0X3OwE69nv8CNk`,  // Ensure the token is enclosed in backticks for the string
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}
