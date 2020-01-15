function acharExtremos(v) {
    if (v == null) throw "vetor nao pode ser nulo";

    if (!v.length) throw "vetor nao pode ser vazio";

    const extremos = {
        maior: v[0],
        indiceMaior: 0,
        menor: v[0],
        indiceMenor: 0
    };

    for (let i = 1; i < v.length; i++) {
        if (v[i] > extremos.maior) {
            extremos.maior = v[i];
            extremos.indiceMaior = i;
        }

        if (v[i] < extremos.menor) {
            extremos.menor = v[i];
            extremos.indiceMenor = i;
        }
    }

    return extremos;
}

module.exports = acharExtremos;