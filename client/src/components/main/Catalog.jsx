import React, { useEffect, useState } from "react";
import s from "./Catalog.module.css";
const Catalog = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:5000/basket");
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);
  let mas = [];
  const [active, setActive] = useState(true);
  return (
    <>
      <div className={s.catalogContainer}>
        {list.map((item) => (
          <>
            <div className={s.catalog}>
              <img
                className={s.catalogPhoto}
                alt="image_form"
                src={require(`../../../../server/fileForUsers/${item.photo}`)}
              ></img>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {item.name}
              </div>
              <div>Цена: {item.price}р</div>
              <button
                className={s.editBasket}
                onClick={(async) => {
                  mas.push(item.id);
                  localStorage.setItem("product", mas);
                }}
              >
                Добавить в корзину
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Catalog;
