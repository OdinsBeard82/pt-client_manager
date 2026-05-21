import React, { useEffect, useState } from "react";
import { getClients } from "../api/clients";
import ClientItem from "./clientItem";



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

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } 
  return (
    <div>
      <h2>Clients</h2>
      {clients.length === 0 ? (
        <p>No clients yet</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <ClientItem key={client.id} client = {client}></ClientItem>
          ))}
        </ul>
      )}
    </div>
  );
        
}
export default ClientList;
           


