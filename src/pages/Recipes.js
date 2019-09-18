import React, { Component } from "react";
import Search from "../components/Search";
import { recipeData } from "../tempList";
import RecipeList from "../components/RecipeList";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  state = {
    recipes: recipeData,
    url: `https://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada`,
    base_url: `https://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada`,
    search: "",
    query: "&q=",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return { error: "sorry, but your search did not return any results" };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.recipes, error: "" };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      {
        url: `${base_url}${query}${search}`,
        search: ""
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this .handleSubmit}
        />

        {this.state.error ? (
          <section>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div className="text-orange text-center text-uppercase mt-5">
                    {this.state.error}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <RecipeList recipes={this.state.recipes} />
        )}
      </React.Fragment>
    );
  }
}
