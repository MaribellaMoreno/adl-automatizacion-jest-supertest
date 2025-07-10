const request = require('supertest');

const baseUrl = 'https://dummyjson.com';
const idProductoParaTest = 1;
 const product = {
            title: 'Iphone 18',
            price:500
        };

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

    //Prueva de inserción con POST
    test("Validar inserción de producto", async () => {
       
        const response = await request(baseUrl).post(`/products/add`).send(product);

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id");
        expect(response.body.price).toBe(product.price);
    });

    //Prueva actualizacion de producto con PUT
    test("Actualizacion de producto", async () => {
        const response = await request(baseUrl).patch(`/products/${idProductoParaTest}`).send(product);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toEqual(idProductoParaTest);
    });


});