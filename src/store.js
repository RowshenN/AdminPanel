// store.js
import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./services/login";
import { contactApi } from "./services/contact";
import { bannerApi } from "./services/banner";
import { worksApi } from "./services/works";
import { adminApi } from "./services/admin";
import { aboutApi } from "./services/about";
import { newsApi } from "./services/news";
import { serviceApi } from "./services/service";
import { subscribesApi } from "./services/subscribes";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [worksApi.reducerPath]: worksApi.reducer,

    [adminApi.reducerPath]: adminApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [subscribesApi.reducerPath]: subscribesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      contactApi.middleware,
      bannerApi.middleware,
      worksApi.middleware,
      adminApi.middleware,
      aboutApi.middleware,
      newsApi.middleware,
      serviceApi.middleware,
      subscribesApi.middleware
    ),
});
