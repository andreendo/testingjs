const Display = require('./display');
const Cancela = require('./cancela');
const AutomovelDAO = require('./automovelDAO');
const RegistroDAO = require('./registroDAO');

class PortaoController {
    constructor() {
        this.display = new Display();
        this.cancela = new Cancela();
        this.automovelDAO = new AutomovelDAO();
        this.registroDAO = new RegistroDAO();
    }

    abrir(tag) {
        this.display.limpar();
        if (tag === 'ERRO') {
            this.display.mostrarMsg('Automovel nao possui TAG. Por favor voltar!');
            return false;
        }

        const auto = this.automovelDAO.getByTagName(tag);
        if (auto === null) {
            this.display.mostrarMsg('TAG desconhecida. Por favor, voltar!');
            return false;
        }

        this.display.mostrarMsg(`Bem-Vindo, ${auto.proprietario}!`);
        this.cancela.levantar();
        this.registroDAO.registrarEntrada(auto.placa, auto.proprietario);
        return true;
    }
}

module.exports = PortaoController;