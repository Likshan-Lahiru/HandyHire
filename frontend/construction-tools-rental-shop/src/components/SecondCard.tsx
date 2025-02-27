import { X } from "lucide-react";
interface ProductCardProps {
    id: number;
    name: string;
    rentPricePerDay: number;
    picture: string;
    onRemove: (id: number) => void;
}
export const ProductCard = ({
                                id,
                                name,
                                rentPricePerDay,
                                picture,
                                onRemove,
                            }: ProductCardProps) => {
    return (
        <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <button
                onClick={() => onRemove(id)}
                className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full shadow-sm hover:bg-gray-100"
            >
                <X className="h-4 w-4 text-gray-500" />
            </button>
            <div className="aspect-square overflow-hidden rounded-t-lg">
                <img src={picture} alt={name} className="w-min h-min object-cover" />
            </div>
            <div className="p-4 bg-gray-100">
                <h3 className="text-sm font-medium text-gray-900">{name}</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">${rentPricePerDay}</p>
            </div>
        </div>
    );
};
