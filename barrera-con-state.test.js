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
    this.estado = unaBarrera.checkAlto() ? new EstadoBarreraAlta() : new EstadoBarreraBaja()
  }
  sensorActivado() {
    this.estado.sensorActivado(this.barrera)
    this.estado = new EstadoBarreraAlta()
  }
  sensorDesactivado() {
    this.estado.sensorDesactivado(this.barrera)
    this.estado = new EstadoBarreraBaja()
  }
}

class EstadoBarrera {
  sensorActivado() {}
  sensorDesactivado() {}
}

class EstadoBarreraBaja extends EstadoBarrera {
  sensorDesactivado(barrera) {
    barrera.subir()
  }
}

class EstadoBarreraAlta extends EstadoBarrera {
  sensorActivado(barrera) {
    barrera.bajar()
  }
}


test('Si la barrera está alta y activo el sensor, tendria que bajarse', () => {
  const barrera = new Barrera()
  barrera.subir()
  const sistemaSeñalizacion = new SistemaSeñalizacion(barrera)
  const sensor = new Sensor(sistemaSeñalizacion)

  sensor.activar()
  expect(barrera.estaAlta).toBe(false)
})

test('Si la barrera está baja y desactivo el sensor, tendria que subir', () => {
  const barrera = new Barrera()
  barrera.bajar()
  const sistemaSeñalizacion = new SistemaSeñalizacion(barrera)
  const sensor = new Sensor(sistemaSeñalizacion)

  sensor.desactivar()
  expect(barrera.estaAlta).toBe(true)
})

test('Si la barrera está alta y desactivo el sensor tendria que seguir alta', () => {
  const barrera = new Barrera()
  barrera.subir()
  const sistemaSeñalizacion = new SistemaSeñalizacion(barrera)
  const sensor = new Sensor(sistemaSeñalizacion)

  sensor.desactivar()
  expect(barrera.estaAlta).toBe(true)
})

test('Si la barrera está baja y activo el sensor tendria que seguir baja', () => {
  const barrera = new Barrera()
  barrera.bajar()
  const sistemaSeñalizacion = new SistemaSeñalizacion(barrera)
  const sensor = new Sensor(sistemaSeñalizacion)

  sensor.activar()
  expect(barrera.estaAlta).toBe(false)
})
