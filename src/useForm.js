import {useState, useEffect} from 'react';


const useForm = (callback,initialState,validate) => {
  const [values, setValues] = useState(initialState);
  // new state for errors
  // function that validates these errors
  // pass these errors back to form
  const [errors, setErrors] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = event => {
    const {name, value} = event.target;
    setValues(
    {...values,
     [name] : value
    });
    console.log(name+':'+value)
  }
  
  
  const handleSubmit = event => {
    event.preventDefault();
    //handling errors
    setErrors(validate(values))
    setIsSubmitting(true)
  };

  useEffect(() => {
    // callback function will happen whenever smt. in our changes
    // check the see if there are no errors
    // call our callback
    if(Object.keys(errors).length === 0 && isSubmitting){
      callback();
    }
  },
  [ // observer: you can only change when X changes
    errors
  ])

  return {
    handleSubmit,
    handleChange,
    values,
    errors
  };
}
export default useForm;
