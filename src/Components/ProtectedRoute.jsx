import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import Spinner from './Spinner'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { authLoading, user } = useContext(AuthContext);

    if (authLoading) return <Spinner message="Checking authentication..." />;

    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
}
