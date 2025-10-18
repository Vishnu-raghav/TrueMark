function Input({ label, register, name, required, type = "text", errors, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="border p-2 w-full rounded"
      />
      {errors[name] && <p className="text-red-500 text-sm">{label} is required</p>}
    </div>
  );
}

export default Input;




// import { useForm } from "react-hook-form";
// import Input from "./Input";

// function MyForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Input
//         label="Name"
//         name="name"
//         register={register}
//         required={true}
//         errors={errors}
//         placeholder="Enter your name"
//       />
//       <Input
//         label="Email"
//         name="email"
//         register={register}
//         required={true}
//         errors={errors}
//         placeholder="Enter your email"
//         type="email"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// }
