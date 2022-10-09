import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { AppIcons, Assets, NavIcons } from "../../../svg";
import { useWindowSize } from "@react-hook/window-size/throttled";
import Skeleton from "react-loading-skeleton";
import millify from "millify";

const PaymentDetailsBar = ({ slug }) => {
  const [width] = useWindowSize();
  const { network } = useSelector(state => state.app);
  const { theme, linkedStatus } = useSelector(state => state.config);

  const [data, setData] = useState(null);

  const { error, refetch, isLoading } = useQuery(
    "payment-portal",
    () =>
      axios
        .get(`payment-links/${slug}`, {
          headers: {
            Authorization: "",
          },
        })
        .then(response => {
          if (response.data.data?.network === network) {
            setData(response.data.data);
          } else {
            setData(null);
          }
        }),
    {
      refetchOnWindowFocus: false,
      enabled: !!slug && linkedStatus && !!localStorage.getItem("access_token"),
    }
  );

  useEffect(() => {
    if (linkedStatus && localStorage.getItem("access_token")) refetch();
  }, [linkedStatus, network]);

  const [copied, setCopied] = useState(false);

  const copyText = () => {
    if (!slug) return;
    navigator.clipboard.writeText(
      `${window.location.host}/payment-portal/${slug}`
    );
    if (copied === true) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="top_bar payment-dets">
      <>
        <div className="main">
          <div className="payment_details_header">
            {width > 930 ? (
              <div className="link_name">
                <p>
                  Payment links / <span>{slug}</span>
                </p>
              </div>
            ) : null}

            <div className="set_link">
              <p>Set link as </p>
              <NavIcons type="theme" />
            </div>
          </div>
          <div className="bar_buttons">
            <button className="copy_button" onClick={copyText}>
              {!copied && <AppIcons type="copy-link" />}
              <p>{copied ? "Link copied" : "Copy Link"}</p>
            </button>
          </div>
        </div>

        <div className="sub" />

        <div className="payment_details_bar">
          <div className="row_member name">
            <p className="main_text">Link name</p>
            <p className="sub_text">
              {isLoading ? (
                <Skeleton
                  height={14}
                  baseColor={theme === "dark" ? "#2a2a2a" : ""}
                />
              ) : (
                data?.name || "--"
              )}
            </p>
          </div>

          <div className="row_member amt">
            <p className="main_text">Amount</p>
            <p className="sub_text">
              {isLoading ? (
                <Skeleton
                  height={14}
                  baseColor={theme === "dark" ? "#2a2a2a" : ""}
                />
              ) : !isNaN(data?.amount) ? (
                millify(data?.amount, { precision: 3 })
              ) : (
                "--"
              )}
            </p>
          </div>

          <div className="row_member asset">
            <p className="main_text">Asset</p>
            {isLoading ? (
              <Skeleton
                height={14}
                baseColor={theme === "dark" ? "#2a2a2a" : ""}
              />
            ) : data?.asset ? (
              <div className="asset_cont">
                {data?.asset?.image_url && (
                  <img src={data?.asset?.image_url} alt="" />
                )}
                <p>{data?.asset?.short_name}</p>
              </div>
            ) : (
              "--"
            )}
          </div>

          <div className="row_member interval">
            <p className="main_text">Interval</p>

            {isLoading ? (
              <p className="sub_text">
                <Skeleton
                  height={14}
                  baseColor={theme === "dark" ? "#2a2a2a" : ""}
                />
              </p>
            ) : !!data?.is_one_time ? (
              <div
                className={`status_block ${
                  data?.is_one_time ? "onetime" : "continual"
                }`}
              >
                {data?.is_one_time ? "One-time" : "Continual"}
              </div>
            ) : (
              "--"
            )}
          </div>

          <div className="row_member rev">
            <p className="main_text">Total revenue</p>
            <p className="sub_text">
              {isLoading ? (
                <Skeleton
                  height={14}
                  baseColor={theme === "dark" ? "#2a2a2a" : ""}
                />
              ) : !isNaN(data?.total_revenue) ? (
                millify(data?.total_revenue, { precision: 3 })
              ) : (
                "--"
              )}
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default PaymentDetailsBar;
