import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { AppIcons } from "../../../svg";

const ApiSettings = () => {
  const notEmpty = true;

  const { network } = useSelector(state => state.app);
  const { reload, linkedStatus } = useSelector(state => state.config);

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    "payment-links",
    () =>
      axios
        .get(`/accounts/api-keys`, {
          headers: {
            Authorization: !!localStorage.getItem("access_token")
              ? `Bearer ${localStorage.getItem("access_token")}`
              : "",
          },
        })
        .then(response => response?.data?.data),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && !!localStorage.getItem("walletAddress")) refetch();
  }, [linkedStatus, reload, network]);

  const [generating, setGenerating] = useState(false);

  const generateKey = async () => {
    setGenerating(true);
    try {
      await axios
        .post(
          `/accounts/api-keys`,
          { network },
          {
            headers: {
              Authorization: !!localStorage.getItem("access_token")
                ? `Bearer ${localStorage.getItem("access_token")}`
                : "",
            },
          }
        )
        .then(response => {
          setGenerating(false);
          console.log(response?.data?.data);
          refetch();
        });
    } catch (error) {
      setGenerating(false);
    }
  };

  console.log(data);

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
                <p className="value">{data?.secret_key}</p>
              </div>

              <div className="copy_key">
                <AppIcons type="copy" />
              </div>
            </div>
            <div className="hide_secret_key">Hide secret key</div>
            {/* <button className="save_changes">Save changes</button> */}
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyStateContainer
            vector="not-found"
            text={`You have not generated any API key`}
          />

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
        </div>
      )}
    </div>
  );
};

export default ApiSettings;
