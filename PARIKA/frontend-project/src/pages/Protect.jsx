import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/check-auth")
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                navigate('/');
            });
    }, [navigate]);

    if (loading) {
        return <h2 className="min-h-screen flex items-center justify-center">Loading...</h2>;
    }

    return children;
}

export default Protect;
