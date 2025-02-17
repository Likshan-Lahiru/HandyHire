import { useState } from "react";
import ToolModel from "../model/ToolModel.ts";

export function ToolCard({ image, name, description, price }: ToolModel) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 w-72">
            <div
                className="relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={image}
                    alt={name}
                    className={`w-full h-40 object-contain transition-transform duration-300 ${
                        isHovered ? "scale-125" : "scale-100"
                    }`}
                />
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-blue-600 font-semibold text-lg mt-2">RS. {price.toFixed(2)}</p>
            </div>
        </div>
    );
}
