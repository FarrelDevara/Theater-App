import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../constant";

export const ticketSlice = createSlice({
    name : "tickets",
    initialState : {
        tickets : []
    },
    reducers:{
        fetchSuccess: (state,action) =>{
            state.tickets = action.payload
        }   
    }
})

export const {
    fetchSuccess
} = ticketSlice.actions


export function fetchTicket(){
    return async (dispatch) => {
        try {
            const {data} = await axios({
                method : "get",
                url : `${BASE_URL}/my-ticket`,
                headers:{
                    Authorization : "Bearer " + localStorage.access_token
                }
            })
    
            dispatch(fetchSuccess(data))
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    }
    
}

export function fetchTicketById(ticketId){
    return async(dispatch) => {
    try {
        const {data} = await axios({
            method:"get",
            url : `${BASE_URL}/ticket/` + ticketId,
            headers:{
                Authorization : "Bearer " + localStorage.access_token
            }
        })

        dispatch(fetchSuccess(data))
    } catch (error) {
        console.log(error);

        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        
    }
}
}

export default ticketSlice.reducer