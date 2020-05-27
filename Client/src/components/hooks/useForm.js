import { useState } from "react";

export const useForm = (callback, initialValue) => {
  const [values, setValues] = useState(initialValue);
  // set data object

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    name === "imageUri"
      ? setValues({
          ...values,
          [name]: files[0],
        })
      : setValues({
          ...values,
          [name]: value,
        });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return { handleChange, handleSubmit, values };
};

export default useForm;
