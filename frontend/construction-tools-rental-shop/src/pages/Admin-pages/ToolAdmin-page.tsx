import { useState } from "react";
import DataTable from "../../components/admin-compnents/table.tsx";
import ModalComponent from "../../components/admin-compnents/Model.tsx";

export function ToolAdminPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 relative">

            <div className="w-full max-w-5xl mb-4">
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            <div className="w-full max-w-6xl">
                <DataTable searchTerm={searchTerm} />
            </div>


            <div className="absolute top-4 right-4">
                <ModalComponent />
            </div>
        </div>
    );
}
