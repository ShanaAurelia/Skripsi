import React, {Component} from "react";
import { Link } from "react-router-dom";
import { IHomepageState, IHomepageProps } from "./Homepage.interface";

class Homepage extends Component<IHomepageProps, IHomepageState>{
    constructor(props: IHomepageProps) {
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <>
            hellow
            </>
        )
    }
}

export default Homepage;