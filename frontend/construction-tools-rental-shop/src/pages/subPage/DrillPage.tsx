import {ToolCard} from "../../components/ToolCard.tsx";


export function DrillPage() {
    const images = [
        "https://i.ibb.co/Q7443jp0/pngwing-com.png",
        "https://i.ibb.co/VcJ8HrF3/pngwing-com-1.png",
        "https://i.ibb.co/7xQsL7dR/pngwing-com-3.png",
        "https://i.ibb.co/WWBfkBRL/pngwing-com-4.png",
        "https://i.ibb.co/rGs7B7mN/pngwing-com-8.png",
        "https://i.ibb.co/Q7443jp0/pngwing-com.png",
        "https://i.ibb.co/KcJFvBXt/pngwing-com-7.png",
        "https://i.ibb.co/5gjCgbgh/pngwing-com-6.png",
        "https://i.ibb.co/1G8HyC1K/pngwing-com-5.png",
        "https://i.ibb.co/Rpxrqmc9/pngwing-com-9.png",
    ];

    const tools = Array.from({length: 20}, (_, index) => ({
        image: images[index % images.length],
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


