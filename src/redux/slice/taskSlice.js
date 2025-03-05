import axios from "axios";
const { createAsyncThunk } = require("@reduxjs/toolkit");

//Create a new task
export const addTask = createAsyncThunk(
    'tasks/addTask',
     async (taskData , {getState , rejectWithValue}) => {
           try {
                const {auth} = getState()
                const response = await axios.post('/tasks', taskData , {
                    headers: {'x-auth-token' : auth.token}
                }) 
                return response.data
           } catch (error) {
            return  rejectWithValue(error?.response?.data || 'Failed to add Task')
           }
    }
)

//Get all tasks for the logged-in user
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTask',
    async ( _ , {getState,rejectWithValue}) => {
       try {
        const {auth} = getState()
        const response = await axios.get('/tasks' , {
            headers: {'x-auth-token' : auth.token}
        }) 
        return response.data
       } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch tasks')
       }
    }
)

//Get a specific task
export const fetchSpecificTask = createAsyncThunk(
    'tasks/specificTask',
    async (taskId, {getState,rejectWithValue}) => {
         try {
             const {auth} = getState()
             const response = await axios.get(`/tasks/${taskId}`, {
                headers:{'x-auth-token': auth.token}
             })
             return response.data
         } catch (error) {
            return rejectWithValue(error?.response?.data || 'Failed to fetch task')
         }
    }
)

//Update a task
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (taskData , {getState , rejectWithValue}) => {
        try {
             const {auth} = getState()
             const resposne = await axios.put(`/tasks/${taskData.id}`,taskData , {
                headers:{'x-auth-token': auth.token}
             })
             return resposne.data  
        } catch (error) {
            return  rejectWithValue(error?.response?.data || 'failed to update task')
        }
    }
)

//Delete task
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
     async (taskId, {getState,rejectWithValue}) => {
        try {
            const {auth} = getState()
            const resposne = await axios.delete(`/task/${taskId}`,{
            headers:{'x-auth-token':auth.token}
        })
         return resposne.data  
        } catch (error) {
            return rejectWithValue(error?.response?.data || 'failed to delete task')
        }
     }
)


