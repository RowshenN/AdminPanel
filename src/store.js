// store.js
import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./services/login";
import { contactApi } from "./services/contact";
import { bannerApi } from "./services/banner";
import { productApi } from "./services/products";
import { variantApi } from "./services/varriants";
import { worksApi } from "./services/works";
import { adminApi } from "./services/admin";
import { aboutApi } from "./services/about";
import { newsApi } from "./services/news";
import { messageSendApi } from "./services/messageSend";
import { messageTemplateApi } from "./services/messageTamplate";
import { streetApi } from "./services/street";
import { reportApi } from "./services/reports";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [worksApi.reducerPath]: worksApi.reducer,

    [adminApi.reducerPath]: adminApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [messageSendApi.reducerPath]: messageSendApi.reducer,
    [messageTemplateApi.reducerPath]: messageTemplateApi.reducer,
    [streetApi.reducerPath]: streetApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      contactApi.middleware,
      bannerApi.middleware,
      productApi.middleware,
      variantApi.middleware,
      worksApi.middleware,
      adminApi.middleware,
      aboutApi.middleware,
      newsApi.middleware,
      messageSendApi.middleware,
      messageTemplateApi.middleware,
      streetApi.middleware,
      reportApi.middleware
    ),
});
