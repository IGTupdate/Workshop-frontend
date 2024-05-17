import React from "react";
import { useTranslations } from "use-intl";

const AboutUsFooter: React.FC = () => {
  const t = useTranslations("Footer");
  return (
    <footer className=" bg-customGray text-customLightGray py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">{t("heading")}</h2>
            <p className="text-lg">{t("subHeading")}</p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  {t("services")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-600 my-6" />
        <div className="text-center">
          <p>&copy; {t("copyRight")}</p>
        </div>
      </div>
    </footer>
  );
};

export default AboutUsFooter;
