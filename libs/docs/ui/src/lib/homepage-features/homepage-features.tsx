import styles from './homepage-features.module.css';

/* eslint-disable-next-line */
export interface HomepageFeaturesProps {}

export function HomepageFeatures(props: HomepageFeaturesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomepageFeatures!</h1>
    </div>
  );
}

export default HomepageFeatures;
