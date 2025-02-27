import { Trash } from "lucide-react";
import { useCart } from "../subPage/context.tsx";
import {useNavigate} from "react-router";


export default function ToolRentCartPage() {
    const { cart, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();
    const subtotal = cart.reduce((acc, item) => acc + item.rentPricePerDay * item.quantity, 0);

    function clearCart() {

    }

    return (
        <div className="p-4 lg:p-16 max-w-6xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
                {cart.length > 0 ? (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center border-b py-4 gap-4">
                                <img src={item.picture} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">Size: {item.description}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="px-2 border rounded-l bg-gray-100 hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 border-t border-b">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="px-2 border rounded-r bg-gray-100 hover:bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="w-16 text-right font-semibold">Rs: {item.rentPricePerDay * item.quantity}</p>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash/>
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-6 font-semibold">
                            <span>Subtotal:</span>
                            <span>Rs: {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 md:flex-row md:justify-between">
                            <button
                                onClick={() => clearCart()}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Clear Cart
                            </button>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Checkout
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
}
