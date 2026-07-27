import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* Redirect Root */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Public Routes */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Routes */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <Upload />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />

            {/* Invalid Routes */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

}

export default App;