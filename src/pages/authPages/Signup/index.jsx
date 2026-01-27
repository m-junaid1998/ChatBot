import InputField from "../../../components/InputField";
import cnicIcon from "../../../assets/images/cnic.png";
import backArrow from "../../../assets/images/left-back-arrow.png";
import emailIcon from "../../../assets/images/email-icon.png";
import { Link, useNavigate } from "react-router-dom";
import useErrorHandlingHook from "../../../hooks/useErrorHandlingHook";
import { validationRules } from "../../../utils/Validations";

function Signup() {
  const navigate = useNavigate();

  const validationSchema = {
    cnic: [
      validationRules.required("Cnic"),
      validationRules.number("Cnic"),
      validationRules.regex(/^\d{5}[-\s]?\d{7}[-\s]?\d$/, "invalid cnic"),
    ],
    phoneNumber: [
      validationRules.required("Phone Number"),
      validationRules.number("phone Number"),
      validationRules.maxLength(11, "Phone Number"),
    ],
    email: [validationRules.required("Email"), validationRules.email()],
  };

  const { apiData, setterForApiData, checkForError } = useErrorHandlingHook(
    {
      cnic: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema
  );

  const handleCreateAccount = () => {
    const isAllowed = checkForError();
    if (isAllowed) {
      navigate("/OtpVerification", { state: { from: "signup" } });
    }
  };

  return (
    <div className="login-container">
      <div className="login-info-container">
        {/* <img src="./assets/images/igi-logo.png" className="login-logo" /> */}
        <Link to={"/"}>
          <img src={backArrow} className="backIcon" />
        </Link>
        <h1 className="login-to">
          Sign up to <span>Manage your claims.</span>
        </h1>
        <p className="login-info">
          Enter your email, CNIC Number and create a secure password to
          register.
        </p>
      </div>
      <div className="login-input-contaner">
        <InputField
          heading={"CNIC Number"}
          placeholder={"12345-6789012-3"}
          type={"text"}
          showIcon={true}
          rightIcon={cnicIcon}
          value={apiData.cnic}
          onChange={(e) => setterForApiData("cnic", e.target.value)}
          error={apiData.error_cnic}
        />

        <InputField
          heading={"Phone Number"}
          placeholder={"92 000 000 0000"}
          type={"text"}
          showIcon={true}
          rightIcon={cnicIcon}
          value={apiData.phoneNumber}
          onChange={(e) => setterForApiData("phoneNumber", e.target.value)}
          error={apiData.error_phoneNumber}
        />

        <InputField
          heading={"Email Address / Mobile Number"}
          placeholder={"imran-naveed-8852@gmail.com"}
          type={"email"}
          showIcon={true}
          rightIcon={emailIcon}
          value={apiData.email}
          onChange={(e) => setterForApiData("email", e.target.value)}
          error={apiData.error_email}
        />
        <div className="signup-credential-info">
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
        <button onClick={handleCreateAccount}>Create Account</button>
      </div>
      <div className="dont-have">
        <p>
          Already have an account?{" "}
          <button>
            <Link to={"/"}>Login</Link>
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
