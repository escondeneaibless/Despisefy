import React, { useEffect, useState } from "react";
import s from "./Basket.module.css";
import { Link } from "react-router-dom";
const Basket = () => {
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
  let qwe = localStorage.getItem("product");
  let Local = localStorage.getItem("product").replace(/[\s.,%]/g, " ");
  for (let i = 0; i < Local.length; i++) {
    mas.push(Local[i]);
  }
  const filteredArr = list.filter((item) => mas.map((item2) => item2 - 0).includes(item.id));
  let sum = 0;
  for (let i=0; i<filteredArr.length; i++) {
    sum += filteredArr[i].price
  }
  var position = String(sum).length-3;
  var output = [String(sum).slice(0, position), '.' , String(sum).slice(position)].join('');
  return (
    <>
    <div className={s.basketBack}>
      <div className={s.cardBasket}>
        {filteredArr.map((item) => (
          <>
            <div className={s.basket}>
              <img
                className={s.cardPhoto}
                alt="image_form"
                src={require(`../../../../server/fileForUsers/${item.photo}`)}
              ></img>
              <div style={{fontWeight: "bold", marginBottom: "5px"}}>{item.name}</div>
              <div>Цена: {item.price}р</div>
              
            </div>
          </>
        ))}
      </div>
      <div className={s.buy}>
        <p style={{fontSize: "35px"}}><b>Итого к оплате:</b> {output} р</p>
        <button className={s.toPay}>Оплатить</button>
      </div>
      </div>
    </>
  );
};
const Mecho = () => {
  return (
    <>
      <p>213</p>
    </>
  )
}
export default Basket;
