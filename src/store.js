import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modals/modalSlice";
import configReducer from "./features/config/configSlice";
import requestsReducer from "./features/requests/reqSlice";
import paymentModalReducer from "./features/modals/paymentModalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    app: requestsReducer,
    config: configReducer,
    payModal: paymentModalReducer,
  },
});

export default store;
