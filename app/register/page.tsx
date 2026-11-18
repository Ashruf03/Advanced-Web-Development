"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"error" | "success" | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // reset the state
    setMsg("");
    setMsgType(null);
    setLoading(true);

    // get the current form data
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmed_password: formData.get("confirmed_password"),
    };

    // send the data to the server
    try{
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(data)
      });

      // get the response
      const result = await response.json();
    
      // handle the response
      if (response.ok){
        setMsg(result.message);
        setMsgType("success");
        // redirect to the login page after a short delay
        setTimeout(() => {router.replace("/login")}, 1000);
      }
      else{
        setMsg(result.error);
        setMsgType("error");
      }
    } 
    catch(error){
      setMsg("Something went wrong. Please try again.");
      setMsgType("error");
      return;
    }
    finally{
      setLoading(false);
    }
    
  }
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-base-200">

      <form method="post"onSubmit={handleSubmit} className="card bg-base-100 shadow-xl w-full max-w-md p-4 translate-y-10">
        <h1 className="text-3xl font-bold">
        Create an Account
        </h1>

        {msg && msgType &&(
          <div role="alert" className={"alert " + (msgType === "success" ? "alert-success" : "alert-error") + " alert-soft mt-2 mb-2"}>
            {msg}
          </div>
        )}

        <label htmlFor="name" className="block mb-1">
          Full name (optional)
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="name" name="name" maxLength={50} type="text" placeholder="Ashruf Guenaoui" autoComplete="name"/>
        
        <label htmlFor="email" className="block mb-1">
          Email Address
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="email" name="email" required type="email" placeholder="ashruf@example.com" autoComplete="email"/>

        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="password" name="password" required minLength={15} type="password" placeholder="••••••••" autoComplete="new-password"/>

        <label htmlFor="confirmed_password" className="block mb-1">
          Confirm Password
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="confirmed_password" name="confirmed_password" required minLength={15} type="password" placeholder="••••••••" autoComplete="new-password"/>

        {(loading || msgType === "success") && (
          <button className="btn btn-primary mt-4 w-full" type="button" disabled>
            <span className="loading loading-spinner"></span>
            Creating Account...
          </button>
        )}

        {!loading && msgType !== "success" && (
          <button className="btn btn-primary mt-4 w-full" type="submit">
            Create Account
          </button>
        )}

      </form>
    </main>
  );
}