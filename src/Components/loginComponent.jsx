import { useState } from "react";
// import CustomModal from "./Common/Modal";

function LoginComponent() {
    const [isOpenModal, setIsOpenModal] = useState(true);

    // const handleSubmit = () => {
    //     setIsOpenModal(false);
    //     // onClick(false);  
    // }

    // const handleModal = () => {
    //     setIsOpenModal(!isModal);
    // };

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
                >LOGIN</button>
                </div>
            
        </form>
        </div>
        
    )
    
}

export default LoginComponent;