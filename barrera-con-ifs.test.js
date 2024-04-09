class Barrera {
  constructor() {
    this.estaAlta = true
  }
  checkBaja() {
    return !this.estaAlta
  }
  checkAlto() {
    return this.estaAlta
  }
  bajar() {
    this.estaAlta = false
  }
  subir() {
    this.estaAlta = true
  }
}

class Sensor {
  constructor(unSistemaSeñalizacion) {
    this.sistemaSeñalizacion = unSistemaSeñalizacion
  }
  activar() {
    this.sistemaSeñalizacion.sensorActivado()
  }
  desactivar() {
    this.sistemaSeñalizacion.sensorDesactivado()
  }
}

class SistemaSeñalizacion {
  constructor(unaBarrera) {
    this.barrera = unaBarrera
  }
  sensorActivado() {
    if (this.barrera.checkAlto()) {
      this.barrera.bajar()
    }
  }
  sensorDesactivado() {
    if (this.barrera.checkBaja()) {
      this.barrera.subir()
    }
  }
}

const barrera = new Barrera()
const sistemaSeñalizacion = new SistemaSeñalizacion(barrera)
const sensor = new Sensor(sistemaSeñalizacion)

test('Si la barrera está alta y activo el sensor, tendria que bajarse', () => {
  barrera.subir()
  sensor.activar()
  expect(barrera.estaAlta).toBe(false)
})

test('Si la barrera está baja y desactivo el sensor, tendria que subir', () => {
  barrera.bajar()
  sensor.desactivar()
  expect(barrera.estaAlta).toBe(true)
})

test('Si la barrera está alta y desactivo el sensor tendria que seguir alta', () => {
  barrera.subir()
  sensor.desactivar()
  expect(barrera.estaAlta).toBe(true)
})

test('Si la barrera está baja y activo el sensor tendria que seguir baja', () => {
  barrera.subir()
  sensor.desactivar()
  expect(barrera.estaAlta).toBe(true)
})