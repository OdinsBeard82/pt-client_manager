import { createClient } from "../api/clients";
import "./CreateClientForm.css";
import { useState, useEffect } from "react";

function CreateClientForm({onClientCreated}) {

    const [formValue, setFormValue] = useState({ name: "", email: "", phone_number: "", package: "", sessions_count: 0 })
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 3000);
            return () => clearTimeout(timer);
      }
    }, [success]);
    
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
            setSuccess("Client created successfully!");
        } catch (error) {
            setError("Failed to create client...");
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
    return(
    <div className="create-client-form">
      <h3>Add New Client</h3>
      {success && <p className="success">{success}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}> 
        
          <label htmlFor="email">Email:</label>
          <input required type="email"placeholder="email"id="email" value={formValue.email} onChange={makeHandleChange('email')}/>

          <label htmlFor="name">name:</label>
          <input required type="text" placeholder="name" id="name" value={formValue.name} onChange={makeHandleChange('name')}/>

          <label htmlFor="phone_number">Phone number:</label>
          <input required type="text" id="phone_number" placeholder="phone_number" value={formValue.phone_number} onChange={makeHandleChange('phone_number')}/>

          <label htmlFor="package">Package:</label>
          <input required type="text" id="package" placeholder="package" value={formValue.package} onChange={makeHandleChange('package')}/>

          <label htmlFor="sessions_count">sessions count:</label>
          <input required type="number" min="0" id="sessions_count" placeholder="sessions_count" value={formValue.sessions_count} onChange={makeHandleChange('sessions_count')}/>
          
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
        </form>
    </div>

    

    )

}

export default CreateClientForm;