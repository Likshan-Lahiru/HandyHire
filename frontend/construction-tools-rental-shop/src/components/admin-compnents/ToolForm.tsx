import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AppDispatch} from "../../store/store.ts";
import {addTool} from "../../reducers/toolReducer.ts";

const FormController = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<{
        toolName: string;
        rentPerDay: string;
        qtyOnHand: string;
        picture: File | null;
        description: string;
        categoryId: string;
    }>({
        toolName: "",
        rentPerDay: "",
        qtyOnHand: "",
        picture: null,
        description: "",
        categoryId: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                picture: e.target.files![0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.toolName);
        formDataToSend.append("rentPricePerDay", formData.rentPerDay);
        formDataToSend.append("remainingCount", formData.qtyOnHand);
        formDataToSend.append("description", formData.description);
        if (formData.picture) {
            formDataToSend.append("picture", formData.picture);
        }

        try {
            await dispatch(addTool(formDataToSend)).unwrap();

            toast.success("Tool added successfully!", {
                position: "top-right",
                autoClose: 3000,
            });

            setFormData({
                toolName: "",
                rentPerDay: "",
                qtyOnHand: "",
                picture: null,
                description: "",
                categoryId: "",
            });

        } catch (error) {
            toast.error("Failed to add tool. Try again!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">
                        Tool Name
                    </label>
                    <input
                        type="text"
                        id="toolName"
                        name="toolName"
                        value={formData.toolName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rentPerDay" className="block text-sm font-medium text-gray-700">
                        Rent Per Day Price
                    </label>
                    <input
                        type="number"
                        id="rentPerDay"
                        name="rentPerDay"
                        value={formData.rentPerDay}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="qtyOnHand" className="block text-sm font-medium text-gray-700">
                        Quantity On Hand
                    </label>
                    <input
                        type="number"
                        id="qtyOnHand"
                        name="qtyOnHand"
                        value={formData.qtyOnHand}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                        Upload Picture
                    </label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={4}
                    />
                </div>

                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
                    </select>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>


            <ToastContainer />
        </div>
    );
};

export default FormController;
