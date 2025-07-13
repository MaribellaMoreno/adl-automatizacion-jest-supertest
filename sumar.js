function sumarNumeros(numero1, numero2) {
    if (typeof numero1 != 'number' || typeof numero2 != 'number')
        throw Error("Solo aceptamos números");
    return numero1 + numero2;
}

module.exports = { sumarNumeros }