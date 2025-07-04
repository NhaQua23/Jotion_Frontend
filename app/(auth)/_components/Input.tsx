interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  labelText: string,
  labelFor: string,
  id: string,
  name: string,
  type: string,
  isRequired: boolean,
  placeholder: string,
  customClass: string,
}

const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired=false,
  placeholder,
  customClass
} : InputProps) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={String(id)}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
    </div>
  );
}