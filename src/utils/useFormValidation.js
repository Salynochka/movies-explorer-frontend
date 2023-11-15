import { useCallback, useState } from 'react';
const validator = require('validator');

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

export const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (evt) => {
    const { name, value, validationMessage } = evt.target;

    if (name === 'email') {
      if(!validator.isEmail(value)) {
        setErrors({ ...errors, [name]: 'Email несоответствует шаблону электронной почты: name@domain.zone'})
      } else {
        setErrors({ ...errors, [name]: validationMessage })
      }
    } else {
      setErrors({...errors, [name]: validationMessage });
    }
    setValues((values) => ({ ...values, [name]: value })); // доб.в объект данные
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const resetValidation = useCallback(
    (values = {}, errors = {}, isValidForm = false) => {
      setValues(values);
      setErrors(errors);
      setIsValid(isValidForm);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    errors,
    onChange,
    isValid,
    setIsValid,
    resetValidation,
  };
};