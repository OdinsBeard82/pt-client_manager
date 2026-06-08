import { useEffect, useState } from "react";
import EditClientForm from "./EditClientForm";

function ClientItem({ client, onDelete, onClientUpdated }) {
    const [isEditing, setIsEditing] = useState(false);

    function editClientForm() {
        setIsEditing(true)
    }

    function confirm1() {
        if (window.confirm(`Delete ${client.name}?`)) {
            onDelete(client.id);
        }
    }
    
return (
    isEditing ? <EditClientForm 
        client={client} 
        onClientUpdated={(updatedClient) => {
            onClientUpdated(updatedClient);
            setIsEditing(false);
        }} 
    /> : 
    <div>
        <button onClick={editClientForm}>Edit button</button>
        <button onClick={confirm1}>Delete client</button>
        <h3>{client.name}</h3>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone_number}</p>
        <p>Package: {client.package}</p>
        <p>Sessions: {client.sessions_count}</p>
    </div>
   );
 }

 export default ClientItem;