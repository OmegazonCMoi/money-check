import { useState } from "react";
import { Select } from "@/components/ui/select";
import { Button, TextField } from "ui";
import { IconX } from "justd-icons";
import {Transaction} from "@/types/transaction";

type PanelExpenseProps = {
    isShow: boolean;
    onClose: () => void;
    money: number;
    setExpenses: (value: number) => void;
    transactions?: Transaction[];
};

const PanelExpense = ({ isShow, onClose, money, setExpenses, transactions }: PanelExpenseProps) => {
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string | null>(null);

    if (!isShow) return null;

    const handleAddExpense = () => {
        const expenseValue = parseFloat(amount);
        if (!isNaN(expenseValue) && expenseValue > 0) {
            setExpenses(money - expenseValue);
            transactions?.push({
                id: Date.now(),
                title: title,
                description: description,
                category: category || "",
                amount: Number(amount),
                type: 'expense',
            });
            setAmount("");
            onClose();
        }
    };

    return (
        <div className="absolute h-[33.5em] w-[25em] bg-[#0f0f0f] rounded-[1em] p-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 border border-neutral-900">
            <div className='flex justify-between'>
                <div>
                    <h1 className="text-2xl font-bold">Add Expense</h1>
                    <p className="mt-1 text-neutral-400">Here you can add an expense.</p>
                </div>
                <IconX className='mt-2 size-5 cursor-pointer' onClick={onClose} />
            </div>
            <div>
                <TextField
                    placeholder='Enter a title'
                    label='Title'
                    className="mt-4"
                    value={title}
                    isRequired
                    onChange={e => setTitle(e)}
                />
                <Select
                    label="Category"
                    placeholder="Select a category"
                    className="w-full mt-4"
                    isRequired
                    onSelectionChange={(key) => setCategory(String(key))}
                >
                    <Select.Trigger className="w-full" />
                    <Select.List>
                        <Select.Option key="Logement">Logement</Select.Option>
                        <Select.Option key="Transport">Transport</Select.Option>
                        <Select.Option key="Alimentation">Alimentation</Select.Option>
                        <Select.Option key="Factures">Factures</Select.Option>
                        <Select.Option key="Santé">Santé</Select.Option>
                        <Select.Option key="Éducation">Éducation</Select.Option>
                        <Select.Option key="Loisirs & Divertissements">Loisirs & Divertissements</Select.Option>
                        <Select.Option key="Shopping">Shopping</Select.Option>
                        <Select.Option key="Divers">Divers</Select.Option>
                    </Select.List>
                </Select>
                <TextField
                    placeholder='Enter a description'
                    label='Description'
                    className="mt-4"
                    value={description}
                    onChange={e => setDescription(e)}
                />
                <TextField
                    placeholder='Enter an amount'
                    label='Amount'
                    className="mt-4"
                    value={amount}
                    isRequired
                    onChange={e => setAmount(e)}
                />
                <Button className='w-full mt-8' intent='outline' onPress={handleAddExpense}>
                    Add
                </Button>
            </div>
        </div>
    );
};

export default PanelExpense;
