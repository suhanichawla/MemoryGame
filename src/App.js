import React, { Component } from 'react';
import logo from './logo.svg';
import shuffle from "shuffle-array"
import './App.css';
import Navbar from "./navbar"
import Card from "./card"

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};



let cards = [
  {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
  {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
  {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
  {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
  {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
  {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
  {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
  {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
  {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
  {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
  {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
  {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
  {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
  {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
  {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
  {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
];

class App extends Component {
  constructor(props){
    super(props)
    this.state={cards: shuffle(cards),noClick:false};
    this.handleClick=this.handleClick.bind(this)
    this.handleNewGame=this.handleNewGame.bind(this)
  }
  handleClick(id){
    this.setState(prevState =>{
      let cards=prevState.cards.map(c=>(
        c.id===id ? {
          ...c,
          cardState: c.cardState===CardState.HIDING ? CardState.MATCHING : CardState.HIDING
        } : c
      ))
      return {cards}
    })
   
  }
  handleClick2(id){
    const mapcardstate=(cards,idsToChange,newCardState)=>{
      return cards.map(c=>{
        if(idsToChange.includes(c.id)){
          return{
            ...c,
            cardState: newCardState
          }
        }
        return c;
      })
    }
    const foundCard=this.state.cards.find(c=> c.id===id);
    if(this.state.noClick || foundCard.cardState!==CardState.HIDING){
      return;
    }
    let noClick=false;
    let cards=mapcardstate(this.state.cards,[id],CardState.SHOWING);
    const showingCards=cards.filter(c=> c.cardState===CardState.SHOWING)
    const ids=showingCards.map(c=>c.id);
    if(showingCards.length===2 && showingCards[0].backgroundColor==showingCards[1].backgroundColor){
      cards=mapcardstate(cards,ids,CardState.MATCHING)
    }else if(showingCards.length===2 ){
      let hidingcards=mapcardstate(cards,ids,CardState.HIDING)
      noClick=true;
      this.setState({cards,noClick},()=>{
        setTimeout(() =>{
          this.setState({cards:hidingcards, noClick:false})
        }, 1300);
      })
      return;
    }
    var check=cards.filter(c=> c.cardState===CardState.MATCHING);
    if (check.length==cards.length){
      console.log("you won!")
    }
    this.setState({cards,noClick})
    
  }
 

  handleNewGame(){
    let cards=this.state.cards.map(c=>({
      ...c,
      cardState : CardState.HIDING
    }))
    cards=shuffle(cards)
    this.setState({cards})
  }
  render(){
   
      const cards = this.state.cards.map((card) => (
        <Card
          key={card.id}
          showing={card.cardState !== CardState.HIDING}
          backgroundColor={card.backgroundColor}
          onClick={()=>this.handleClick2(card.id)}
        />
      ));
    return(
      <div>
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    )
  }

}

export default App;
