import React from 'react'

const Payout = () => {
  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <img
            src="/public/assets/payout/with.gif"
            loading="lazy"
            width={240}
            alt="Roboto #6340"
            className="mint-card-image"
          />
          <h2>Saque</h2>
          <p>
            PIX: saques instantâneos com muita praticidade. <br />
          </p>
          <form
            id="f-eWallet-payout2"
            action="https://fruitsmoney.com/panel/e-wallet/payout"
            onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;"
            method="post"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="Wh2CTNAHZ4IBT3hF3QAUYtsnfWmJuyzuH7EaeGWv"
            />
            <div className="properties">
              <h4 className="rarity-heading">Nome do destinatário:</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input"
                  maxLength={256}
                  name="name"
                  id="name"
                  placeholder="Nome do Destinatario"
                  required=""
                />
              </div>
              <h4 className="rarity-heading">Chave PIX CPF:</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input cpf-mask"
                  maxLength={14}
                  name="pix"
                  id="pix"
                  placeholder="Seu número de CPF"
                  required=""
                />
              </div>
              <h4 className=" rarity-heading">
                Valor para saque (SALDO: R$<b className="saldo"> 0,00 </b>)
              </h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input money-mask"
                  name="value"
                  id="value"
                  placeholder="Saque minimo de R$50,00"
                  required=""
                />
              </div>
            </div>
            <div className="">
              <input
                type="submit"
                defaultValue="Sacar via PIX"
                id="pixgenerator"
                className="primary-button w-button"
              />
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
            src="/public/assets/payout/withdraw.gif"
            loading="lazy"
            width={240}
            alt="Robopet 6340"
            className="mint-card-image"
          />
          <h2>Histórico financeiro</h2>
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
                        <th className="text-center">Nº Saque</th>
                        <th className="text-center">Data</th>
                        <th className="text-center">Destino</th>
                        <th className="text-center">Valor</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
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
              src="/public/assets/payout/money2.png"
              loading="lazy"
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