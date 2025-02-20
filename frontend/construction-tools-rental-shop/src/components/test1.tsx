import { useContext } from "react";
import {cont1} from "./test2.tsx";


export function Test1() {
    const testContextValue = useContext(cont1);

    return (
        <>
            <h1>{testContextValue}</h1>
        </>
    );
}