import {motion as m} from "framer-motion";
// Checkbox component to render a list of checkboxes
import {useState} from "react"
type CheckboxProps = {
    name: string;
    label: string;
    mapValue: string[];
    divWrapperClass?: string;
    description?: boolean;
    required?: boolean;
  };
  // Checkbox component to render a list of checkboxes
  export function Checkbox({
    name,
    label,
    mapValue,
    divWrapperClass = "",
    required = false,
  }: CheckboxProps) {
    const [check, setCheck] = useState(false);
    
    const handleChange = () => {

      const selectedItems = mapValue.filter((skill) => document.getElementById(skill) instanceof HTMLInputElement 
      && (document.getElementById(skill) as HTMLInputElement).checked); // Get selected checkboxes
      
      if (selectedItems.length > 0)
      setCheck(true);
      else 
      setCheck(false);
      // Event handler for checkbox change
    }
    
    
return (
  
      <div className={divWrapperClass}>
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 mb-1 border-black"
        >
          <h1 className="text-2xl font-md font-semibold">{label}</h1>
        </label>
        <div
          className={`flex border-black flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] p-2 rounded-2xl font-bold w-[90%]  mx-auto`}
        >
          {mapValue.map((skill: string, index: number) => (
            <div key={index} className="flex flex-wrap mx-auto mb-1">
              <input

                type="checkbox"
                id={skill}
                name={name}
                value={skill}
                className='mr-1 w-4'
                required={required && !check} // check 
                onChange={handleChange}
              />
              <m.label
              initial={{ color: "#000000ff" }}
              whileHover={{ color: ["#ff0000ff", "rgba(255,165,0,1)", "rgba(255,255,0,1)", "rgba(0,128,0,1)", "rgba(0,0,255,1)", "rgba(75,0,130,1)", "rgba(238,130,238,1)"] }}
              transition={{repeat: Infinity, repeatType: "mirror"}}
                htmlFor={skill}
                className="font-medium text-sm md:text-md lg:text-lg "
              >
                {skill}
              </m.label>
            </div>
          ))}

          {/* "Other" text input field */}

          <input
            type="text"
            id={`${name}-other`}
            name={`${name}-other`}
            placeholder={`Other ${label}`}
            className={`border-gray-400 text-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px] text-sm md:text-md lg:text-lg`}
          />
        </div>

        
      </div>
    );
  }