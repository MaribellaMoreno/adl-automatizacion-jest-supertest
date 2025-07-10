const request = require('supertest');

describe("Verificar Modelo Products de DummyJSON", () => {

    test("Validar código de retorno de consulta de productos", async () => {
        const response = await request('https://dummyjson.com').get("/products"); 
        expect(response.statusCode).toBe(200);
    })
})