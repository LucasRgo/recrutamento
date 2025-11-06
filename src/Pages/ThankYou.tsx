import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react";
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Card className="shadow-2xl border-2 border-green-100">
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
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}>
                                <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    Parabéns! 🎉
                                </CardTitle>
                                <CardDescription className="text-lg mt-2">
                                    O teu perfil enquadra-se perfeitamente na função de Gestor de Crédito.
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-6 pt-2">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-blue-50 rounded-lg p-6 space-y-4">
                                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Próximos Passos
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            1
                                        </span>
                                        <span>
                                            A nossa equipa irá analisar as tuas respostas nas próximas 24-48 horas.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            2
                                        </span>
                                        <span>
                                            Entraremos em contacto contigo por email ou telefone para agendar uma
                                            entrevista.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            3
                                        </span>
                                        <span>
                                            Prepara-te para conhecer a nossa equipa e descobrir mais sobre esta
                                            oportunidade incrível!
                                        </span>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-400">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900">Verifica o teu email</h4>
                                        <p className="text-sm text-gray-700">
                                            Enviámos uma mensagem de confirmação para o email que forneceste. Se não a
                                            encontrares, verifica a pasta de spam.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1">
                                    Voltar ao Início
                                </Button>
                                <Button
                                    onClick={handleStartOver}
                                    size="lg"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700">
                                    Submeter Outra Candidatura
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-center text-sm text-gray-500 pt-4">
                                Obrigado pelo teu interesse! Estamos ansiosos por conhecer-te.
                            </motion.p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

