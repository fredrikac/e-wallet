import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <p>Created with React & Redux toolkit</p>
      <p>Project from JavaScript 3, September 2022</p>
      <p>@Fredrika Carlsén</p>
      <a className={styles.footerLink} href="https://www.flaticon.com/free-icons/chip" title="chip icons">Chip icons created by juicy_fish - Flaticon</a>
    </footer>
  )
}

export default Footer;