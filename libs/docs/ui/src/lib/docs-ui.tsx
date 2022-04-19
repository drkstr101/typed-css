import styles from './docs-ui.module.css';

/* eslint-disable-next-line */
export interface DocsUiProps {}

export function DocsUi(props: DocsUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DocsUi!</h1>
    </div>
  );
}

export default DocsUi;
