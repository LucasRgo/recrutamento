type FormDataPayload = Record<string, unknown>;

const url = "https://script.google.com/macros/s/AKfycbx5wmGKOli9zkWRMGitcFRSrjZQ90EKiDKco3HWZQ0-6UfxS4vwd9UQzWZNPdtbZQicyQ/exec";

export async function sendResponses(formData: FormDataPayload) {
    const payload = {
        ...formData,
        origem: window.location.href,
        userAgent: navigator.userAgent,
    };

    console.log("Respostas registradas:", JSON.stringify(payload, null, 2));

    const formBody = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        formBody.append(key, String(value));
    });

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody,
        });
        console.log("Enviado com sucesso");
    } catch (error) {
        console.error("Erro no envio:", error);
    }
}