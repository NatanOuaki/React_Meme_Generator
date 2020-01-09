import React, {Component} from 'react';
import logo from './logo.svg';
import './meme.css';
import ReactToPrint from "react-to-print";

class Memecomponent extends Component {
  constructor () {
    super();
    this.state = {
      topText:"",
      bottomText:"",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemesImgs:[]
    }
  }
    componentDidMount(){
      fetch('https://api.imgflip.com/get_memes')
        .then(response =>response.json())
        .then(response =>{
          const {memes} = response.data
          this.setState({allMemesImgs:memes})});
    };
    handleChange = (event) =>{
      const {name, value} =event.target;
      this.setState({[name]: value});
    }

    handleSubmit = (event) =>{
      event.preventDefault()
      const randNum = Math.floor(Math.random() * this.state.allMemesImgs.length);
      this.setState({randomImg: this.state.allMemesImgs[randNum].url});
    }

  render(){
  return (
    <div>  
      <form className="meme-form">
        <input 
        type="text" 
        name="topText" 
        placeholder= "Top Text" 
        value={this.state.topText}
        onChange={this.handleChange}
        />
        <input 
        type="text" 
        name="bottomText" 
        placeholder= "Bottom Text" 
        value={this.state.bottomText}
        onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Gen</button>
      </form>


      <div className= "meme">
        <h2 className="top">{this.state.topText} </h2>
        <img src={this.state.randomImg} />
        <h2 className="bottom"> {this.state.bottomText} </h2>
      </div>
    </div>  
  );
}}

class Example extends React.Component {
  render() {
    return (
      <div className='printbtn'>
        <ReactToPrint
          trigger={() => <a href="#"> Print Your Meme !</a>}
          content={() => this.componentRef}
        />
        <Memecomponent ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
