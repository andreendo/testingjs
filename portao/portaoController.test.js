const Display = require('./display');
const Cancela = require('./cancela');
const AutomovelDAO = require('./automovelDAO');
const RegistroDAO = require('./registroDAO');
const PortaoController = require("./portaoController");

jest.mock("./display");
jest.mock("./cancela");
jest.mock("./automovelDAO");
jest.mock("./registroDAO");

beforeEach(() => {
    Display.mockClear();
    AutomovelDAO.mockClear();
    Cancela.mockClear();
    RegistroDAO.mockClear();

    AutomovelDAO.mockImplementation(() => {
        return {
            getByTagName : (tag) => {
                if(tag == "azyx")
                    return {placa : "ABC1234", proprietario : "Andre"};                

                return null;
            }
        };
    });

  });

it("returns false for a tag ERRO", () => {
    var controller = new PortaoController();
    expect( controller.abrir("ERRO") ).toBe(false);

    const mockDisplayInstance = Display.mock.instances[0];
    expect(mockDisplayInstance.limpar).toHaveBeenCalledTimes(1);
    expect(mockDisplayInstance.mostrarMsg).toHaveBeenCalledWith("Automovel nao possui TAG. Por favor voltar!");
});

it("returns false for an unknown tag", () => {
    var controller = new PortaoController();
    expect( controller.abrir("aaaa") ).toBe(false);

    const mockDisplayInstance = Display.mock.instances[0];
    expect(mockDisplayInstance.limpar).toHaveBeenCalledTimes(1);
    expect(mockDisplayInstance.mostrarMsg).toHaveBeenCalledWith("TAG desconhecida. Por favor, voltar!");
});

it("returns true for user andre", () => {    
    var controller = new PortaoController();
    expect( controller.abrir("azyx") ).toBe(true);

    const mockDisplayInstance = Display.mock.instances[0];
    expect(mockDisplayInstance.limpar).toHaveBeenCalledTimes(1);
    expect(mockDisplayInstance.mostrarMsg).toHaveBeenCalledWith("Bem-Vindo, Andre!");
    
    const mockCancela = Cancela.mock.instances[0];
    expect(mockCancela.levantar).toHaveBeenCalledTimes(1);

    const mockRegistroDAO = RegistroDAO.mock.instances[0];
    expect(mockRegistroDAO.registrarEntrada).toHaveBeenCalledWith("ABC1234", "Andre");
});