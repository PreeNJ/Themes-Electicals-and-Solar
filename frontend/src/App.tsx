import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Catalog, SolarKitsSection, calculators, etc. plug in here
            as their feature branches are merged */}
      </main>
      <Footer />
    </>
  );
}

export default App;