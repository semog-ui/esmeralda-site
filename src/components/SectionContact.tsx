import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";

const SectionContact = () => (
  <div className="min-h-screen flex items-center justify-center py-16">
    <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0">
      <b className="text-muted-foreground uppercase font-semibold text-sm">
        Entre Em Contato
      </b>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
        Vamos Construir um Brilho, Uma Ideia
      </h2>
      <p className="mt-3 text-base sm:text-lg text-muted-foreground">
        Seja para uma conversa, um projeto ou apenas para conversar.
      </p>
      <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
              <MailIcon />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Email</h3>
            <p className="my-2.5 text-muted-foreground">
              Entre em contato comigo.
            </p>
            <Link
              className="font-medium text-primary"
              href="mailto:contato@esmeraldacompany.com.br"
            >
              contato@esmeraldacompany.com.br
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
              <MessageCircle />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Agendamento</h3>
            <p className="my-2.5 text-muted-foreground">Vamos conversar.</p>
            <Link className="font-medium text-primary" href="#">
              Agendar uma Conversa
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
              <PhoneIcon />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Contato</h3>
            <p className="my-2.5 text-muted-foreground">
              Um Novo Conceito, começa com um &quot;Olá&quot;
            </p>
            <Link
              className="font-medium text-primary"
              href="tel:+5544984313307"
            >
              +55 44 98431-3307
            </Link>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-accent shadow-none py-0">
          <CardContent className="p-6 md:p-8">
            <form>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    placeholder="Nome"
                    id="firstName"
                    className="mt-2 bg-white h-10 shadow-none"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="mt-2 bg-white h-10 shadow-none"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Mensagem"
                    className="mt-2 bg-white shadow-none"
                    rows={6}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox id="acceptTerms" className="bg-background" />
                  <Label htmlFor="acceptTerms" className="gap-0">
                    Você concorda com nossos
                    <Link href="/termos" className="underline ml-1">
                      termos e condições
                    </Link>
                    <span>.</span>
                  </Label>
                </div>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default SectionContact;
