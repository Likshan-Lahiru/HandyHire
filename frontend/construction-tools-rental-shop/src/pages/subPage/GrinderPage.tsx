import {Test1} from "../../components/test1.tsx";
import {Test2} from "../../components/test2.tsx";

export function GrinderPage() {
    return (
        <div className="border-10 border-gray-300 rounded-lg p-10">
            <h1>Grinder Page</h1>
            <Test1 />
            <Test2 />
        </div>
    );
}
