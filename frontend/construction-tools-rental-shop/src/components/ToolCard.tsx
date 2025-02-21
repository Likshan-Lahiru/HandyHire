import { createContext, useState } from "react";
import { Heart } from "lucide-react"; // Importing heart icon
import ToolModel from "../model/ToolModel.ts";
import { useCart } from "../pages/subPage/context.tsx";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(0);

export function ToolCard({ id, picture, name, description, rentPricePerDay, remainingCount }: ToolModel) {
    const { isSignedIn } = useUser();
    const [isHovered, setIsHovered] = useState(false);
    const [remainingStock, setRemainingStock] = useState(remainingCount);
    const { addToCart } = useCart();
    const [cartItem] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
        if (remainingStock > 0) {
            setRemainingStock((prevStock) => prevStock - 1);
            addToCart({ id, name, rentPricePerDay, description, quantity: 1, picture: picture });
        }
    };

    return (
        <UserContext.Provider value={cartItem}>
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 w-full sm:w-65 md:w-72 relative">

                <button
                    className="absolute top-1.5 right-1.5 md:top-2 md:right-2 text-gray-400 hover:text-red-500"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <Heart fill={isFavorite ? "red" : "none"} stroke="currentColor" size={20} />
                </button>

                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={picture}
                        alt={name}
                        className={`w-full h-32 sm:h-36 md:h-40 object-contain transition-transform duration-300 ${
                            isHovered ? "scale-125" : "scale-100"
                        }`}
                    />
                </div>
                <div className="mt-3 text-center">
                    <h2 className="text-md sm:text-lg font-bold text-gray-900">{name}</h2>
                    <p className="text-xs sm:text-sm text-gray-500">{description}</p>
                    <p className="text-blue-600 font-semibold text-md sm:text-lg mt-2">RS. {rentPricePerDay.toFixed(2)}</p>
                    <p className={`text-xs sm:text-sm font-medium mt-2 ${remainingStock === 0 ? "text-red-500" : "text-green-600"}`}>
                        {remainingStock > 0 ? `Remaining: ${remainingStock}` : "Out of Stock"}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className={`mt-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base transition ${
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
        </UserContext.Provider>
    );
}
