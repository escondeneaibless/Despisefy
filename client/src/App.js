import './App.css';
import { useState, useEffect } from 'react';
import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Basket from './components/main/Basket';
import Catalog from './components/main/Catalog'
import Enter from './components/header/headerComponents/Enter';
import Registration from './components/header/headerComponents/Registration';
import Admin from './components/main/admin/Admin';
import Users from './components/main/admin/Users';
import Orders from './components/main/admin/Orders';
import Products from './components/main/admin/Products';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Main />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Enter />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/products' element={<Products />} />   
      </Route>
    )
  );
  return (
    <>
    <div className="App">
        <div className="App">
          <RouterProvider router={router} />
        </div>
    </div>
    <Footer />
    </>
    
  );
}

const Root = () => {
  const [admin, setAdmin] = useState(false);
  const [loc, setLoc] = useState(false);
  const [enter, setEnter] = useState('Вход');
  useEffect(() => {
    localStorage.getItem("role") === "admin" ? setAdmin(true) : setAdmin(false);
    window.location.href === "http://localhost:3000/" ? setLoc(true) : setLoc(false);
    if (localStorage.getItem('role')) { setEnter("Выход")}else{setEnter("Вход")}
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  const [activeLink, setActiveLink] = useState("home");
  const [activeLinkEnter, setActiveLinkEnter] = useState("home");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleLinkClickEnter = (link, e) => {
    setActiveLink(link);
    if (e.target.innerHTML === "Выход") {
      localStorage.removeItem('role');
    }
  };
  return (
    <>
      <div className='header'>
        {loc ? '' : <button className="back" onClick={handleClick}>Назад</button>}
        <p className="logo">Despisefy</p>
        <div className="Root">
          {admin ? <Link className="catalogs" to="/admin">Админка</Link> : ''}
          <Link className="catalogs" id={activeLink === "home" ? "active" : ""} to="/" onClick={() => handleLinkClick("home")}>Домашняя страница</Link>
          <Link className="catalogs" id={activeLink === "basket" ? "active" : ""} to="/basket" onClick={() => handleLinkClick("basket")}>Корзина</Link>
          <Link className="catalogs" id={activeLink === "catalog" ? "active" : ""} to="/catalog" onClick={() => handleLinkClick("catalog")}>Каталог</Link>
          <Link className="catalogs" id={activeLinkEnter === "enter" ? "active" : ""} to="/login" onClick={(e) => handleLinkClickEnter("enter", e)}>{enter}</Link>
          <Link className="catalogs" id={activeLink === "regist" ? "active" : ""} to="/registration" onClick={() => handleLinkClick("regist")}>Зарегистрироваться</Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
