'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');
    const scriptURL = 'https://script.google.com/macros/s/AKfycby-HdEN2BAYAMYRvVgF1IR-R-bxF9-uejJENUqsEPHNHkIpfo7bVn3-7gRVBcyBobToaQ/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const inputs = form.querySelectorAll('input, select, textarea');

            // Estado de carga
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            inputs.forEach(input => input.disabled = true); // Bloqueamos el form

            try {
                // Envío asíncrono
                await fetch(scriptURL, {
                    method: 'POST',
                    body: new FormData(form),
                    mode: 'no-cors'
                });

                // Éxito: Mostrar UI
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
                    inputs.forEach(input => input.disabled = false); // Desbloqueamos
                }, 3000);

            } catch (error) {
                console.error('Error durante el envío:', error.message);
                alert('Hubo un problema de conexión, pero tus datos se están procesando.');

                // Restaurar estado en caso de error
                btn.innerText = 'Intentar nuevamente';
                btn.disabled = false;
                inputs.forEach(input => input.disabled = false);
            }
        });
    }
});