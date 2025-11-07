import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Info, Award } from "lucide-react";

export function Footer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const assetBase = import.meta.env.BASE_URL;

    return (
        <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-t border-pink-500/20 rounded-t-3xl">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
                    {/* Logo Section - Left Side */}
                    <div className="flex-shrink-0">
                        <div className="group">
                            <img
                                src={`${assetBase}favicon_io/logo_squared.jpeg`}
                                alt="DS INTERMEDIÁRIOS DE CRÉDITO"
                                className="h-32 w-auto rounded-2xl shadow-2xl ring-4 ring-pink-500/30 group-hover:ring-pink-500/60 transition-all duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Quote Section - Right Side */}
                    <div className="relative max-w-2xl">
                        <div className="absolute -left-2 top-0 text-6xl text-pink-500/20 font-serif">"</div>
                        <blockquote className="pl-8 pr-4">
                            <p className="text-gray-300 text-xl md:text-3xl font-light leading-tight italic text-center">
                                Transformamos carreiras e conectamos talentos com oportunidades extraordinárias.
                            </p>
                        </blockquote>
                        <div className="absolute -right-2 bottom-0 text-6xl text-pink-500/20 font-serif">"</div>
                    </div>
                </div>

                {/* Decorative Separator */}
                <div className="relative my-12">
                    <Separator className="bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-sm" />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-semibold text-gray-300">DS INTERMEDIÁRIOS DE CRÉDITO </span>
                            Todos os direitos reservados
                        </p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/30 hover:border-pink-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                                <Info className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
                                <span className="text-sm text-gray-300 group-hover:text-white font-medium transition-colors">
                                    Informação Legal
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                    Informação Legal
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 text-gray-700 leading-relaxed">
                                <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                                    <p className="text-sm">
                                        A <strong className="text-pink-700">"DS INTERMEDIÁRIOS DE CRÉDITO"</strong>{" "}
                                        é uma marca representada pela{" "}
                                        <strong className="text-pink-700">
                                            ACCOMPLISH NEW HEIGHTS – INTERMEDIÁRIOS DE CRÉDITO, LDA
                                        </strong>
                                        , Intermediário de Crédito Vinculado, com o registo nº.{" "}
                                        <strong>0006696</strong>, autorizada pelo Banco de Portugal para a
                                        prestação de serviços de consultoria e autorizado para a prestação de
                                        serviços de intermediação de crédito (Apresentação ou proposta de contratos
                                        de crédito a consumidores; Assistência a consumidores, mediante a
                                        realização de atos preparatórios ou de outros trabalhos de gestão
                                        pré-contratual relativamente a contratos de crédito que não tenham sido por
                                        si apresentados ou propostos).
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm">
                                        <strong className="text-gray-900">Contratos de crédito abrangidos:</strong>{" "}
                                        Crédito à Habitação e Crédito aos Consumidores.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm">
                                        <strong className="text-gray-900">
                                            Mutuantes ou grupos de mutuantes com quem mantém contrato de
                                            vinculação:
                                        </strong>{" "}
                                        BANCO BPI S.A, BANCO SANTANDER TOTTA, S.A, CAIXA GERAL DE DEPÓSITOS, S.A.,
                                        NOVO BANCO, S.A., BANCO CTT, S.A., BANKINTER, SA - SUCURSAL EM PORTUGAL,
                                        ABANCA CORPORACIÓN BANCARIA, SA, SUCURSAL EM PORTUGAL, UNICRE - INSTITUIÇÃO
                                        FINANCEIRA DE CRÉDITO, S.A., UNION DE CRÉDITOS INMOBILIÁRIOS, S.A.,
                                        ESTABLECIMIENTO FINANCIERO DE CRÉDITO (SOCIEDAD UNIPERSONAL) - SUCURSAL EM
                                        PORTUGAL, BANCO BIC PORTUGUÊS, SA, BNI - BANCO DE NEGÓCIOS INTERNACIONAL
                                        (EUROPA), S.A., COFIDIS
                                    </p>
                                </div>

                                <div className="pt-4 border-t-2 border-gray-200">
                                    <p className="text-sm mb-3 font-semibold text-gray-900">
                                        Informação verificável em:
                                    </p>
                                    <a
                                        href="https://www.bportugal.pt/intermediariocreditofar/accomplish-new-heights-intermediarios-de-credito-unipessoal-lda"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 underline break-all bg-pink-50 p-3 rounded-lg hover:bg-pink-100 transition-colors">
                                        <Info className="w-4 h-4 flex-shrink-0" />
                                        https://www.bportugal.pt/intermediariocreditofar/accomplish-new-heights-intermediarios-de-credito-unipessoal-lda
                                    </a>
                                </div>

                                <div className="pt-4 border-t-2 border-gray-200">
                                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-pink-500" />
                                        Parceiros:
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            "Banco BPI",
                                            "Santander Totta",
                                            "Caixa Geral de Depósitos",
                                            "Novo Banco",
                                            "Bankinter",
                                            "Abanca",
                                            "Unicre",
                                            "UCI",
                                            "Banco BIC",
                                            "Eurobic Abanca",
                                        ].map((partner, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm bg-white p-3 rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-sm transition-all">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full" />
                                                <span className="font-medium text-gray-700">{partner}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </footer>
    );
}
