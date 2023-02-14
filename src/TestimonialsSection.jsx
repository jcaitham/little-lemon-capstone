

import testimonial1 from "./assets/portrait1.jpg";
import testimonial2 from "./assets/portrait2.jpg";
import testimonial3 from "./assets/portrait3.jpg";
import testimonial4 from "./assets/portrait5.jpg";
import { useEffect, useRef, useState } from 'react';
import "./TestimonialsSection.css";

const TestimonialsSection = () =>
{

	const listGap = 20;

	const [cardWidth, setCardWidth] = useState(0);

	const containerRef = useRef(null);

	const getcontainerSize = useEffect(() =>
	{
		const width = containerRef.current.clientWidth - (3 * listGap) - 20;

		setCardWidth(Math.max(230, width / 4));
	}, []);

	return (
		<section className="backgroundBanner primaryGreen background">
			<div className="content standardTopMargin" ref={containerRef} style={{ marginBottom: 75 }}>
				<h1 className="highlightWhite text" style={{ display: "block" }}>Testimonials</h1>
				<TestimonialsList listGap={listGap} cardWidth={cardWidth} />
			</div>
		</section>
	);
};

const TestimonialCard = ({ name, score, imgSrc, comment, style }) =>
{
	return (
		<div className="highlightWhite background testimonialCard shadow" style={{ ...style }}>
			<span className="cardTitle">{score}</span>
			<div >
				<img src={imgSrc} style={{ width: "50%", aspectRatio: "1/1", objectFit: "cover" }} />
				<span className="cardTitle name">{name}</span>
			</div>
			<q className="quote">
				{comment}
			</q>
		</div>
	);
};

const TestimonialsList = ({ listGap, cardWidth }) =>
{
	const [cardsToLeft, setCardsToLeft] = useState(0);
	const [cardsToRight, setCardsToRight] = useState(Math.max(reviews.length - 4, 0));

	const [scrollOffset, setScrollOffset] = useState(0);


	const incrementScroll = () =>
	{
		setScrollOffset(scrollOffset + listGap + cardWidth);
		setCardsToLeft(cardsToLeft + 1);
		setCardsToRight(cardsToRight - 1);
	};

	const decrementScroll = () =>
	{
		setScrollOffset(scrollOffset - listGap - cardWidth);
		setCardsToLeft(cardsToLeft - 1);
		setCardsToRight(cardsToRight + 1);
	};

	return (
		<div className="testimonialsListWrapper">
			<div className="testimonialsList" style={{ gap: listGap, left: (-scrollOffset + "px") }}>
				{reviews.map((review, index) => <TestimonialCard {...review} key={index} style={{ width: cardWidth + "px" }} />)}
			</div>
			<div className={"floatingArrow left" + (cardsToLeft === 0 ? " disabled" : "")} onClick={decrementScroll}><div className="arrow left"></div></div>
			<div className={"floatingArrow right" + (cardsToRight === 0 ? " disabled" : "")} onClick={incrementScroll}><div className="arrow right"></div></div>
		</div>
	);
};

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

export default TestimonialsSection;