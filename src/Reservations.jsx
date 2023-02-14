import "./Reservations.css";
import { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useNavigate } from "react-router-dom";
//import { fetchAPI } from "https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js";

import { fetchAPI } from "./api/api.js";

const Reservations = () => 
{
	const today = new Date().toLocaleDateString("en-CA");
	const partySizes = Array.from(Array(12).keys());
	const partySizeOptions = partySizes.map(number => <option value={number + 1} key={number}>{number + 1}</option>);
	const occasionOptions = occasionNames.map(occ => <option value={occ} key={occ}>{occ}</option>);

	const fullReservationDetails = useRef({ date: "", time: "", partySize: "", occasion: "", name: "", phone: "", email: "" });

	const [availableTimes, setAvailableTimes] = useState(loadListOfTimes(today));
	const [currentPage, setCurrentPage] = useState(0);

	const onSubmitFirstPage = (values) =>
	{
		setCurrentPage(1);
		fullReservationDetails.current = { ...fullReservationDetails.current, ...values };
	};

	const navigate = useNavigate();

	const onSubmitSecondPage = (values) =>
	{
		fullReservationDetails.current = { ...fullReservationDetails.current, ...values };
		navigate("/reservationConfirmation", { state: { ...fullReservationDetails } });
	};

	const returnToFirstPage = () =>
	{
		setCurrentPage(0);
		fullReservationDetails.current.time = "";
	};

	const timeOptionsList = availableTimes.map(time => <option value={time} key={time}>{time}</option>);

	const firstPageValidationSchema = Yup.object().shape({
		date: Yup.date().required("A date is required"),
		time: Yup.string().oneOf(availableTimes, "A time is required"),
		partySize: Yup.number().oneOf(partySizes, "Please select your party's size"),
		occasion: Yup.string().oneOf(occasionNames, "An occasion is required")
	});

	const secondPageValidationSchema = Yup.object().shape({
		name: Yup.string().required("A name is required"),
		email: Yup.string().email("Please enter a valid e-mail").required("E-mail is required"),
		phone: Yup.string().phone("US", "Please enter a valid phone number").required("Phone number is required")
	});

	return (
		<section className="backgroundBanner">
			<div className="content standardTopMargin" style={{ display: "flex", justifyContent: "center" }}>
				<div className="reservationsCard primaryGreen background">
					<div className="tabRow">
						<Tab isActive={currentPage === 0} isClickable={true} caption="1. Choose a time" onClick={returnToFirstPage} />
						<Tab isActive={currentPage === 1} isClickable={currentPage === 1} caption="2. Contact details" page={1} onClick={() => setCurrentPage(1)} />
					</div>
					<div style={{ display: currentPage === 0 ? "" : "none" }}>
						<Formik
							initialValues={{ date: today, time: -1, partySize: -1, occasion: -1 }}
							validationSchema={firstPageValidationSchema}
							onSubmit={values => onSubmitFirstPage(values)}
							validateOnMount={true}
						>
							{(props) =>
							{
								return (
									<Form>
										<EntryField caption="Date" ghostText={new Date().getDate().toString()} type="date" formikStuff={props.getFieldProps("date")} onChange={(e) => { props.setFieldValue("time", -1); setAvailableTimes(loadListOfTimes(e.currentTarget.value)); }} />
										<OptionDropdown caption="Time" ghostText="Choose a time" options={timeOptionsList} formikStuff={props.getFieldProps("time")} />
										<OptionDropdown caption="Party Size" ghostText="How many people in your group?" options={partySizeOptions} formikStuff={props.getFieldProps("partySize")} />
										<OptionDropdown caption="Occasion" ghostText="What is your occasion?" options={occasionOptions} formikStuff={props.getFieldProps("occasion")} />
										<button type="submit" className={"submitButton primaryYellow background shadow " + (props.isValid ? "active" : "inactive")}><span className="headerMedium primaryGreen text">Search</span></button>
									</Form>
								);
							}}
						</Formik>
					</div>
					<div style={{ display: currentPage === 0 ? "none" : "" }}>
						<Formik
							initialValues={{ name: "", email: "", phone: "", }}
							validationSchema={secondPageValidationSchema}
							onSubmit={values => onSubmitSecondPage(values)}
							validateOnMount={true}
						>
							{(props) =>
							{
								return (<Form>
									<EntryField caption="Name" ghostText={"Jane Doe"} type="text" formikStuff={props.getFieldProps("name")} />
									<EntryField caption="E-mail" ghostText="jane@example.com" type="email" formikStuff={props.getFieldProps("email")} />
									<EntryField caption="Phone" ghostText="Phone Number" type="tel" formikStuff={props.getFieldProps("phone")} />
									<button type="submit" className={"submitButton primaryYellow background shadow " + (props.isValid ? "active" : "inactive")}><span className="headerMedium primaryGreen text">Confirm Reservation</span></button>
								</Form>);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
};

const loadListOfTimes = (date) =>
{
	console.log("recalculating time options with date of " + date);
	return fetchAPI(new Date(date));  // api secretly expects a Date object
};

const Tab = ({ isActive, isClickable, caption, onClick }) =>
{
	const backgroundStyles = `${isActive ? "primaryYellow active" : "primaryGreen inactive"} ${isClickable === false ? "noClick" : "clickable"}`;
	const textStyles = `${isActive ? "primaryGreen" : "highlightWhite"}`;

	return (
		<div className={`tab sectionTitle background ${backgroundStyles}`} onClick={onClick}>
			<span className={`sectionTitle text ${textStyles}`}>
				{caption}
			</span>
		</div>
	);
};

const EntryField = ({ caption, ghostText, type, onChange, formikStuff }) =>
{
	const inputRef = useRef(null);

	return (
		<div className="entryField">
			<label htmlFor={formikStuff.name}>
				<h2 className="highlightWhite text caption" >
					{caption}
				</h2>
			</label>
			<Field type={type} min={type === "date" ? new Date().toLocaleDateString("en-CA") : undefined} placeholder={ghostText} className="highlightWhite background inputText" {...formikStuff} onChange={e => { formikStuff.onChange(e); onChange && onChange(e); }} innerRef={inputRef}></Field>
			<span className="errorMessage cta secondaryOrange text">
				<ErrorMessage name={formikStuff.name} />
				&nbsp;
			</span>
		</div>
	);
};

const OptionDropdown = ({ caption, ghostText, options, formikStuff, onChange }) => 
{
	return (
		<div className="entryField">
			<label htmlFor={formikStuff.name}>
				<h2 className="highlightWhite text caption">
					{caption}
				</h2>
			</label>
			<Field component="select" {...formikStuff} className="highlightWhite background inputText" onChange={e => { formikStuff.onChange(e); onChange && onChange(); }}>
				<option key={-1} value={-1} disabled>{ghostText}</option>
				{options}
			</Field>
			<span className="errorMessage cta secondaryOrange text">
				<ErrorMessage name={formikStuff.name} />
				&nbsp;
			</span>
		</div>
	);
};

const occasionNames = [
	"Birthday",
	"Engagement",
	"Anniversary"
];

export default Reservations;