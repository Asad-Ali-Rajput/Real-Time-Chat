import CustomModal from "./Common/Modal";

function SignupComponent() {
    return (
        <div className="flex justify-center items-center h-full">
            <form className="bg-gradient-to-br p-0.5 rounded-lg overflow-hidden from-green-400 to-blue-600">
                <div className="bg-slate-900 rounded-lg p-2">
                    <div class="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div> 
                <div class="mb-6">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div> 
                    <button
                    type="button"
                    className="text-white w-full bg-gradient-to-br my-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >SUBMIT</button>
                <div className="">
                <button className="text-white w-full bg-gradient-to-br my-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-4 h-4 inline-block mr-1"
                    >
                        <path d="M31.75 14.75h-14v-4h14c.425 0 .75-.325.75-.75v-5.5c0-.425-.325-.75-.75-.75h-14v-4h13.75c1.38 0 2.25.9 2.25 2.25v5.5c0 1.35-.87 2.25-2.25 2.25zm-15-12.25v4h-4v4h4v4h4v-4h4v-4h-4v-4z"/>
                    </svg>
                    Google
                </button>
                <button className="text-white w-full bg-gradient-to-br my-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 inline-block mr-1"
                    >
                        <path d="M21 12.01c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 5.25 3.99 9.56 9.14 10v-7.1h-2.57v-2.9h2.57v-2.2c0-2.51 1.5-3.89 3.77-3.89 1.1 0 2.15.08 3.07.22v2.68h-2.1c-1.65 0-1.97.78-1.97 1.93v2.4h3.93l-.51 2.9h-3.42v7.1c5.16-.44 9.14-4.75 9.14-10z"/>
                    </svg>
                    Facebook
                </button>
</div>
                </div>
            
        </form>
        </div>
        
    )
}

export default SignupComponent;