import { createClient } from "../api/clients";

function CreateClientForm({onClientCreated}) {
    async function handleSubmit(event) {
  event.preventDefault();
  try {
    const newClient = await createClient(formValue);
    onClientCreated?.(newClient);
  } catch (error) {
    console.error(error);
  }
}
    return(
    <div>
        <h3>{client.name}</h3>
        <p>error</p>
        <form onSubmit={handleSubmit}>
        createClient()
          <input type="email"placeholder="email" value={formValue.email} onChange={makehandleChange('email')}/>
          <input type="text" placeholder="name" value={formValue.name} onChange={makeHandleChange('name')}/>
          <input type="text" placeholder="phone_number" value={formValue.phone_number} onChange={makeHandleChange('phone_number')}/>
          <input type="text" placeholder="package" value={formValue.package} onChange={makeHandleChange('package')}/>
          <input type="number" placeholder="sessions_count" value={formValue.sessions_count} onChange={makeHandleChange('sessions_count')}/>
          <button>Submit</button>
        </form>

        
    </div>

    )

}