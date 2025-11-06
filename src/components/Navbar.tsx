import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

export function Navbar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/favicon_io/logo.png"
                            alt="DS INTERMEDIÁRIOS DE CRÉDITO"
                            className="h-12 w-auto"
                        />
                    </div>
                    {/* CTA Button - Only show on home page */}
                    {isHomePage && (
                        <div className="flex items-center">
                            <Button
                                className="font-semibold"
                                style={{ backgroundColor: "#EC4899" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DB2777")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EC4899")}>
                                Começar Agora
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
