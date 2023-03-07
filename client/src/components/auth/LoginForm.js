import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Alert state
  const [alert, setAlert] = useState(null);
  // trạng thái ban đầu của alert là null
  // nếu dùng hàm setAlert() thì trạng thái của alert sẽ được cập nhật

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm); // hàm loginUser trong AuthContext
      // console.log(loginData);

      if (loginData.success) {
        //history.push("/dashboard");
        // không dùng history.push vì Component mẹ bọc bên ngoài login form là view/Auth sẽ tự redirect đến dashboard
        // vì views/Auth.js có đoạn else if (isAuthenticated) return <Redirect to="/dashboard" />;
      } else {
        // setAlert cần trả về object theo định dạng của layout/AlertMesssage
        setAlert({
          type: "danger",
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 5000);
        // khi có lỗi, hiện alert lỗi
        // sau 5s, setAlert là null để không hiện alert lên nữa
      }
    } catch (error) {
      console.log(error);
    }
  };

  // trong return: truyền props là trạng thái mới nhất của alert cho component AlertMessage
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
