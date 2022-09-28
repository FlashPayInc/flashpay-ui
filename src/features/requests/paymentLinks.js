import _ from "lodash";
import axios from "axios";
import { updatetLinks } from "./reqSlice";
import { createLink } from "../modals/modalSlice";
import { reloadPage } from "../config/configSlice";

// PAYMENT LINKS
export const GetPaymentLinks = _i => async dispatch => {
  await axios
    .get(`/payment-links`)
    .then(res => {
      if (!!res?.data?.data?.results) {
        console.log(res?.data?.data?.results);
        dispatch(updatetLinks(res?.data?.data?.results));
      }
    })
    .catch(err => {
      console.log(err?.message);
    });
};
export const CreateNewLink = data => async dispatch => {
  const formData = new FormData();
  formData.append("asset", data?.asset);
  formData.append("name", data?.name);
  if (data?.image) {
    formData.append("image", data.image);
    formData.append("fileName", data.image?.name);
  }
  formData.append("amount", data?.amount);
  formData.append("description", data.description);
  formData.append("is_one_time", !!data?.is_one_time);
  formData.append("has_fixed_amount", !!data?.has_fixed_amount);

  dispatch(createLink({ loading: true, error: false }));

  await axios
    .post("payment-links", formData)
    .then(res => {
      dispatch(reloadPage(true));
      dispatch(createLink({ loading: false, error: false }));
    })
    .catch(err => {
      dispatch(createLink({ loading: false, error: true }));
    });
};
