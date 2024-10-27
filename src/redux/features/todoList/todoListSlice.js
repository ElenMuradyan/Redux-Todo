import { createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        value: [], 
    },
    reducers: {
        addToDo: (state, action) => {
            state.push({
                name: action.payload,
                done:false
            });
        },
        deleteToDo: (state, action) => {
            state.splice(action.payload,action.payload+1);
        }
        
    }
})