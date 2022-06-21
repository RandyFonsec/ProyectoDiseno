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

    actualizarListaFranjas(req, id) {
        const lista = [];
        let lista2 = [];


        for (var i = 0; i < dias.length; i++) {
            if (req.body[dias[i]]) {
                for (var j = 0; j < periodos.length; j++) {
                    if (req.body[dias[i] + periodos[j]]) {
                        lista2 = [1, dias[i], periodos[j], id];
                    } else {
                        lista2 = [0, dias[i], periodos[j], id];
                    }
                    lista.push(lista2);
                    lista2 = [];
                }
            } else {
                for (var j = 0; j < periodos.length; j++) {
                    lista2 = [0, dias[i], periodos[j], id];
                    lista.push(lista2);
                    lista2 = [];
                }
            }
        }

        return lista;
    }

    intToDay(number) {
        switch (number) {
            case 0:
                return "l";
            case 1:
                return "k";
            case 2:
                return "m";
            case 3:
                return "j";
            case 4:
                return "v";
            case 5:
                return "s";
        }
    }

}

module.exports = Utils;