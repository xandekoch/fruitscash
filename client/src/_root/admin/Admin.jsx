import React, { useState, useEffect } from 'react';
import { getTransactions, getUsers, setBalance, setInfluencer } from '../../lib/node/adminApi';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchTransactions();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Erro ao obter transações:', error);
        }
    };

    const handleSetInfluencer = async (userId) => {
        try {
            await setInfluencer(userId);
            fetchUsers(); // Atualiza a lista de usuários após a alteração
        } catch (error) {
            console.error('Erro ao definir como influenciador:', error);
        }
    };

    const handleSetBalance = async (userId) => {
        try {
            await setBalance(userId);
            fetchUsers(); // Atualiza a lista de usuários após a alteração
        } catch (error) {
            console.error('Erro ao definir saldo:', error);
        }
    };

    return (
        <div>
            <h1>Administração</h1>
            <h2>Lista de Usuários</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - Influenciador: {user.isInfluencer ? 'Sim' : 'Não'} - Admin: {user.isAdmin ? 'Sim' : 'Não'}
                        <button onClick={() => handleSetInfluencer(user._id)}>Definir como Influenciador</button>
                        <button onClick={() => handleSetBalance(user._id)}>Definir Saldo</button>
                    </li>
                ))}
            </ul>
            <h2>Lista de Transações</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.amount} - {transaction.type} - {transaction.user}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
