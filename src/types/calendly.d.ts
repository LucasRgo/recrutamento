interface CalendlyBadgeOptions {
    url: string;
    text: string;
    color: string;
    textColor: string;
    branding: boolean;
}

interface CalendlyPopupOptions {
    url: string;
}

interface Calendly {
    initBadgeWidget: (options: CalendlyBadgeOptions) => void;
    initPopupWidget: (options: CalendlyPopupOptions) => boolean;
}

interface Window {
    Calendly?: Calendly;
}

