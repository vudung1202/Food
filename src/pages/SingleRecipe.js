import React, { Component } from "react";
import { recipeData } from "../tempDetails";
import { Link } from "react-router-dom";

export default class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;

    this.state = {
      recipe: recipeData,
      id: id,
      loading: false
    };
  }

  async componentDidMount() {
    const url = `https://www.food2fork.com/api/get?key=b6fb5d86fb9419eeec1129a9e77a1ada&rId=${this.state.id}`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      this.setState({
        recipe: jsonData.recipe,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    if (this.state.loading) {
      return (
        <div className="container my-5">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3 ">
              <h2 className="text-uppercase text-orange text-center">
                loading recipe....
              </h2>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="container my-5">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <Link
                to="/recipes"
                className="btn btn-warning mb-5 text-capitalize"
              >
                back to recipe list
              </Link>

              <img
                src={image_url}
                className="d-block w-100"
                style={{ maxHeight: "30rem" }}
                alt="recipe"
              />
            </div>
            {/* details */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2 text-capitalize"
              >
                publisher webpage
              </a>
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 mx-3 text-capitalize"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4">Ingredients</h2>
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className="list-group-item text-slanted">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
