const request = require('supertest');
const { app, server } = require('../app');

const persona = {
    nombre: 'Maria',
    apellido: 'Lopez',
    edad: 28
}
let personaId
    //Registrar una persona
describe('Validar creación persona', () => {
    test('Inserción de persona', async () => {
        const response = await request(app).post('/personas').send(persona) //Inserción persona con post
        expect(response.statusCode).toBe(201) //Validar código 201
        expect(response.body).toHaveProperty('id') //Validar que retorne id
        personaId = response.body.id
        expect(response.body.nombre).toBe(persona.nombre) //Validar que el nombre enviado sea el mismo retornado
    })
})
    //Consultar todas las personas
describe('Validar consulta de personas', () => {
    test('Consulta de todas las personas', async () => {
        const response = await request(app).get('/personas') //Consulta de data con get
        expect(response.body).toBeInstanceOf(Array) //Validar que retorne un array
        expect(response.body).not.toHaveLength(0) //Validar que el arreglo no esté vacío
        expect(response.statusCode).toBe(200) //Validar retorno código 200
    })
})
    //Consultar la persona que inserté
describe('Validar consulta de personas insertadas', () => {
    test('Consulta de persona insertada', async () => {
        const response = await request(app).get(`/personas/${personaId}`) //Consulta de persona insertada
        expect(response.body.id).toBe(personaId) //Validar id de persona
        expect(response.body).toBeInstanceOf(Object)//Validar retorno un objeto
    })
})
    //Actualizar la persona
describe('Validar actualizacion de personas', () => {
    test('Consulta de persona actualizada', async () => {
        const response = await request(app).put(`/personas/${personaId}`).send({
            nombre: 'Mariana', //Actualización nombre
            apellido: 'Vega' //Actualización apellido
        })
        expect(response.body.nombre).toBe('Mariana') //Validar actualización nombre de persona
        expect(response.body.apellido).toBe('Vega') //Validar actualización apellido de persona
    })
})
    //Borrar la persona
describe('Validar borrado de persona insertada', () => {
    test('Debe borrar la persona y retornar codigo 204', async () => {
        const response = await request(app).delete(`/personas/${personaId}`)
        expect(response.statusCode).toBe(204) //Validar que el código de retorno sea 204
    })
})
    //Consultar todas las personas
describe('Validar arreglo vacío al consultar personas', () => {
    test('Debe retornar un arreglo vacío', async () => {
        const response = await request(app).get('/personas/')
        expect(response.statusCode).toBe(200) //Validar que responde correctamente
        expect(Array.isArray(response.body)).toBe(true) //Validar que es un arreglo
        expect(response.body).toHaveLength(0) //Validar que el arreglo está vacío
    })
})
    afterAll((done) => {
        // 3. Al final de todo, cerramos el servidor para que Jest no se quede colgado.
        console.log("--- [afterAll] Cerrando servidor ---");
        server.close(done);
    });

