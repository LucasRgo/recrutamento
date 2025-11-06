import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AlertCircle, Heart, Home, RefreshCw } from "lucide-react";
import { useFormFlow } from "../hooks/useFormFlow";

export function Disqualified() {
    const navigate = useNavigate();
    const { status, disqualifyMessage, reset } = useFormFlow();

    useEffect(() => {
        // Redirect if not in disqualified state
        if (status !== "disqualified") {
            navigate("/");
        }
    }, [status, navigate]);

    const handleStartOver = () => {
        reset();
        navigate("/form");
    };

    const message =
        disqualifyMessage ||
        "Obrigado pelo teu interesse! Neste momento não temos uma oportunidade alinhada com o teu perfil, mas convidamos-te a manter contacto connosco para futuras vagas.";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-300 via-pink-200/80 to-blue-300 px-4 py-6">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Card className="shadow-2xl border-2 border-amber-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -ml-32 -mt-32"></div>
                        <CardHeader className="text-center space-y-3 sm:space-y-4 pb-3 sm:pb-4 pt-4 sm:pt-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2,
                                }}
                                className="flex justify-center">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-amber-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-10 h-10 sm:w-16 sm:h-16 text-amber-600" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}>
                                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                    Obrigado pelo Interesse
                                </CardTitle>
                                <CardDescription className="text-base sm:text-lg mt-1 sm:mt-2">
                                    Apreciamos o tempo que dedicaste a responder às nossas perguntas.
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-4 sm:space-y-6 pt-2 pb-4 sm:pb-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-blue-50 to-pink-50/30 rounded-lg p-4 sm:p-6 border border-pink-100">
                                <p className="text-gray-700 text-center leading-relaxed font-medium text-sm sm:text-base">{message}</p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outline"
                                    size="lg"
                                    className="p-2.5 sm:p-3 flex-1 h-11 sm:h-auto">
                                    <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Voltar ao Início
                                </Button>
                                <Button
                                    onClick={handleStartOver}
                                    size="lg"
                                    className="p-2.5 sm:p-3 flex-1 h-11 sm:h-auto bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all">
                                    <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Tentar Novamente
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-center text-xs sm:text-sm text-gray-500 pt-2 sm:pt-4">
                                Desejamos-te muito sucesso na tua carreira! 🌟
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

