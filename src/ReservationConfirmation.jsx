import { useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import chefImage from "./assets/Mario and Adrian A-min.jpg";


const ReservationConfirmation = () =>
{

	const location = useLocation();

	const navigate = useNavigate();

	useEffect(() =>
	{
		if (!location || location.state === null)
		{
			navigate("/");
		}
	});

	if (!navigate || location.state === null)
	{
		return <></>;
	}

	const d = location.state.current;

	return (
		<>

			<section className="primaryGreen backgroundBanner background" style={{ marginBottom: 100 }}>
				<div className="content standardTopMargin" style={{ display: "flex", gap: 40 }}>
					<div style={{ flex: 1 }}>
						<h1 className="primaryYellow text" style={{ fontSize: "54px" }}>Reservation Confirmed</h1>
						<p className="highlightWhite text">
							{
								`${d.name}, your reservation for ${d.partySize} people is confirmed for ${d.date} at ${d.time}.  We look forward to seeing you then! 
                        You will receive a confirmation e-mail at ${d.email}, and we will text you a reminder at ${d.phone}.  If you need to cancel for
                        any reason, please call us at (123) 456-7890.`
							}
						</p>
					</div>
					<img src={chefImage} alt="Two chefs preparing some food together" height="400px" className="shadow" style={{ aspectRatio: "1/1", marginTop: -70, transform: "translateY(70px)", borderRadius: "16px", objectFit: "cover" }} />
				</div>
			</section>
		</>
	);
};

export default ReservationConfirmation;