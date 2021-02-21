import React, {Component} from 'react';
import './DisplayEpi.css';

class DisplayEpi extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(

            <div className="DisplayEpi">
              <div><h1>{this.props.name}</h1></div>
                <div>
                  <h6>Season: {this.props.season}</h6>
                  <h6>Episode: {this.props.number}</h6>
                </div>
                <div>
                    <p>{this.props.summary.replace('<p>','').replace('</p>','').replace('<br>','').replace('</br>','')}</p>
                </div>
            </div>

        );
    }
}

export default DisplayEpi;