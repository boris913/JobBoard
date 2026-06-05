// src/app/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 sm:p-8 shadow-sm">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
          <h3 className="font-display text-xl font-semibold text-ink">Message envoyé !</h3>
          <p className="mt-2 text-sm text-stone-500 font-body">
            Merci pour votre message. Nous vous répondrons dès que possible.
          </p>
          <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
            Envoyer un autre message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5 font-body">
              Nom
            </label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5 font-body">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.fr"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5 font-body">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Décrivez votre question, suggestion ou bug..."
              className="w-full rounded-lg border border-stone-300 bg-white/80 px-3 py-2 text-sm text-ink placeholder:text-stone-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent resize-y font-body"
            />
          </div>
          <Button type="submit" loading={status === "loading"} className="w-full">
            <Send className="h-4 w-4" />
            Envoyer le message
          </Button>
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              Une erreur est survenue. Veuillez réessayer.
            </div>
          )}
        </form>
      )}
    </div>
  );
}