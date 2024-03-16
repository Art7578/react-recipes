import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/LogIn/LogIn";
import { Registration } from "./pages/Registration/Registration";
import { Header } from "./components/Header/Header";
import { Favorites } from "./pages/Favorites/Favorites";
import { FullRecipe } from "./pages/FullRecipe/FullRecipe";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/recipes/:id" element={<FullRecipe />}/>
      </Routes>
    </div>
  );
}

export default App;
