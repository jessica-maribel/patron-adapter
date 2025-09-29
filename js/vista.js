// ======================= VISTA ==========================
class Vista {
    constructor() {
        this.formulario = document.getElementById('formularioTemperatura');
        this.lista = document.getElementById('listaTemperaturas');
    }

    mostrarTemperaturas(temperaturas) {
        this.lista.innerHTML = '';
        temperaturas.forEach(reg => {
            let li = document.createElement('li');
            li.textContent = `Bloque ${reg.bloque}: ${reg.valor.toFixed(2)} °C`;
            this.lista.appendChild(li);
        });
    }

    obtenerEntrada() {
        return {
            bloque: document.getElementById('bloque').value,
            dispositivo: document.getElementById('dispositivo').value,
            valor: parseFloat(document.getElementById('valor').value)
        };
    }

    limpiarFormulario() { this.formulario.reset(); }

    escucharEnvio(callback) {
        this.formulario.addEventListener('submit', e => { e.preventDefault(); callback(); });
    }
}
