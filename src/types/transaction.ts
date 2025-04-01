export type Transaction = {
    id: number;
    title: string;
    description?: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
}