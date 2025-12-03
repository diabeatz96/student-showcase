  //Resuable Semester selection dropdown component
  type SemesterDropdownProps = {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    divClassWrapper?: string;
    className?: string;
  };
    // SemesterDropdown component to select semester
    export function SemesterDropdown({id, name, label, required = true, divClassWrapper = "", className = ""}: SemesterDropdownProps) {
        const semesters = ["Spring", "Summer", "Fall", "Winter"]; // List of semesters
        //collect the past 10 years for selection
        const currentYear = new Date().getFullYear();
        const years = Array.from({length: 10}, (_, i) => currentYear - i); // Generate an array of the past 10 years
        // Combine semesters and years for options
        const semesterYearOptions = [];
        for (const year of years) {
            for (const semester of semesters) {
                semesterYearOptions.push(`${semester} ${year}`);
            }
        }
        return (
            <div className={`mb-3 ${divClassWrapper}`}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 align-center mb-1">
                    <h1 className="text-2xl font-md font-semibold">{label}</h1>
                </label>
                <select
                    id={id}
                    name={name}
                    required={required}
                    className={className + " text-sm md:text-md lg:text-lg"}
                >
                    <option value="" disabled selected>Select semester</option>
                    {semesterYearOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }