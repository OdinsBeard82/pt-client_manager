function ClientItem({ client, onDelete }) {
return (
    <div>
        <button onClick={() => { onDelete(client.id) }}>Delete client</button>
        <h3>{client.name}</h3>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone_number}</p>
        <p>Package: {client.package}</p>
        <p>Sessions: {client.sessions_count}</p>
    </div>
   );
 }

 export default ClientItem;