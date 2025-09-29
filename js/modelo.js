// ======================= MODELO ==========================
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

// Dispositivos
class DispositivoC {
    constructor(valor) { this.valor = valor; }
    leer() { return this.valor; }
}

class DispositivoF {
    constructor(valor) { this.valor = valor; }
    leer() { return this.valor; }
}

// Adapter Fahrenheit -> Celsius
class AdapterFahrenheit {
    constructor(dispositivoF) { this.dispositivoF = dispositivoF; }
    leer() { return (this.dispositivoF.leer() - 32) * 5/9; }
}
