const Footer = () => {
  return (
    <div className="footer-section wf-section">
        <div className="domo-text">
          FRUITS <br />
        </div>
        <div className="domo-text purple">
          CASH <br />
        </div>
        <div className="follow-test">© Copyright</div>
        <div className="follow-test">
          <a href="terms">
            <strong className="bold-white-link">Termos de uso</strong>
          </a>
        </div>
        <div className="follow-test">sac.fruitscash@gmail.com</div>
        <div className="follow-test">
          <a href="#" /* target="_blank" */>
            <img
              src="/assets/home/telegram.webp"
              width="40px"
              height="40px"
            />
            <strong className="bold-white-link">Telegram</strong>
          </a>
        </div>
      </div>
  )
}

export default Footer