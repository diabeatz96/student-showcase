
// Reusable TextField Component
  type TextFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    rows?: number;
    textarea?: boolean;
    checkbox?: boolean;
    borderColor?: string;
    divWrapperClass?: string;
    border?: string;
  };

  // Reusable TextField Component
  export function TextField({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    required = false,
    className = "",
    rows = 4,
    textarea = false,
    divWrapperClass = "",
  }: TextFieldProps) {
    //contact methods

    return (
      <div className={divWrapperClass}>
        <div className={`mb-3`}>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 align-center mb-1"
          >
            <h1 className="text-2xl font-md font-semibold">{label}</h1>
          </label>
          {textarea ? (
            <textarea
              id={id}
              name={name}
              rows={rows}
              placeholder={placeholder}
              required={required}
              className={className + " text-sm md:text-md lg:text-lg"}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              className={className + " text-xs md:text-md lg:text-lg "}
            />
          )}
        </div>
      </div>
    );
  }