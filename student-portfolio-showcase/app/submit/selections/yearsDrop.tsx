  //Resuable year selection dropdown component
  type YearDropdownProps = {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    className?: string;
  };
  // YearDropdown component to select graduation year
    export function YearDropdown({id, name, label, required = true, className = ""}: YearDropdownProps) {
        const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i); // Generate an array of the next 10 years

        return (
            <div className="mb-3">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 align-center mb-1">
                    <h1 className="text-2xl font-md font-semibold">{label}</h1>
                </label>

                <select
                    id={id}
                    name={name}
                    required={required}
                    className={className + " text-sm md:text-md lg:text-lg"}
                    defaultValue=""
                >
                    <option value=""> Select your graduation year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        );
    }