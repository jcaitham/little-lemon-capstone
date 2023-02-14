import heroImage from "./assets/restauranfood-min.jpg";


const HeroSection = () => {
	return (
		<section className="primaryGreen backgroundBanner background" id="heroSection" style={{ marginBottom: 70 }}>
			<div className="content contentStack" style={{ transform: "translateY(70px)" }}>
				<div style={{ flex: 1 }}>
					<h1 className="primaryYellow text">Little Lemon</h1>
					<h2 className="highlightWhite text" style={{ marginTop: "-10px" }}>Chicago</h2>
					<p className="highlightWhite text">
						We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
					</p>
				</div>
				<img src={heroImage} alt="4 pieces of bread topped with sauce and vegetables on a stone platter" height="400px" className="shadow" style={{ aspectRatio: "1/1", borderRadius: "16px", objectFit: "cover" }} />
			</div>
		</section>
	)
};

export default HeroSection;