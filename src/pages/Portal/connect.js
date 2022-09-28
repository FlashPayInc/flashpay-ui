import millify from "millify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppIcons, ConnectIcon } from "../../svg";
import { ConnectWalletAsync } from "../../features/requests";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Connect = ({ data, amount }) => {
  const dispatch = useDispatch();
  const [option, setOption] = useState("");
  const [failedImg, setFailedImg] = useState(false);

  const handlePayment = () => {
    dispatch(
      ConnectWalletAsync({
        amount,
        provider: option,
        connectType: "payment",
        recipient: data?.creator,
        pub_key: data?.public_key,
        asset: data?.asset?.asa_id,
      })
    );
  };

  return (
    <>
      <div className="logo_img">
        {data?.image_url && !failedImg ? (
          <LazyLoadImage
            effect="blur"
            alt="payment-image"
            src={data?.image_url}
            onError={e => setFailedImg(true)}
            placeholder={<AppIcons type="flashpay" />}
          />
        ) : (
          <AppIcons type="flashpay" />
        )}
      </div>
      <div className="description_text">
        <p className="main">{data?.name}</p>
      </div>

      <div className="connect_container">
        <div className="options_header">
          <p className="sub">
            {`Connect wallet to pay ${millify(Number(amount), {
              precision: 3,
            })} ${data?.asset?.short_name} to ${data?.name}`}
          </p>
        </div>
        <div className="modal_content">
          {[
            { type: "pera", name: "Pera wallet" },
            { type: "myalgo", name: "My Algo wallet" },
          ].map((opt, index) => {
            return (
              <div
                key={index}
                className="connect_option"
                onClick={() => setOption(opt?.type)}
              >
                <div className="option_info">
                  <ConnectIcon type={opt.type} />
                  <p>{opt.name}</p>
                </div>
                <div className="option_ticked">
                  {opt.type === option ? (
                    <ConnectIcon type="tickcircle" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="continue_to_pay"
          onClick={() => {
            if (!!option) {
              handlePayment();
            }
          }}
        >
          Continue
        </button>
      </div>

      <div className="powered_by_block">
        <p>Powered by</p>
        <AppIcons type="flashpay-main" />
      </div>
    </>
  );
};

export default Connect;
