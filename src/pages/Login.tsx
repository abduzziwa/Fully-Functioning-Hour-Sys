import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for form data
const schema = z.object({
  studentNo: z
    .number({
      required_error: "ID is Verplicht",
      invalid_type_error: "Het moet een nummer zijn",
    })
    .min(5, { message: "Je moet minimaal 5 cijfers schrijven" }),
  password: z
    .string()
    .min(5, { message: "Je moet minimaal 8 tekens schrijven" })
    .max(40),
});

// Define a type alias for form data
type FormData = z.infer<typeof schema>;
const Login: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitting data:", data);
      console.log("json: " + JSON.stringify(data));
      reset();
      // Call sendData function to send data to the server
      const responseData = await sendData(data);

      if (responseData.success) {
        // Store session ID in local storage if received
        localStorage.setItem("sessionId", responseData.sessionId);
        localStorage.setItem("userId", data.studentNo.toString());

        if (responseData.isAdmin === "1") {
          window.location.href = "/Charts"; // Redirect to Admin Dashboard
        } else {
          window.location.href = "/member"; // Redirect to Member Dashboard
        }
      } else {
        // Show error message
        setServerMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const sendData = async (data: FormData) => {
    try {
      const response = await fetch(
        "http://localhost/Projects/backendcode/UserLogin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json(); // Get response as JSON

      console.log("Server Response:", responseData); // Log the response

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${responseData}`);
      }

      return responseData; // Return JSON response data
    } catch (error) {
      throw new Error("Error sending data: " + (error as Error).message);
    }
  };

  return (
    <>
      <div className="form p-5 mx-auto">
        {/* Display server message if present */}
        {serverMessage && <h3 className="text-danger">{serverMessage}</h3>}

        <h1>Inloggen</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <span className="form-label-inside">
              <label className="form-label" htmlFor="studentNo">
                ID Nummer:
              </label>
            </span>
            <input
              type="number"
              className="form-control w-80"
              id="studentNo"
              {...register("studentNo", {
                valueAsNumber: true,
                onChange: () => handleSubmit(onSubmit),
              })}
            />
            <p className="text-danger">
              {errors.studentNo && <span>{errors.studentNo.message}</span>}
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Wachtwoord:
            </label>
            <input
              type="password"
              className="form-control w-80"
              id="password"
              {...register("password", {
                onChange: () => handleSubmit(onSubmit),
              })}
            />
            <p className="text-danger">
              {errors.password && <span>{errors.password.message}</span>}
            </p>
          </div>
          <button type="submit" className="btn btn-primary">
            Inloggen
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
