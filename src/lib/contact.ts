import { siteConfig } from "@/data/site";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (data.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!EMAIL_RE.test(data.email.trim())) errors.email = "Informe um e-mail válido.";
  if (!data.subject.trim()) errors.subject = "Selecione um assunto.";
  if (data.message.trim().length < 10) errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
  return errors;
}

/**
 * Envia o formulário de contato.
 *
 * - Com `contact.formEndpoint` configurado (Formspree, Getform, API própria…):
 *   faz um POST JSON para o endpoint.
 * - Sem endpoint: abre o cliente de e-mail do visitante com a mensagem
 *   preenchida (mailto), garantindo que nenhuma mensagem seja perdida.
 */
export async function submitContact(data: ContactPayload): Promise<"sent" | "mailto"> {
  const endpoint = siteConfig.contact.formEndpoint;

  if (!endpoint) {
    const body = `${data.message}\n\n—\n${data.name}\n${data.email}`;
    const href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      `[Portfólio] ${data.subject}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    return "mailto";
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Falha no envio (${res.status})`);
  return "sent";
}
