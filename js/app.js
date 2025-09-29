
class TemperaturaModelo {
    constructor() {
        this.temperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];
    }

    guardarTemperatura(registro) {
        this.temperaturas.push(registro);
        localStorage.setItem('temperaturas', JSON.stringify(this.temperaturas));
    }

    obtenerTemperaturas() {
        return this.temperaturas;
    }
}

// Clases de dispositivos
class DispositivoC {
    constructor(valor) {
        this.valor = valor;
    }

    leer() {
        return this.valor; // Devuelve °C directamente
    }
}

class DispositivoF {
    constructor(valor) {
        this.valor = valor;
    }

    leer() {
        return this.valor; // Devuelve °F
    }
}

// Adapter para Fahrenheit -> Celsius
class AdapterFahrenheit {
    constructor(dispositivoF) {
        this.dispositivoF = dispositivoF;
    }

    leer() {
        let f = this.dispositivoF.leer();
        return (f - 32) * 5 / 9; // Convertir a °C
    }
}


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

    limpiarFormulario() {
        this.formulario.reset();
    }

    escucharEnvio(callback) {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}


class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.vista.escucharEnvio(this.registrarTemperatura.bind(this));
        this.vista.mostrarTemperaturas(this.modelo.obtenerTemperaturas());
    }

    registrarTemperatura() {
        const entrada = this.vista.obtenerEntrada();

        let dispositivo;
        if (entrada.dispositivo === 'celsius') {
            dispositivo = new DispositivoC(entrada.valor);
        } else {
            dispositivo = new AdapterFahrenheit(new DispositivoF(entrada.valor));
        }

        const registro = {
            bloque: entrada.bloque,
            valor: dispositivo.leer()
        };

        this.modelo.guardarTemperatura(registro);
        this.vista.mostrarTemperaturas(this.modelo.obtenerTemperaturas());
        this.vista.limpiarFormulario();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const modelo = new TemperaturaModelo();
    const vista = new Vista();
    const controlador = new Controlador(modelo, vista);
});
