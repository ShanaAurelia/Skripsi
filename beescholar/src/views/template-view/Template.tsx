import React, {Component} from "react";
import { ITemplateProps, ITemplateState } from "./Template.interface";

class TemplateComponent extends Component<ITemplateProps, ITemplateState>{
    constructor(props: ITemplateProps) {
        super(props);
        this.state = {
            example: "this is an example"
        }
    }

    render(){
        const {example} = this.state;
        return(
            <>
            
            </>
        )
    }
}

export default TemplateComponent;