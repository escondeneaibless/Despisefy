import React, { useEffect, useState } from "react";
import s from "./Admin.module.css";
import api from '../../../services/apiAxios'

const Basket = () => {
  const [list, setList] = useState([]);
  const [listUser, setListUser] = useState("");
  const [error, setError] = useState(null);
  const handleUser = (e) => {
    setListUser(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <div className={s.admin}>
        <div className={s.cardUser}>
          <div style={{ border: "none", fontWeight: "bold" }}>
            Идентификатор
          </div>
          <div style={{ border: "none", fontWeight: "bold" }}>Имя</div>
          <div style={{ border: "none", fontWeight: "bold" }}>Телефон</div>
          <div style={{ border: "none", fontWeight: "bold" }}>Роль</div>
        </div>
        {list.map((item) => (
          <div className={s.cardUser}>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.phone}</div>
            <select className={s.choice} onChange={(e) => handleUser(e)}>
              <option id={s.role} className={s.items && s.choices}>
                {" "}
                {item.role}{" "}
              </option>
              {item.role === "ADMIN" ? (
                <option className={s.choices} name="admin">
                  USER
                </option>
              ) : (
                ""
              )}
              {item.role === "ADMIN" ? (
                <option className={s.choices} name="admin">
                  MANAGER
                </option>
              ) : (
                ""
              )}
              {item.role === "USER" ? (
                <option className={s.choices} name="admin">
                  MANAGER
                </option>
              ) : (
                ""
              )}
              {item.role === "MANAGER" ? (
                <option className={s.choices} name="admin">
                  USER
                </option>
              ) : (
                ""
              )}
              {item.role === "USER" || item.role === "MANAGER" ? (
                <option className={s.choices} name="admin">
                  ADMIN
                </option>
              ) : (
                ""
              )}
            </select>
            <button
                        className={s.saveRole}
                        onClick={async () => {
                          let formData = [];
                          formData.push("status", `${item.id}`, `${listUser}`, "UPDATE users SET role=? WHERE id=?");
                          try {
                            const res = await api.post("/users", formData, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            });
                            console.log(res);
                          } catch (err) {
                            setError(err.message);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="25"
                          viewBox="0 0 449 451"
                          fill="none"
                        >
                          <rect
                            id={s.colorSvg}
                            x="17"
                            y="17"
                            width="415"
                            height="417"
                            rx="50"
                            fill="#9795FF"
                            stroke="black"
                            stroke-width="34"
                          />
                          <rect
                            x="120"
                            y="17"
                            width="209"
                            height="131"
                            fill="white"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="137.999"
                            y1="216.833"
                            x2="138.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="224.999"
                            y1="216.833"
                            x2="225.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                          <line
                            x1="311.999"
                            y1="216.833"
                            x2="312.999"
                            y2="318.833"
                            stroke="black"
                            stroke-width="34"
                          />
                        </svg>
                      </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Basket;
