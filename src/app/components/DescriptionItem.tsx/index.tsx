type TDescriptionItemProps = {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: TDescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label font-semibold">{title}:</p>
    {content}
  </div>
);


export default DescriptionItem