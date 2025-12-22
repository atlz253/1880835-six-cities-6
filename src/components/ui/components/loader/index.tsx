import spinnerSRC from './assets/spinner.gif';
import styles from './index.module.css';

export function Loader() {
  return (
    <div className={styles.wrapper} data-testid="loader">
      <img src={spinnerSRC} className={styles.image} />
    </div>
  );
}
