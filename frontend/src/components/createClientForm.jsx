import { createClient } from "../api/clients";
import { useState } from "react"

function CreateClientForm({onClientCreated}) {

    const [formValue, setFormValue] = useState({ name: "", email: "", phone_number: "", package: "", sessions_count: 0 })
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    
function makeHandleChange(field) {
  return function (event) {
    const value = event.target.value;

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [field]: value,
    }));
  };
}

    async function handleSubmit(event) {
        event.preventDefault();
        if (!formValue.name.trim()) {
            setError('Name is required.');
            return 
        }
        if (!formValue.email.trim()) {
            setError('Email is required.');
            return
        }
        if (!formValue.phone_number.trim()) {
            setError('Number is required.');
            return
        }
        if (!formValue.package.trim()) {
            setError('Package is required.');
            return
        }
        if (formValue.sessions_count < 0) {
            setError('Sessions count must be 0 or more.')
            return
        } 

        setError('');

        setSubmitting(true);

  try {
    const payload = {
      ...formValue,
      sessions_count: Number(formValue.sessions_count),
    };

    const newClient = await createClient(payload);
    onClientCreated?.(newClient);
    setFormValue({ name: "", email: "", phone_number: "", package: "", sessions_count: 0 });
    setSubmitting(false);
  } catch (error) {
    setError("Failed to create client...")

    setSubmitting(false);
    
  } finally {
    setSubmitting(false);
}
}
    return(
    <div>
        <h3>Add New Client</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email"placeholder="email" value={formValue.email} onChange={makeHandleChange('email')}/>
          <input type="text" placeholder="name" value={formValue.name} onChange={makeHandleChange('name')}/>
          <input type="text" placeholder="phone_number" value={formValue.phone_number} onChange={makeHandleChange('phone_number')}/>
          <input type="text" placeholder="package" value={formValue.package} onChange={makeHandleChange('package')}/>
          <input type="number" placeholder="sessions_count" value={formValue.sessions_count} onChange={makeHandleChange('sessions_count')}/>
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
        </form>
    </div>

    

    )

}

export default CreateClientForm;