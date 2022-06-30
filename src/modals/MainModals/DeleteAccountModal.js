import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../features/modals/modalSlice";

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <>
      <div className="modal_header">
        <p className="main delete">
          Are you sure you want to delete your account?
        </p>
        <p className="sub">
          We would like like to know if we can share a document contaning your
          transactions to you. Enter your email for the document.
        </p>
      </div>

      <div className="modal_content">
        <div className="optional_email">
          <input type="text" placeholder="Email address (optional)" />
        </div>
      </div>

      <div className="action_buttons">
        <button
          className="cancel_button"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
        <button
          className="delete_button"
          onClick={() => {
            localStorage.clear();
            dispatch(closeModal());
            navigate("./", { replace: true });
          }}
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccountModal;
