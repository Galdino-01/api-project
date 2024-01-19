import { genSalt, hash, compare } from "bcryptjs";

const PASSWORD_COMPLEXITY = parseInt(process.env.PASSWORD_COMPLEXITY || '8');

const SALT_RANDOMS = PASSWORD_COMPLEXITY || 8;

const hashPassword = async (password: string) => {

    const saltGenerated = await genSalt(SALT_RANDOMS);

    return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword,
};
