const acharExtremos = require("./utilitario");

it("thows an exception for null", () => {
    expect( () => { acharExtremos(null); } ).toThrowError("vetor nao pode ser nulo");
});

it("throws an exception for undefined", () => {
    expect( () => { 
        var a;
        acharExtremos(a); } ).toThrowError("vetor nao pode ser nulo");
});

it("throws an exception for empty array", () => {
    expect( () => { 
        var v = [];
        acharExtremos(v); } ).toThrowError("vetor nao pode ser vazio");
});

it("returns extremos for ordered array with 3 elements", () => {
    var v = [1, 2, 3];
    expect( acharExtremos(v) ).toEqual({maior : 3, indiceMaior : 2, menor : 1, indiceMenor : 0});
});

it("returns extremos for desc ordered array with 3 elements", () => {
    var v = [3, 2, 1];
    expect( acharExtremos(v) ).toEqual({maior : 3, indiceMaior : 0, menor : 1, indiceMenor : 2});
});