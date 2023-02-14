
import tableImg from "./assets/table.jpg";
import ReservationsCard from "./ReservationsCard";

export const ReservationsPage = () => 
{

	return (
		<>
			<section className="primaryGreen backgroundBanner background" style={{ marginBottom: 100 }}>
				<div className="content" style={{ display: "flex", gap: 40, marginTop: 70 }}>
					<div style={{ flex: 1 }}>
						<h1 className="primaryYellow text" style={{ fontSize: "54px" }}>Reserve a Table</h1>
						<p className="highlightWhite text">
							Use the form below to make a table reservation for up to 12 people - cancel anytime!  For larger groups or special requests, please call us at (123) 456-7890 to make arrangements.
						</p>
					</div>
					<img src={tableImg} alt="An image of a table and chairs" height="400px" className="shadow" style={{ aspectRatio: "1/1", marginTop: -70, transform: "translateY(70px)", borderRadius: "16px", objectFit: "cover" }} />
				</div>
			</section>
			<ReservationsCard />
		</>


	);
};