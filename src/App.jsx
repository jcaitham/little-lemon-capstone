import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Reservations from "./Reservations";
import React from "react";
import ReservationConfirmation from './ReservationConfirmation';
import { Toolbar } from "./Toolbar";
import { Footer } from "./Footer";
import HeroSection from "./HeroSection";
import SpecialsSection from "./SpecialsSection";
import TestimonialsSection from './TestimonialsSection';
import AboutSection from './AboutSection';


const App = () =>
{
	return (
		<BrowserRouter>
			<Toolbar>
				{toolbarItems.map(item => <HashLink to={item.href} key={item.name}>{item.name}</HashLink>)}
			</Toolbar>
			<main className="mainContent">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/reservations" element={<Reservations />} />
					<Route path="/reservationConfirmation" element={<ReservationConfirmation />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

const Home = () =>
{
	return (
		<>
			<HeroSection />
			<SpecialsSection />
			<TestimonialsSection />
			<AboutSection />
		</>

	);
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

export default App;