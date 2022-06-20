import React from "react";

const ProfileSettings = () => {
  return (
    <div className="profile_cover">
      <div className="user_profile">
        <div className="profile_pic">
          <img
            src="https://blush.design/api/download?shareUri=0I6cFC5NGKx-CnTR&c=Skin_0%7Ed08b5b&w=800&h=800&fm=png"
            alt=""
          />
        </div>

        <div className="user_email">
          <p className="title">Email address</p>
          <p className="value">remembered@gmail.com</p>
        </div>
      </div>

      <div className="delete_button_block">
        <div className="delete_button">Delete account</div>
      </div>
    </div>
  );
};

export default ProfileSettings;
