'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzzeSC7pyIqM_JmeYyIqPquabmkQhUOnXk5UccNKkb357hpkhBvrpqarImPCX0lKGyVTg/exec';


    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Verificación de seguridad (Honeypot)
            const botField = document.getElementById('bot_field').value;
            if (botField !== "") {
                form.reset();
                return;
            }

            const btn = form.querySelector('button');
            const inputs = form.querySelectorAll('input, select, textarea');

            // UI: Estado de carga
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // 2. Preparación de datos
            const datosParaEnviar = new URLSearchParams();
            datosParaEnviar.append('nombre', document.getElementById('nombre').value.trim());
            datosParaEnviar.append('email', document.getElementById('email').value.trim());
            datosParaEnviar.append('telefono', document.getElementById('telefono').value.trim());
            datosParaEnviar.append('curso', document.getElementById('curso').value);
            datosParaEnviar.append('mensaje', document.getElementById('mensaje').value.trim());

            try {
                // 3. Envío
                await fetch(scriptURL, {
                    method: 'POST',
                    body: datosParaEnviar,
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                // Éxito
                btn.innerText = '¡Enviado!';
                btn.style.backgroundColor = '#4CAF50';
                mensajeExito.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                form.reset();

                setTimeout(() => {
                    mensajeExito.style.display = 'none';
                    btn.innerText = 'Pedir Información';
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar. Intenta por WhatsApp.');
                btn.disabled = false;
                btn.innerText = 'Reintentar';
            }
        });
    }
});