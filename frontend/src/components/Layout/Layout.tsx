import Head from "next/head";
import "../../app/globals.css"
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";





interface LayoutProps {
  children: React.ReactNode;
}
  
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>SerapHairStudio</title>
        <meta name="description" content="SerapKuafor" />
        <link rel="icon" href="../../icon.png" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>

  );
}
export default Layout;
