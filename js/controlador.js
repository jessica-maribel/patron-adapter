// ======================= CONTROLADOR ==========================
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

        const registro = { bloque: entrada.bloque, valor: dispositivo.leer() };
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
