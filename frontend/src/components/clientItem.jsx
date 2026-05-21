function ClientItem({ client }) {
return (
    <div>
        <h3>{client.name}</h3>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone_number}</p>
        <p>Package: {client.package}</p>
        <p>Sessions: {client.sessions_count}</p>
    </div>
   );
 }

 export default ClientItem;