import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const token = sessionStorage.getItem('token')
    if(token){
        return children
    }else{
        alert('You are logged out! Login in again.')
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute