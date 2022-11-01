class ValidacaoUtils {

    static verificaNulo(valor, nome) {
        if (valor === null)
            throw new Error(`Campo ${nome} é obrigatório!`);
    }

    static verificaTamanhoMin(valor, nome, min) {
        if (valor.length < min)
            throw new Error(
                `O tamanho do campo ${nome} precisa ser maior que ${min} caracteres!`
            );
    }

    static verificaTamanhoMax(valor, nome, max) {
        if (valor.length > max)
            throw new Error(
                `O tamanho do campo ${nome} precisa ser menor que ${max} caracteres!`
            );
    }
}

export default ValidacaoUtils
