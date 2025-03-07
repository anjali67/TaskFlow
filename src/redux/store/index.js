const { configureStore } = require("@reduxjs/toolkit");
import authReducer from '../slice/registerSlice'
import loginReducer from '../slice/loginSlice'
import taskReducer from '../slice/taskSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        login:loginReducer,
        tasks:taskReducer
    }
})