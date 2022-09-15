import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Grid, Box } from "@material-ui/core";

const LoginSignUp = ({ history, location, adminLogin }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error,
    loading,
    isAuthenticated,
    user: userData,
  } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search
    ? location.search.split("=")[1]
    : userData && userData.role === "admin"
    ? "/admin/dashboard"
    : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          style={{
            minHeight: "100vh",
            background: "url('/assets/images/admin-banner.jpg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid item xs={6}></Grid>
          <Grid item xs={6} className="d-flex">
            <div className="admin-login-form">
              <Box mb={3}>
                <Link to="/">
                  <img
                    className="Logo d-block m-auto"
                    src="/assets/images/logo.png"
                    alt="Logo"
                  />
                </Link>
              </Box>

              <Box>
                {adminLogin === true ? (
                  <>
                    <Box fontWeight={600} fontSize={35} textAlign="center">
                      Welcome!
                    </Box>

                    <Box
                      fontWeight={500}
                      fontSize={18}
                      textAlign="center"
                      marginTop="10px"
                      marginBottom="30px"
                    >
                      To keep connected with us please login with your personal
                      info
                    </Box>
                    <form className="loginForm" onSubmit={loginSubmit}>
                      <div className="loginEmail">
                        <p>Email</p>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div className="loginPassword">
                        <p>Password</p>
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Signup"
                        className="loginBtn orangeBtn"
                      />
                    </form>
                    <Box marginTop="20px">
                      Don't have an account?&nbsp;
                      <span
                        className="orangeLink"
                        onClick={() => history.push("/register")}
                      >
                        Register
                      </span>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box fontWeight={600} fontSize={35} textAlign="center">
                      Register
                    </Box>
                    <form
                      className="signUpForm"
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <div className="signUpName">
                        <p>Name</p>
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpEmail">
                        <p>Email</p>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpPassword">
                        <p>Password</p>
                        <input
                          type="password"
                          placeholder="Password"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                        />
                      </div>

                      <div id="registerImage">
                        <p>Profile Photo</p>
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Register"
                        className="signUpBtn orangeBtn"
                      />
                    </form>
                    <Box marginTop="20px">
                      Already have an account?&nbsp;
                      <span
                        className="orangeLink"
                        onClick={() => history.push("/login")}
                      >
                        Login
                      </span>
                    </Box>
                  </>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
