const request = require('supertest');
require('dotenv').config();


const product = {
    title: 'Iphone 18',
    price: 500
};

describe("Verificar Modelo Products de DummyJSON", () => {

    test("Validar código de retorno de consulta de productos", async () => {
        const response = await request(process.env.BASE_URL).get("/products");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.products).toBeInstanceOf(Array);
    });

    test("Validar que el nombre del producto corresponda", async () => {
        const nombreEsperado = "Essence Mascara Lash Princess";
        const response = await request(process.env.BASE_URL).get(`/products/${process.env.ID_PRODUCTO_PRUEBA}`);
        expect(response.body.title).toBe(nombreEsperado);
    });

    test("Validar inserción de producto", async () => {


        const response = await request(process.env.BASE_URL).post(`/products/add`).send(product);

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id");
        expect(response.body.price).toBe(product.price);
    });

    test("Actualización de producto", async () => {
        const response = await request(process.env.BASE_URL).patch(`/products/${process.env.ID_PRODUCTO_PRUEBA}`).send(product);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toEqual(Number(process.env.ID_PRODUCTO_PRUEBA));

    });

    test("Borrado de producto", async () => {
        const response = await request(process.env.BASE_URL).delete(`/products/${process.env.ID_PRODUCTO_PRUEBA}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("isDeleted", true);
        expect(response.body.id).toEqual(Number(process.env.ID_PRODUCTO_PRUEBA));
    });

});