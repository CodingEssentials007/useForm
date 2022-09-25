
import './App.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup"

function App() {

  const schema=yup.object().shape({
    fullName:yup.string().required("Full name cannot be blank"),
    email:yup.string().email().required(),
    age:yup.number().positive().integer().required(),
    pass: yup.string().min(4).max(10).required(),
    cPass: yup.string().oneOf([yup.ref('pass'),null],"password is not same")
  })

  const {register,handleSubmit,formState:{errors} }=useForm({
    resolver:yupResolver(schema)
  });
 
  const myFun=(data)=>
  {
    console.log(data)
  }

  return (
    <div className="App">
      <form   onSubmit={handleSubmit(myFun)}
          style={{display:"flex", flexDirection:'column', maxWidth:'40vw', margin:"0 auto"}}>

        <input type="text" placeholder="Full Name..."     {...register("fullName")} />   
          {errors.fullName?.message && <p style={{color:'red',fontSize:'8px'}}> {errors.fullName.message} </p> }      
        <input type="text" placeholder="Email..."    {...register("email")} />
        {errors.email?.message && <p style={{color:'red',fontSize:'8px'}}> {errors.email.message} </p> }
        <input type="number" placeholder="Age..."    {...register("age")}/>
        {errors.age?.message && <p style={{color:'red',fontSize:'8px'}}> {errors.age.message} </p> }
        <input  type="password" placeholder="Password..."   {...register("pass")}/>
        {errors.pass?.message && <p style={{color:'red',fontSize:'8px'}}> {errors.pass.message} </p> }
        <input  type="password" placeholder="Confirm Password..."   {...register("cPass")} />
        {errors.cPass?.message && <p style={{color:'red',fontSize:'8px'}}> {errors.cPass.message} </p> }
        <input type="submit" />

      </form>
    </div>
  );
}

export default App;
