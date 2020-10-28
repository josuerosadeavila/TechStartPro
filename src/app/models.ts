export class Categories{
    id: string;
    nome: string;
}

export class Products{
    id: string;
    name: string;
    description: string;
    idCategory: string[];
    value: number;
}