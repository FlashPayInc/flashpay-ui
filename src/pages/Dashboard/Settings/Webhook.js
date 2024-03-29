import { useQuery } from "react-query";
import { AppIcons } from "../../../svg";
import { useSelector } from "react-redux";
import Vectors from "../../../svg/Vectors";
import { SpinnerCircular } from "spinners-react";
import React, { useEffect, useState } from "react";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { isValidUrl } from "../../../utils/helpers";
import { axiosGet, axiosPost } from "../../../axios";

const Webhook = () => {
  const [copied, setCopied] = useState(0);
  const { network } = useSelector(state => state.app);
  const { theme, reload, linkedStatus, walletAddress } = useSelector(
    state => state.config
  );
  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    if (copied === key) return;
    setCopied(key);
    setTimeout(() => setCopied(0), 2000);
  };

  const [data, setData] = useState(null);

  const { isLoading, isRefetching, error, refetch } = useQuery(
    "webhook",
    () => {
      if (!walletAddress || !localStorage.getItem("access_token")) return;
      return axiosGet(`/accounts/webhook`).then(response =>
        setData(response?.data?.data)
      );
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && !!localStorage.getItem("walletAddress")) refetch();
  }, [linkedStatus, reload, network]);

  const [generating, setGenerating] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  const setWebhook = async () => {
    if (!isValidUrl(webUrl)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setGenerating(true);
    const formData = new FormData();
    formData.append("url", webUrl);
    try {
      await axiosPost(`/accounts/webhook`, formData).then(response => {
        setGenerating(false);
        setData(response?.data?.data);
        setWebUrl("");
      });
    } catch (error) {
      setGenerating(false);
    }
  };

  return (
    <div className="webhook-settings">
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
          <p style={{ fontSize: "18px" }}>Fetching Webhook url</p>
        </div>
      ) : !error && !!walletAddress ? (
        <>
          {!!data?.url && (
            <div className="webhook-block">
              <div className="webhook">
                <div className="webhook_inner">
                  <p className="title">Webhook Url</p>
                  <p className="value">{data?.url}</p>
                </div>

                <div className="copy_key" onClick={e => copyText(data?.url, 1)}>
                  <AppIcons type={copied === 1 ? "tickcircle" : "copy"} />
                </div>
              </div>
            </div>
          )}

          <div className="webhook-block">
            <div className="webhook-block__input">
              <input
                type="text"
                value={webUrl}
                placeholder="Input webhook new url"
                onChange={e => setWebUrl(e.target.value)}
              />
              {!isValid && (
                <div className="warning-text">Invalid url provided</div>
              )}
            </div>
          </div>

          <div className="webhook-settings__set-url" onClick={setWebhook}>
            <p>Set Webhook Url</p>

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
                ? `Webhook url not set`
                : "An error occurred fetching Webhook url. <br/> Please try again"
            }
            process="plain"
          >
            {Vectors[!error ? "search" : "connectivity"]({
              dark: theme === "dark",
            })}
          </EmptyStateContainer>

          {!!walletAddress && !error && (
            <div className="generate_new_keys" onClick={setWebhook}>
              <p>Set Webhook Url</p>

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

export default Webhook;
