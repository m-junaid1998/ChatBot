import { useState } from "react";
import InputField from "../../../components/InputField";
import topIcon from "../../../assets/images/otp-verification.png";
import backArrow from "../../../assets/images/left-back-arrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../../../components/SuccessModal";
import useErrorHandlingHook from "../../../hooks/useErrorHandlingHook";
import { toast } from "react-toastify";
import { validationRules } from "../../../utils/Validations";
import OTPInput from "react-otp-input";
import Countdown from "react-countdown";
import { usePostMutation } from "../../../api/apiSlice";
import { endpoints } from "../../../api/config";

function CreatePassword() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const { token, email } = state;

  const validationSchema = {
    password: [
      validationRules.required("Password"),
      validationRules.regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8 characters including Uppercase, Lowercase & special character."
      ),
    ],
    confirmPassword: [
      validationRules.required("Confirm Password"),
      validationRules.regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8 characters including Uppercase, Lowercase & special character."
      ),
    ],
  };

  const { apiData, setterForApiData, checkForError } = useErrorHandlingHook(
    {
      password: "",
      confirmPassword: "",
    },
    validationSchema
  );

  const [changePassword, { data, isLoading }] = usePostMutation();

  const handleSubmit = () => {
    const isAllowed = checkForError();
    if (isAllowed) {
      if (apiData.password !== apiData.confirmPassword) {
        toast.error("Password not matched");
        return;
      } else {
        changePassword({
          endpoint: `${endpoints.auth.SetPassword}?Email=${email}&NewPassword=${apiData.password}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setShowSuccessModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleContinue = () => {
    navigate("/");
    setShowSuccessModal(false);
  };

  // const handleResend = () => {
  //     setEndTime(Date.now() + 30000);
  // }

  return (
    <div className="login-container">
      <div className="login-info-container">
        <img src={topIcon} className="verification-logo" />
        {/* <Link>
                    <img src={backArrow} className="backIcon" />
                </Link> */}
        <h1 className="login-to">
          Create New <span>Password.</span>
        </h1>
        <p className="login-info">
          At least 8 characters, with uppercase and lowercase letters.
        </p>
      </div>
      <div className="login-input-contaner">
        <InputField
          heading={"Password"}
          type={"password"}
          placeholder={"**********"}
          showIcon={true}
          passwordIcon={true}
          value={apiData.password}
          onChange={(e) => setterForApiData("password", e.target.value)}
          error={apiData.error_password}
        />
        <InputField
          heading={"Confirm Password"}
          type={"password"}
          placeholder={"**********"}
          showIcon={true}
          passwordIcon={true}
          value={apiData.confirmPassword}
          onChange={(e) => setterForApiData("confirmPassword", e.target.value)}
          error={apiData.error_confirmPassword}
        />

        {/* <div className="verification-detail">
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
                        renderInput={(props) => <input {...props} className='verification-box' />}
                        containerStyle={"otp-input"}
                    />


                    <Countdown
                        key={endTime}
                        date={endTime}
                        renderer={({ seconds, completed }) =>
                            completed ? (
                                <span>Time up! You can resend OTP</span>
                            ) : (
                                <div className="resend">
                                    <p>Send code again {seconds}</p>
                                </div>
                            )
                        }
                    />
                    <div className="resend-code">
                        <button onClick={handleResend}>Resend Code</button>
                    </div>
                </div> */}
        <div className="verification-credential-info">
          <ul>
            <li>
              Minimum length of 8 characters, including at least one uppercase
              letter, one number, and one special character.
            </li>
            <li>
              Special characters can include digits and punctuation (e.g.,
              !@#$%^&*()_+|~-={}[]:";' ?,./).
            </li>
            <li>Case sensitivity is mandatory.</li>
          </ul>
        </div>
      </div>
      <div className="login-btn-container">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <SuccessModal
        show={showSuccessModal}
        close={handleCloseModal}
        handleContinue={handleContinue}
        heading={"Successful!"}
        // detail={screenName === "signup" ? "Subscribe to our newsletter in order to stay up to date for all the upcoming events!" : "Your password has been changed successfully."}
        // buttontext={screenName === "signup" ? "Login" : "Continue To Login"}

        detail={"Your password has been changed successfully."}
        buttontext={"Continue To Login"}
      />
    </div>
  );
}

export default CreatePassword;
