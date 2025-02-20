import { createContext, useContext, useState } from "react";

export const cont1 = createContext(0); // Create the context

export function Test2() {
    const [value1, setValue1] = useState(0);
    const contextValue = useContext(cont1); // Access the context value

    // Function to update the context value
    const handleIncrement = () => {
        setValue1(value1 + 1);
    };

    return (
        <cont1.Provider value={value1}> {/* Provide the updated value */}
            <div>
                <h1>Value in Test2: {value1}</h1>
                <button onClick={handleIncrement}>Increment</button>
            </div>
        </cont1.Provider>
    );
}