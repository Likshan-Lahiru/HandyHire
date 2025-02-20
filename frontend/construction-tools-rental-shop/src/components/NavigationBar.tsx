import {useContext, useState} from "react";
import {Menu, X, ChevronDown, ShoppingCart, Heart,  Search} from "lucide-react";
import { NavLink } from "react-router";
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import {UserContext} from "./ToolCard.tsx";

export function NavigationBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("menu");
    const cartItem = useContext(UserContext);





    return (
        <header className="sticky top-0 w-full bg-black text-white shadow-md z-50">
            <nav className="flex items-center justify-between px-6 py-4">
                <div className="relative hidden md:block">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-2 text-lg font-semibold"
                    >
                        <Menu className="w-6 h-6 cursor-pointer"/>
                        <span>BROWSE CATEGORIES</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-64 bg-white text-black shadow-lg rounded-md">
                            <ul className="py-2">
                                {[
                                    {name: "Grinder", path: "/grinder"},
                                    {name: "Drill", path: "/drill"},
                                    {name: "Ladder", path: "/ladder"},
                                    {name: "Palanchi", path: "/palanchi"},
                                    {name: "Grass Cutters", path: "/grass-cutters"}
                                ].map((item) => (
                                    <li key={item.name} className="px-4 py-2 hover:bg-gray-200 cursor-pointer-h">
                                        <NavLink
                                            to={item.path}
                                            className="block w-full h-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" className="hover:text-blue-500 transition duration-300">Home</NavLink>
                    <NavLink to="/tool" className="hover:text-blue-500 transition duration-300">Tools</NavLink>
                    <NavLink to="/toolRent" className="relative">
                        <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition duration-300"/>
                        <span
                            className="absolute -top-2 -right-2 bg-blue-500 text-xs text-white rounded-full px-1">{cartItem}</span>
                    </NavLink>
                    <NavLink to="/favourite">
                        <Heart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition duration-300"/>
                    </NavLink>
                    <Search className="w-6 h-6 cursor-pointer hover:text-blue-500 transition duration-300"/>

                </div>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>

                <div className="flex justify-center gap-x-8 items-center">

                    <div className="flex gap-x-4 items-center">
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                        <SignedOut>
                            <NavLink to={"/sign-in"}>Sign In</NavLink>

                                <NavLink className="text-blue-600 hover:text-white-500 transition duration-300" to={"/sign-up"}>Sign Up</NavLink>

                        </SignedOut>
                    </div>
                </div>
            </nav>


            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white text-black shadow-lg">
                    <div className="flex justify-around border-b">
                        <button
                            className={`w-1/2 py-2 ${activeTab === "categories" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                            onClick={() => setActiveTab("categories")}
                        >
                            Categories
                        </button>
                        <button
                            className={`w-1/2 py-2 ${activeTab === "menu" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                            onClick={() => setActiveTab("menu")}
                        >
                            Menu
                        </button>
                    </div>

                    {activeTab === "categories" ? (
                        <ul className="py-2 flex flex-col items-center">
                            {[
                                { name: "Grinder", path: "/grinder" },
                                { name: "Drill", path: "/drill" },
                                { name: "Ladder", path: "/ladder" },
                                { name: "Palanchi", path: "/palanchi" },
                                { name: "Grass Cutters", path: "/grass-cutters" }
                            ].map((item) => (
                                <NavLink key={item.name} to={item.path} className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </ul>
                    ) : (
                        <ul className="py-2 flex flex-col items-center">
                            <NavLink to="/" className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/tool" className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Tools</NavLink>
                            <NavLink to="/toolRent" className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Tool Rent</NavLink>
                            <NavLink to="/favourite" className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Favourite</NavLink>
                            <NavLink to="/profile" className="py-2 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Profile</NavLink>
                        </ul>
                    )}
                </div>
            )}
        </header>
    );
}
