import { updateClient } from "../api/clients";
import "./EditClientForm.css";
import { useState, useEffect } from "react";
import useFormFields from "../hooks/useFormFields";

function EditClientForm({ onClientUpdated, client }) {
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const initialValues = {
        name: "",
        email: "",
        phone_number: "",
        package: "",
        sessions_count: 0,
    };
    const { formValue, setFormValue, makeHandleChange } = useFormFields(initialValues);

    useEffect(() => {
        if (client) {
            setFormValue(client);
        }
    }, [client, setFormValue]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formValue.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (!formValue.email.trim()) {
            setError("Email is required.");
            return;
        }
        if (!formValue.phone_number.trim()) {
            setError("Number is required.");
            return;
        }
        if (!formValue.package.trim()) {
            setError("Package is required.");
            return;
        }
        if (formValue.sessions_count < 0) {
            setError("Sessions count must be 0 or more.");
            return;
        }
        if (!client?.id) {
            setError("Client ID is missing.");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            const payload = {
                ...formValue,
                sessions_count: Number(formValue.sessions_count),
            };

            const updatedClient = await updateClient(client.id, payload);
            onClientUpdated?.(updatedClient);
            setSuccess("Client updated successfully!");
        } catch (error) {
            setError("Failed to update client...");
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="create-client-form">
            <h3>Edit Client</h3>
            {success && <p className="success">{success}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="edit-email">Email:</label>
                <input
                    required
                    type="email"
                    placeholder="email"
                    id="edit-email"
                    value={formValue.email}
                    onChange={makeHandleChange("email")}
                />

                <label htmlFor="edit-name">name:</label>
                <input
                    required
                    type="text"
                    placeholder="name"
                    id="edit-name"
                    value={formValue.name}
                    onChange={makeHandleChange("name")}
                />

                <label htmlFor="edit-phone_number">Phone number:</label>
                <input
                    required
                    type="text"
                    id="edit-phone_number"
                    placeholder="phone_number"
                    value={formValue.phone_number}
                    onChange={makeHandleChange("phone_number")}
                />

                <label htmlFor="edit-package">Package:</label>
                <input
                    required
                    type="text"
                    id="edit-package"
                    placeholder="package"
                    value={formValue.package}
                    onChange={makeHandleChange("package")}
                />

                <label htmlFor="edit-sessions_count">sessions count:</label>
                <input
                    required
                    type="number"
                    min="0"
                    id="edit-sessions_count"
                    placeholder="sessions_count"
                    value={formValue.sessions_count}
                    onChange={makeHandleChange("sessions_count")}
                />

                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving changes..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}

export default EditClientForm;