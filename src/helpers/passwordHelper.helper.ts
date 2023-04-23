import * as bcrypt from 'bcrypt';


async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Define o número de rounds para o algoritmo de hash
    const salt = await bcrypt.genSalt(saltRounds); // Gera um salt aleatório
    const hash = await bcrypt.hash(password, salt); // Cria o hash da senha com o salt gerado
    return hash;
}


async function comparePass(sendPassword, repositoryPassword) {
    return await bcrypt.compare(sendPassword, repositoryPassword);
}
export {hashPassword, comparePass}