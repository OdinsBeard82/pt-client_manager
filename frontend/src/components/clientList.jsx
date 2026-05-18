import React, { useEffect, useState } from "react";
import { getClients } from "../api/clients";



function ClientList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        
        
        async function clientData() {
        try {
        const data = await getClients();
        setClients(data)
        } catch (error) {
            setError(error.message || "Failed to fetch clients");
            
            
        } finally {
            setLoading(false)
        }
        
        }

          clientData()

  }, []);
}

