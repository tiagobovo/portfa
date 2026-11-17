"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, LoaderCircle, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { submitContact, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { Reveal, RevealText } from "./AnimationWrapper";

type Status = "idle" | "submitting" | "sent" | "mailto" | "error";

const initial: ContactPayload = { name: "", email: "", subject: "", message: "" };

const fieldBase =
  "peer w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-background placeholder:text-background/35 transition-colors duration-300 focus:outline-none focus:ring-0";

export default function Contact() {
  const { contact, socials } = siteConfig;
  const [data, setData] = useState<ContactPayload>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof ContactPayload) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot anti-spam: bots preenchem este campo oculto
    if ((form.elements.namedItem("company") as HTMLInputElement | null)?.value) return;

    const found = validateContact(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitContact(data);
      setStatus(result);
      if (result === "sent") setData(initial);
    } catch {
      setStatus("error");
    }
  }

  const borderFor = (key: keyof ContactPayload) =>
    errors[key] ? "border-accent" : "border-background/25 focus:border-background";

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-foreground py-24 text-background md:py-36">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-x-5 border-t border-background/20 pt-8">
          <p className="eyebrow col-span-12 text-background/55 md:col-span-3">{contact.eyebrow}</p>
          <h2
            id="contact-title"
            className="col-span-12 mt-6 text-[clamp(3rem,8.5vw,8rem)] leading-[0.9] font-medium tracking-[-0.05em] text-balance md:col-span-9 md:mt-0"
          >
            <RevealText onView lines={[contact.heading]} />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-16 md:mt-24">
          {/* Informações */}
          <Reveal className="col-span-12 space-y-10 md:col-span-5 lg:col-span-4">
            <p className="max-w-sm text-lg text-background/70 text-pretty">{contact.text}</p>

            <div>
              <p className="eyebrow text-background/55">E-mail</p>
              <a
                href={`mailto:${contact.email}`}
                className="group mt-3 inline-flex items-center gap-2 text-2xl font-medium tracking-tight break-all md:text-[1.75rem]"
              >
                <span className="link-underline">{contact.email}</span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div>
              <p className="eyebrow text-background/55">Telefone</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={contact.phone.href} className="text-2xl font-medium tracking-tight md:text-[1.75rem]">
                  <span className="link-underline">{contact.phone.display}</span>
                </a>
                <a
                  href={contact.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-background/30 px-4 py-2 text-sm transition-colors duration-300 hover:border-background hover:bg-background hover:text-foreground"
                >
                  WhatsApp
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {socials.length > 0 && (
            <div>
              <p className="eyebrow text-background/55">Redes</p>
              <ul className="mt-3 divide-y divide-background/15 border-y border-background/15">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="text-lg">{s.label}</span>
                      <span className="flex items-center gap-2 text-sm text-background/55 transition-colors group-hover:text-background">
                        {s.handle}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </Reveal>

          {/* Formulário */}
          <Reveal delay={0.1} className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-10 sm:grid-cols-2" aria-describedby="form-status">
              <div className="absolute -left-[9999px]" aria-hidden>
                <label htmlFor="company">Empresa</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Field label="Nome" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={data.name}
                  onChange={update("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${fieldBase} ${borderFor("name")}`}
                />
              </Field>

              <Field label="E-mail" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={data.email}
                  onChange={update("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${fieldBase} ${borderFor("email")}`}
                />
              </Field>

              <Field label="Assunto" id="subject" error={errors.subject} className="sm:col-span-2">
                <div role="radiogroup" aria-labelledby="subject-label" className="flex flex-wrap gap-2 pt-3">
                  {contact.subjects.map((s) => {
                    const active = data.subject === s;
                    return (
                      <label
                        key={s}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                          active
                            ? "border-background bg-background text-foreground"
                            : "border-background/25 hover:border-background"
                        }`}
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={s}
                          checked={active}
                          onChange={update("subject")}
                          className="sr-only"
                        />
                        {s}
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field label="Mensagem" id="message" error={errors.message} className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Conte um pouco sobre o projeto, prazos e objetivos."
                  value={data.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldBase} resize-none ${borderFor("message")}`}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 rounded-full bg-background py-4 pr-5 pl-7 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-accent hover:text-background disabled:opacity-60"
                >
                  {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
                  {status === "submitting" ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </motion.button>

                <div id="form-status" role="status" aria-live="polite" className="text-sm">
                  <AnimatePresence mode="wait">
                    {status === "sent" && (
                      <StatusMessage key="sent">
                        <Check className="size-4 text-accent" /> Mensagem enviada. Obrigado!
                      </StatusMessage>
                    )}
                    {status === "mailto" && (
                      <StatusMessage key="mailto">
                        <Check className="size-4 text-accent" /> Abrimos seu app de e-mail com a mensagem pronta.
                      </StatusMessage>
                    )}
                    {status === "error" && (
                      <StatusMessage key="error">
                        Não foi possível enviar. Tente novamente ou escreva para {contact.email}.
                      </StatusMessage>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  className = "",
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label id={`${id}-label`} htmlFor={id === "subject" ? undefined : id} className="eyebrow text-background/55">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusMessage({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 text-background/80"
    >
      {children}
    </motion.p>
  );
}
