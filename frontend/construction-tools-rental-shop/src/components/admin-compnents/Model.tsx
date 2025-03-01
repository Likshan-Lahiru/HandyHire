
import FormController from "./ToolForm.tsx";
import {useState} from "react";


const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative">

            <button
                onClick={toggleModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                New Tool
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={toggleModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold text-center mb-4">New Tool Details</h2>
                        <FormController />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalComponent;
