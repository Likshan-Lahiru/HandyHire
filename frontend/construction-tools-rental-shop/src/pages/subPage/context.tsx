import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    id: number;
    name: string;
    rentPricePerDay: number;
    description: string;
    quantity: number;
    picture: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: number, delta: number) => void;
    removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}
