import React, { useState } from "react";
import s from "./Enter.module.css";
import InputMask from "react-input-mask";
import api from "../../../services/apiAxios";

const Enter = () => {
  const [logg, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const phoneHandler = (e) => {
    setLogin(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginUpload = async () => {
    const formData = [];
    formData.push(logg, password);
    console.log(formData);
    if (logg && password) {
      try {
        const res = await api.post("/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(res.data);
        if (logg === "+7(902)-667-22-46" && password === "password") {
          localStorage.setItem("role", "admin");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Вы не заполнили форму");
    }
  };
  return (
    <>
      <div className={s.registrationContain}>
        <div className={s.form}>
          <div className={s.nestedForm}>
            <h1>Вход</h1>
            <div className={s.strForm}>
              <label>Телефон</label>
              <InputMask
                mask="+7(999)-999-99-99"
                className={s.input_form}
                id={s.three}
                onChange={(e) => phoneHandler(e)}
                name="phone"
                type="text"
              />
            </div>
            <div className={s.strForm}>
              <label>Пароль</label>
              <input
                type="text"
                className={s.input_form}
                onChange={(e) => passwordHandler(e)}
              />
            </div>
            <button onClick={handleLoginUpload}>Отправить</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enter;
