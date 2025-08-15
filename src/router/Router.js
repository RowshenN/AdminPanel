import { React, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import PageLoading from "../components/PageLoading";

import {
  Categories,
  CategoryCreate,
  CategoryUpdate,
  Home,
  Login,
  UserCreate,
  UserUpdate,
  Users,
  Products,
  ProductsUpdate,
  ReportTypes,
  ReportTypesCreate,
  ReportTypesUpdate,
  ReportPosts,
  ReportPostsUpdate,
  ReportUsers,
  ReportUsersUpdate,
  Admins,
  AdminsUpdate,
  AdminsCreate,
  Transactions,
  TransactionsUpdate,
  TransactionsCreate,
  ProductsCreate,
  Groups,
  GroupsCreate,
  GroupsUpdate,
  Streets,
  StreetsCreate,
  StreetsUpdate,
  AutoMessage,
  AutoMessageCreate,
  AutoMessageUpdate,
  MessageTemplate,
  MessageTemplateCreate,
  MessageTemplateUpdate,
  MessageSend,
  MessageSendCreate,
  MessageSendUpdate,
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
              component={Categories}
              path="/category"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={CategoryCreate}
              path="/category/create"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={CategoryUpdate}
              path="/category/:id"
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
              component={AutoMessage}
              path="/autoMessage"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={AutoMessageCreate}
              path="/autoMessage/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={AutoMessageUpdate}
              path="/autoMessage/:id"
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
              component={Products}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ProductsCreate}
              path="/products/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={ProductsUpdate}
              path="/products/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Transactions}
              path="/transactions"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={TransactionsCreate}
              path="/transactions/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={TransactionsUpdate}
              path="/transactions/:id"
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
