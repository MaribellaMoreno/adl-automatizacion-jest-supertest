const { multiplicar } = require("../multiplicacion");
const { sumarNumeros } = require("../sumar")

//Definicion de set de pruebas 
describe("Verificar el componente de suma de 2 numeros", () => {
    test("Sumar dos números positivos", () => {
      const resultado = sumarNumeros(100,201);
      expect(resultado).toBe(301);
    });

    test("Sumar un número positivo y uno negativo", () => {
      const resultado = sumarNumeros(100,-50);
      expect(resultado).toBe(50);
    });

    test("Sumar 2 números sin validar tipo", () => {
      const resultado = sumarNumeros(1,"1");
      expect(resultado).toBe(2);
    });

    test("Multiplicar 2 números", () => {
      const resultado = multiplicar(5,5);
      expect(resultado).toBe(25);
    });
});