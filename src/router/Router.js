import { React, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import PageLoading from "../components/PageLoading";

import {
  News,
  NewsCreate,
  NewsUpdate,
  Home,
  Login,
  UserCreate,
  UserUpdate,
  Users,
  Admins,
  AdminsUpdate,
  AdminsCreate,
  Contact,
  ContactUpdate,
  ContactCreate,
  Groups,
  GroupsCreate,
  GroupsUpdate,
  Streets,
  StreetsCreate,
  StreetsUpdate,
  MessageTemplate,
  MessageTemplateCreate,
  MessageTemplateUpdate,
  MessageSend,
  MessageSendCreate,
  MessageSendUpdate,
  About,
  AboutCreate,
  AboutUpdate,
  Banner,
  BannerCreate,
  BannerUpdate,
  Service,
  ServiceCreate,
  ServiceUpdate,
  Works,
  WorksCreate,
  WorksUpdate,
  Subscribes,
} from "../pages/index";

import ScrollIntoView from "./ScrollIntoView";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const App = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <BrowserRouter>
      <ScrollIntoView>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <PrivateRoute restricted={true} component={Home} path="/" exact />
            <PrivateRoute
              restricted={true}
              component={Home}
              path="/home"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={News}
              path="/news"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={NewsCreate}
              path="/news/create"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={NewsUpdate}
              path="/news/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Service}
              path="/service"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={ServiceCreate}
              path="/service/create"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={ServiceUpdate}
              path="/service/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Groups}
              path="/groups"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={GroupsCreate}
              path="/groups/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={GroupsUpdate}
              path="/groups/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Streets}
              path="/streets"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={StreetsCreate}
              path="/streets/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={StreetsUpdate}
              path="/streets/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={About}
              path="/about"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={AboutCreate}
              path="/about/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={AboutUpdate}
              path="/about/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Works}
              path="/works"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={WorksCreate}
              path="/works/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={WorksUpdate}
              path="/works/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={MessageTemplate}
              path="/messageTemplate"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={MessageTemplateCreate}
              path="/messageTemplate/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={MessageTemplateUpdate}
              path="/messageTemplate/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={MessageSend}
              path="/messageSend"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={MessageSendCreate}
              path="/messageSend/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={MessageSendUpdate}
              path="/messageSend/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Users}
              path="/users"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={UserCreate}
              path="/users/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={UserUpdate}
              path="/users/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Banner}
              path="/banner"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BannerCreate}
              path="/banner/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={BannerUpdate}
              path="/banner/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Subscribes}
              path="/subscribes"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Contact}
              path="/contact"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ContactCreate}
              path="/contact/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ContactUpdate}
              path="/contact/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Admins}
              path="/admins"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={AdminsCreate}
              path="/admins/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={AdminsUpdate}
              path="/admins/:id"
              exact
            />

            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
