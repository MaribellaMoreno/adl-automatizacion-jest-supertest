const request = require('supertest');

const baseUrl = 'https://dummyjson.com';
const idProductoParaTest = 1;

describe("Verificar Modelo Products de DummyJSON", () => {

    test("Validar código de retorno de consulta de productos", async () => {
        const response = await request(baseUrl).get("/products"); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.products).toBeInstanceOf(Array);
    });

    test("Validar que nombre del producto corresponda", async () => {
        const nombreEsperado = "Essence Mascara Lash Princess";
        
        const response = await request(baseUrl).get(`/products/${idProductoParaTest}`);
        expect(response.body.title).toBe(nombreEsperado);
    });
});