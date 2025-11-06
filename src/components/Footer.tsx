import { Separator } from "./ui/separator";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: '#EC4899' }}>
              RecruitPro
            </h2>
            <p className="text-gray-600 text-sm">
              Transformamos carreiras e conectamos talentos com oportunidades extraordinárias.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-pink-500 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-pink-500 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-pink-500 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#carreiras" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#testemunhos" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Testemunhos
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Recrutamento
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Formação Profissional
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Mentoria
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Consultoria de Carreira
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-sm">
                  Suporte Contínuo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#EC4899' }} />
                <span>Avenida da Liberdade, 1250-096 Lisboa, Portugal</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#EC4899' }} />
                <a href="tel:+351210000000" className="hover:text-pink-500 transition-colors">
                  +351 210 000 000
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#EC4899' }} />
                <a href="mailto:info@recruitpro.pt" className="hover:text-pink-500 transition-colors">
                  info@recruitpro.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} RecruitPro. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

