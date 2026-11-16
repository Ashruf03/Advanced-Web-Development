export default function RegisterPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-base-200">


      <form className="card bg-base-100 shadow-xl w-full max-w-md p-4 translate-y-10">
        <h1 className="text-3xl font-bold">
        Create an Account
        </h1>

        <label htmlFor="name" className="block mb-1">
          Full name (optional)
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="name" name="name" type="text" placeholder="Ashruf Guenaoui" />
        
        <label htmlFor="email" className="block mb-1">
          Email Address
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="email" name="email" type="email" placeholder="ashruf@example.com" />

        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="password" name="password" type="password" placeholder="••••••••" />

        <label htmlFor="confirmed_password" className="block mb-1">
          Confirm Password
        </label>
        <input className="input w-full focus:outline-hidden focus:border-primary mb-2"id="confirmed_password" name="confirmed_password" type="password" placeholder="••••••••" />

        <button className="btn btn-primary mt-4 w-full" type="button">
          Create Account
        </button>

      </form>
    </main>
  );
}