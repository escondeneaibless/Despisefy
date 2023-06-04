import React, { useEffect, useState, useRef } from "react";
import s from "./Admin.module.css";
import api from "../../../services/apiAxios";

const Basket = () => {
  const [selectedFile, setSelectFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const filePicker = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setUploaded(URL.createObjectURL(e.target.files[0]));
  };
  const [list, setList] = useState([]);
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    console.log(formData);
    try {
      const res = await api.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setUploaded(formData.image)
      alert(`${name} добавлен(а) в список товаров`)
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePick = () => {
    filePicker.current.click();
  };
  const handleDeleteImg = () => {
    setUploaded('');
  }
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
  console.log(list);
  return (
    <>
      <div className={s.admin}>
        <div className={s.card}>
            <p style={{border: "none", fontWeight: "bold"}}>Идентификатор</p>
            <p style={{border: "none", fontWeight: "bold"}}>Наименование</p>
            <p style={{border: "none", fontWeight: "bold"}}>Цена</p>
        </div>
        {list.map((item) => (
          <div className={s.card}>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button
                            className={s.saveRole}
                            onClick={async () => {
                              let arr = [];
                              arr.push("delete", `${item.id}`, "DELETE FROM products WHERE id=?" );
                              try {
                                const res = await api.post(
                                  "/admin/products", 
                                  arr,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                              } catch (err) {
                                setError(err.message);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="25"
                              viewBox="0 0 455 446"
                              fill="none"
                            >
                              <path
                                d="M68.401 17H386.458C417.404 17 441.218 44.336 436.977 74.9893L394.089 384.989C390.599 410.215 369.036 429 343.57 429H110.537C85.0249 429 63.4377 410.148 60.0016 384.869L17.8657 74.8689C13.7044 44.254 37.5046 17 68.401 17Z"
                                fill="#DF6262"
                                stroke="black"
                                stroke-width="34"
                              />
                              <path
                                d="M183 255H272"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M147 319H308"
                                stroke="black"
                                stroke-width="32"
                                stroke-linecap="round"
                              />
                              <path
                                d="M139 133C109.124 115.074 66.4168 67.0239 46.7126 43.8494C42.3561 38.7257 46.0196 31 52.7451 31H401.686C408.814 31 412.376 39.5851 407.307 44.5951C382.662 68.9525 331.665 118.814 313 133C288 152 179 157 139 133Z"
                                fill="#663E3E"
                                stroke="black"
                                stroke-width="34"
                              />
                            </svg>
                          </button>
          </div>
        ))}
      </div>
      <div className={s.editProd}>
        <h1>Добавление товара</h1>
        <label>Наименование</label>
        <input type="text" name="name" onChange={e=> nameHandler(e)}/>
        <label>Цена</label>
        <input type="text" name="price" onChange={(e) => priceHandler(e)} />
        <div className={s.box_image}>
          {/* <button className={style.edit_image_btn} onClick={handleImageUpload}>
                Загрузить
              </button> */}
          <button onClick={handlePick}>Выбрать изображение</button>
          <button onClick={handleDeleteImg}>Удалить</button>
          <input
            type="file"
            className={s.image_edit}
            id="image"
            ref={filePicker}
            onChange={handleImageChange}
            accept="image/*,.png,.jpg"
          />
          {error && <p>Error: {error}</p>}
          <div className={s.loading_image}>
            <img
              className={s.imageEdit}
              id="image2"
              src={uploaded}
              alt=""
            />
          </div>
          {/* <button className={style.edit_image_btn}>Сохранить</button> */}
        </div>
        {/* Загрузка фото */}
        {uploaded && (
          <div>
            <h2>{uploaded.filename}</h2>
            <img src={uploaded.filePath} alt="" width="200" />
          </div>
        )}
        <button onClick={handleImageUpload}>Добавить</button>
      </div>
      {/* Загрузка фото */}
    </>
  );
};

export default Basket;
