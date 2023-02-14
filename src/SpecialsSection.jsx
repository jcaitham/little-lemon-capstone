import basketImage from "./assets/Basket.svg";
import greekSaladImg from "./assets/greek salad-min.jpg";
import bruchettaImg from "./assets/bruchetta-min.png";
import lemonDessertImg from "./assets/lemon dessert.jpg";

const SpecialsSection = () =>
{
	return (
		<section className="backgroundBanner" id="menuSection">
			<div className="content standardTopMargin" style={{ marginBottom: 75 }}>
				<div style={{ alignItems: "center" }} className="contentStack">
					<h1 style={{ flex: 1 }}> This week's specials!</h1>
					<Button width={210} height={48} text="Online Menu" />
				</div>
				<div style={{ flexWrap: "wrap", marginTop: 50 }} className="cardList">
					{foodCards.map(item => <FoodCard {...item} key={item.title} style={{ maxWidth: "300px", flexShrink: 0 }} />)}
				</div>
			</div>
		</section>
	);
};



const Button = ({ width, height, text }) =>
{
	return (
		<div className="primaryYellow background button" style={{ borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", height: height + "px", width: width + "px", cursor: "pointer" }}>
			<span className="cta">
				{text}
			</span>
		</div>
	);
};

const FoodCard = ({ title, text, price, imgSrc, style }) =>
{
	return (
		<article className="background highlightWhite foodCard shadow" style={{ borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", ...style }}>
			<img src={imgSrc} className="topImg"></img>
			<div className="bottomHalf">
				<div className="cardTitle">
					<span>{title}</span>
					<span className="text secondaryOrange" style={{ float: "right" }}>{price}</span>
				</div>
				<p className="cardBody">
					{text}
				</p>
				<div className="cta" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
					<span>Add to cart</span>
					<img src={basketImage} height="25" style={{ marginLeft: "20px" }} />
				</div>
			</div>
		</article>
	);
};




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

export default SpecialsSection;