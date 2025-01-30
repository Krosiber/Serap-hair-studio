
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";


export const metadata: Metadata = {
  title: "SerapHairStudio",
  description: "SerapKuafor",
};


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />

      </body>



    </html>
  );
}
export default Layout;
