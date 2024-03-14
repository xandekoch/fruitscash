const RecoverPassword = () => {
  console.log('RecoverPassword')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário de recuperação de senha enviado');
  };

  return (
    <section id="hero" className="hero-section dark wf-section">
      <div className="minting-container w-container">
        <h2>RECUPERAR SENHA</h2>
        <a href="https://fruitsmoney.com/join">
          <p>
            Não possui conta? Clique aqui <br />
          </p>
        </a>
        <form
          className="login__form"
          id="f-user-recovery"
          action="https://fruitsmoney.com/panel/recovery"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="_token"
            defaultValue="rs0NjEuqkXGgeEJ89DZxdaa10YB4YwIUji93IrLd"
          />
          <div className="properties">
            <h4 className="rarity-heading">E-mail</h4>
            <div className="rarity-row roboto-type2">
              <input
                type="e-mail"
                className="large-input-field w-input"
                maxLength={256}
                name="email"
                placeholder="seuemail@gmail.com"
                id="email"
                data-gtm-form-interact-field-id={0}
              />
            </div>
          </div>
          <a href="https://fruitsmoney.com/panel/login">
            <p>
              Lembrou sua senha? Clique aqui <br />
            </p>
          </a>
          <div className="">
            <button type="submit" className="primary-button w-button">
              Recuperar Senha
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </section>

  )
}

export default RecoverPassword