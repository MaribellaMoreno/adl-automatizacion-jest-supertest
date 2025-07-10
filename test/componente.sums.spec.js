const { sumarNumeros } = require("../sumar")

//Definicion de set de pruebas 
describe("Verificar el componente de suma de 2 numeros", () => {
    test("Sumar dos números positivos", () => {
      const resultado = sumarNumeros(100,201);
      expect(resultado).toBe(301);
    });
});