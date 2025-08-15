import { lazy } from "react";
export const Login = lazy(() => import("./login/login"));
export const Home = lazy(() => import("./home/Home"));
export const Categories = lazy(() => import("./category/categories"));
export const CategoryCreate = lazy(() => import("./category/categoryCreate"));
export const CategoryUpdate = lazy(() => import("./category/categoryUpdate"));
export const Groups = lazy(() => import("./groups/groups"));
export const GroupsCreate = lazy(() => import("./groups/groupsCreate"));
export const GroupsUpdate = lazy(() => import("./groups/groupsUpdate"));

export const Streets = lazy(() => import("./streets/streets"));
export const StreetsCreate = lazy(() => import("./streets/streetsCreate"));
export const StreetsUpdate = lazy(() => import("./streets/streetsUpdate"));

export const AutoMessage = lazy(() => import("./autoMessage/autoMessage"));
export const AutoMessageCreate = lazy(() =>
  import("./autoMessage/autoMessageCreate")
);
export const AutoMessageUpdate = lazy(() =>
  import("./autoMessage/autoMessageUpdate")
);

export const MessageTemplate = lazy(() =>
  import("./messageTamplate/messageTemplate")
);
export const MessageTemplateCreate = lazy(() =>
  import("./messageTamplate/messageTemplateCreate")
);
export const MessageTemplateUpdate = lazy(() =>
  import("./messageTamplate/messageTemplateUpdate")
);

export const MessageSend = lazy(() => import("./messageSend/messageSend"));
export const MessageSendCreate = lazy(() =>
  import("./messageSend/messageSendCreate")
);
export const MessageSendUpdate = lazy(() =>
  import("./messageSend/messageSendUpdate")
);

export const Users = lazy(() => import("./usersOfStandard/users"));
export const UserCreate = lazy(() => import("./usersOfStandard/usersCreate"));
export const UserUpdate = lazy(() => import("./usersOfStandard/usersUpdate"));

export const Products = lazy(() => import("./products/products"));
export const ProductsUpdate = lazy(() => import("./products/productsUpdate"));
export const ProductsCreate = lazy(() => import("./products/productsCreate"));

export const Admins = lazy(() => import("./admins/admins"));
export const AdminsCreate = lazy(() => import("./admins/adminsCreate"));
export const AdminsUpdate = lazy(() => import("./admins/adminsUpdate"));

export const Transactions = lazy(() => import("./transactions/transactions"));
export const TransactionsUpdate = lazy(() =>
  import("./transactions/transactionsUpdate")
);
export const TransactionsCreate = lazy(() =>
  import("./transactions/transactionsCreate")
);
