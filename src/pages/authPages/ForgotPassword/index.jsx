import topIcon from "../../../assets/images/forgot-password.png";
import backArrow from "../../../assets/images/left-back-arrow.png";
import emailIcon from "../../../assets/images/email-icon.png";
import InputField from "../../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import useErrorHandlingHook from "../../../hooks/useErrorHandlingHook";
import { validationRules } from "../../../utils/Validations";
import { usePostMutation } from "../../../api/apiSlice";
import { endpoints } from "../../../api/config";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();

  const validationSchema = {
    email: [validationRules.required("Email"), validationRules.email()],
  };

  const { apiData, setterForApiData, checkForError } = useErrorHandlingHook(
    {
      email: "",
    },
    validationSchema
  );

  const [forgotPassword, { data, isSuccess, isLoading }] = usePostMutation();

  const handleForgotPassword = () => {
    const isAllowed = checkForError();
    if (isAllowed) {
      forgotPassword({
        endpoint: `${endpoints.auth.ResendOtp}?Email=${apiData.email}`,
      })
        .then((res) => {
          if (res?.data?.success) {
            navigate("/OtpVerification", { state: { email: apiData.email } });
            return;
          }
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Something went wrong");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="login-container">
      <div className="login-info-container">
        <img src={topIcon} className="forgot-logo" />
        <Link>
          <img src={backArrow} className="backIcon" />
        </Link>
        <h1 className="login-to">
          Forgot <span>Password.</span>
        </h1>
        <p className="login-info">
          Enter your email address to recover your password.
        </p>
      </div>
      <div className="login-input-contaner">
        <InputField
          heading={"Email Address"}
          type={"email"}
          placeholder={"Enter your email address"}
          showIcon={true}
          rightIcon={emailIcon}
          value={apiData.email}
          onChange={(e) => setterForApiData("email", e.target.value)}
          error={apiData.error_email}
        />
      </div>
      <div className="login-btn-container">
        <button
          onClick={handleForgotPassword}
          disabled={isLoading ? true : false}
          style={{
            background: isLoading
              ? "grey"
              : "linear-gradient(#0B4A98, #48C3FF)",
          }}
        >
          {isLoading ? "Loading..." : "Forgot Password"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
