export type QuestionId =
    | "name"
    | "email"
    | "location"
    | "education"
    | "jobStatus"
    | "peopleSkills"
    | "motivation"
    | "attitude"
    | "success";

type BaseQuestion = {
    id: QuestionId;
    title: string;
    helperText?: string;
};

export type TextQuestion = BaseQuestion & {
    type: "text";
    placeholder?: string;
    validation?: {
        pattern?: RegExp;
        required?: boolean;
        customError?: string;
    };
    nextQuestion?: QuestionId | null;
};

export type AnswerOption = {
    value: string;
    label: string;
    nextQuestion?: QuestionId | null;
    disqualifyMessage?: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
    type: "choice";
    options: AnswerOption[];
    allowMultiple?: boolean;
};

export type Question = TextQuestion | MultipleChoiceQuestion;

export type Questionnaire = {
    questions: Question[];
    finalMessages: {
        success: string;
        disqualified?: string;
    };
};

export const questionnaire: Questionnaire = {
    questions: [
        {
            id: "name",
            type: "text",
            title: "Qual é o teu nome?",
            helperText: "Primeiro e último nome",
            validation: { required: true },
            nextQuestion: "email",
        },
        {
            id: "email",
            type: "text",
            title: "Qual é o teu email?",
            validation: { required: true },
            nextQuestion: "location",
        },
        {
            id: "location",
            type: "text",
            title: "Em que zona do país vives?",
            validation: { required: true },
            nextQuestion: "education",
        },
        {
            id: "education",
            type: "choice",
            title: "Qual é o teu nível de escolaridade?",
            options: [
                { value: "9-ano", label: "9.º Ano", nextQuestion: "jobStatus" },
                { value: "12-ano", label: "12.º Ano", nextQuestion: "jobStatus" },
                { value: "licenciatura", label: "Licenciatura", nextQuestion: "jobStatus" },
                { value: "mestrado", label: "Mestrado", nextQuestion: "jobStatus" },
            ],
        },
        {
            id: "jobStatus",
            type: "choice",
            title: "Qual a tua situação profissional no momento?",
            options: [
                {
                    value: "comercial",
                    label: "Empregado no Sector Comercial / Bancário",
                    nextQuestion: "peopleSkills",
                },
                {
                    value: "other-employed",
                    label: "Empregado noutra área",
                    nextQuestion: "peopleSkills",
                },
                {
                    value: "unemployed",
                    label: "Desempregado mas à procura de oportunidade",
                    nextQuestion: "peopleSkills",
                },
                { value: "entrepreneur", label: "Empreendedor / Freelancer", nextQuestion: "peopleSkills" },
                { value: "other", label: "Outro", nextQuestion: "peopleSkills" },
            ],
        },
        {
            id: "peopleSkills",
            type: "choice",
            title: "Como te descreverias em termos de relação com pessoas?",
            options: [
                { value: "extrovert", label: "Extrovertido e Comunicativo", nextQuestion: "motivation" },
                { value: "funny", label: "Bem Humorado", nextQuestion: "motivation" },
                { value: "calm", label: "Calmo e Empático", nextQuestion: "motivation" },
                {
                    value: "reserved",
                    label: "Reservado",
                    nextQuestion: null,
                    disqualifyMessage:
                        "Agradecemos o teu interesse, mas este projeto exige forte interação com clientes. Desejamos-te muito sucesso!",
                },
                {
                    value: "no-public-contact",
                    label: "Prefiro Trabalhos sem contacto com o público",
                    nextQuestion: null,
                    disqualifyMessage:
                        "Agradecemos o teu interesse, mas este projeto exige forte interação com clientes. Desejamos-te muito sucesso!",
                },
            ],
        },
        {
            id: "motivation",
            type: "choice",
            title: "O que te motiva mais?",
            options: [
                {
                    value: "fixed-income",
                    label: "Ter rendimento fixo e estável",
                    nextQuestion: null,
                    disqualifyMessage:
                        "Esta função baseia-se em comissões e liberdade total — não é o fit ideal neste momento. Desejamos-te o melhor sucesso na tua carreira.",
                },
                {
                    value: "freedom",
                    label: "Ter liberdade e ganhos proporcionais ao meu esforço",
                    nextQuestion: "attitude",
                },
                {
                    value: "targets",
                    label: "Trabalhar por objetivos e resultados",
                    nextQuestion: "attitude",
                },
            ],
        },
        {
            id: "attitude",
            type: "choice",
            title: "Como descreverias a tua atitude profissional?",
            options: [
                {
                    value: "ambitious",
                    label: "Ambicioso e orientado para resultados",
                    nextQuestion: "success",
                },
                {
                    value: "proactive",
                    label: "Proativo e gosto de desafios",
                    nextQuestion: "success",
                },
                {
                    value: "stability",
                    label: "Gosto de estabilidade e rotina",
                    nextQuestion: null,
                    disqualifyMessage:
                        "Esta oportunidade requer um perfil muito virado para relações comerciais e resultados. Pelas tuas respostas, talvez não seja o melhor encaixe neste momento. Desejamos-te o maior sucesso na tua carreira.",
                },
                {
                    value: "takes-orders",
                    label: "Prefiro que me digam o que fazer.",
                    nextQuestion: null,
                    disqualifyMessage:
                        "Esta oportunidade requer um perfil muito virado para relações comerciais e resultados. Pelas tuas respostas, talvez não seja o melhor encaixe neste momento. Desejamos-te o maior sucesso na tua carreira.",
                },
            ],
        },
        {
            id: "success",
            type: "choice",
            title: "Excelente! 👏",
            helperText: "O teu perfil enquadra-se perfeitamente na função de Gestor de Crédito.",
            options: [],
        },
    ],
    finalMessages: {
        success: "Excelente! 👏 O teu perfil enquadra-se perfeitamente na função de Gestor de Crédito.",
        disqualified:
            "Obrigado pelo teu interesse! Neste momento não temos uma oportunidade alinhada com o teu perfil, mas convidamos-te a manter contacto connosco para futuras vagas.",
    },
};

export const isDisqualifyingAnswer = (question: Question, value: string): string | null => {
    if (question.type !== "choice") return null;
    const option = question.options.find((opt) => opt.value === value);
    return option?.disqualifyMessage ?? null;
};
