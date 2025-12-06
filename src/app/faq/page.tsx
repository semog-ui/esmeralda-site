"use client";
import HeroPage from "@/components/HeroPage";
import { MessageCircleQuestionMark } from "lucide-react";
import FaqSection from "@/components/FaqSection";

export default function FaqPage() {
  return (
    <>
      <HeroPage
        title="Dúvidas Frequentes"
        description=""
        icon={MessageCircleQuestionMark}
        imageSrc="/hero-faq.jpg"
      />
      <FaqSection />
    </>
  );
}
