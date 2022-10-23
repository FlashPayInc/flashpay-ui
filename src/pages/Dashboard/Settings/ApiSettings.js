import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { hideApiKeys } from "../../../features/config/configSlice";
import { AppIcons } from "../../../svg";
import Vectors from "../../../svg/Vectors";
import { axiosGet } from "../../../utils/helpers";

const ApiSettings = () => {
  const dispatch = useDispatch();
  const { network } = useSelector(state => state.app);
  const { theme, reload, hideKeys, linkedStatus, walletAddress } = useSelector(
    state => state.config
  );

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    "payment-links",
    () => {
      if (!walletAddress || !localStorage.getItem("access_token")) return;

      return axiosGet(`/accounts/api-keys`).then(
        response => response?.data?.data
      );
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && !!localStorage.getItem("walletAddress")) refetch();
  }, [linkedStatus, reload, network]);

  const [generating, setGenerating] = useState(false);

  const generateKey = async () => {
    setGenerating(true);
    try {
      await axiosGet(`/accounts/api-keys`, { network }).then(response => {
        setGenerating(false);
        console.log(response?.data?.data);
        refetch();
      });
    } catch (error) {
      setGenerating(false);
    }
  };

  const [copied, setCopied] = useState(0);

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    if (copied === key) return;
    setCopied(key);
    setTimeout(() => setCopied(0), 2000);
  };

  return (
    <div className="api_settings">
      {isLoading || isRefetching ? (
        <div
          style={{
            gap: "12px",
            width: "100%",
            height: "100%",
            minHeight: "50vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SpinnerCircular size={80} color="#e5fff6" secondaryColor="#1c7989" />
          <p style={{ fontSize: "18px" }}>Fetching API keys</p>
        </div>
      ) : !!data?.secret_key && !error ? (
        <>
          <div className="api_keys">
            <div className="api_key">
              <div className="api_key_inner">
                <p className="title">Secret key</p>
                <p className="value">
                  {hideKeys?.secret === false
                    ? "**************"
                    : data?.secret_key}
                </p>
              </div>

              <div
                className="copy_key"
                onClick={e => copyText(data?.secret_key, 1)}
              >
                <AppIcons type={copied === 1 ? "tickcircle" : "copy"} />
              </div>
            </div>
            <div
              className="hide_secret_key"
              onClick={e =>
                dispatch(hideApiKeys({ secret: !hideKeys?.secret }))
              }
            >
              {`${hideKeys?.secret === false ? "View" : "Hide"} secret key`}
            </div>
          </div>

          <div className="api_keys">
            <div className="api_key">
              <div className="api_key_inner">
                <p className="title">Public key</p>
                <p className="value">
                  {hideKeys?.public === false
                    ? "**************"
                    : data?.public_key}
                </p>
              </div>

              <div
                className="copy_key"
                onClick={e => copyText(data?.public_key, 2)}
              >
                <AppIcons type={copied === 2 ? "tickcircle" : "copy"} />
              </div>
            </div>
            <div
              className="hide_secret_key"
              onClick={e =>
                dispatch(hideApiKeys({ public: !hideKeys?.public }))
              }
            >
              {`${hideKeys?.public === false ? "View" : "Hide"} public key`}
            </div>
          </div>

          <div className="generate_new_keys" onClick={generateKey}>
            <p>Generate new key</p>

            {generating ? (
              <SpinnerCircular
                size={18}
                color="#fff"
                secondaryColor="#1b8a9b"
              />
            ) : null}
          </div>
        </>
      ) : (
        <div
          style={{
            flex: 1,
            gap: "30px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyStateContainer
            vector="not-found"
            text={
              !walletAddress
                ? "Nothing to see here"
                : !error
                ? `You have not generated any API key`
                : "An error occurred fetching Api keys. <br/> Please try again"
            }
            process="plain"
          >
            {Vectors[!error ? "search" : "connectivity"]({
              dark: theme === "dark",
            })}
          </EmptyStateContainer>

          {!!walletAddress && !error && (
            <div className="generate_new_keys" onClick={generateKey}>
              <p>Generate new key</p>

              {generating ? (
                <SpinnerCircular
                  size={18}
                  color="#fff"
                  secondaryColor="#1b8a9b"
                />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiSettings;
