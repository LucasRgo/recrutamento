import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";

export function Hero() {
    const scrollToForm = () => {
        // Smooth scroll to form section when implemented
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-amber-50/20">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="space-y-8 z-10">
                        {/* Main Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Queres uma carreira onde o{" "}
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r"
                                    style={{
                                        backgroundImage: "linear-gradient(to right, #EC4899, #DB2777)",
                                    }}>
                                    teu sucesso
                                </span>{" "}
                                dependa apenas de ti?
                            </h1>

                            <p className="text-xl sm:text-2xl text-gray-600 font-light">
                                Trabalha de forma independente, com total liberdade e o apoio de uma equipa
                                experiente.
                            </p>
                        </div>

                        {/* Micro text */}
                        <Card className="border-l-4 bg-blue-50/50 border-blue-400 p-4 shadow-sm">
                            <p className="text-sm text-gray-700 flex items-start gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>
                                    Responde a algumas perguntas rápidas e descobre se este desafio é para ti.
                                </span>
                            </p>
                        </Card>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="w-full text-2xl px-8 py-8 font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                                style={{ backgroundColor: "#2563EB" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
                                onClick={scrollToForm}>
                                Começar Agora
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative lg:h-[600px] h-[400px]">
                        {/* Decorative line connecting text to image */}
                        <div className="absolute -left-8 top-1/2 hidden lg:block">
                            <svg width="50" height="2" viewBox="0 0 50 2" fill="none">
                                <line
                                    x1="0"
                                    y1="1"
                                    x2="50"
                                    y2="1"
                                    stroke="#EC4899"
                                    strokeWidth="2"
                                    strokeDasharray="5 5"
                                />
                            </svg>
                        </div>

                        {/* Image container with decorative elements */}
                        <div className="relative h-full">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-2xl transform rotate-3"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-pink-200/50 rounded-2xl transform -rotate-3"></div>

                            <Card className="relative h-full overflow-hidden shadow-2xl border-none">
                                <img
                                    src="/profissional_sério.jpg"
                                    alt="Profissional de sucesso"
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay gradient for better text readability if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

                                {/* Success badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <Card className="backdrop-blur-md bg-white/90 p-4 border-none shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: "#EC4899" }}>
                                                <TrendingUp className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Crescimento Garantido</p>
                                                <p className="text-sm text-gray-600">O teu futuro começa aqui</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
