import { useTranslations } from "next-intl";
import LandingLayout from "../components/Landing/LandingLayout";

const Home = () => {
  const t = useTranslations("Index");

  return (
    <div>
      <LandingLayout />
    </div>
  );
};

export default Home;
