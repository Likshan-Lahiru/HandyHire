import { useState } from "react";
import ToolModel from "../model/ToolModel.ts";
import { useCart } from "../pages/subPage/context.tsx";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export function ToolCard({ id, image, name, description, price, stock }: ToolModel) {
    const { isSignedIn } = useUser();
    const [isHovered, setIsHovered] = useState(false);
    const [remainingStock, setRemainingStock] = useState(stock);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!isSignedIn) {

            return <Navigate to="/sign-in" />;
        }

        if (remainingStock > 0) {
            setRemainingStock((prevStock) => prevStock - 1);
            addToCart({ id, name, price, description, quantity: 1, image });
            console.log(`${name} added to cart! Remaining stock: ${remainingStock - 1}`);
        }
    };

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
                <p className={`text-sm font-medium mt-2 ${remainingStock === 0 ? "text-red-500" : "text-green-600"}`}>
                    {remainingStock > 0 ? `Remaining: ${remainingStock}` : "Out of Stock"}
                </p>

                {/* Conditionally disable or show the button */}
                <button
                    onClick={handleAddToCart}
                    className={`mt-3 py-2 px-4 rounded-lg transition ${
                        remainingStock > 0
                            ? isSignedIn
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!isSignedIn || remainingStock === 0}
                >
                    {isSignedIn ? "Add to Cart" : "Sign in to Add"}
                </button>
            </div>
        </div>
    );
}
