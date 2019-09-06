import React, { Component } from 'react'
import { recipe } from "../tempDetails";

export default class RecipeDetails extends Component {
    // constructor(props){
    //     super(props)

    //     this.state = {
    //         recipe: recipe,
    //         url: `https://www.food2fork.com/api/get?key=b6fb5d86fb9419eeec1129a9e77a1ada&rId=${this.props.id}`
    //     }
    // }

    // async componentDidMount(){
    //     try {   
    //         const data = await fetch( this.state.url );
    //         const jsonData = await data.json();       
    //         this.setState({
    //             recipes: jsonData.recipes
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }        
    // }

    state = {
        recipe: recipe
    }

    async componentWillMount(){
        const id = this.props.id;
        const url = `https://www.food2fork.com/api/get?key=b6fb5d86fb9419eeec1129a9e77a1ada&rId=${id}`;
        try {   
            const data = await fetch( url );
            const jsonData = await data.json();       
            this.setState((state,props)=>{
                return {recipes: jsonData.recipes}
            },()=>{});
        } catch (error) {
            console.log(error);
        }  
    }

    render() {
        const {image_url,
               publisher, 
               publisher_url, 
               source_url, 
               title,
               ingredients
            } = this.state.recipe;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto co-md-6 my-3">
                            <button className="btn btn-primary mb-5 text-capitalize">
                                back to recipe list 
                            </button>
                            <img 
                                src={image_url}
                                className="d-block w-100"
                                alt="recipe"
                            />
                        </div>
                        {/** details */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className="text-uppercase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">
                                provider by: {publisher}
                            </h6>
                            <a href={source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary mt-2 ms-3 text-capitalize"
                                >recipe url
                            </a>
                            <ul className="list-group mt-4">
                                <h2 className="mt-3 mb-4">Ingredients</h2>
                                {
                                    ingredients.map((item,index)=>{
                                        return(
                                            <li key={index} className="list-group-item text-slanted">
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                    
                </div>
                    
            </React.Fragment>
        )
    }
}

