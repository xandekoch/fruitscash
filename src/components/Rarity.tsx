const Rarity = () => {
  return (
    <div id="rarity" className="rarity-section wf-section">
      <div className="rarity-chart">
        <h2 className="heading-2">Raridade</h2>
        <p>
          Cada fruta possui um valor diferente que você pode ganhar ao cortá-la,
          confira nossa tabela.
        </p>
        <p>O valor das frutas aumenta proporcionalmente ao valor da aposta. A aposta padrão é R$5,00. Quanto maior a aposta, mais você ganha!
        </p>
        <div className="div-block">
          <h3 className="rarity-heading">Tipos</h3>
          <div className="rarity-row">
            <div className="rarity-number">Mais comum</div>
            <div>Maçã</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">Menos Comum</div>
            <div>Laranja</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">Raro</div>
            <div>Kiwi</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">Super Raro</div>
            <div>Dragão</div>
          </div>
          <img
            src="/assets/home/60f9aca9b5309615808c507e_rarity.svg"
            loading="lazy"
            alt=""
            className="rarity-image"
          />
        </div>
        <div>
          <h3 className="rarity-heading">Variações</h3>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.05</div>
            <div>Maçã</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$0.10</div>
            <div>Maracuja</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.15</div>
            <div>Melância</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$0.20</div>
            <div>Manga</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.25</div>
            <div>Abacate</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$0.30</div>
            <div>Mamão</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.35</div>
            <div>Banana</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$0.40</div>
            <div>Limão</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.45</div>
            <div>Romã</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$0.50</div>
            <div>Morango</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$0.75</div>
            <div>Laranja</div>
          </div>
          <div className="rarity-row">
            <div className="rarity-number">R$1.00</div>
            <div>Kiwi</div>
          </div>
          <div className="rarity-row blue">
            <div className="rarity-number">R$1.00</div>
            <div>Dragão</div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Rarity