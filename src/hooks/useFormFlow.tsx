import { useCallback, useEffect, useMemo, useState } from "react";

import { questionnaire, type Question, type QuestionId } from "../Data/Questions";

type AnswerValue = string | string[];

type AnswersMap = Partial<Record<QuestionId, AnswerValue>>;

type FormFlowStatus = "inProgress" | "completed" | "disqualified";

type FormFlowState = {
    currentQuestionId: QuestionId | null;
    answers: AnswersMap;
    status: FormFlowStatus;
    disqualifyMessage: string | null;
};

const LOCAL_STORAGE_KEY = "form-flow-state";

const getFirstQuestionId = (): QuestionId | null =>
    questionnaire.questions.length > 0 ? questionnaire.questions[0].id : null;

const findQuestionById = (id: QuestionId | null): Question | null => {
    if (!id) return null;
    return questionnaire.questions.find((question) => question.id === id) ?? null;
};

const INITIAL_STATE: FormFlowState = {
    currentQuestionId: getFirstQuestionId(),
    answers: {},
    status: "inProgress",
    disqualifyMessage: null,
};

const isAnswerValue = (value: unknown): value is AnswerValue => {
    if (typeof value === "string") return true;
    if (Array.isArray(value)) return value.every((entry) => typeof entry === "string");
    return false;
};

const readStateFromStorage = (): FormFlowState => {
    if (typeof window === "undefined") return INITIAL_STATE;

    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return INITIAL_STATE;

    try {
        const parsed = JSON.parse(stored) as Partial<FormFlowState> | null;

        if (!parsed || typeof parsed !== "object") {
            return INITIAL_STATE;
        }

        const status: FormFlowStatus =
            parsed.status === "completed" || parsed.status === "disqualified" ? parsed.status : "inProgress";

        const maybeQuestionId = typeof parsed.currentQuestionId === "string" ? parsed.currentQuestionId : null;
        const questionExists = maybeQuestionId ? findQuestionById(maybeQuestionId) !== null : false;
        const currentQuestionId =
            status === "inProgress"
                ? questionExists
                    ? maybeQuestionId
                    : getFirstQuestionId()
                : questionExists
                ? maybeQuestionId
                : status === "completed"
                ? findQuestionById("success")?.id ?? null
                : null;

        const answers: AnswersMap =
            Array.isArray(parsed.answers) || typeof parsed.answers !== "object" || !parsed.answers
                ? {}
                : Object.entries(parsed.answers).reduce<AnswersMap>((acc, [key, value]) => {
                      if (
                          isAnswerValue(value) &&
                          questionnaire.questions.some((question) => question.id === key)
                      ) {
                          acc[key as QuestionId] = value;
                      }
                      return acc;
                  }, {});

        const disqualifyMessage =
            status === "disqualified" && typeof parsed.disqualifyMessage === "string"
                ? parsed.disqualifyMessage
                : null;

        return {
            currentQuestionId,
            answers,
            status,
            disqualifyMessage,
        };
    } catch (error) {
        console.warn("Failed to parse stored form flow state", error);
        return INITIAL_STATE;
    }
};

const writeStateToStorage = (state: FormFlowState) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

const resolveNextQuestion = (
    question: Question,
    value: AnswerValue
): { nextQuestionId: QuestionId | null; disqualifyMessage: string | null; status: FormFlowStatus } => {
    if (question.type === "text") {
        const nextQuestionId = question.nextQuestion ?? null;
        const status: FormFlowStatus =
            nextQuestionId === null || nextQuestionId === "success" ? "completed" : "inProgress";

        return {
            nextQuestionId,
            disqualifyMessage: null,
            status,
        };
    }

    const selectedValues = Array.isArray(value) ? value : [value];

    const selectedOptions = question.options.filter((option) => selectedValues.includes(option.value));

    const disqualifyingOption = selectedOptions.find((option) => option.disqualifyMessage);
    if (disqualifyingOption) {
        return {
            nextQuestionId: null,
            disqualifyMessage: disqualifyingOption.disqualifyMessage ?? null,
            status: "disqualified",
        };
    }

    if (!selectedOptions.length) {
        return {
            nextQuestionId: question.id,
            disqualifyMessage: null,
            status: "inProgress",
        };
    }

    const nextOption = question.allowMultiple
        ? selectedOptions.find((option) => option.nextQuestion)
        : selectedOptions[0];

    const nextQuestionId = nextOption?.nextQuestion ?? null;
    const status: FormFlowStatus =
        nextQuestionId === null || nextQuestionId === "success" ? "completed" : "inProgress";

    return {
        nextQuestionId,
        disqualifyMessage: null,
        status,
    };
};

export const useFormFlow = () => {
    const [state, setState] = useState<FormFlowState>(() => readStateFromStorage());

    useEffect(() => {
        writeStateToStorage(state);
    }, [state]);

    const currentQuestion = useMemo(() => findQuestionById(state.currentQuestionId), [state.currentQuestionId]);

    const submitAnswer = useCallback((questionId: QuestionId, value: AnswerValue) => {
        setState((previous) => {
            if (previous.status !== "inProgress") {
                return previous;
            }

            const question = findQuestionById(questionId);
            if (!question) {
                return previous;
            }

            let normalizedValue: AnswerValue = value;
            if (question.type === "choice") {
                if (question.allowMultiple) {
                    const entries = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
                    normalizedValue = entries;
                } else {
                    normalizedValue = Array.isArray(value) ? value[0] ?? "" : value;
                }
            } else if (typeof value !== "string") {
                normalizedValue = typeof value === "number" ? String(value) : "";
            }

            const answers: AnswersMap = {
                ...previous.answers,
                [question.id]: normalizedValue,
            };

            const { nextQuestionId, disqualifyMessage, status } = resolveNextQuestion(question, normalizedValue);

            if (status === "disqualified") {
                return {
                    currentQuestionId: null,
                    answers,
                    status,
                    disqualifyMessage: disqualifyMessage ?? questionnaire.finalMessages.disqualified ?? null,
                };
            }

            if (status === "completed") {
                const successQuestion = findQuestionById("success")?.id ?? null;
                return {
                    currentQuestionId: successQuestion,
                    answers,
                    status,
                    disqualifyMessage: null,
                };
            }

            return {
                currentQuestionId: nextQuestionId,
                answers,
                status,
                disqualifyMessage: null,
            };
        });
    }, []);

    const reset = useCallback(() => {
        setState(INITIAL_STATE);
    }, []);

    const finalMessage = useMemo(() => {
        if (state.status === "completed") {
            return questionnaire.finalMessages.success;
        }

        if (state.status === "disqualified") {
            return state.disqualifyMessage ?? questionnaire.finalMessages.disqualified ?? null;
        }

        return null;
    }, [state.status, state.disqualifyMessage]);

    return {
        currentQuestion,
        answers: state.answers,
        status: state.status,
        disqualifyMessage: state.disqualifyMessage,
        finalMessage,
        submitAnswer,
        reset,
    };
};

export type UseFormFlowReturn = ReturnType<typeof useFormFlow>;
