import HeroPage from "@/components/HeroPage";
import { PhoneIcon } from "lucide-react";
import SectionContact from "@/components/SectionContact";

export default function ContactPage() {
  return (
    <>
      <HeroPage
        title="Contato"
        description="Entre em contato conosco para mais informações ou para agendar uma conversa."
        icon={PhoneIcon}
        imageSrc="/hero-sobre.jpg"
      />
      <div className="bg-cover bg-center">
        <SectionContact />
      </div>
    </>
  );
}
