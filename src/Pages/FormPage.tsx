import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useFormFlow } from "../hooks/useFormFlow";
import { questionnaire } from "../Data/Questions";

export function FormPage() {
    const navigate = useNavigate();
    const { currentQuestion, answers, status, submitAnswer } = useFormFlow();
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const inputRef = useRef<HTMLInputElement>(null);
    const [questionHistory, setQuestionHistory] = useState<string[]>([]);

    // Calculate progress
    const totalQuestions = questionnaire.questions.filter((q) => q.id !== "success").length;
    const currentIndex = currentQuestion
        ? questionnaire.questions.findIndex((q) => q.id === currentQuestion.id)
        : 0;
    const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

    // Handle redirects based on status
    useEffect(() => {
        if (status === "completed") {
            navigate("/thank-you");
        } else if (status === "disqualified") {
            navigate("/disqualified");
        }
    }, [status, navigate]);

    // Reset form state when question changes
    useEffect(() => {
        if (currentQuestion) {
            const currentAnswer = answers[currentQuestion.id];

            if (currentQuestion.type === "text") {
                setInputValue(typeof currentAnswer === "string" ? currentAnswer : "");
                setSelectedChoices([]);
            } else if (currentQuestion.type === "choice") {
                setInputValue("");
                if (Array.isArray(currentAnswer)) {
                    setSelectedChoices(currentAnswer);
                } else if (typeof currentAnswer === "string") {
                    setSelectedChoices([currentAnswer]);
                } else {
                    setSelectedChoices([]);
                }
            }

            // Auto-focus input
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [currentQuestion, answers]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!currentQuestion) return;

        let valueToSubmit: string | string[];

        if (currentQuestion.type === "text") {
            if (!inputValue.trim() && currentQuestion.validation?.required) {
                return;
            }
            valueToSubmit = inputValue;
        } else {
            if (selectedChoices.length === 0) {
                return;
            }
            valueToSubmit = currentQuestion.allowMultiple ? selectedChoices : selectedChoices[0];
        }

        // Track question history for back button
        setQuestionHistory((prev) => [...prev, currentQuestion.id]);
        setDirection("forward");
        submitAnswer(currentQuestion.id, valueToSubmit);
    };

    const handleBack = () => {
        if (questionHistory.length > 0) {
            setDirection("backward");
            const previousQuestionId = questionHistory[questionHistory.length - 1];
            setQuestionHistory((prev) => prev.slice(0, -1));

            const previousQuestion = questionnaire.questions.find((q) => q.id === previousQuestionId);
            if (previousQuestion) {
                const currentAnswer = answers[previousQuestion.id];
                if (previousQuestion.type === "text") {
                    setInputValue(typeof currentAnswer === "string" ? currentAnswer : "");
                } else {
                    setSelectedChoices(Array.isArray(currentAnswer) ? currentAnswer : [currentAnswer as string]);
                }
            }
        }
    };

    const handleChoiceChange = (value: string) => {
        if (!currentQuestion || currentQuestion.type !== "choice") return;

        if (currentQuestion.allowMultiple) {
            setSelectedChoices((prev) =>
                prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            );
        } else {
            setSelectedChoices([value]);
            // Auto-submit for single choice
            setTimeout(() => {
                setQuestionHistory((prev) => [...prev, currentQuestion.id]);
                setDirection("forward");
                submitAnswer(currentQuestion.id, value);
            }, 300);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">A carregar...</p>
                </motion.div>
            </div>
        );
    }

    // Check if current question is the success message
    const isSuccessQuestion = currentQuestion.id === "success";

    const slideVariants = {
        enter: (direction: string) => ({
            x: direction === "forward" ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: string) => ({
            x: direction === "forward" ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-300 via-gray-200 to-blue-300">
            {/* Header with Progress */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full bg-white/90 backdrop-blur-md border-b border-pink-100 sticky top-16 z-10 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 py-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                            Pergunta {currentIndex + 1} de {totalQuestions}
                        </span>
                        <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                            {Math.round(progress)}% completo
                        </span>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute h-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 rounded-full shadow-lg"
                            style={{
                                boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentQuestion.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}>
                            <Card className="shadow-xl border-2 border-gray-100">
                                <CardHeader className="space-y-3">
                                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        {currentQuestion.title}
                                    </CardTitle>
                                    {currentQuestion.helperText && (
                                        <CardDescription className="text-base text-gray-600">
                                            {currentQuestion.helperText}
                                        </CardDescription>
                                    )}
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {!isSuccessQuestion && (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {currentQuestion.type === "text" ? (
                                                <div className="space-y-3">
                                                    <Label htmlFor="answer" className="text-base font-medium">
                                                        A tua resposta
                                                    </Label>
                                                    <Input
                                                        id="answer"
                                                        ref={inputRef}
                                                        value={inputValue}
                                                        onChange={(e) => setInputValue(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        placeholder={currentQuestion.placeholder || "Escreve aqui..."}
                                                        className="text-lg py-6"
                                                        required={currentQuestion.validation?.required}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {currentQuestion.allowMultiple ? (
                                                        <div className="space-y-3">
                                                            {currentQuestion.options.map((option) => (
                                                                <div
                                                                    key={option.value}
                                                                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 transition-all cursor-pointer"
                                                                    onClick={() => handleChoiceChange(option.value)}>
                                                                    <Checkbox
                                                                        id={option.value}
                                                                        checked={selectedChoices.includes(option.value)}
                                                                        onCheckedChange={() =>
                                                                            handleChoiceChange(option.value)
                                                                        }
                                                                    />
                                                                    <Label
                                                                        htmlFor={option.value}
                                                                        className="text-base font-medium cursor-pointer flex-grow">
                                                                        {option.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <RadioGroup
                                                            value={selectedChoices[0] || ""}
                                                            onValueChange={handleChoiceChange}
                                                            className="space-y-3">
                                                            {currentQuestion.options.map((option) => (
                                                                <div
                                                                    key={option.value}
                                                                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 transition-all cursor-pointer"
                                                                    onClick={() => handleChoiceChange(option.value)}>
                                                                    <RadioGroupItem
                                                                        value={option.value}
                                                                        id={option.value}
                                                                    />
                                                                    <Label
                                                                        htmlFor={option.value}
                                                                        className="text-base font-medium cursor-pointer flex-grow">
                                                                        {option.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="lg"
                                                    onClick={handleBack}
                                                    disabled={questionHistory.length === 0}
                                                    className="flex-shrink-0">
                                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                                    Voltar
                                                </Button>

                                                {(currentQuestion.type === "text" ||
                                                    currentQuestion.allowMultiple) && (
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        className="flex-grow bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                                                        disabled={
                                                            currentQuestion.type === "text"
                                                                ? !inputValue.trim()
                                                                : selectedChoices.length === 0
                                                        }>
                                                        Continuar
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    )}

                                    {isSuccessQuestion && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-center py-8 space-y-6">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                    delay: 0.3,
                                                }}>
                                                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                                            </motion.div>
                                            <div className="space-y-2">
                                                <p className="text-xl text-gray-700">
                                                    {questionnaire.finalMessages.success}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Helper Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-sm text-gray-500 mt-4">
                        {currentQuestion.type === "text" && "Pressiona Enter para continuar"}
                    </motion.p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

