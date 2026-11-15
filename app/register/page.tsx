export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">
        Create an Account
      </h1>
      <form>
        <label htmlFor="name" className="block">
          Full name (optional)
        </label>
        <input id="name" name="name" type="text" placeholder="Ashruf Guenaoui" />
        
        <label htmlFor="email" className="block">
          Email Address
        </label>
        <input id="email" name="email" type="text" placeholder="ashruf@example.com" />

        <label htmlFor="password" className="block">
          Password
        </label>
        <input id="password" name="password" type="text" placeholder="••••••••" />

        <label htmlFor="confirmed_password" className="block">
          Confirm Password
        </label>
        <input id="confirmed_password" name="confirmed_password" type="text" placeholder="••••••••" />

        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl block" >
          Create Account
        </button>

      </form>
    </main>
  );
}