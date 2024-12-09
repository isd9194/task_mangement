import { createSlice } from "@reduxjs/toolkit";

const initialState ={Role : "" , token:""}

const reducers =  {
    AfterLogin : (state , actions)=>{
        
                 const { Role  ,token} = actions.payload;
                 state.Role = Role ;
                 state.toke = token ; 
                
    }

   
}

const slice_obj = createSlice({
    name:"A_login",
    initialState,
    reducers

});


export const { AfterLogin } = slice_obj.actions;
export default slice_obj.reducer ; 