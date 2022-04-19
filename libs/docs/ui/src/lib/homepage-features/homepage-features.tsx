import FeatureItem from './feature-item';
import styles from './homepage-features.module.css';
import { HomepageFeaturesProps } from './types';

export function HomepageFeatures({ items, ...props }: HomepageFeaturesProps) {
  return (
    <section className={styles.container}>
      <div className="container">
        <div className="row">
          {items.map((props, idx) => (
            <FeatureItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageFeatures;
