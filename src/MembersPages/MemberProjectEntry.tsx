// import { useState } from 'react'; // Step 1: Import useState
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import MemberSideBar from "./MemeberSideBar"; // Corrected typo in import

// const MemberProjectEntry = () => {
//   const schema = z.object({
//     aantalUren: z.string() // Expect a string
//       .transform((value) => parseInt(value, 10)) // Transform the string to a number
//       .refine((val) => !isNaN(val) && val > 0, "Aantal uren moet positief zijn"), // Ensure it's a positive number
//     projectnaam: z.string().min(1, "Projectnaam is verplicht"),
//     omschrijvingWerkzaamheden: z.string().optional(),
//   });

//   type FormData = z.infer<typeof schema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   // Step 2: Define a state variable for the server message
//   const [serverMessage, setServerMessage] = useState('');

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     // Retrieve the session from localStorage
//     const session = localStorage.getItem('sessionId');
//     // Include the session in the data object
//     const dataWithSession = {
//       ...data,
//       session,
//     };

//     // Convert dataWithSession into JSON format
//     const jsonData = JSON.stringify(dataWithSession);
//     const apiUrl = 'http://localhost/Projects/Backend/Projecttijd.php';
//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: jsonData,
//       });

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.indexOf('application/json') !== -1) {
//         const responseBody = await response.json();
//         // Step 3: Update the state with the message from the server response
//         console.log(responseBody);

//       } else {
//         const responseText = await response.text();
//         const responsem = (JSON.parse(responseText));
//         console.log(responsem.message);
//         setServerMessage(responsem.message);

//       }
//       if (response.ok) {
//         reset();
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="d-flex">
//       <MemberSideBar /> {/* Corrected typo in component name */}
//       <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
//       {
//           serverMessage &&
//           <div className="text-success"><h4>{serverMessage}</h4></div>
//         }
//         <div className="mb-3">
//           <label htmlFor="aantalUren" className="form-label">
//             Aantal uren:
//           </label>
//           <input
//             type="number"
//             id="aantalUren"
//             className="form-control"
//             {...register("aantalUren")}
//           />
//           {errors.aantalUren && (
//             <span className="text-danger">
//               {errors.aantalUren.message as string}
//             </span>
//           )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="projectnaam" className="form-label">
//             Projectnaam:
//           </label>
//           <select
//             id="projectnaam"
//             required // Set required prop directly
//             className="form-select"
//             {...register("projectnaam")}
//           >
//             <option value="">Selecteer een project</option>
//             <option value="Backend">Backend</option>
//             <option value="FrontEnd">FrontEnd</option>
//             <option value="Documenting">Documenting</option>
//             <option value="Huiswerk/zelfstudie">Huiswerk/zelfstudie</option>
//           </select>
//           {errors.projectnaam && (
//             <span className="text-danger">
//               {errors.projectnaam.message as string}
//             </span>
//           )}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="omschrijvingWerkzaamheden" className="form-label">
//             Omschrijving werkzaamheden:
//           </label>
//           <textarea
//             id="omschrijvingWerkzaamheden"
//             className="form-control"
//             {...register("omschrijvingWerkzaamheden")}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Verzenden
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MemberProjectEntry;
import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MemberSideBar from "./MemeberSideBar"; // Corrected typo in import

const MemberProjectEntry = () => {
  const schema = z.object({
    aantalUren: z
      .string() // Expect a string
      .transform((value) => parseInt(value, 9)) // Transform the string to a number
      .refine(
        (val) => !isNaN(val) && val > 0,
        "Aantal uren moet positief zijn en niet meer dan 8 per dag"
      ), // Ensure it's a positive number
    projectnaam: z.string().min(1, "Projectnaam is verplicht"),
    omschrijvingWerkzaamheden: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [serverMessage, setServerMessage] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost/Projects/backendcode/DonProjects.php"
        );
        if (response.ok) {
          const data = await response.json();
          const projectNames = data.map((project: any) => project.project);
          setProjects(projectNames);
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const session = localStorage.getItem("sessionId");
    const dataWithSession = {
      ...data,
      session,
    };
    const jsonData = JSON.stringify(dataWithSession);
    const apiUrl = "http://localhost/Projects/Backend/Projecttijd.php";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") == -1) {
        const responseText = await response.text();
        const responseTextObject = JSON.parse(responseText);
        setServerMessage(responseTextObject.message);
        reset();
        // Optionally handle non-JSON responses here
      }

      // Optionally reset form here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex">
      <MemberSideBar />
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        {serverMessage && (
          <div className="text-success">
            <h4>{serverMessage}</h4>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="aantalUren" className="form-label">
            Aantal uren:
          </label>
          <input
            type="number"
            id="aantalUren"
            className="form-control"
            {...register("aantalUren")}
          />
          {errors.aantalUren && (
            <span className="text-danger">
              {errors.aantalUren.message as string}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectnaam" className="form-label">
            Projectnaam:
          </label>
          <select
            id="projectnaam"
            required
            className="form-select"
            {...register("projectnaam")}
          >
            <option value="">Selecteer een project</option>
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
          {errors.projectnaam && (
            <span className="text-danger">
              {errors.projectnaam.message as string}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="omschrijvingWerkzaamheden" className="form-label">
            Omschrijving werkzaamheden:
          </label>
          <textarea
            id="omschrijvingWerkzaamheden"
            className="form-control"
            {...register("omschrijvingWerkzaamheden")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Verzenden
        </button>
      </form>
    </div>
  );
};

export default MemberProjectEntry;
