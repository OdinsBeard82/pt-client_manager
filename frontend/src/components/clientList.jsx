import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../api/clients";
import ClientItem from "./clientItem";
import CreateClientForm from "./createClientForm";



function ClientList() {
    const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function handleClientCreated(newClient) {
      setClients((prevClients) => [newClient, ...prevClients]);
    }

    useEffect(() => {
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

    async function handleDeleteClient(clientId) {
        setError("")
    try {
    await deleteClient(clientId)
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
    } catch (error) {
        setError(error.message || "Failed to delete client")
    }
}
        
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } 
  return (
    <div>
      <CreateClientForm onClientCreated={handleClientCreated} />
      <h2>Clients</h2>
      {clients.length === 0 ? (
        <p>No clients yet</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <ClientItem onDelete = {handleDeleteClient} key={client.id} client = {client}></ClientItem>
          ))}
        </ul>
      )}
    </div>
  );
  
}
export default ClientList;
           
