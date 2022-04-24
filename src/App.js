import "./App.css";
import Navbar from "./components/Navbar";
import useToken from "./components/useToken";
import RouterURLM1 from "./components/RouterURLM1";

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <div className="App">
      <Navbar />
      <RouterURLM1 />
      <footer className="app-footer">
        &copy;Mamiam 2022 Matrice <br />
        Meal data kindly provided by{" https://www.themealdb.com/ "}, &copy;
      </footer>
    </div>
  );
}

export default App;
