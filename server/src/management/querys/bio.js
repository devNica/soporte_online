const bio = {
    LAP: (idtec, idregws) => {
        return `CALL LISTA_ATENCIONES_PARALELAS(${idtec}, ${idregws})`
    },

    PCC: (relatedid, sizeMatrix, idregws) => {
        return `CALL PROCEDIMIENTO_CALCULAR_COMPENSACION(${relatedid}, ${sizeMatrix}, ${idregws})`
    },

    PCDE: (sizeMatrix, compensation, idregws) => {
        return `CALL PROCEDIMIENTO_CALCULAR_DESEMPENO_ENTRELAZADO(${sizeMatrix}, ${compensation}, ${idregws})`
    },

    bio: (idtec, idcateqp, option) => {
        return `CALL CALCULATE_BIO(${idtec}, ${idcateqp}, ${option})`
    },
}

module.exports = bio;