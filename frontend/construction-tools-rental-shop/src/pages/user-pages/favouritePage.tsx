import {ProductCard} from "../../components/SecondCard.tsx";



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


export const FavoritesGrid = () => {
    const handleRemove = (id: number) => {
        console.log(`Removing product ${id}`);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((product) => (
                    <ProductCard key={product.id} {...product} onRemove={handleRemove} />
                ))}
            </div>
        </div>
    );
};
