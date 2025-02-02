import axios from 'axios';
import User from '../models/User.js';

export const generatePaymentCode = async (req, res) => {
    try {
        const { userId } = req.params;
        const { operationAmount, cpf, name } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const depositTransactions = user.transactions.filter(transaction => transaction.operation === 'deposit');
        const depositCount = depositTransactions.length;

        const requestNumber = `${userId}-${depositCount + 1}`;

        const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        var data = {
            requestNumber: requestNumber,
            dueDate: dueDate,
            amount: operationAmount,
            callbackUrl: `${process.env.SERVER_URL}/api/transactions/createDeposit`,
            client: {
                name,
                document: cpf,
                email: user.email
            }
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SUITPAY_URL}/api/v1/gateway/request-qrcode`,
            headers: {
                'ci': process.env.SUITPAY_CLIENT_ID,
                'cs': process.env.SUITPAY_CLIENT_SECRET
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log(data)
                if (response.data.response === "OK") {
                    res.status(200).json(response.data);
                } else {
                    res.status(400).json({ message: response.data.message });
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                    // Se a resposta do servidor estiver disponível no erro
                    res.status(500).json({ message: error.response.data.message });
                } else {
                    // Caso contrário, apenas enviar o erro genérico
                    res.status(500).json({ message: error.message });
                }
            });

    } catch (error) {
        console.error('Error generating payment code:', error.message);

        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        }

        res.status(500).json({ message: error.response.data.message });
    }
};

export const webhookPix = async (req, res, next) => {
    try {
        const { statusTransaction, requestNumber, value, payerName, payerTaxId } = req.body;

        if (statusTransaction === 'PAID_OUT') {
            // Expressão regular para encontrar o padrão "userId-N", onde N é um número com um ou mais dígitos
            const regex = /([a-zA-Z0-9]+)-\d+$/;
            const userIdMatch = requestNumber.match(regex);
            const userId = userIdMatch ? userIdMatch[1] : null;

            req.body.userId = userId;
            req.body.operationAmount = value;
            req.body.cpf = payerTaxId;
            req.body.name = payerName;

            next();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao processar webHook Pix" });
    }
};
