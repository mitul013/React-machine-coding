import { Provider } from "react-redux";
import { store } from "./store/store";
import Board from "./Board";

const TicTaeToe = () => {
  console.log("TicTaeToe render");
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
};

export default TicTaeToe;
