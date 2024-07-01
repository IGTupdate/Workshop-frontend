import { ChildrenProps } from "../dashboard/__components/__utils/types";

const RootLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
