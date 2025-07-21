'use client'

import {useEffect, useState} from "react";
import { Button } from "ui";
import PanelExpense from "@/components/blocks/panel-expense";
import PanelIncome from "@/components/blocks/panel-income";
import {
    IconBook,
    IconBuilding,
    IconCar,
    IconCreditCard,
    IconHeart,
    IconShoppingBag,
    IconWallet,
    IconCookies,
    IconUmbrella
} from "justd-icons";
import {Transaction} from "@/types/transaction";

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "react-aria-1":
            return <IconBuilding className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-2":
            return <IconCar className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-3":
            return <IconCookies className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-4":
            return <IconCreditCard className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-5":
            return <IconHeart className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-6":
            return <IconBook className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-7":
            return <IconUmbrella className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        case "react-aria-8":
            return <IconShoppingBag className="size-10 border rounded-lg p-2 bg-neutral-800" />;
        default:
            return <IconWallet className="size-10 border rounded-lg p-2 bg-neutral-800" />;
    }
};

export default function Home() {
    const [money, setMoney] = useState(0);
    const [isIncomePanelVisible, setIsIncomePanelVisible] = useState(false);
    const [isExpensePanelVisible, setIsExpensePanelVisible] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function isMoneyNegative() {
        return money < 0;
    }

    function toggleIncome() {
        setIsIncomePanelVisible(prev => !prev);
    }

    function toggleExpense() {
        setIsExpensePanelVisible(prev => !prev);
    }

    useEffect(() => {
        const storedMoney = localStorage.getItem("money");
        const storedTransactions = localStorage.getItem("transactions");

        if (storedMoney) {
            setMoney(parseFloat(storedMoney));
        }

        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
            console.log(storedTransactions);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("money", JSON.stringify(money));
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [money, transactions]);

    return (
        <>
            {isIncomePanelVisible && (
                <PanelIncome isShow={isIncomePanelVisible} onClose={toggleIncome} money={money} setIncomes={setMoney} transactions={transactions} />
            )}
            {isExpensePanelVisible && (
                <PanelExpense isShow={isExpensePanelVisible} onClose={toggleExpense} money={money} setExpenses={setMoney} transactions={transactions} />
            )}
            <div className='mx-auto items-center justify-center min-h-screen flex flex-col'>
                <h1 className='text-[75px] mb-4' style={{ fontFamily: "Darlington" }}>Money Track</h1>
                <h2
                    className={`text-3xl font-bold ${isMoneyNegative() ? 'text-red-600' : 'text-green-600'}`}
                    id='current-money'
                >
                    {money >= 0 ? `+${money.toFixed(2)}€` : `${money.toFixed(2)}€`}
                </h2>
                <div className='flex items-center justify-center max-w-lg w-full mt-4 gap-2'>
                    <Button
                        intent='outline'
                        className='w-1/3 hover:bg-green-600 transition-all duration-300'
                        onPress={toggleIncome}
                    >
                        Add income
                    </Button>
                    <Button
                        intent='outline'
                        className='w-1/3 hover:bg-red-600 transition-all duration-300'
                        onPress={toggleExpense}
                    >
                        Add expense
                    </Button>
                </div>

                {transactions
                    .sort((a, b) => b.id - a.id)
                    .map((transaction: Transaction) => (
                    <div className="flex justify-center items-center w-full" key={transaction.id}>
                        <div className="max-w-lg w-full flex flex-col items-center">
                            <div className="bg-neutral-950 p-4 rounded-xl flex items-center justify-between w-3/4 mt-2 border">
                                <div className="flex items-center gap-3">
                                    {getCategoryIcon(transaction.category)}
                                    <div className="leading-tight ml-2">
                                        <h2 className="text-base font-bold">{transaction.title}</h2>
                                        <p className="text-sm text-neutral-400">{transaction.description}</p>
                                    </div>
                                </div>
                                <div className={`${transaction.type === 'income' ? 'bg-green-900/50' : 'bg-red-900/50'} flex flex-col items-center justify-center text-right bg-green-900/50 rounded-lg py-1 px-2`}>
                                    <h2 className={`${transaction.type === 'income' ? 'text-green-700' : 'text-red-700'} font-bold`}>
                                        {transaction.type === 'income' ? '+' : '-'}
                                        {transaction.amount}
                                        €
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
