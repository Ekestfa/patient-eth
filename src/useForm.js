import {useState} from 'react';


const useForm = (callback,initialState) => {
  const [values, setValues] = useState(initialState);

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
    console.log(values.fname)
    callback();
  };

  return {
    handleSubmit,
    handleChange,
    values
  };
}
export default useForm;
