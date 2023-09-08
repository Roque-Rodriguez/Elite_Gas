import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "is_cs") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    }
    else if (e.target.name === "is_sales") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    }
    else if (e.target.name === "is_customer") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
