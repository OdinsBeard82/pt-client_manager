import { useState } from "react";

function useFormFields(initialValues) {
  const [formValue, setFormValue] = useState(initialValues);

  function makeHandleChange(field) {
    return function (event) {
      const value = event.target.value;
      setFormValue((prev) => ({ ...prev, [field]: value }));
    };
  }

  return { formValue, setFormValue, makeHandleChange };
}

export default useFormFields;