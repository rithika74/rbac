import React, { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ContextDatas } from "../../services/Context";
import { basePath } from "../../services/UrlPaths";

function PageLogin() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const { isLogedIn } = useContext(ContextDatas);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogedIn) {
      navigate(basePath); // Redirect to the base path if already logged in
    }
  }, [isLogedIn]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const response = await fetch("https://your-api-url.com/users"); // Use live URL for production
      const users = await response.json();

      const user = users.find(
        (u) =>
          u.username === userData.username && u.password === userData.password
      );

      if (user) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);

        toast.success("Login successful!");

        // Use navigate for redirection instead of window.location.href
        if (user.role === 'admin') {
          navigate("/rbac/user-list");
        } else {
          navigate("/rbac/welcome");
        }
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <main className="main-content" style={{ marginTop: "-20px" }}>
        <div className="admin">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-8">
                <div className="edit-profile">
                  <div className="card border-0">
                    <div className="card-header p-0">
                      <div className="edit-profile__title">
                        <div className="edit-profile__logos">
                          <a href="/">
                            <img className="dark" src="img/logo/logo-wins.svg" alt="" width={40} />
                            <img className="light" src="img/logo/logo-wins.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="edit-profile__body">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Username or Email Address</label>
                            <input
                              className="form-control ih-medium ip-light radius-xs b-light px-15"
                              required id="name"
                              type="text"
                              placeholder="Enter username or email"
                              name="username"
                              value={userData.username}
                              onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please add username</Form.Control.Feedback>
                          </div>

                          <div className="form-group">
                            <label>Password</label>
                            <input
                              className="form-control ih-medium ip-light radius-xs b-light px-15"
                              required id="password"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={userData.password}
                              onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Please add password</Form.Control.Feedback>
                          </div>

                          <button className="btn btn-primary btn-default btn-squared px-30 w-100 mt-4" type="submit">
                            Sign in
                          </button>
                          {errorMessage && (
                            <div className="text-danger mt-3 radius-xs b-light" style={{ fontSize: ".875em", color: "#DF060A", border: "none" }}>
                              {errorMessage}
                            </div>
                          )}
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default PageLogin;
