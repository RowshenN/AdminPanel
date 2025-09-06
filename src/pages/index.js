import { lazy } from "react";
export const Login = lazy(() => import("./login/login"));
export const Home = lazy(() => import("./home/Home"));

export const News = lazy(() => import("./news/news"));
export const NewsCreate = lazy(() => import("./news/newsCreate"));
export const NewsUpdate = lazy(() => import("./news/newsUpdate"));

export const Service = lazy(() => import("./service/service"));
export const ServiceCreate = lazy(() => import("./service/serviceCreate"));
export const ServiceUpdate = lazy(() => import("./service/serviceUpdate"));

export const Works = lazy(() => import("./works/works"));
export const WorksCreate = lazy(() => import("./works/worksCreate"));
export const WorksUpdate = lazy(() => import("./works/worksUpdate"));

export const Groups = lazy(() => import("./groups/groups"));
export const GroupsCreate = lazy(() => import("./groups/groupsCreate"));
export const GroupsUpdate = lazy(() => import("./groups/groupsUpdate"));

export const Streets = lazy(() => import("./streets/streets"));
export const StreetsCreate = lazy(() => import("./streets/streetsCreate"));
export const StreetsUpdate = lazy(() => import("./streets/streetsUpdate"));

export const About = lazy(() => import("./about/abouts"));
export const AboutCreate = lazy(() => import("./about/aboutCrate"));
export const AboutUpdate = lazy(() => import("./about/aboutUpdate"));

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

export const Banner = lazy(() => import("./banner/banner"));
export const BannerUpdate = lazy(() => import("./banner/bannerUpdate"));
export const BannerCreate = lazy(() => import("./banner/bannerCreate"));

export const Admins = lazy(() => import("./admins/admins"));
export const AdminsCreate = lazy(() => import("./admins/adminsCreate"));
export const AdminsUpdate = lazy(() => import("./admins/adminsUpdate"));

export const Contact = lazy(() => import("./contacts/Contact"));
export const ContactUpdate = lazy(() => import("./contacts/contactUpdate"));
export const ContactCreate = lazy(() => import("./contacts/contactCreate"));

export const Subscribes = lazy(() => import("./subscribes/Subscribes"));
