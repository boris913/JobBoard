// src/app/contact/page.tsx
import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — JobBoard",
  description: "Une question, une suggestion ou un bug à signaler ? Contactez l'équipe JobBoard.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg text-stone-500 font-body leading-relaxed">
            Une question sur le produit, une suggestion d&apos;amélioration, ou simplement envie de dire bonjour ?
            Nous lisons chaque message.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink">Email</div>
                <a href="mailto:hello@jobboard.app" className="text-sm text-stone-500 hover:text-accent transition-colors font-body">
                  hello@jobboard.app
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink">Feedback</div>
                <p className="text-sm text-stone-500 font-body">
                  Utilisez le formulaire ci-contre pour les rapports de bug et les idées.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-stone-200 bg-white/60 p-6">
            <h3 className="font-display text-sm font-semibold text-ink mb-3">Temps de réponse</h3>
            <p className="text-sm text-stone-500 font-body">
              Nous répondons généralement sous 24-48h ouvrées. Pour les bugs critiques, priorité maximale.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}