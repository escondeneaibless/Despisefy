import React, {useEffect, useState} from "react";
import s from './Admin.module.css';
import { Link } from "react-router-dom";

const Basket = () => {
    // const [list, setList] = useState([]);

    // useEffect(() => {
    //   const fetchList = async () => {
    //     try {
    //       const response = await fetch("http://localhost:5000/basket");
    //       const data = await response.json();
    //       setList(data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //   fetchList();
    // }, []);
    return (
      <>
        <div className={s.admin}>
           <Link to="/admin/users">Список пользователей</Link>
           <Link to="/admin/orders">Список заказов</Link>
           <Link to="/admin/products">Список товаров</Link>
        </div>
    </>  
    )
    
}

export default Basket;