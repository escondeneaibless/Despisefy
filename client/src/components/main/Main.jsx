import React, { useState, useEffect } from "react";
import s from "./Main.module.css";

import { Link } from "react-router-dom";
const Main = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);
  const [active, setActive] = useState(true);
  const handleEdit = (e) => {
    setActive((current) => !current);
    active
      ? (e.target.innerHTML = "Удалить товар из корзины")
      : (e.target.innerHTML = "Добавить в корзину");
    active
      ? (e.target.style.background = "rgba(255, 125, 125, 0.342)")
      : (e.target.style.background = "rgba(0, 172, 0, 0.404)");
  };
  let mas = [];
  return (
    <>
      <div className={s.main}>
        <div className={s.nestedMain}>
          <h1 style={{ alignSelf: "start", marginLeft: "21%" }}>
            Рекомендуемый товар
          </h1>
          <div className={s.cardsElectronic}>
            {list.map((item) => (  
              item.id <= 8 ? 
                <div className={s.cardTech}>
                  <div id={`${s.cardOne}`} className={s.cardPhoto}></div>
                  <p className={s.headerCard}>{item.name}</p>
                  <Link to="/basket" className={s.buy}>
                    Купить сейчас »
                  </Link>
                  <button
                    className={s.editBasket}
                    onChange={handleEdit}
                    onClick={(async) => {
                      mas.push(item.id);
                      localStorage.setItem("product", mas);
                    }}
                  >
                    Добавить в корзину
                  </button>
                </div>  
                      : '' 
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
