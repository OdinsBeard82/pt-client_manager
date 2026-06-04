import { updateClient } from "../api/clients";
import "./EditClientForm.css";
import { useState, useEffect } from "react";
import  useFormFields from "../hooks/useFormFields";

function EditClientForm({onClientUpdated, client}) {


    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const initialValues = { name: "", email: "", phone_number: "", package: "", sessions_count: 0 };
    const { formValue, setFormValue, makeHandleChange } = useFormFields(initialValues);
    
    
    useEffect(() => {
        if (client) {
            setFormValue(client);
        }
    }, [client]);

}