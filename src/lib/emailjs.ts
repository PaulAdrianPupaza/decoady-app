import emailjs from "@emailjs/browser";

const config = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

export async function sendEmail(params: Record<string, string>): Promise<boolean> {
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    console.error("EmailJS no está configurado: revisa las variables NEXT_PUBLIC_EMAILJS_*");
    return false;
  }
  try {
    await emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
    return true;
  } catch (error) {
    console.error("Error enviando el formulario:", error);
    return false;
  }
}
