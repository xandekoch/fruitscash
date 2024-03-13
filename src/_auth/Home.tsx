import { Mint, Rarity, Faq } from '../components';

const Home = () => {
  console.log('Home')
  return (
    <>
    <section id="hero" className="hero-section wf-section">
  <div className="hero-container">
    <div className="hero-letters">
      <h1
        data-w-id="00c96275-55a4-2839-457b-174c20d342ba"
        className="hero-heading"
      >
        FRUITS <br />
        MONEY{" "}
      </h1>
    </div>
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/mango.png"
      loading="lazy"
      width={132}
      alt=""
      className="image cr1"
      src="https://fruitsmoney.com/assets/images/mango.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/banana.png"
      loading="lazy"
      width={132}
      alt=""
      className="image cl1"
      src="https://fruitsmoney.com/assets/images/banana.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/apple.png"
      loading="eager"
      width={132}
      alt=""
      className="image tr"
      src="https://fruitsmoney.com/assets/images/apple.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/strawberry.png"
      loading="eager"
      width={132}
      alt=""
      className="image tl"
      src="https://fruitsmoney.com/assets/images/strawberry.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/peach.png"
      loading="lazy"
      width={132}
      alt=""
      className="image cr2"
      src="https://fruitsmoney.com/assets/images/peach.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/watermelon.png"
      loading="lazy"
      width={132}
      alt=""
      className="image cl2"
      src="https://fruitsmoney.com/assets/images/watermelon.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/cherry.png"
      loading="lazy"
      width={132}
      alt=""
      className="image bl1"
      src="https://fruitsmoney.com/assets/images/cherry.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/grape.png"
      loading="lazy"
      width={132}
      alt=""
      className="image br1"
      src="https://fruitsmoney.com/assets/images/grape.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/pineapple.png"
      loading="lazy"
      width={132}
      alt=""
      className="image br"
      src="https://fruitsmoney.com/assets/images/pineapple.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/pear.png"
      loading="lazy"
      width={132}
      alt=""
      className="image bc"
      src="https://fruitsmoney.com/assets/images/pear.png"
    />
    <img
      data-cfsrc="https://fruitsmoney.com/assets/images/orange.png"
      loading="eager"
      width={132}
      alt=""
      className="image"
      src="https://fruitsmoney.com/assets/images/orange.png"
    />
    <a
      href="/sign-in"
      className="primary-button hero w-button"
    >
      JOGAR AGORA
    </a>
    <div className="hero-price">
      <strong>
        Rodadas de boas vindas disponível <br />
      </strong>
      Cadastre-se agora
    </div>
  </div>
</section>
    <Mint />
    <Rarity />
    <Faq />
    </>
  )
}

export default Home