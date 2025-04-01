import { useState } from "react";
import { Select } from "@/components/ui/select";
import { Button, TextField } from "ui";
import { IconX } from "justd-icons";
import { Transaction } from "@/types/transaction";

type PanelIncomeProps = {
    isShow: boolean;
    onClose: () => void;
    money: number;
    setIncomes: (value: number) => void;
    transactions?: Transaction[];
};

const PanelIncome = ({ isShow, onClose, money, setIncomes, transactions }: PanelIncomeProps) => {
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    if (!isShow) return null;

    const addIncome = () => {
        const value = parseFloat(amount);
        if (!isNaN(value) && value > 0) {
            setIncomes(money + value);
            transactions?.push({
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                amount: Number(amount),
                type: 'income',
            });
            setAmount("");
            setTitle("");
            setDescription("");
            setCategory("");
            onClose();
        }
    };

    return (
        <div className="absolute h-[33.5em] w-[25em] bg-[#0f0f0f] rounded-[1em] p-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 border border-neutral-900">
            <div className='flex justify-between'>
                <div>
                    <h1 className="text-2xl font-bold">Add Income</h1>
                    <p className="mt-1 text-neutral-400">Here you can add an income.</p>
                </div>
                <IconX className='mt-2 size-5 cursor-pointer' onClick={onClose} />
            </div>
            <div>
                <TextField
                    placeholder='Enter a title'
                    label='Title'
                    className="mt-4"
                    value={title}
                    isRequired={true}
                    onChange={e => setTitle(e)}
                />
                <Select
                    label='Category'
                    placeholder='Select a category'
                    className="w-full mt-4"
                    onSelectionChange={(key) => setCategory(String(key))}
                >
                    <Select.Trigger className="w-full" />
                    <Select.List>
                        <Select.Option key="Salaire">Salaire</Select.Option>
                        <Select.Option key="Investissements">Investissements</Select.Option>
                        <Select.Option key="Remboursements & Aides">Remboursements & Aides</Select.Option>
                        <Select.Option key="Gains divers">Gains divers</Select.Option>
                        <Select.Option key="Business & Freelance">Business & Freelance</Select.Option>
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
                    onChange={(e) => setAmount(e)}
                />
                <Button className='w-full mt-8' intent='outline' onPress={addIncome}>
                    Add
                </Button>
            </div>
        </div>
    );
}

export default PanelIncome;