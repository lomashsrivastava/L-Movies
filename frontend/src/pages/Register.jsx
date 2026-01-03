import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 bg-black/75 backdrop-blur-sm p-8 md:p-14 rounded-lg w-full max-w-md shadow-2xl">
                <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
                <form className="space-y-4">
                    <div className="relative">
                        <input
                            className="w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 outline-none focus:bg-[#444] transition peer placeholder-transparent"
                            type="text"
                            id="username"
                            placeholder="Username"
                        />
                        <label
                            htmlFor="username"
                            className="absolute left-5 top-2 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
                        >Username</label>
                    </div>
                    <div className="relative">
                        <input
                            className="w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 outline-none focus:bg-[#444] transition peer placeholder-transparent"
                            type="email"
                            id="email"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-5 top-2 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
                        >Email address</label>
                    </div>
                    <div className="relative">
                        <input
                            className="w-full bg-[#333] text-white rounded px-5 pt-6 pb-2 outline-none focus:bg-[#444] transition peer placeholder-transparent"
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-5 top-2 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
                        >Password</label>
                    </div>

                    <button className="w-full bg-red-600 font-bold py-3 rounded mt-6 hover:bg-red-700 transition">Sign Up</button>

                </form>

                <div className="mt-10 text-gray-400 text-sm">
                    Already have an account? <Link to="/login" className="text-white hover:underline cursor-pointer ml-1">Sign in.</Link>
                </div>
            </div>
        </div>
    )
}
export default Register;
