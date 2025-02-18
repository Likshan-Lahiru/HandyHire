import {ToolCard} from "../../components/ToolCard.tsx";



export function DrillPage() {
    const tools = Array.from({length: 20}, (_, index) => ({
        image: "https://i.ibb.co/Q7443jp0/pngwing-com.png",
        name: `Tool ${index + 1}`,
        description: "High-quality construction tool",
        price: Math.floor(Math.random() * 500) + 100,
        stock: Math.floor(Math.random() * 10) + 1,
    }));

    return (

            <div className="border-10 border-gray-300 rounded-lg p-10 grid grid-cols-4 gap-4 ">
                {tools.map((tool, index) => (
                    <ToolCard key={index} {...tool} />
                ))}
            </div>




    );
}

