import {useState} from 'react';
export default function Page() {
    const [submit, setSubmit] = useState(false); // State to track form submission

    const handlesubmit = () => {
        if (submit === true) return; // Prevent multiple submissions
        setSubmit(true); // Mark as submitted

        
        const form = document.getElementById('portfolioSubmissionForm') as HTMLFormElement; // Get the form element
        if (!form) return; // If form not found, exit

        const formData = new FormData(form); // Create FormData object from the form

        // Convert FormData to a regular object
        const data: {[key: string]: string | File} = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Convert to JSON
        const jsonData = JSON.stringify(data, null, 2);

        
        const downloadJson = formData.get('downloadJson'); // Check if user wants to download JSON
        if (downloadJson) { // If checkbox is checked, trigger download
            const blob = new Blob([jsonData], {type: 'application/json'}); // Create a Blob from JSON data
            const url = URL.createObjectURL(blob); // Create a URL for the Blob
            const a = document.createElement('a'); // Create a temporary anchor element
            a.href = url; // Set href to Blob URL
            a.download = 'portfolio_submission.json'; // Set the download attribute with a filename
            a.click(); // Programmatically click the anchor to trigger download
            URL.revokeObjectURL(url); // Clean up the URL object
        }

        // Here you can handle the form submission, e.g., send data to a server
        console.log('Form submitted:', data);
    }
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Submit Your Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your web development projects with the CSI community by submitting your portfolio.
            </p>
        </div>

            {/* Portfolio Submission Form */}
            <section>
                {/* Formspree integration for handling form submissions */}
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                
                <form id="portfolioSubmissionForm" className="space-y-6">

                {/* Full Name Field ✅*/}
                <div>
                    <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Full Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email Address Field✅ */}
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Email Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Optional Photo Upload ✅ */}
                <div>
                    <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Upload Photo (optional)
                    </label>
                    <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Bio Field ✅*/}
                <div>
                    <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Short Bio
                    </label>
                    <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Personal Statement ✅*/}
                <div>
                    <label
                    htmlFor="statement"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Personal Statement
                    </label>
                    <textarea
                    id="statement"
                    name="statement"
                    rows={6}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/*Major/Field of Study ✅ */}
                <div>
                    <label
                    htmlFor="major"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Major/Field of Study
                    </label>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Other">Other</option>
                    <input
                    type="text"
                    id="major"
                    name="major"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Graduation Year ✅*/}
                <div>
                    <label
                    htmlFor="graduationYear"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Graduation Year
                    </label>
                    <input
                    type="number"
                    id="graduationYear"
                    name="graduationYear"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Contact options ✅*/}
                <div>
                    <label
                    htmlFor="contactOptions"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Preferred Contact Options
                    </label>
                    <input
                    type="text"
                    id="contactOptions"
                    name="contactOptions"
                    placeholder="e.g., Email, LinkedIn, Phone"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* skills selction ✅*/}
                <div>
                    <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Key Skills
                    </label>
                    <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="JSX">JSX</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Redux">Redux</option>
                        <option value="React Router">React Router</option>
                        <option value="Next.js">Next.js</option>
                        <option value="Vite">Vite</option>
                        <option value="Webpack">Webpack</option>
                        <option value="Babel">Babel</option>
                        <option value="Node.js">Node.js</option>
                        <option value="NPM">NPM</option>
                        <option value="Yarn">Yarn</option>
                        <option value="REST APIs">REST APIs</option>
                        <option value="GraphQL">GraphQL</option>
                        <option value="Tailwind CSS">Tailwind CSS</option>
                        <option value="Sass">Sass</option>
                        <option value="Styled Components">Styled Components</option>
                        <option value="Material UI">Material UI</option>
                        <option value="Bootstrap">Bootstrap</option>
                        <option value="Jest">Jest</option>
                        <option value="React Testing Library">React Testing Library</option>
                        <option value="Cypress">Cypress</option>
                        <option value="Git">Git</option>
                        <option value="GitHub">GitHub</option>
                        <option value="Figma">Figma</option>
                    <input
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="e.g., JavaScript, React, Node.js"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Career Goals ✅*/}
                <div>
                    <label
                    htmlFor="careerGoals"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Career Goals
                    </label>
                    <textarea
                    id="careerGoals"
                    name="careerGoals"
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Semesters History, will return id, title, description and technologies ✅*/}
                <div>
                    <label
                    htmlFor="semesters"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Semesters History
                    </label>
                    <input
                    type="text"
                    id="semesters"
                    name="semesters"
                    placeholder="e.g., Fall 2022, Spring 2023"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button ✅*/}
                <div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    Submit Portfolio
                    </button>
                </div>

                {/* Download JSON as pressing Submit ✅*/}
                <div>
                    <label
                    htmlFor="downloadJson"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    Download Submission as JSON
                    </label>
                    <input
                    type="checkbox"
                    id="downloadJson"
                    name="downloadJson"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                </div>

                </form>

                
            </div>
            </section>
            
        </div>
        

    );
}