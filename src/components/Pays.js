import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pays.css";
import PaysId from "./PaysId";

export default class ZiyadPays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ziyad: [],
      paysId: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => {
        const Ziyad = res.data.meals;
        this.setState({ Ziyad });
      });
  }
  handleClick(e) {
    const pays = e.target.value;
    this.setState({ paysId: pays });
  }

  render() {
    return (
      <>
        <ul>
          {this.state.Ziyad.map((Ziyads, i) => (
            <li key={i}>
              <input
                type="submit"
                className="Pays-btn"
                onClick={this.handleClick}
                value={Ziyads.strArea}
                name={Ziyads.strArea}
              />
            </li>
          ))}
        </ul>
        <PaysId city={this.state.paysId} />
      </>
    );
  }
}
