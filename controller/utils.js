const dias = ['l', 'k', 'm', 'j', 'v', 's'];
const periodos = ['m', 't', 'n'];

class Utils {

    constructor() {}
    crearListaFranjas(id) {
        let listaSalida = [];
        for (var i = 0; i < dias.length; i++) {
            for (var j = 0; j < periodos.length; j++) {
                listaSalida.push([dias[i], periodos[j], 0, id]);
            }

        }

        return listaSalida;
    }


}

module.exports = Utils;