import React, { useState, useEffect, createContext } from "react";
import { isLogin } from "../utils";
import { axiosInstance } from "../utils/axiosIntance";

export const Context = createContext();

const ContextProvider = (props) => {
  let localPro;
  const localProduct = localStorage.getItem("BasketProducts");

  //-----------------------------------------------------------------
  const [is_logged, set_is_logged] = useState(false);
  //-----------------------------------------------------------------

  if (localProduct) {
    localPro = JSON.parse(localProduct);
  } else {
    localPro = [];
  }

  const [basket, setBasket] = useState(localPro);

  const checkLogin = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.id !== undefined) set_is_logged(true);
    else set_is_logged(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    localStorage.setItem("BasketProducts", JSON.stringify(basket));
  }, [basket]);

  let [dil, setDil] = useState("TM");
  useEffect(() => {
    let dilData = localStorage.getItem("OnlineDil");
    if (dilData) {
      setDil(JSON.parse(dilData));
    } else {
      setDil("TM");
      localStorage.setItem("OnlineDil", JSON.stringify("TM"));
    }
  }, []);

  const ChangeDil = (event) => {
    setDil(event);
    localStorage.setItem("OnlineDil", JSON.stringify(event));
  };

  const addPro = (pro) => {
    console.log(pro);
    let is_have = false;
    basket?.map((item) => {
      if (item?.ProductId == pro?.id) {
        is_have = true;
      }
    });

    if (is_have) {
      incPro(pro.id);
    } else {
      let obj = {
        ProductId: pro?.id,
        quantity: 1,
        pro: pro,
      };
      let array = basket;
      array.push(obj);
      setBasket([...array]);
    }
    console.log("gobasket", basket);
  };

  const removePro = (proId) => {
    console.log(proId);
    let array = basket.filter((item) => {
      return proId != item?.ProductId;
    });
    setBasket([...array]);
  };

  const incPro = (proId) => {
    console.log("inc", proId);
    let array = basket;
    let index = -1;
    array.map((item, i) => {
      if (item?.ProductId == proId) {
        index = i;
      }
    });
    if (index != -1) {
      array[index].quantity = array[index].quantity + 1;
    }
    setBasket([...array]);
  };
  const decPro = (proId) => {
    console.log("inc", proId);
    let array = basket;
    let index = -1;
    array.map((item, i) => {
      if (item?.ProductId == proId) {
        index = i;
      }
    });
    if (index != -1) {
      array[index].quantity > 1
        ? (array[index].quantity = array[index].quantity - 1)
        : removePro(proId);
    }
    setBasket([...array]);
  };

  const removeAll = () => {
    setBasket([]);
  };

  const countPro = async (id) => {
    let count = 0;
    await basket?.map((item) => {
      if (item?.ProductId == id) {
        count = item.quantity;
      }
    });
    return count;
  };
  //---------------------------------------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("BasketProducts");
    localStorage.removeItem("OnlineDil");
    localStorage.removeItem("userData");
    checkLogin();
  };

  //---------------------------------------------------------------------------------------------

  return (
    <Context.Provider
      value={{
        is_logged,
        checkLogin,
        logout,
        dil,
        ChangeDil,
        addPro,
        removePro,
        incPro,
        decPro,
        basket,
        removeAll,
        countPro,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
