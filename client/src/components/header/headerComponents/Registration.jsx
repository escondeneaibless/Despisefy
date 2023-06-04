import React, { useState } from "react";
import s from "./Registration.module.css";
import InputMask from "react-input-mask";
import api from '../../../services/apiAxios'

const Registration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const [error, setError] = useState(null);
  const handleRegistUpload = async () => {
    let formData = [];
    formData.push(name, phone, password);
    console.log(formData);
    try {
      const res = await api.post("/registration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Вы зарегистрированы');
      console.log(res);
    } catch (err) {
      alert('Ошибка регистрации');
      setError(err.message);
    }
  };
  return (
    <>
      <div className={s.registrationContain}>
        <div className={s.form}>
          <h1>Регистрация</h1>
          <div className={s.strForm}>
            <label>Имя</label>
            <input type="text" name="name" className={s.input_form} onChange={(e) => nameHandler(e)}/>
          </div>
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
            <input type="text" className={s.input_form} onChange={(e) => passwordHandler(e)}/>
          </div>
          <button onClick={handleRegistUpload}>Отправить</button>
        </div>
      </div>
    </>
  );
};

export default Registration;
