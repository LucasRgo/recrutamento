import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { useFormFlow } from "../hooks/useFormFlow";

export function ThankYou() {
    const navigate = useNavigate();
    const { status, reset } = useFormFlow();

    useEffect(() => {
        // Redirect if not in completed state
        if (status !== "completed") {
            navigate("/");
        }
    }, [status, navigate]);

    const handleStartOver = () => {
        reset();
        navigate("/form");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-pink-200/30 to-blue-200 px-4 py-6">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Card className="shadow-2xl border-2 border-green-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
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
                                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 sm:w-16 sm:h-16 text-green-600" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}>
                                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
                                    <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 bg-clip-text text-transparent">
                                        Parabéns! 🎉
                                    </span>
                                </CardTitle>
                                <CardDescription className="text-base sm:text-lg mt-1 sm:mt-2 font-medium">
                                    O teu perfil enquadra-se perfeitamente na função de Gestor de Crédito.
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-4 sm:space-y-6 pt-2 pb-4 sm:pb-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-blue-50 to-pink-50/50 rounded-lg p-4 sm:p-6 space-y-2 sm:space-y-4 border border-pink-100">
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                                    Próximos Passos
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    Agenda agora uma reunião rápida (20 minutos) para conheceres todos os detalhes
                                    da oportunidade
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 p-2.5 sm:p-3 h-12 sm:h-14 text-sm sm:text-base">
                                    Voltar ao Início
                                </Button>
                                <Button
                                    onClick={handleStartOver}
                                    size="lg"
                                    className="flex-1 p-2.5 sm:p-3 h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all">
                                    Submeter Outra Candidatura
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-center text-xs sm:text-sm text-gray-500 pt-1 sm:pt-2">
                                Obrigado pelo teu interesse! Estamos ansiosos por conhecer-te.
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-rose-100/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
