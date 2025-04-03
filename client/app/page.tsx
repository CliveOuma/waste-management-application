import HomeBanner from "./components/ui/HomeBanner";
import Services from "@/components/Services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HomeBanner />
      <Services/>
      <Footer/>
    </main>
  );
}
