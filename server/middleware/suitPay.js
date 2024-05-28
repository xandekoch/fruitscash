import axios from 'axios';
import User from '../models/User.js';

export const generatePaymentCode = async (req, res) => {
    try {
        const { userId } = req.params;
        const { operationAmount, cpf, name } = req.body;

        // Busca o usuário pelo userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Filtra as transações do tipo 'deposit'
        const depositTransactions = user.transactions.filter(transaction => transaction.operation === 'deposit');
        const depositCount = depositTransactions.length;

        const requestNumber = `${userId}-${depositCount + 1}`;

        const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        var data = {
            requestNumber: requestNumber,
            dueDate: dueDate,
            amount: operationAmount,
            callbackUrl: `${process.env.SERVER_URL}/transactions/webhookPix`,
            client: {
                name,
                document: cpf,
                email: user.email
            }
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sandbox.ws.suitpay.app/api/v1/gateway/request-qrcode',
            headers: {
                'ci': 'testesandbox_1687443996536',
                'cs': '5b7d6ed3407bc8c7efd45ac9d4c277004145afb96752e1252c2082d3211fe901177e09493c0d4f57b650d2b2fc1b062d'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                res.status(200).json(response.data);
            })
            .catch(function (error) {
                console.log(error);
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

        res.status(500).json({ error: error.message });
    }
};

export const webhookPix = async (req, res, next) => {
    try {
        console.log('webHookPix porraaa!')
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
            res.status(200)
        }

        next();
    } catch (err) {
        res.status(500).json({ error: "Erro ao processar webhook Pix" });
    }
};
