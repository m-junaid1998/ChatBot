import { useState } from "react";
import topIcon from "../../../assets/images/otp-verification.png";
import backArrow from "../../../assets/images/left-back-arrow.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Countdown from "react-countdown";
import { usePostMutation } from "../../../api/apiSlice";
import { endpoints } from "../../../api/config";
import { toast } from "react-toastify";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [endTime, setEndTime] = useState(Date.now() + 30000);
  const [showResend, setShowResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [verifyOtp] = usePostMutation();

  const handleVerifyOtp = () => {
    if (otp.length === 5) {
      verifyOtp({
        endpoint: `${endpoints.auth.VerifyOtp}?OTP=${otp}&Email=${email}`,
      }).then((res) => {
        if (res?.data?.success) {
          navigate("/CreatePassword", {
            state: { token: res?.data, email },
          });
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-info-container">
        <img src={topIcon} className="verification-logo" />
        <Link>
          <img src={backArrow} className="backIcon" />
        </Link>
        <h1 className="login-to">
          OTP <span>Verification.</span>
        </h1>
        <h2>It’s really You?</h2>
        <p className="login-info">
          An authentication code has been sent to{" "}
          <span>imran-naveed-8852@gmail.com</span>
        </p>
      </div>
      <div className="verification-detail">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderInput={(props) => (
            <input {...props} className="verification-box" />
          )}
          containerStyle={"otp-input"}
        />

        <Countdown
          key={endTime}
          date={endTime}
          renderer={({ seconds, completed }) => {
            if (completed) {
              setShowResend(true);
              return <span></span>;
            }
            return (
              <div className="resend">
                <p>Send code again {seconds}</p>
              </div>
            );
          }}
        />

        {showResend && (
          <div className="resend-code">
            <button
              onClick={() => {
                setEndTime(Date.now() + 30000);
                setShowResend(false);
              }}
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>

      <div className="login-btn-container">
        <button
          onClick={handleVerifyOtp}
          disabled={otp.length < 5 ? true : false}
          style={{
            background:
              otp.length < 5
                ? "linear-gradient(rgb(152 152 152), rgb(220 220 220))"
                : "linear-gradient(#0B4A98, #48C3FF)",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
