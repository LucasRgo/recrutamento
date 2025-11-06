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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-blue-50 px-4">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Card className="shadow-2xl border-2 border-amber-100">
                        <CardHeader className="text-center space-y-4 pb-4">
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
                                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-16 h-16 text-amber-600" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}>
                                <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    Obrigado pelo Interesse
                                </CardTitle>
                                <CardDescription className="text-lg mt-2">
                                    Apreciamos o tempo que dedicaste a responder às nossas perguntas.
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-6 pt-2">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-blue-50 rounded-lg p-6 space-y-4">
                                <p className="text-gray-700 text-center leading-relaxed">{message}</p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border-l-4 border-pink-400">
                                <div className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900">Não desanimes!</h4>
                                        <p className="text-sm text-gray-700">
                                            Esta oportunidade específica pode não ser o encaixe perfeito, mas existem
                                            muitas outras por aí. Continua a explorar e a procurar aquilo que melhor se
                                            adequa ao teu perfil e aos teus objetivos.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="bg-amber-50 rounded-lg p-6 space-y-3">
                                <h3 className="font-semibold text-lg text-gray-900">Mantém-te Conectado</h3>
                                <p className="text-gray-700 text-sm">
                                    Se quiseres ser informado sobre futuras oportunidades que possam ser mais adequadas
                                    ao teu perfil, não hesites em deixar-nos o teu contacto através do nosso website ou
                                    redes sociais.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1">
                                    <Home className="mr-2 h-5 w-5" />
                                    Voltar ao Início
                                </Button>
                                <Button
                                    onClick={handleStartOver}
                                    size="lg"
                                    className="flex-1 bg-amber-600 hover:bg-amber-700">
                                    <RefreshCw className="mr-2 h-5 w-5" />
                                    Tentar Novamente
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-center text-sm text-gray-500 pt-4">
                                Desejamos-te muito sucesso na tua carreira! 🌟
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

