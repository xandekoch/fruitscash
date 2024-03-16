import { NavLink } from 'react-router-dom';
import { Mint, Rarity, Faq } from '../components';

const Home = () => {
  console.log('Home')
  return (
    <>
      <section id="hero" className="hero-section wf-section">
        <div className="hero-container">
          <div className="hero-letters">
            <h1
              className="hero-heading"
            >
              FRUITS <br />
              MONEY{" "}
            </h1>
          </div>
          <img
            width={132}
            alt="mango"
            className="image cr1"
            src="https://fruitsmoney.com/assets/images/mango.png"
          />
          <img
            width={132}
            alt="banana"
            className="image cl1"
            src="https://fruitsmoney.com/assets/images/banana.png"
          />
          <img
            width={132}
            alt="apple"
            className="image tr"
            src="https://fruitsmoney.com/assets/images/apple.png"
          />
          <img
            width={132}
            alt="strawberry"
            className="image tl"
            src="https://fruitsmoney.com/assets/images/strawberry.png"
          />
          <img
            width={132}
            alt="peach"
            className="image cr2"
            src="https://fruitsmoney.com/assets/images/peach.png"
          />
          <img
            width={132}
            alt="watermelon"
            className="image cl2"
            src="https://fruitsmoney.com/assets/images/watermelon.png"
          />
          <img
            width={132}
            alt="cherry"
            className="image bl1"
            src="https://fruitsmoney.com/assets/images/cherry.png"
          />
          <img
            width={132}
            alt="grape"
            className="image br1"
            src="https://fruitsmoney.com/assets/images/grape.png"
          />
          <img
            width={132}
            alt="pineapple"
            className="image br"
            src="https://fruitsmoney.com/assets/images/pineapple.png"
          />
          <img
            width={132}
            alt="pear"
            className="image bc"
            src="https://fruitsmoney.com/assets/images/pear.png"
          />
          <img
            width={132}
            alt="orange"
            className="image"
            src="https://fruitsmoney.com/assets/images/orange.png"
          />
          <NavLink
            to={'sign/in'}
            className="primary-button hero w-button"
          >
            JOGAR AGORA
          </NavLink>
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