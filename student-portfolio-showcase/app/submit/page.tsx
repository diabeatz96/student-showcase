"use client"; // Enable client-side rendering
import { useState } from "react";
import React from "react";
import { FormSection } from "./selections/formSection"; // Import the reusable FormSection component
import { TextField } from "./selections/textField"; // Import the reusable TextField component
import { Checkbox } from "./selections/checkbox"; // Import the reusable Checkbox component
import { YearDropdown } from "./selections/yearsDrop"; // Import the reusable YearDropdown component
import { SemesterDropdown } from "./selections/semesterDrop"; // Import the reusable SemesterDropdown component
import { CheckBoxExplained } from "./selections/checkBoxExplained"; // Import the reusable CheckBoxExplained component
import { motion as m, AnimatePresence } from "framer-motion";
import { ThreeDText } from "./customizer-section/threeD-Text-h1";
import { ScrollIntoView } from "./customizer-section/scroll-Into-View";
//import { LiveDownload } from "./liveDownload"; <--- Would need help fixing this component


export default function Page() {
  const [submit, setSubmit] = useState(false); // State to track form submission
  const [addProject, setAddProject] = useState(1); // State to track number of projects added
  const [getStarted, setGetStarted] = useState(false); // State to track if user has started filling the form
  // List of key skills for checkbox options
  const keySkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "JSX",
    "TypeScript",
    "Redux",
    "React Router",
    "Next.js",
    "Vite",
    "Webpack",
    "Babel",
    "Node.js",
    "NPM",
    "Yarn",
    "REST APIs",
    "GraphQL",
    "Tailwind CSS",
    "Sass",
    "Styled Components",
    "Material UI",
    "Bootstrap",
    "Jest",
    "React Testing Library",
    "Cypress",
    "Git",
    "GitHub",
    "Figma",
  ];
  const majorOptions = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
  ];

  //filter abc order
  keySkills.sort(); // Sort keySkills in alphabetical order
  majorOptions.sort(); // Sort majorOptions in alphabetical order

  const basicInfo = `py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[80%] md:w-[60%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]`;
  const projectInfo =
    "py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[90%] md:w-[50%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]";
  //Handle Another project addition
  const handleAddProject = () => {
    //validation for new entry
    const index = addProject;

    //validation fields
    const requiredIds = [
      'fullName',
      `projectName-${index}`, // Updated to use dynamic index
      `projectDescription-${index}`,
      `technologiesUsed-${index}`,
      `demoUrl-${index}`,
      `repositoryUrl-${index}`,
      `semester-${index}`,
      `startDate-${index}`,
      `endDate-${index}`,
      `screenshotUrl-${index}`,
    ];

    // Check if all required fields are filled
    for (const id of requiredIds) {
      const element = document.getElementById(id) as
        | HTMLInputElement // for text and url inputs
        | HTMLTextAreaElement // for textarea inputs
        | HTMLSelectElement; // for select dropdowns

      if (!element) continue; // Skip if element not found

      // Additional validation for URL fields
      if (!element?.value.trim()) {
        // Check if the element is valid
        alert(`Please complete "${id}" field before adding another project.`);
        element.focus(); // Focus on the empty field
        return; // Exit the function if validation fails
      }
    }
    // If validation passes, increment the project count
    setAddProject((prev) => prev + 1);
  };

  // Handle what information saves and downloads as JSON file
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // STOP FORM FROM REFRESHING

    // PREVENT DOUBLE SUBMISSIONS (user spamming the button)
    if (submit) return;
    setSubmit(true); // Mark as submitted

    const form = event.currentTarget;
    const formData = new FormData(form);

    // ---------------------------------------------
    // HELPER: GET SINGLE STRING FIELD
    // - Safely reads from FormData
    // - Returns "" if the field is missing or empty
    // ---------------------------------------------
    const getString = (name: string): string =>
      (formData.get(name)?.toString().trim()) || "";

    // ---------------------------------------------
    // HELPER: GET ARRAY FROM MULTI-VALUE FIELD
    // - Used for checkbox groups like "skills" or "technologiesUsed-1"
    // - Uses getAll so every checked value is included
    // ---------------------------------------------
    const getCsvArray = (name: string): string[] =>
      formData
        .getAll(name)
        .map((v) => v.toString().trim())
        .filter(Boolean);

    // ---------------------------------------------
    // HELPER: SLUGIFY
    // - Turns a string like "Card Simulation Game!"
    //   into "card-simulation-game"
    // - Used for stable IDs
    // ---------------------------------------------
    const slugify = (value: string): string =>
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/(^-|-$)+/g, ""); // Remove leading and trailing hyphens

    // ---------------------------------------------
    // HELPER: DATE -> ISO STRING
    // - Takes "YYYY-MM-DD" and returns "YYYY-MM-DDT00:00:00Z"
    // - Matches the format used in the Alan example JSON
    // ---------------------------------------------
    const toIsoDate = (d: string): string => (d ? `${d}T00:00:00Z` : "");

    // ============================================================
    // 1) BUILD TOP-LEVEL STUDENT FIELDS
    // ============================================================

    // FULL NAME -> firstName + lastName
    const fullName = getString("fullName");
    const [firstNameRaw, ...restName] = fullName.split(" ");
    const firstName = firstNameRaw || "";
    const lastName = restName.join(" ");

    // GENERATE ID (e.g., "justin-burks")
    const generatedId = slugify(fullName || "student");
    

    // ============================================================
    // 2) BUILD SEMESTERS + PROJECTS (FOR *ALL* PROJECT SLOTS)
    // ============================================================

    // Types for clarity (not required, but nice for TS/hover info)
    type Project = {
      id: string;
      title: string;
      description: string;
      technologies: string[];
      featured: boolean;
      demoUrl: string;
      repoUrl: string;
      screenshot: string;
      semester: string;
      completedDate: string;
      canEmbed: boolean;
    };

    type Semester = {
      name: string;
      startDate: string;
      endDate: string;
      projects: Project[];
    };

    // We use a map so multiple projects in the SAME semester get grouped together
    const semesterMap: Record<string, Semester> = {};

    // LOOP THROUGH EACH PROJECT INDEX FROM 1..addProject
    for (let i = 1; i <= addProject; i++) {
      const semesterName = getString(`semester-${i}`);
      const startDateRaw = getString(`startDate-${i}`);
      const endDateRaw = getString(`endDate-${i}`);
      const projectTitle = getString(`projectName-${i}`);

      // Build a stable project ID from the title
      const projectId = slugify(projectTitle);

      // shape the project object
      const project: Project = {
        id: projectId,
        title: projectTitle,
        description: getString(`projectDescription-${i}`),
        technologies: getCsvArray(`technologiesUsed-${i}`), // all checked tech values
        featured: false,
        demoUrl: getString(`demoUrl-${i}`),
        repoUrl: getString(`repositoryUrl-${i}`),
        screenshot: getString(`screenshotUrl-${i}`),
        semester: semesterName,
        completedDate: toIsoDate(endDateRaw), // we use end date as "completed" date
        canEmbed: false, 
      };

      // If this semester isn't in the map yet, initialize it
      if (!semesterMap[semesterName]) {
        semesterMap[semesterName] = {
          name: semesterName,
          startDate: toIsoDate(startDateRaw),
          endDate: toIsoDate(endDateRaw),
          projects: [],
        };
      }

      // Add this project to the semester’s project list
      semesterMap[semesterName].projects.push(project);
    }

    // Convert semesterMap -> array for final JSON
    const semesters: Semester[] = Object.values(semesterMap);

    // ============================================================
    // 3) BUILD FINAL PORTFOLIO OBJECT
    // ============================================================
    const portfolio = {
      // e.g., "justin-burks"
      id: generatedId,

      // Split out of fullName
      firstName,
      lastName,

      // Top-level contact fields
      email: getString("email"),
      photo: getString("headshotUrl"),

      // About the student
      bio: getString("bio"),
      personalStatement: getString("personalStatement"),
      major: getString("major"),
      graduationYear: Number(getString("graduationYear") || 0),

      // Nested contact object (like in Alan’s JSON)
      contact: {
        contactMethods: getCsvArray("contactMethods"),
      },

      // Skills array (comes from checkbox group named "skills")
      skills: getCsvArray("skills"),

      // Career goals text
      careerGoals: getString("careerGoals"),

      // Semesters array we built above, each with its own projects array
      semesters,
    };

    // ============================================================
    // 4) STRINGIFY + TRIGGER DOWNLOAD (IF REQUESTED)
    // ============================================================

    // See exactly what sending / downloading in the console
    console.log("PORTFOLIO OBJECT:", portfolio);

    const jsonData = JSON.stringify(portfolio, null, 2);
    console.log("JSON STRING:", jsonData);

    // Hidden input <input type="hidden" name="downloadJson" value="true" />
    const wantsDownload = !!formData.get("downloadJson");

    if (wantsDownload) {
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      // File name will be something like "justin-burks.json"
      a.download = `${portfolio.id || "portfolio_submission"}.json`;
      a.click();

      URL.revokeObjectURL(url); // Clean up blob URL
    }
  };





  // Contact methods options
  const contactMethods = [
    "Email",
    "Phone Number",
    "LinkedIn",
    "GitHub",
    "Portfolio Website",
    "Discord",
    "X / Twitter",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="h-full container relative mx-auto bg-transparent pt-10 px-2">
        <AnimatePresence mode="wait">
          {!getStarted && (
            <m.div
              key="portfolio-circle"
              className=" 
                relative
                grid grid-rows-3 justify-center  max-w-[min(100vw,700px)]
                p-2
                aspect-square
                overflow-hidden
                gpu-acceleration text-center mb-4 border-transparent rounded-full bg-white shadow-xl mx-auto "
              initial={{
                opacity: 0.7,
                translateY: 0,
                borderColor: "Transparent",
              }}
              animate={{
                opacity: 1,
                translateY: [-20, 0, -15, 0, -10, 0, -5, 0],
                borderColor: ["Transparent", "Black", "Transparent"],
              }}
              transition={{
                duration: .5,
                repeatType: "mirror",
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateY: [0, 270, 360, 180, 270, 360],
                transition: { duration: 1, ease: "easeInOut" },
              }}
              style={{
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "transparent",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Animated circles */}
              <m.div
                className="flex absolute text-[clamp(1.3rem,2.8vw,3rem)] 
          mx-auto
          inset-0
          md:w-[clamp(20%,20%,90%)] w-[clamp(20%,20%,90%)]
          pointer-events-none
          justify-center
          brightness-125
          "
                initial={{ opacity: 1,x:0 }}
                animate={{
                  
                  rotate: 360,
                  
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
                
              >
                🟠
              </m.div>
              <m.div
                className="flex absolute text-[clamp(1.3rem,2.8vw,3rem)]
          mx-auto
          inset-0
          md:w-[clamp(20%,20%,100%)] w-[clamp(20%,20%,100%)]
          pointer-events-none
          justify-center
          brightness-125"
                initial={{ opacity: 1,x:0, y:50 }}
                animate={{
                  
                  rotate: -360,
                  y: [50, 0, -100, 0, 30, 50],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              >
                🔵
              </m.div>
              <div className="flex flex-col justify-end w-[90%] mx-auto">
              {/* 3D Text Component for the heading */}
              <ThreeDText
                text="Share Your Portfolio"
                textSize="text-[clamp(2.1rem,3.7vw,4rem)] sm:text-[clamp(3.2rem,3.9vw,4rem)] md:text-[clamp(3rem,3.2vw,3.3rem)] font-semibold text-black justify-self-center align-end"
              />
              </div>
              {/* Subtitle*/}
              <div 
              className="flex flex-col justify-center align-middle
              bg-black
              w-[110%]
              -mx-[5%]
              [clip-path:ellipse(80%_40%_at_50%_50%)]
              p-[4px]
              
              ">
                <div
    className="
      bg-orange-500 
      w-full h-full
      flex flex-col justify-center items-center
      [clip-path:ellipse(80%_40%_at_50%_50%)]
    "
  >
                
              <p className="text-[clamp(1.0rem,2.2vw,1.5rem)] text-black font-semibold max-w-2xl mx-auto
              align-bottom
              justify-center
              
              ">
                Share your web development projects with the CSI community by
                submitting your portfolio!
              </p>
              </div>
              </div>
              {/* Get Started Button */}
              <div className="relative flex flex-col justify-center ">
              <button
                onClick={() => setGetStarted(true)}
                className="
                py-2 px-2
                w-[50%]
                mx-auto
                bg-blue-600 text-black font-bold rounded-3xl
                z-10
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black 
                hover:scale-110 transition-transform duration-300
                text-[clamp(1.2rem,2.5vw,1.8rem)]"
                
              >
                Get Started!
              </button>
              <m.div className="absolute border-b-2 border-black rounded-xl
                w-[100%] mx-auto
                z-1
                left-0 right-0"
                initial={{ width: "0%" }}
                animate={{ width: "45%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              >

              </m.div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        
        {/* Formspree integration for handling form submissions */}
        {getStarted && (
          <>
            {getStarted && (
          <>
            {!submit ? (
              <>
              {/* Form Section wrapper */}
                <m.div 
                  className="
                  max-w-[100%]
                  overflow-y-auto
                  bg-white/95
                  pt-3
                  rounded-2xl
                  border-l-[3px] border-t-[8px] border-b-[3px] border-r-[3px] border-blue-600
                  shadow-[0_18px_45px_rgba(15,23,250,0.45)]
                  overflow-x-hidden 
                  "
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.1, delay: 1.1, ease: "easeOut" }}
                >
                  <form
                    id="portfolioSubmissionForm"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="downloadJson" value="true" />
                    
                    <FormSection
                      title="Basic Information"
                      subtitle="Tell us about yourself"
                    >
                      {/* wrapped text center for basic info   ✅*/}
                      <div className="text-center ">
                        {/* Full Name Field ✅*/}
                        <div className="grid grid-cols-2">
                          <ScrollIntoView direction="left">
                          <TextField
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            placeholder="e.g., Justin Burks"
                            required={true}
                            className={basicInfo}
                          />
                          </ScrollIntoView>
                          

                          {/* Email Address Field✅ */}
                          <ScrollIntoView direction="right">
                          <TextField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="e.g., justin.burks@login.cuny.edu"
                            required={true}
                            className={basicInfo}
                          />
                          </ScrollIntoView>
                        </div>

                        {/* Optional URL link of portfolio headedshot needed ✅ */}
                        <ScrollIntoView>
                        <TextField
                          id="headshotUrl"
                          name="headshotUrl"
                          label="Headshot URL (Optional)"
                          type="url"
                          placeholder="e.g., https://yourheadshoturl.com/image.jpg"
                          required={false}
                          className={basicInfo}
                        />
                        </ScrollIntoView>

                        {/* Bio Field ✅*/}
                        <ScrollIntoView>
                        <TextField
                          id="bio"
                          name="bio"
                          label="Short Bio"
                          placeholder="A brief bio about yourself"
                          required={true}
                          textarea={true}
                          className={basicInfo}
                          rows={4}
                        />
                        </ScrollIntoView>
                        {/* Personal Statement ✅*/}
                        <ScrollIntoView>
                        <TextField
                          id="personalStatement"
                          name="personalStatement"
                          label="Personal Statement"
                          placeholder="Why are you passionate about web development?"
                          required={true}
                          textarea={true}
                          rows={4}
                          className={basicInfo}
                        />
                        </ScrollIntoView>

                        {/*Major/Field of Study ✅ */}
                        <ScrollIntoView>
                        <Checkbox
                          name="major"
                          label="Major / Field of Study"
                          mapValue={majorOptions}
                          required={true}
                        />
                        </ScrollIntoView>

                        {/* Graduation Year ✅*/}
                        <ScrollIntoView>
                        <YearDropdown
                          id="graduationYear"
                          name="graduationYear"
                          label="Graduation Year"
                          required={true}
                          className={basicInfo}
                        />
                        </ScrollIntoView>

                        {/* Contact options ✅*/}
                        <ScrollIntoView>
                        <CheckBoxExplained
                          name="contactMethods"
                          label="Preferred Contact Methods"
                          mapValue={contactMethods}
                          required={true}
                        />
                        </ScrollIntoView>

                        {/* skills selction ✅*/}
                        <ScrollIntoView>
                        <Checkbox
                          name="skills"
                          label="Key Skills"
                          mapValue={keySkills}
                          required={false}
                        />
                        </ScrollIntoView>

                        {/* Career Goals ✅*/}
                        <ScrollIntoView>
                        <TextField
                          id="careerGoals"
                          name="careerGoals"
                          label="Career Goals"
                          placeholder="What are your career aspirations in web development?"
                          required={true}
                          textarea={true}
                          rows={4}
                          className={basicInfo}
                        />
                        </ScrollIntoView>

                      <ScrollIntoView direction="left">
                        <h2 className="text-4xl font-bold text-black mb-6 text-center border-t-[6px] border-blue-700 rounded-xl pt-2 italic">
                          Project Semester Info
                        </h2>
                        </ScrollIntoView>
                        {/* Semesters History, will return id, title, description and technologies ✅*/}
                        <div className="grid grid-cols-2 w-full ">
                          {Array.from({ length: addProject }).map(
                            (_,index) => {  //index will be _ unknown value to ignore
                              const projectIndex = index + 1;
                              return (
                                <React.Fragment key={projectIndex}>
                                  {/* Semester Name Field ✅*/}
                                  <div className="col-span-2">
                                  <ScrollIntoView>
                                  <SemesterDropdown
                                    id={`semester-${projectIndex}`}
                                    name={`semester-${projectIndex}`}
                                    label={`Project ${projectIndex}`}
                                    required={true}
                                    className={basicInfo}
                                  />
                                  </ScrollIntoView>
                                  </div>

                                  {/*Start date Field ✅*/}
                                  <div className="flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    
                                    id={`startDate-${projectIndex}`}
                                    name={`startDate-${projectIndex}`}
                                    label="Project Start Date"
                                    type="date"
                                    required={true}
                                    className={
                                      projectInfo +
                                      " flex flex-col justify-center"
                                    }
                                  />
                                  </ScrollIntoView>
                                  </div>
                                  
                                  {/* End Date Field ✅*/}
                                  <div className="flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    id={`endDate-${projectIndex}`}
                                    name={`endDate-${projectIndex}`}
                                    label="Project End Date"
                                    type="date"
                                    required={true}
                                    className={
                                      projectInfo +
                                      " flex flex-col justify-center"
                                    }
                                  />
                                  </ScrollIntoView>
                                  </div>

                                  {/* Project Name Field ✅*/}
                                  <div className="col-span-2 flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    
                                    id={`projectName-${projectIndex}`}
                                    name={`projectName-${projectIndex}`}
                                    label="Project Name"
                                    placeholder="e.g., Personal Portfolio Website"
                                    required={true}
                                    className={
                                      projectInfo +
                                      " col-span-2 flex flex-col mx-auto"
                                    }
                                  />
                                  </ScrollIntoView>
                                  </div>
                                  
                                  {/* Project Description Field ✅*/}
                                  <div className="col-span-2 flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    
                                    id={`projectDescription-${projectIndex}`}
                                    name={`projectDescription-${projectIndex}`}
                                    label="Project Description"
                                    placeholder="Describe your project in detail"
                                    required={true}
                                    textarea={true}
                                    rows={5}
                                    className={
                                      projectInfo +
                                      " col-span-2 flex flex-col mx-auto"
                                    }
                                  />
                                  </ScrollIntoView>
                                  </div>

                                  {/* Technologies Used Field ✅*/}

                                  <div className="col-span-2">
                                  <ScrollIntoView>
                                  <Checkbox
                                    
                                    name={`technologiesUsed-${projectIndex}`}
                                    label="Technologies Used"
                                    mapValue={keySkills}
                                    required={false}
                                  />
                                  </ScrollIntoView>
                                   </div>
                                   
                                  {/* Demo URL Field ✅*/}
                                  <div className="flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    id={`demoUrl-${projectIndex}`}
                                    name={`demoUrl-${projectIndex}`}
                                    label="Live Demo URL"
                                    type="url"
                                    placeholder="https://yourprojectdemo.com"
                                    required={true}
                                    className={projectInfo}
                                  />
                                  </ScrollIntoView>
                                  </div>

                                  {/* Repository URL Field ✅*/}
                                  <div className="flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    
                                    id={`repositoryUrl-${projectIndex}`}
                                    name={`repositoryUrl-${projectIndex}`}
                                    label="Repository URL"
                                    type="url"
                                    placeholder="https://github.com/yourusername/yourproject"
                                    required={true}
                                    className={projectInfo}
                                  />
                                  </ScrollIntoView>
                                  </div>

                                  {/* Project Home Page Screenshot Field link✅*/}
                                  <div className="col-span-2 flex flex-col mx-auto w-full">
                                  <ScrollIntoView>
                                  <TextField
                                    
                                    id={`screenshotUrl-${projectIndex}`}
                                    name={`screenshotUrl-${projectIndex}`}
                                    label="Project Home Page Screenshot URL"
                                    type="url"
                                    placeholder="https://yourproject.com/screenshot.jpg"
                                    required={false}
                                    className={
                                      projectInfo +
                                      " col-span-2 flex flex-col mx-auto"
                                    }
                                  />
                                  </ScrollIntoView>
                                  </div>
                                </React.Fragment>
                              );
                            }
                          )}

                          {/* Add more projects ✅*/}
                          <div className="flex mx-auto justify-center col-span-2"
                          >
                            <m.button
                            initial={{scale:1, opacity:1}}
                          whileHover={{scale:1.15}}
                          animate={{backgroundColor:["#00ff00ff","#04558bff","#f79031ff", "#00ff00ff"]}}
                          transition={{duration:2, repeat:Infinity, repeatType:"mirror"}}
                              type="button"
                              onClick={handleAddProject}
                              className="w-[90%] bg-green-600 text-white font-medium py-2 px-4 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                              Add Another Project
                            </m.button>
                          </div>
                        </div>
                          {/* Submit Button ✅*/}
                        <div className="mt-8 mb-4 w-full flex justify-center">
                          <button className="w-[75%] bg-blue-600 text-white font-medium py-3 px-4 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black">
                            Submit Portfolio
                          </button>
                        </div>
                      {/*End of wrapper center ️✅*/}
                      </div>
                      
                    </FormSection>
                  </form>
                  
                </m.div>
                 {/* Live goes here */}
                 {/*<LiveDownload mapValue={handleAddProject.requiredIds}  /> */}
              </>
            ) : (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-2xl text-center">
                Thank you for your submission! Your portfolio should be ready to
                download.
              </div>
            )}
          </>
        )}
          </>
        )}
      </div>
      </div>

  );
}
