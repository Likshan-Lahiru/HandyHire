
import {ToolCardDeco} from "../../components/ToolCardDeco.tsx";


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
    id: index,
    picture: images[index % images.length],
    name: `Tool ${index + 1}`,
    description: "High-quality construction tool",
    rentPricePerDay: Math.floor(Math.random() * 500) + 100,
    remainingCount: Math.floor(Math.random() * 10) + 1,
}));

export default function ToolSliderPage() {
    return (
        <div className="top-2.5 border-8 w-full h-full flex justify-center items-center gap-10 p-4">

            <div
                className="bg-center hidden sm:block"
                style={{
                    backgroundImage: "url('https://i.ibb.co/0RJQKzPJ/pngwing-com-11.png')",
                    backgroundSize: 'cover',
                    width: '1800px',
                    height: '600px',
                }}
            >
            </div>

            <div className="relative w-full max-w-2xl overflow-hidden">
                <div className="flex gap-4 overflow-x-auto no-scrollbar p-5">
                    {tools.map((tool, index) => (
                        <div key={index} className="min-w-[300px]">
                            <ToolCardDeco {...tool} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
