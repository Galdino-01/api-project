import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export const seed = async (knex: Knex) => {

    const [{ count }] = await knex(ETableNames.states_ddd).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count)> 0 ) return;

    const statesToInsert = dataList;
    await knex(ETableNames.states_ddd).insert(statesToInsert);
};

const dataList = [
    { estado: 'Distrito Federal', ddd: 61, estado_sigla: 'DF' },
    { estado: 'Goiás', ddd: 62, estado_sigla: 'GO' },
    { estado: 'Goiás', ddd: 64, estado_sigla: 'GO' },
    { estado: 'Mato Grosso', ddd: 65, estado_sigla: 'MT' },
    { estado: 'Mato Grosso', ddd: 66, estado_sigla: 'MT' },
    { estado: 'Mato Grosso do Sul', ddd: 67, estado_sigla: 'MS' },
    { estado: 'Alagoas', ddd: 82, estado_sigla: 'AL' },
    { estado: 'Bahia', ddd: 71, estado_sigla: 'BA' },
    { estado: 'Bahia', ddd: 73, estado_sigla: 'BA' },
    { estado: 'Bahia', ddd: 74, estado_sigla: 'BA' },
    { estado: 'Bahia', ddd: 75, estado_sigla: 'BA' },
    { estado: 'Bahia', ddd: 77, estado_sigla: 'BA' },
    { estado: 'Ceará', ddd: 85, estado_sigla: 'CE' },
    { estado: 'Ceará', ddd: 88, estado_sigla: 'CE' },
    { estado: 'Maranhão', ddd: 98, estado_sigla: 'MA' },
    { estado: 'Maranhão', ddd: 99, estado_sigla: 'MA' },
    { estado: 'Paraíba', ddd: 83, estado_sigla: 'PB' },
    { estado: 'Pernambuco', ddd: 81, estado_sigla: 'PE' },
    { estado: 'Pernambuco', ddd: 87, estado_sigla: 'PE' },
    { estado: 'Piauí', ddd: 86, estado_sigla: 'PI' },
    { estado: 'Piauí', ddd: 89, estado_sigla: 'PI' },
    { estado: 'Rio Grande do Norte', ddd: 84, estado_sigla: 'RN' },
    { estado: 'Sergipe', ddd: 79, estado_sigla: 'SE' },
    { estado: 'Acre', ddd: 68, estado_sigla: 'AC' },
    { estado: 'Amapá', ddd: 96, estado_sigla: 'AP' },
    { estado: 'Amazonas', ddd: 92, estado_sigla: 'AM' },
    { estado: 'Amazonas', ddd: 97, estado_sigla: 'AM' },
    { estado: 'Pará', ddd: 91, estado_sigla: 'PA' },
    { estado: 'Pará', ddd: 93, estado_sigla: 'PA' },
    { estado: 'Pará', ddd: 94, estado_sigla: 'PA' },
    { estado: 'Rondônia', ddd: 69, estado_sigla: 'RO' },
    { estado: 'Roraima', ddd: 95, estado_sigla: 'RR' },
    { estado: 'Tocantins', ddd: 63, estado_sigla: 'TO' },
    { estado: 'Espírito Santo', ddd: 27, estado_sigla: 'ES' },
    { estado: 'Espírito Santo', ddd: 28, estado_sigla: 'ES' },
    { estado: 'Minas Gerais', ddd: 31, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 32, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 33, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 34, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 35, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 37, estado_sigla: 'MG' },
    { estado: 'Minas Gerais', ddd: 38, estado_sigla: 'MG' },
    { estado: 'Rio de Janeiro', ddd: 21, estado_sigla: 'RJ' },
    { estado: 'Rio de Janeiro', ddd: 22, estado_sigla: 'RJ' },
    { estado: 'Rio de Janeiro', ddd: 24, estado_sigla: 'RJ' },
    { estado: 'São Paulo', ddd: 11, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 12, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 13, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 14, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 15, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 16, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 17, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 18, estado_sigla: 'SP' },
    { estado: 'São Paulo', ddd: 19, estado_sigla: 'SP' },
    { estado: 'Paraná', ddd: 41, estado_sigla: 'PR' },
    { estado: 'Paraná', ddd: 42, estado_sigla: 'PR' },
    { estado: 'Paraná', ddd: 43, estado_sigla: 'PR' },
    { estado: 'Paraná', ddd: 44, estado_sigla: 'PR' },
    { estado: 'Paraná', ddd: 45, estado_sigla: 'PR' },
    { estado: 'Paraná', ddd: 46, estado_sigla: 'PR' },
    { estado: 'Rio Grande do Sul', ddd: 51, estado_sigla: 'RS' },
    { estado: 'Rio Grande do Sul', ddd: 53, estado_sigla: 'RS' },
    { estado: 'Rio Grande do Sul', ddd: 54, estado_sigla: 'RS' },
    { estado: 'Rio Grande do Sul', ddd: 55, estado_sigla: 'RS' },
    { estado: 'Santa Catarina', ddd: 47, estado_sigla: 'SC' },
    { estado: 'Santa Catarina', ddd: 48, estado_sigla: 'SC' },
    { estado: 'Santa Catarina', ddd: 49, estado_sigla: 'SC' }
];
