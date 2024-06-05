import { getBalance } from "../lib/node/userApi";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { createAffiliateWithdraw, getWithdrawals } from "../lib/node/transactionApi";

const withdrawSchema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' }),
    value: z.string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: 'Valor deve ser um número válido' })
        .refine(value => parseFloat(value) >= 50, { message: 'Saque mínimo de R$50,00' })
});

const Payout = () => {
    const { user: { userId } } = useAuth();
    const [balance, setBalance] = useState({});
    const [isPending, setIsPending] = useState(false);
    const [withdrawals, setWithdrawals] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchedBalance = await getBalance();
            setBalance(fetchedBalance);

            const fetchedWithdrawals = await getWithdrawals('affiliateWithdraw');
            setWithdrawals(fetchedWithdrawals);
        };

        fetchData();
    }, [isPending]);


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(withdrawSchema)
    });

    const onSubmit = async (data) => {
        setIsPending(true);

        const { value, cpf, name } = data;
        const operationAmount = parseFloat(value.replace(",", "."));
        const cleanedCpf = cpf.replace(/[^\d]/g, '');

        try {
            if (userId && operationAmount >= 50) {
                if (balance.revShareBalance + balance.cpaBalance >= operationAmount) {
                    await createAffiliateWithdraw(operationAmount, cleanedCpf, name);
                    toast.success("Saque solicitado com sucesso");
                    reset();
                } else {
                    toast.error('Saldo Afiliado Insuficiente');
                }
            } else {
                toast.error('Valor inferior a R$ 50');
            }
        } catch (error) {
            console.error("Erro ao sacar:", error);
            toast.error("Saldo insuficiente.");
        }

        setIsPending(false);
    };

    return (
        <>
            <section id="hero" className="hero-section dark wf-section">
                <div className="minting-container w-container">
                    <img
                        src="/assets/payout/with.gif"
                        width={240}
                        alt="Roboto #6340"
                        className="mint-card-image"
                    />
                    <h2>Saque Afiliado</h2>
                    <p>
                        PIX: saques instantâneos com muita praticidade. <br />
                    </p>
                    <form id="f-eWallet-payout2" onSubmit={handleSubmit(onSubmit)} method="post">
                        <div className="properties">
                            <h4 className="rarity-heading">Nome do destinatário:</h4>
                            <div className="rarity-row roboto-type2">
                                <input
                                    type="text"
                                    className="large-input-field w-input"
                                    maxLength={256}
                                    placeholder="Nome do Destinatario"
                                    {...register('name')}
                                />
                                {errors.name && <p className="error-message">{errors.name.message}</p>}
                            </div>
                            <h4 className="rarity-heading">Chave PIX CPF:</h4>
                            <div className="rarity-row roboto-type2">
                                <InputMask
                                    mask="999.999.999-99"
                                    className="large-input-field w-input cpf-mask"
                                    placeholder="Seu número de CPF"
                                    {...register('cpf')}
                                />
                                {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
                            </div>
                            <h4 className="rarity-heading">
                                Valor:<br />
                                (SALDO CPA: R$ <b className="saldo"> {balance.cpaBalance}</b>)<br />
                                (SALDO REVSHARE: R$<b className="saldo"> {balance.revShareBalance}</b>)
                            </h4>
                            <div className="rarity-row roboto-type2">
                                <input
                                    type="text"
                                    className="large-input-field w-input"
                                    placeholder="Saque minimo de R$50,00"
                                    {...register('value')}
                                />
                                {errors.value && <p className="error-message">{errors.value.message}</p>}
                            </div>
                        </div>
                        <div className="">
                            <button
                                type="submit"
                                id="pixgenerator"
                                className="primary-button w-button"
                                disabled={isPending}
                            >
                                <div style={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: "center" }}>
                                    {isPending && <Loader />}
                                    Sacar via PIX
                                </div>
                            </button>
                            <br />
                            <br />
                            <p>
                                Ao solicitar saque você concorda com os
                                <a href="/terms"> termos de serviço</a>.
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            <div id="rarity" className="rarity-section wf-section">
                <div className="minting-container w-container">
                    <img
                        src="/assets/payout/withdraw.gif"
                        width={240}
                        alt="Robopet 6340"
                        className="mint-card-image"
                    />
                    <h2>Histórico financeiro afiliado</h2>
                    <p className="paragraph">
                        As retiradas para sua conta bancária são processadas em até 1 hora e 30
                        minutos.
                        <br />
                    </p>
                    <div className="properties">
                        <h3 className="rarity-heading">Saques realizados</h3>
                        <div className="card-body" style={{ padding: 0 }}>
                            <div className="template__table_static template__table_responsive">
                                <div className="scrollable scrollbar-macosx">
                                    <table className="table data table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th className="thTable">Nº</th>
                                                <th className="thTable">Data</th>
                                                <th className="thTable">Destino</th>
                                                <th className="thTable">Valor</th>
                                                <th className="thTable">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {withdrawals.map((withdrawal, index) => (
                                                <tr key={index}>
                                                    <td className="tdTable">{index + 1}</td>
                                                    <td className="tdTable">{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                                                    <td className="tdTable">{withdrawal.cpf}</td>
                                                    <td className="tdTable">{withdrawal.operationAmount}</td>
                                                    <td className="tdTable">{withdrawal.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="about" className="comic-book white wf-section">
                <div className="minting-container left w-container">
                    <div className="w-layout-grid grid-2">
                        <img
                            src="/assets/payout/money2.png"
                            width={240}
                            alt="Roboto #6340"
                            className="mint-card-image v2"
                        />
                        <div>
                            <h2>Indique um amigo e ganhe R$ no PIX</h2>
                            <h3>Como funciona?</h3>
                            <p>
                                Convide seus amigos que ainda não estão na plataforma. Você receberá
                                R$ por cada amigo que se inscrever e fizer um depósito. Não há limite
                                para quantos amigos você pode convidar. Isso significa que também não
                                há limite para quanto você pode ganhar!
                            </p>
                            <h3>Como recebo o dinheiro?</h3>
                            <p>
                                O saldo é adicionado diretamente ao seu saldo no painel abaixo, com o
                                qual você pode sacar via PIX.
                            </p>
                            <h3>Upgrade</h3>
                            <p>
                                No primeiro amigo que você indicar, você terá acesso ao modo ULTIMATE
                                da nossa plataforma. Você poderá apostar valores maiores e ter mais
                                chances de ganhar jogando.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payout