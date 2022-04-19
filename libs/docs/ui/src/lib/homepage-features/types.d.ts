export interface FeatureItem {
  title: string;
  image: string;
  description: JSX.Element;
}

export interface HomepageFeaturesProps {
  items: FeatureItem[];
}
