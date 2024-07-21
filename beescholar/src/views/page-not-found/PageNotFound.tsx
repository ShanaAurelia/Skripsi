import React, { Component } from "react";

class PageNotFound extends Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div className="container">
                <h3>Page Not Found!</h3>
            </div>
        )
    }
}

export default PageNotFound;