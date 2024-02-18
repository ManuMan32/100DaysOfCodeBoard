import "./Footers.css";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footerLogo">
        <a className="footerLogoLink" href="https://manuelcrocco.glitch.me/" target="_blank">
          <img className="footerLogoImg" src="iconM.svg" alt="logo" />
        </a>
      </div>
      <div className="footerCredits">
        <span className="footerCreditsSpan">Page made by Manuel Crocco</span>
      </div>
    </footer>
  )
}
export default Footer;