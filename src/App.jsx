import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Todos from "./pages/Todos";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound"
import { SettingsProvider } from "./contexts/SettingsContext";
import "./App.css";


function App() {
  return (
    <SettingsProvider>
      <Router>
        <nav className="space-x-4 mb-4">
          <Link to="/" className="text-blue-500 hover:underline">首页</Link>
          <Link to="/todos" className="text-blue-500 hover:underline">Todo List</Link>
          <Link to="/about" className="text-blue-500 hover:underline">关于</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} >
              <Route  path="settings" element ={ <Settings />}>
              </Route>
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
