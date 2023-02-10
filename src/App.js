import './App.css';
import heroImage from "./assets/restauranfood-min.jpg";
import basketImage from "./assets/Basket.svg";
import greekSaladImg from "./assets/greek salad-min.jpg";
import bruchettaImg from "./assets/bruchetta-min.png";
import lemonDessertImg from "./assets/lemon dessert.jpg";
import whiteLogo from "./assets/whiteLogo.png";
import testimonial1 from "./assets/portrait1.jpg";
import testimonial2 from "./assets/portrait2.jpg";
import testimonial3 from "./assets/portrait3.jpg";
import testimonial4 from "./assets/portrait5.jpg";
import chefImg1 from "./assets/restaurant chef B-min.jpg";
import chefImg2 from "./assets/Mario and Adrian b-min.jpg";
import toolbarLogo from "./assets/Logo.svg";
import { useEffect, useRef, useState  } from 'react';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import Reservations from "./Reservations";
import React from "react";


function App() {
  return (
    <BrowserRouter>
      <div className="littleLemon">
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

          </Routes>
        </main>
        <Footer/>
      </div>
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


const Toolbar = (props) => {
  return (
    <header className="backgroundBanner toolbar">
      <div className="content" style={{display: "flex"}}>
        <div style={{flex: 0, marginRight: 150}}>
          <HashLink to="/">
            <img src={toolbarLogo} height={50}/>
          </HashLink>
          
        </div>
        <div style={{flex: 1, display: "flex", justifyContent:"space-between", alignItems: "center"}}>
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, {
              className: "toolbarLink cta primaryGreen text"
            })
          })}
        </div>
      </div>
    </header>
  )
}


const HeroSection = () =>{
  return (
    <section className="primaryGreen backgroundBanner background" id="heroSection">
        <div className="content standardTopMargin" style={{display: "flex"}}>
          <div style={{flex: 1}}>
            <h1 className="primaryYellow text">Little Lemon</h1>
            <h2 className="highlightWhite text" style={{marginTop: "-70px"}}>Chicago</h2>
            <p className="highlightWhite text" style={{maxWidth: "420px"}}>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
          </div>
          <img src={heroImage} alt="4 pieces of bread topped with sauce and vegetables on a stone platter" height="400px" className="shadow" style={{aspectRatio: "1/1", transform: "translateY(70px)", borderRadius: "16px"}}/>
        </div>
      </section>
  )
};

const SpecialsSection = () =>
{
  return (
    <section className="backgroundBanner" id="menuSection">
      <div className="content standardTopMargin" style={{marginBottom:75}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <h1 style={{flex: 1}}> This week's specials!</h1>
          <Button width={210} height={48} text="Online Menu"/>
        </div>
        <div style={{display: "flex", flexWrap: "wrap"}} className="cardList">
          {foodCards.map(item => <FoodCard {...item} key={item.title} style={{maxWidth: "300px", flexShrink: 0}}/>)}
        </div>
      </div>
    </section>
  );
};



const Button = ({width, height, text}) =>
{
  return (
    <div className="primaryYellow background" style={{borderRadius: "16px", display: "flex", justifyContent: "center", alignItems:"center", height: height +"px", width: width + "px", cursor: "pointer"}}>
      <span className="cta">
        {text}
      </span>
    </div>
  )
}

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

    setCardWidth(width / 4);
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
      <div className="content standardTopMargin" style={{display: "flex", minHeight: 700, gap: 40}}>
        <div style={{flex: 1, maxWidth: "40%"}}>
          <h1 className="primaryYellow text">Little Lemon</h1>
          <h2 className="primaryGreen text" style={{marginTop: -70}}>Chicago</h2>
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
        <div style={{flex:1, position: "relative", display: "flex"}}>
        <div style={{position: "relative", borderRadius: 16, overflow: "hidden", width: 300, height: 300, transform: "translateY(300px) translateX(300px)"}} className="shadow">
            <img src={chefImg2} height="100%" style={{right: 0, position: "absolute"}}/>
        </div> 
        <div style={{position: "relative", borderRadius: 16, overflow:"hidden", width: 300, height: 400, transform: "translateX(-250px) translateY(50px)"}} className="shadow">
          <img src={chefImg1} height="100%"  style={{right: -200, position: "absolute"}}/>
        </div>     
          
        </div>
      </div>
    </section>
  )
};

const Footer = () => 
{
  return (
    <footer className="backgroundBanner primaryGreen background">
      <div className="content" style={{display: "flex", padding: "10px 0px", justifyContent: "space-between"}}>
        <div><img src={whiteLogo} height="200"/></div>
        <LinkList header="Navigation" links={navigationItems}/>
        <LinkList header="Contact Us" links={contactItems}/>
        <LinkList header="Social Media" links={socialItems}/>
      </div>
    </footer>
  );
};

const LinkList = ({header, links}) =>
{
  return (
    <div>
      <span className="sectionTitle">
        {header}
      </span>
      <nav style={{display: "flex", flexDirection: "column", paddingLeft: "5px"}}>
        {links.map(link => <NavLink className="secondaryPink text cardTitle" key={link.name} to={link.link} style={{lineHeight: "130%"}}>{link.name}</NavLink>)}
      </nav>
    </div>
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


const navigationItems = [
  {
    name: "Home",
    link: "/#heroSection"
  },
  {
    name: "About",
    link: "/#aboutSection"
  },
  {
    name: "Menu",
    link: "/#menuSection"
  },
  {
    name: "Reservations",
    link: "/reservations"
  },
  {
    name: "Order Online",
    link: "/#menuSection"
  },
  {
    name: "Login",
    link: "/"
  },
];

const contactItems = [
  {
    name: "lilLemonChicago@sundial.com",
    link: ""
  },
  {
    name: "(123) 456-7890)",
    link: ""
  }
];

const socialItems = [
  {
    name: "Facebook",
    link: "https://www.facebook.com"
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com"
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com"
  },
  {
    name: "MySpace",
    link: "https://www.myspace.com"
  }
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