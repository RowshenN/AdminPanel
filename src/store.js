// store.js
import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./services/login";
import { transactionApi } from "./services/transactions";
import { categoryApi } from "./services/category";
import { productApi } from "./services/products";
import { variantApi } from "./services/varriants";
import { customerApi } from "./services/custumers";
import { adminApi } from "./services/admin";
import { groupApi } from "./services/group";
import { messageAutoReplyApi } from "./services/messageAutoReplay";
import { messageSendApi } from "./services/messageSend";
import { messageTemplateApi } from "./services/messageTamplate";
import { streetApi } from "./services/street";
import { reportApi } from "./services/reports";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,

    [adminApi.reducerPath]: adminApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [messageAutoReplyApi.reducerPath]: messageAutoReplyApi.reducer,
    [messageSendApi.reducerPath]: messageSendApi.reducer,
    [messageTemplateApi.reducerPath]: messageTemplateApi.reducer,
    [streetApi.reducerPath]: streetApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      transactionApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      variantApi.middleware,
      customerApi.middleware,
      adminApi.middleware,
      groupApi.middleware,
      messageAutoReplyApi.middleware,
      messageSendApi.middleware,
      messageTemplateApi.middleware,
      streetApi.middleware,
      reportApi.middleware
    ),
});
