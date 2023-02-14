import whiteLogo from "./assets/whiteLogo.png";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import React from "react";
import "./Footer.css";
import mobileLogo from "./assets/yellowLogo.png";

export const Footer = () => 
{
  return (
    <footer className="backgroundBanner primaryGreen background">
      <div className="content footerWrapper">
        <div className="desktopImg">
            <img src={whiteLogo} height="200"/>
        </div>
        <div className="mobileImg">
            <img src={mobileLogo} width="100%"/>
        </div>
        <LinkList header="Navigation" links={navigationItems}/>
        <LinkList header="Contact Us" links={contactItems}/>
        <LinkList header="Social Media" links={socialItems}/>
      </div>
    </footer>
  );
};

const LinkList = ({header, links}) =>
{
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div className="titleWrapper" onClick={() => setExpanded(!expanded)}>
                <span className="sectionTitle">
                    {header}
                </span>
                <div className={`dropdownIcon ${expanded ? "" : "flipped"}`}>

                </div>
            </div>
            
            <nav className={`linkList ${expanded ? "expanded" : "collapsed"}`}>
                {links.map(link => <NavLink className="secondaryPink text cardTitle" key={link.name} to={link.link} style={{lineHeight: "130%"}}>{link.name}</NavLink>)}
            </nav>
        </div>
  )
};


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