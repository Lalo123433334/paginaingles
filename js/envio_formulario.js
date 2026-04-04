'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');
    // Considera ofuscar esta URL a futuro si notas mucho spam, aunque el honeypot detendrá el 90%
    const scriptURL = 'https://script.google.com/macros/s/AKfycby-HdEN2BAYAMYRvVgF1IR-R-bxF9-uejJENUqsEPHNHkIpfo7bVn3-7gRVBcyBobToaQ/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // --- SEGURIDAD: Validación del Honeypot ---
            const botField = document.getElementById('bot_field').value;
            if (botField !== "") {
                // Es un bot. Simulamos éxito pero no enviamos nada.
                console.warn('Bot detectado y bloqueado silenciosamente.');
                form.reset();
                return;
            }

            const btn = form.querySelector('button');
            const inputs = form.querySelectorAll('input, select, textarea');

            // Estado de carga preventivo
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            inputs.forEach(input => input.disabled = true);

            // Saneamiento básico de datos (limpiar espacios extras)
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                if (typeof value === 'string') {
                    formData.set(key, value.trim());
                }
            }
            // Evitamos enviar el honeypot a tu Google Sheet
            formData.delete('bot_field');

            try {
                // Envío asíncrono
                await fetch(scriptURL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // Requerido para Google Scripts, aunque oculta el status de la respuesta
                });

                // Éxito UI
                btn.innerText = '¡Enviado!';
                btn.style.backgroundColor = '#4CAF50';

                mensajeExito.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });

                form.reset();

                // Limpiar después de 3 segundos
                setTimeout(() => {
                    mensajeExito.style.display = 'none';
                    btn.innerText = 'Pedir Información';
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    inputs.forEach(input => {
                        // Mantenemos el honeypot oculto y deshabilitado
                        if (input.id !== 'bot_field') input.disabled = false;
                    });
                }, 3000);

            } catch (error) {
                console.error('Error durante el envío:', error.message);
                alert('Hubo un problema de conexión. Por favor, intenta más tarde o contáctanos por WhatsApp.');

                // Restaurar UI en caso de error
                btn.innerText = 'Intentar nuevamente';
                btn.disabled = false;
                inputs.forEach(input => {
                    if (input.id !== 'bot_field') input.disabled = false;
                });
            }
        });
    }
});