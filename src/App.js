import "./App.css";
import Routes from "./router/Router";
import ContextProvider from "./context/context";
import { Provider } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { store } from "./store";
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const history = useHistory();
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let lastAcivity = localStorage.getItem("lastActvity");
      var diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
      var seconds = Math.floor(diffMs / 1000);
      var minute = Math.floor(seconds / 60);
      // console.log(seconds + " sec and " + minute + " min since last activity");
      if (minute >= 15) {
        // history.push({ pathname: "/login" });
        localStorage.removeItem("userData");
        localStorage.removeItem("lastActvity");
        // console.log("No activity from last 30 minutes... Logging Out");
        clearInterval(timeInterval);
        //code for logout or anything...
      }
    }, 1000);
  }, []);

  const move = () => {
    localStorage.setItem("lastActvity", new Date());
  };

  const clicks = () => {
    localStorage.setItem("lastActvity", new Date());
  };

  return (
    <div
      onClick={() => clicks()}
      onMouseMove={() => move()}
      className="App select-none"
    >
      <Provider store={store}>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </Provider>
    </div>
  );
}

export default App;
