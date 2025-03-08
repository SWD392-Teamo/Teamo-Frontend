interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center border border-[#C5E7FB] bg-white p-12 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl h-full">
      <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 h-12 items-center">{title}</h3>
      <p className="text-gray-600 h-40">{description}</p>
    </div>
  );
};

export default FeatureCard;
