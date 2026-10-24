// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await renderizarCurricula();
});

// Función asíncrona para el Módulo 1 (Perfil Profesional)
async function cargarPerfil(idPerfil) {
    const caja = document.getElementById('resultado-perfil');
    caja.style.display = 'block';
    caja.innerHTML = "Cargando datos del perfil...";

    try {
        let respuesta = await fetch('data.json');
        if (!respuesta.ok) throw new Error("No se pudo cargar la información.");
        
        let datos = await respuesta.json();
        let perfilEncontrado = datos.perfiles.find(p => p.id === idPerfil);

        if (perfilEncontrado) {
            caja.innerHTML = `<strong>¡Perfil Ideal: ${perfilEncontrado.titulo}!</strong> ${perfilEncontrado.descripcion}`;
        } else {
            caja.innerHTML = "Perfil no encontrado.";
        }
    } catch (error) {
        caja.innerHTML = "Error al procesar la solicitud asíncrona.";
        console.error(error);
    }
}

// Función asíncrona para renderizar el Módulo 2 (Curricula)
async function renderizarCurricula() {
    const contenedor = document.getElementById('timeline-container');
    
    try {
        let respuesta = await fetch('data.json');
        let datos = await respuesta.json();
        
        contenedor.innerHTML = "";
        datos.modulos.forEach(mod => {
            let item = document.createElement('div');
            item.className = 'timeline-item mb-3';
            item.innerHTML = `
                <h6 class="fw-bold text-dark mb-1">${mod.semestre}: ${mod.fase}</h6>
                <p class="text-muted small mb-0">${mod.detalle}</p>
            `;
            contenedor.appendChild(item);
        });
    } catch (error) {
        console.error("Error cargando la currícula:", error);
    }
}

// Función asíncrona para desplegar la información al hacer clic en las imágenes del Módulo 3
async function cargarInstalacion(idInstalacion) {
    const caja = document.getElementById('resultado-instalacion');
    caja.style.display = 'block';
    caja.innerHTML = "Cargando información institucional...";

    try {
        let respuesta = await fetch('data.json');
        if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor de datos.");
        
        let datos = await respuesta.json();
        let encontrado = datos.instalaciones.find(i => i.id === idInstalacion);

        if (encontrado) {
            let htmlEquipos = '';
            if (encontrado.equipos) {
                encontrado.equipos.forEach(eq => {
                    htmlEquipos += `
                        <div class="card bg-white border-0 p-2 mb-2 shadow-sm">
                            <strong class="text-primary">${eq.nombre} (${eq.reto})</strong>
                            <span class="text-dark"><strong>Integrantes:</strong> ${eq.integrantes}</span>
                            <span class="text-muted italic">${eq.asesor}</span>
                        </div>
                    `;
                });
            }

            caja.innerHTML = `
                <h6 class="fw-bold text-dark mb-2">${encontrado.titulo}</h6>
                <p class="mb-2 text-dark">${encontrado.descripcion}</p>
                ${htmlEquipos}
            `;
        } else {
            caja.innerHTML = "Información no encontrada.";
        }
    } catch (error) {
        caja.innerHTML = "Error al procesar la solicitud asíncrona.";
        console.error(error);
    }
}