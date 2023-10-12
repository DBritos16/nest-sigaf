export const generateCode = () => {
    let code = '';

    for (let i = 0; i < 6; i++) {
        const numeroAleatorio = Math.floor(Math.random() * 10); // Genera un número aleatorio entre 0 y 9
        code += numeroAleatorio.toString(); // Convierte el número en una cadena y lo agrega al código
    }

    return code;
};
