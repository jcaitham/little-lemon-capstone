import { useState } from "react";
import React from "react";
import { HashLink } from "react-router-hash-link";
import toolbarLogo from "./assets/Logo.svg";
import "./Toolbar.css";


export const Toolbar = (props) =>
{

	const [menuExpanded, setMenuExpanded] = useState(false);

	return (
		<header className="backgroundBanner toolbar">
			<div className="content" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
				<div style={{ flex: 0 }}>
					<HashLink to="/">
						<img src={toolbarLogo} height={50} alt="The Little Lemon logo" />
					</HashLink>

				</div>
				<div className="linkWrapper">
					{React.Children.map(props.children, child =>
					{
						return React.cloneElement(child, {
							className: "toolbarLink cta primaryGreen text"
						});
					})}
				</div>
				<div className={`hamburger ${menuExpanded ? "flipped" : ""}`} onClick={() => setMenuExpanded(!menuExpanded)}>
					<div className="hamburgerLine"> </div>
				</div>

			</div>
			<div className={`dropdown ${menuExpanded ? "visible" : ""}`}>
				{React.Children.map(props.children, child =>
				{
					return (
						<div className="dropdownItem">
							{React.cloneElement(child, {
								className: "cta primaryGreen text",
								onPointerUp: () => setMenuExpanded(false)
							})}
						</div>
					);
				})}
			</div>
		</header>
	);
};

