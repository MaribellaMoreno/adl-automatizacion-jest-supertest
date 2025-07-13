const { sumarNumeros } = require("../sumar");

//Definición del set de pruebas
describe("Verificar el componente de suma de numeros", () => {
    test("Sumar dos números positivos", () => {
        const resultado = sumarNumeros(100, 201);
        expect(resultado).toBe(301);
    });

    test("Sumar un número positivo y uno negativo", () => {
        const resultado = sumarNumeros(100, -50);
        expect(resultado).toBe(50);
    });

    test("Sumar 2 numeros sin validar tipo", () => {
        const resultado = sumarNumeros(1, "1");
        expect(resultado).toBe(2);
    });
});