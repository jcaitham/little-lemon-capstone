import './App.css';
import heroImage from "./assets/restauranfood-min.jpg";
import basketImage from "./assets/Basket.svg";
import greekSaladImg from "./assets/greek salad-min.jpg";
import bruchettaImg from "./assets/bruchetta-min.png";
import lemonDessertImg from "./assets/lemon dessert.jpg";

import testimonial1 from "./assets/portrait1.jpg";
import testimonial2 from "./assets/portrait2.jpg";
import testimonial3 from "./assets/portrait3.jpg";
import testimonial4 from "./assets/portrait5.jpg";
import chefImg1 from "./assets/restaurant chef B-min.jpg";
import chefImg2 from "./assets/Mario and Adrian b-min.jpg";
import { useEffect, useRef, useState  } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import Reservations from "./Reservations";
import React from "react";
import ReservationConfirmation from './ReservationConfirmation';
import {Toolbar} from "./Toolbar";
import {Footer} from "./Footer";


function App() {
  return (
    <BrowserRouter>
        <Toolbar>
          {toolbarItems.map(item => <HashLink to={item.href} key={item.name}>{item.name}</HashLink>)}
        </Toolbar>
        {/* <Toolbar>
          {toolbarItems.map(item => <a href={item.href} key={item.name}>{item.name}</a>)}
        </Toolbar> */}
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/reservations" element={<Reservations/>}/>
            <Route path="/reservationConfirmation" element={<ReservationConfirmation/>}/>
          </Routes>
        </main>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;

const Home = () => {
  return (
    <>
      <HeroSection/>
      <SpecialsSection/>
      <TestimonialsSection/>
      <AboutSection/>
    </>
    
  );
}


const HeroSection = () =>{
  return (
    <section className="primaryGreen backgroundBanner background" id="heroSection" style={{marginBottom: 70}}>
        <div className="content contentStack" style={{ transform: "translateY(70px)"}}>
          <div style={{flex: 1}}>
            <h1 className="primaryYellow text">Little Lemon</h1>
            <h2 className="highlightWhite text" style={{marginTop: "-10px"}}>Chicago</h2>
            <p className="highlightWhite text">
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
          </div>
          <img src={heroImage} alt="4 pieces of bread topped with sauce and vegetables on a stone platter" height="400px" className="shadow" style={{aspectRatio: "1/1", borderRadius: "16px", objectFit: "cover"}}/>
        </div>
      </section>
  )
};

const SpecialsSection = () =>
{
  return (
    <section className="backgroundBanner" id="menuSection">
      <div className="content standardTopMargin" style={{marginBottom:75}}>
        <div style={{ alignItems: "center"}} className="contentStack">
          <h1 style={{flex: 1}}> This week's specials!</h1>
          <Button width={210} height={48} text="Online Menu"/>
        </div>
        <div style={{flexWrap: "wrap", marginTop: 50}} className="cardList">
          {foodCards.map(item => <FoodCard {...item} key={item.title} style={{maxWidth: "300px", flexShrink: 0}}/>)}
        </div>
      </div>
    </section>
  );
};



const Button = ({width, height, text}) =>
{
  return (
    <div className="primaryYellow background button" style={{borderRadius: "16px", display: "flex", justifyContent: "center", alignItems:"center", height: height +"px", width: width + "px", cursor: "pointer"}}>
      <span className="cta">
        {text}
      </span>
    </div>
  )
};

const FoodCard = ({title, text, price, imgSrc, style}) =>
{
  return (
    <article className="background highlightWhite foodCard shadow" style={{borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", ...style}}>
      <img src={imgSrc} className="topImg"></img>
      <div className="bottomHalf">
        <div className="cardTitle">
          <span>{title}</span>
          <span className="text secondaryOrange" style={{float: "right"}}>{price}</span>
        </div>
        <p className="cardBody">
          {text}
        </p>
        <div className="cta" style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
          <span>Add to cart</span>
          <img src={basketImage} height="25" style={{marginLeft: "20px"}}/>
        </div>
      </div>
      
    </article>
  )
};

const TestimonialsSection = () =>
{

  const listGap = 20;

  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef(null);

  const getcontainerSize = useEffect(() =>
  {
    const width = containerRef.current.clientWidth - (3 * listGap) - 20;

    setCardWidth(Math.max(230, width / 4));
  },[]);

  return (
    <section className="backgroundBanner primaryGreen background">
      <div className="content standardTopMargin" ref={containerRef} style={{marginBottom: 75}}>
        <h1 className="highlightWhite text" style={{display: "block"}}>Testimonials</h1>
        <TestimonialsList listGap={listGap} cardWidth={cardWidth}/>
      </div>


    </section>
  )
};

const TestimonialCard = ({name, score, imgSrc, comment, style}) =>
{
  return (
    <div className="highlightWhite background testimonialCard shadow" style={{...style}}>
      <span className="cardTitle">{score}</span>
      <div >
        <img src={imgSrc} style={{width: "50%", aspectRatio: "1/1", objectFit: "cover"}}/>
        <span className="cardTitle name">{name}</span>
      </div>
      <q className="quote">
        {comment}
      </q>
    </div>
  )
};

const TestimonialsList = ({listGap, cardWidth}) =>
{
  const [cardsToLeft, setCardsToLeft] = useState(0);
  const [cardsToRight, setCardsToRight] = useState(Math.max(reviews.length - 4, 0));

  const [scrollOffset, setScrollOffset] = useState(0);


  const incrementScroll =  () => {
    setScrollOffset(scrollOffset + listGap + cardWidth);
    setCardsToLeft(cardsToLeft + 1);
    setCardsToRight(cardsToRight - 1);
  };

  const decrementScroll = () => {
    setScrollOffset(scrollOffset - listGap - cardWidth);
    setCardsToLeft(cardsToLeft - 1);
    setCardsToRight(cardsToRight + 1);
  }

  return (
    <div className="testimonialsListWrapper">
      <div className="testimonialsList" style={{gap:listGap, left:(-scrollOffset+"px")}}>
        {reviews.map((review, index) => <TestimonialCard {...review} key={index} style={{width: cardWidth + "px"}}/>)}
      </div>
      <div className={"floatingArrow left" + (cardsToLeft === 0 ? " disabled" : "")} onClick={decrementScroll}><div className="arrow left"></div></div>
      <div className={"floatingArrow right" + (cardsToRight === 0 ? " disabled" : "")} onClick={incrementScroll}><div className="arrow right"></div></div>
    </div>
    
  )
};

const AboutSection = () =>
{
  return (
    <section className="backgroundBanner" id="aboutSection">
      <div className="content standardTopMargin contentStack" style={{gap: 40}}>
        <div style={{flex: 1}}>
          <h1 className="primaryYellow text">Little Lemon</h1>
          <h2 className="primaryGreen text" style={{marginTop: -10}}>Chicago</h2>
          <p>
            Founded in 1930, we are on of Chicago's oldest Mediterranean restaurants. 
            Our founder, Ophelia Stephanopoulos, grew up in Greece, on the shores of the Mediterranean.
            Before traveling to the US, she visited many areas of Greece, Italy, and Turkey, learning
            authentic recipes and tecniques which she brought overseas.  Almost 100 years later, we are 
            proud to continue serving many of those same recipes today.  Come to our restaurant to see some 
            antique Greek cooking utensils, as well as photos of Ophelia and of Little Lemon before its 
            renovation in 1996.
          </p>
        </div>
        <div style={{flex:1, position: "relative"}}>
        <div style={{position: "relative", borderRadius: 16, overflow: "hidden", width: "50%", aspectRatio:"1/1", transform: "translateY(60%) translateX(90%)"}} className="shadow">
            <img src={chefImg2} height="100%" style={{right: 0, position: "absolute"}}/>
        </div> 
        <div style={{position: "relative", borderRadius: 16, overflow:"hidden", width: "50%",  aspectRatio:"1/1", transform: "translateY(-100%) translateX(10%)"}} className="shadow">
          <img src={chefImg1} height="100%"  style={{transform: "translateX(-50%)", left: "50%", position: "absolute"}}/>
        </div>     
          
        </div>
      </div>
    </section>
  )
};

const toolbarItems = [
  {
    name: "Home",
    href: "/#heroSection"
  },
  {
    name: "About",
    href: "/#aboutSection"
  },
  {
    name: "Menu",
    href: "/#menuSection"
  },
  {
    name: "Reservations",
    href: "/reservations"
  },
  {
    name: "Order Online",
    href: "/#menuSection"
  },
  {
    name: "Login",
    href: "/"
  },
];




const foodCards = [
  {
    title: "Greek Salad",
    price: "$12.99",
    text: "The famous greek salad of crispy lettuce, peppers,olives, and our Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    imgSrc: greekSaladImg
  },
  {
    title: "Bruchetta",
    price: "$5.99",
    text: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    imgSrc: bruchettaImg
  },
  {
    title: "Lemon Dessert",
    price: "$5.99",
    text: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is an authentic as can be imagined.",
    imgSrc: lemonDessertImg
  }
];

const reviews = [
  {
    name: "Brandon",
    score: "5/5",
    imgSrc: testimonial1,
    comment: "Very delicious food"
  },
  {
    name: "Liz",
    score: "3.5/5",
    imgSrc: testimonial2,
    comment: "Avocado was very brown, but otherwise good!"
  },
  {
    name: "Steph",
    score: "5/5",
    imgSrc: testimonial3,
    comment: "MY FAVORITE LUNCH SPOT"
  },
  {
    name: "Harry",
    score: "4/5",
    imgSrc: testimonial4,
    comment: "Came in with friends for a birthday party, had a good time and enjoyed.  here are some more words to force some wrapping"
  },
  {
    name: "Harry",
    score: "4/5",
    imgSrc: testimonial4,
    comment: "Came in with friends for a birthday party, had a good time and enjoyed.  here are some more words to force some wrapping"
  },
  {
    name: "Harry",
    score: "4/5",
    imgSrc: testimonial4,
    comment: "Came in with friends for a birthday party, had a good time and enjoyed.  here are some more words to force some wrapping"
  },
  {
    name: "Timothaasdfasdfasdfy",
    score: "4/5",
    imgSrc: testimonial4,
    comment: "Came in with friends for a birthday party, had a good time and enjoyed.  here are some more words to force some wrapping"
  },
  {
    name: "Harry",
    score: "4/5",
    imgSrc: testimonial4,
    comment: "Came in with friends for a birthday party, had a good time and enjoyed.  here are some more words to force some wrapping"
  },
];