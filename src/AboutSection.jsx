
import chefImg1 from "./assets/restaurant chef B-min.jpg";
import chefImg2 from "./assets/Mario and Adrian b-min.jpg";

const AboutSection = () =>
{
	return (
		<section className="backgroundBanner" id="aboutSection">
			<div className="content standardTopMargin contentStack" style={{ gap: 40 }}>
				<div style={{ flex: 1 }}>
					<h1 className="primaryYellow text">Little Lemon</h1>
					<h2 className="primaryGreen text" style={{ marginTop: -10 }}>Chicago</h2>
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
				<div style={{ flex: 1, position: "relative" }}>
					<div style={{ position: "relative", borderRadius: 16, overflow: "hidden", width: "50%", aspectRatio: "1/1", transform: "translateY(60%) translateX(90%)" }} className="shadow">
						<img src={chefImg2} height="100%" style={{ right: 0, position: "absolute" }} alt="2 chefs having fun cooking together" />
					</div>
					<div style={{ position: "relative", borderRadius: 16, overflow: "hidden", width: "50%", aspectRatio: "1/1", transform: "translateY(-100%) translateX(10%)" }} className="shadow">
						<img src={chefImg1} height="100%" style={{ transform: "translateX(-50%)", left: "50%", position: "absolute" }} alt="A chef putting the finishing touches on a salad" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;