import logo from "../logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function logMeOut() {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        props.removeToken();
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {!props.token && props.token !== "" && props.token !== undefined ? (
        ""
      ) : (
        <button onClick={logMeOut}>Logout</button>
      )}
    </header>
  );
}

export default Header;
