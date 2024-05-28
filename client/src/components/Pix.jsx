import React, { useEffect, useState } from 'react'

const Pix = ({ pixInfo }) => {
    const { paymentCode, paymentCodeBase64, paymentValue } = pixInfo;
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Código copiado para a área de transferência!");
        });
    };

    return (
        <div className="minting-container w-container">
            <img
                src="/assets/deposit/done.png"
                loading="lazy"
                width={120}
                alt="Roboto #6340"
                className="mint-card-image"
                style={{ width: '120px' }}
            />
            <h2>
                BÔNUS DE DEPÓSITO VÁLIDO
                <br />
                POR ATÉ
                <br />
                <span id="tempo">{`${minutes}:${formattedSeconds}`}</span>
            </h2>
            <img
                id="qrcode"
                src={`data:image/png;base64,${paymentCodeBase64}`}
                alt="QR Code"
                loading=" lazy"
                style={{ width: "400px !important", height: "auto" }}
                className="nft-image"
            />
            <div id="page" style={{ width: "100%", height: "100%" }}>
                <div style={{ display: "unset", overflowWrap: "break-word", wordBreak: "break-all" }}>
                    <div id="copiacola">
                        {paymentCode}
                    </div>
                </div>
            </div>
            <h2>
                {" "}
                <div id="valorexib" style={{ width: '100%' }}>R${paymentValue}</div>{" "}
            </h2>
            <a
                id="depCopiaCodigo"
                href="javascript:void(0);"
                type="submit"
                className="primary-button dark w-button"
                onClick={() => copyToClipboard(paymentCode)}
            >
                Copiar código para pagamento
            </a>
            <br />
            <br />
            <div>
                <h2>Pague e será creditado na hora!</h2>
                <h3>Como pagar?</h3>
                <p>1. Abra o aplicativo do seu banco e acesse a área Pix!</p>
                <p>2. Selecione a opção pagar com código Pix Copia e Cola</p>
                <p>3. Cole o código no espaço indicado no aplicativo</p>
                <p>4. Efetue o pagamento, volte no site e atualize a página.</p>
            </div>
        </div>
    )
}

export default Pix