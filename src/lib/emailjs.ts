import emailjs from '@emailjs/browser'

// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxxxxxx',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxxxx',
}

// Función para enviar email
export const sendEmail = async (templateParams: Record<string, string | number>) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )
    
    console.log('Email sent successfully:', result)
    return { success: true, result }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// Inicializar EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey)
}
