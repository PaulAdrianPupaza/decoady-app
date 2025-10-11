# 📧 Configuración de EmailJS para el Formulario de Contacto

## ¿Qué es EmailJS?

EmailJS es un servicio que permite enviar emails directamente desde el frontend sin necesidad de un servidor backend. Es perfecto para formularios de contacto y es **gratuito** hasta 200 emails por mes.

## 🚀 Pasos para Configurar EmailJS

### 1. Crear una Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar un Servicio de Email

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. **Anota el Service ID** que te proporciona

### 3. Crear una Plantilla de Email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

```
Asunto: Nuevo mensaje de contacto - {{subject}}

Hola,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Tipo de proyecto: {{project_type}}
Presupuesto: {{budget}}
Cuándo empezar: {{timeline}}

Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
```

4. **Anota el Template ID** que te proporciona

### 4. Obtener tu Public Key

1. Ve a "Account" → "General"
2. **Anota tu Public Key**

### 5. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Probar el Formulario

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Ve a `/contacto` en tu sitio
3. Llena el formulario y envíalo
4. Deberías recibir el email en tu bandeja de entrada

## 🔧 Configuración Avanzada

### Personalizar la Plantilla

Puedes personalizar la plantilla de email en EmailJS para que se vea más profesional:

- Usar HTML en lugar de texto plano
- Agregar tu logo
- Cambiar colores y estilos
- Agregar más campos si es necesario

### Límites de EmailJS

- **Plan Gratuito**: 200 emails por mes
- **Plan Pago**: Desde $15/mes para más emails
- **Rate Limiting**: Máximo 10 emails por minuto

### Seguridad

- Las claves públicas son seguras de usar en el frontend
- EmailJS valida los emails antes de enviarlos
- Puedes configurar dominios permitidos en la configuración

## 🐛 Solución de Problemas

### Error: "Invalid service ID"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Invalid template ID"
- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté publicada

### Error: "Invalid public key"
- Verifica que la Public Key sea correcta
- Asegúrate de que la cuenta esté activa

### No se reciben emails
- Revisa la carpeta de spam
- Verifica que el email de destino esté correcto
- Revisa los logs en EmailJS dashboard

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa la [documentación oficial de EmailJS](https://www.emailjs.com/docs/)
2. Verifica que todas las variables de entorno estén configuradas correctamente
3. Revisa la consola del navegador para errores específicos

## ✅ Verificación Final

Una vez configurado correctamente, deberías poder:

- [ ] Enviar emails desde el formulario de contacto
- [ ] Recibir emails en tu bandeja de entrada
- [ ] Ver los datos del formulario en el email
- [ ] Cambiar entre idiomas sin problemas
- [ ] Ver mensajes de éxito/error apropiados
