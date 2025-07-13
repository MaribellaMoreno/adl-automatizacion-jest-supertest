const request = require('supertest')
const { app, server } = require('../app')

const persona = {
  nombre: 'Pepito',
  apellido: 'Juan',
  edad: 20,
}

let personaId

// 1. Registrar una persona.
describe('Validar creacion de una persona en el JSON', () => {
  test('Deberia retornar codigo 400 con datos incompletos', async () => {
    const response = await request(app).post('/personas').send({})

    expect(response.statusCode).toBe(400)
  })

  test('Deberia crear una persona', async () => {
    const response = await request(app).post('/personas').send(persona)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('id')
    personaId = response.body.id
    expect(response.body.nombre).toBe(persona.nombre)
  })
})

// 2. Consultar todas las personas.
describe('Verificar modelo personas en API Propia', () => {
  test('Deberia retornar todas las personas', async () => {
    const response = await request(app).get('/personas')

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).not.toHaveLength(0)
    expect(response.statusCode).toBe(200)
  })
})

// 3. Consultar la persona que inserté
describe('Validar la persona que se ingresa', () => {
  test('Deberia retornar la persona creada anteriormente', async () => {
    const response = await request(app).get(`/personas/${personaId}`)

    expect(response.body.id).toBe(personaId)
    expect(response.body).toBeInstanceOf(Object)
  })
})

// 4. Actualizar la persona.
describe('Validar la actualizacion de una persona', () => {
  test('Deberia retornar la persona actualizada', async () => {
    const response = await request(app).put(`/personas/${personaId}`).send({
      nombre: 'Vicente',
    })

    expect(response.body.nombre).toBe('Vicente')
  })
})

// 5. Borrar la persona.
describe('Validar el borrado de la persona en el registro', () => {
  test('Deberia retornar codigo 404 con usuario no registrado', async () => {
    const response = await request(app).delete(/personas/65465459665)

    expect(response.status).toBe(404)
  }) /*  */

  test('Deberia retornar un status 204', async () => {
    const response = await request(app).delete(`/personas/${personaId}`)

    expect(response.status).toBe(204)
  })
})

// 6. Consultar todas las personas.
describe('Verificar modelo personas en API Propia', () => {
  test('Deberia retornar un array vacio', async () => {
    const response = await request(app).get('/personas')

    expect(response.body).toHaveLength(0)
  })

  afterAll((done) => {
    // 3. Al final de todo, cerramos el servidor para que Jest no se quede colgado.
    console.log('--- [afterAll] Cerrando servidor ---')
    server.close(done)
  })
})