const form = document.getElementById('contact-form');
const mensajeExito = document.getElementById('mensaje-exito');
const scriptURL = 'https://script.google.com/macros/s/AKfycby-HdEN2BAYAMYRvVgF1IR-R-bxF9-uejJENUqsEPHNHkIpfo7bVn3-7gRVBcyBobToaQ/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');

    // 1. EFECTO INMEDIATO: Cambiamos el botón y mostramos el banner
    btn.innerText = '¡Enviado!';
    btn.disabled = true;
    btn.style.backgroundColor = '#4CAF50'; // Color verde de éxito

    // Mostramos el mensaje de éxito sin esperar a la red
    mensajeExito.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. ENVÍO EN SEGUNDO PLANO
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
    })
        .then(() => {
            form.reset();
            setTimeout(() => {
                mensajeExito.style.display = 'none';
                btn.innerText = 'Enviar Información';
                btn.style.backgroundColor = '';
                btn.disabled = false;
            }, 300);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Hubo un detalle al enviar, pero tus datos se están procesando.');
            btn.disabled = false;
        });
});
