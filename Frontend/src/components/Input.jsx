function Input({
  label,
  register, // optional
  name,
  required = false,
  type = "text",
  errors,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...(register ? register(name, { required }) : {})} // react-hook-form optional
        value={value}      // controlled input
        onChange={onChange} // controlled input
        className="border p-2 w-full rounded"
      />
      {errors && errors[name] && <p className="text-red-500 text-sm">{label} is required</p>}
    </div>
  );
}

export default Input;
