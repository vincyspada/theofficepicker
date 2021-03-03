import React, {Component} from 'react';
import './SearchScreen.css';
import { Button,DropdownButton,Dropdown,Overlay} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import{CustomDropdown} from './customDropdown';
import {Choice} from './helpers';
import DisplayEpi from './DisplayEpi';
import Homegif from './Homegif.gif';
import Logo from './Logo.png';
import JsonData from './CharactersData.json';

class SearchScreen  extends Component {


    constructor(props){
        super(props);
        this.state = {
            Image:[Homegif],
            CharacterSelected:['Choose Character'],
            search:'',
            data:[],
            temp:[],
            selectedEpisode:[],
            loading:false,
            error:null,
            visible:false,
            Button:'Pick an episode!',
            ErrorMsg:null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlebtn = this.handlebtn.bind(this);
    }




    //Connect API of Episodes
    componentDidMount(){
      this.getApiData();
    };

    getApiData = async ()  => {
        const url = `https://api.tvmaze.com/shows/526/episodes`;
        this.setState({ loading: true });
          
         try {
            const response = await fetch(url);
            const json = await response.json();
            this.setResult(json);
         } catch (e) {
            this.setState({ error: 'Error Loading content', loading: false});
         }
    };

    
    //Populate temp arrays with data

    setResult = (res) => {
        this.setState({
          temp: [...this.state.temp, ...res],
          error: res.error || null,
          loading: false
        });
    }



    //Filter results and render new Data arrays 


    updateSearch = () => {

        const filteredData = [...this.state.temp.filter(item => {return item.summary.toLowerCase().includes(this.state.search.toLowerCase())||item.name.toLowerCase().includes(this.state.search.toLowerCase());})];
        const MappedData = [...filteredData.map(function({id,name,summary,season,number,image}){return {id,name,summary,season,number,image}})];
        this.setState({data:[...MappedData]},

            () => {
                const {data} = this.state;
                const randomIndexObj = Math.floor(Math.random()* data.length);
                const randomEpi = data[randomIndexObj];
                if(data.length <=1 && randomEpi.id === this.state.selectedEpisode.id){ this.setState({ErrorMsg:"YUUUK...can't think anything else right now...Select another Character!"})}
                else{randomEpi.id === this.state.selectedEpisode.id ? this.updateSearch() : 
                this.setState({selectedEpisode:randomEpi,visible:false},


                    () => {

                        this.setState({Image: this.state.selectedEpisode.image.original,visible:true})},
                    
                    
                    )};
            }); 
    };



    handleChange = (e) => {

        this.setState({CharacterSelected:e,Button:'Pick an episode!'},
        
        () =>  {
            const {CharacterSelected}=this.state

            console.log(CharacterSelected)
            console.log(`this is e : ${e}`)

            const keywords = JsonData.find(({id}) => id === e);

            const keyArr = keywords.keyword;

            console.log(keyArr)

            const randomKeyWord =  keyArr [Math.floor(Math.random() * keyArr.length)];

            console.log(randomKeyWord)
            
            this.setState({search:randomKeyWord,ErrorMsg:null})

            console.log(this.state.search)

        }); 
    };


    handlebtn(){
        this.updateSearch();
    };



    //choose random episode from filtered array

    //render episode name,details and description.



    render(){

        const {selectedEpisode} = this.state
        
       
        //console.log(this.state.CharacterSelected)
        console.log(this.state.search)
        //console.log(this.state.data)
        //console.log(this.state.temp)
        //console.log(this.state.selectedEpisode)




        return (
        <div className='SearchScreen'>
            <div className='Heading'>
                <img style = {{width: '150px'}} src= {Logo} ></img>
            </div>

            <div className="Title">
                 <img className="Image" src={this.state.Image}></img>
                 <h4 style = {{paddingBottom:'50px'}}>Get your favourite character to choose an episode for you!</h4> 
            </div>
                 
            <div className="Form">
               <DropdownButton style={{paddingRight:'1%'}} drop= 'down' variant='secondary' id="dropdown-item-button" title={this.state.CharacterSelected}  onSelect={this.handleChange}>

                    {JsonData.map((variant)=> {
                       return (<Dropdown.Item eventKey={`${variant.id}`} as="button">{variant.id}</Dropdown.Item>)})
                    }
                </DropdownButton>

                <Button id="Button" variant="secondary" onClick={this.handlebtn}>{this.state.Button}</Button>
             </div>  
             <div className="Errormsg">
                 <p style={{color:'orange',opacity:'.8',fontWeight:'bold'}}>{this.state.ErrorMsg}</p>
             </div>

            {this.state.visible ?
                   <DisplayEpi
                     name={selectedEpisode.name}
                     summary={selectedEpisode.summary}
                     season={selectedEpisode.season}
                     number={selectedEpisode.number}
                   />
            : null
            }


             <div>

                 
            </div>        
        </div>

    
        )
    }
}

export default SearchScreen;





//<DropdownButton variant='secondary' id="dropdown-item-button" title={this.state.CharacterSelected[0]}  onSelect={this.handleChange}>
//<Dropdown.Item eventKey={this.props.Michael} as="button">Michael</Dropdown.Item>
//<Dropdown.Item eventKey={this.props.Dwight} as="button">Dwight</Dropdown.Item>
//<Dropdown.Item eventKey={this.props.Pam} as="button">Pam</Dropdown.Item>
//<Dropdown.Item eventKey={this.props.Toby} as="button">Toby</Dropdown.Item>
//<Dropdown.Item eventKey={this.props.Jim} as="button">Jim</Dropdown.Item>
//</DropdownButton>



//<input list="Characters" placeholder= "Select Character" name="browser" id="browser"/>

//<datalist id="Characters">
//{['Michael', 'Dwight', 'Pam', 'Toby', 'Jim', 'Angela'].map(
//(variant) => (
//  <option eventkey= {`this.props.${variant}`} key={variant} value={variant}/>
//),)}

//</datalist>




                 //<Dropdown.Item eventKey={this.props.Michael} as="button">Michael</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Dwight} as="button">Dwight</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Pam} as="button">Pam</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Jim} as="button">Jim</Dropdown.Item>
                // <Dropdown.Item eventKey={this.props.Angela} as="button">Angela</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Kevin} as="button">Kevin</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Oscar} as="button">Oscar</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Kelly} as="button">Kelly</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Ryan} as="button">Ryan</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Toby} as="button">Toby</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Kelly} as="button">Kelly</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Meredith} as="button">Meredith</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Phyllis} as="button">Phyllis</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Darryl} as="button">Darryl</Dropdown.Item>
                 //<Dropdown.Item eventKey={this.props.Jan} as="button">Jan</Dropdown.Item>
                // <Dropdown.Item eventKey={this.props.Wallace} as="button">David Wallace</Dropdown.Item>
                // <Dropdown.Item eventKey={this.props.California} as="button">Robert California</Dropdown.Item>
                // <Dropdown.Item eventKey={this.props.Nellie} as="button">Nellie</Dropdown.Item>