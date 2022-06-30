import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modals/modalSlice";
import configReducer from "./features/config/configSlice";
import paymentModalReducer from "./features/modals/paymentModalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    config: configReducer,
    payModal: paymentModalReducer,
  },
});

export default store;
