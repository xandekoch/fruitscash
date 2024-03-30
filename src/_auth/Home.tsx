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
              CASH{" "}
            </h1>
          </div>
          <img
            width={132}
            alt="mango"
            className="image cr1"
            src="/assets/home/mango.png"
          />
          <img
            width={132}
            alt="banana"
            className="image cl1"
            src="/assets/home/banana.png"
          />
          <img
            width={132}
            alt="apple"
            className="image tr"
            src="/assets/home/apple.png"
          />
          <img
            width={132}
            alt="strawberry"
            className="image tl"
            src="/assets/home/strawberry.png"
          />
          <img
            width={132}
            alt="peach"
            className="image cr2"
            src="/assets/home/peach.png"
          />
          <img
            width={132}
            alt="watermelon"
            className="image cl2"
            src="/assets/home/watermelon.png"
          />
          <img
            width={132}
            alt="cherry"
            className="image bl1"
            src="/assets/home/cherry.png"
          />
          <img
            width={132}
            alt="grape"
            className="image br1"
            src="/assets/home/grape.png"
          />
          <img
            width={132}
            alt="pineapple"
            className="image br"
            src="/assets/home/pineapple.png"
          />
          <img
            width={132}
            alt="pear"
            className="image bc"
            src="/assets/home/pear.png"
          />
          <img
            width={132}
            alt="orange"
            className="image"
            src="/assets/home/orange.png"
          />
          <NavLink
            to={'sign-in'}
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