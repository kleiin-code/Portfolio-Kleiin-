document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    implementarNavegacionSuave();

    // Validación del formulario
    const formularioContacto = document.querySelector('#contacto form');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', validarFormulario);
    }

    // Manejo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

function implementarNavegacionSuave() {
    const enlaces = document.querySelectorAll('a[href^="#"]');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            destino.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function validarFormulario(e) {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    let isValid = true;

    if (!nombre.value.trim()) {
        mostrarError(nombre, 'El nombre es requerido');
        isValid = false;
    } else {
        limpiarError(nombre);
    }

    if (!email.value.trim()) {
        mostrarError(email, 'El email es requerido');
        isValid = false;
    } else if (!validarEmail(email.value)) {
        mostrarError(email, 'El email no es válido');
        isValid = false;
    } else {
        limpiarError(email);
    }

    if (!mensaje.value.trim()) {
        mostrarError(mensaje, 'El mensaje es requerido');
        isValid = false;
    } else {
        limpiarError(mensaje);
    }

    if (!isValid) {
        e.preventDefault();
    }
}

function mostrarError(elemento, mensaje) {
    const mensajeError = elemento.parentElement.querySelector('.error-message');
    if (mensajeError) {
        mensajeError.textContent = mensaje;
    } else {
        const nuevoMensaje = document.createElement('div');
        nuevoMensaje.className = 'error-message';
        nuevoMensaje.textContent = mensaje;
        elemento.parentElement.appendChild(nuevoMensaje);
    }
    elemento.classList.add('input-error');
}

function limpiarError(elemento) {
    const mensajeError = elemento.parentElement.querySelector('.error-message');
    if (mensajeError) {
        mensajeError.remove();
    }
    elemento.classList.remove('input-error');
}

function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
