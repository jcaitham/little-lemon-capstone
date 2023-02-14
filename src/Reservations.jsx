import "./Reservations.css";
import {useState, useRef} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useNavigate } from "react-router-dom";

const Reservations = () => 
{
    const partySizes = Array.from(Array(12).keys());
    const partySizeOptions = partySizes.map(number => <option value={number + 1} key={number}>{number + 1}</option>);
    const occasionOptions = occasionNames.map(occ => <option value={occ} key={occ}>{occ}</option>);

    //const [timeOptions, setTimeOptions] = useState([]);
    const fullReservationDetails = useRef({date: "", time: "", partySize: "", occasion: "", name: "", phone: "", email:""});

    const [availableTimes, setAvailableTimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const timeOptions = [];

    let time = 500;
    while (time < 1000)
    {
        timeOptions.push(`${Math.floor(time / 100)}:${(""+time).slice(-2)} pm`)

        if (time % 100 === 30)
        {
            time += 70;
        }
        else{
            time += 30;
        }
    }


    const updateAvailableTimes = (time) =>{

        const newAvailableTimes = [];
        const split = time.split(":");
        let numericTime = Number(split[0] + split[1].slice(0, 2));

        const start = numericTime - 100;
        const end = numericTime + 100;

        numericTime = start;


        while (numericTime < end)
        {
            if (Math.random() < .5)
            {
                newAvailableTimes.push(`${Math.floor(numericTime / 100)}:${(""+numericTime).slice(-2)} pm`)
            }

            if (numericTime % 100 === 45)
            {
                numericTime += 55;
            }
            else{
                numericTime += 15;
            }
        }
        setAvailableTimes(newAvailableTimes);
    }

    const onSubmitFirstPage = (values) =>{
        updateAvailableTimes(values.time);
        fullReservationDetails.current = {...fullReservationDetails.current, ...values};
        fullReservationDetails.current.time = ""; // we need the user to select an available time first
    };

    const navigate = useNavigate();

    const onSubmitSecondPage = (values) =>{
        fullReservationDetails.current = {...fullReservationDetails.current, ...values};
        navigate("/reservationConfirmation", {state: {...fullReservationDetails}});
    };

    const returnToFirstPage = () => {
        setCurrentPage(0);
        fullReservationDetails.current.time = "";
    };

    const selectTime = (e) => {
        setCurrentPage(1);
        fullReservationDetails.current.time = e.currentTarget.firstChild.innerHTML;
    };

    const timeOptionsList = timeOptions.map(time => <option value={time} key={time}>{time}</option>);

    const firstPageValidationSchema = Yup.object().shape({
        date: Yup.date().required("A date is required"),
        time: Yup.string().oneOf(timeOptions, "A time is required"),
        partySize: Yup.number().oneOf(partySizes, "Please select your party's size"),
        occasion: Yup.string().oneOf(occasionNames, "An occasion is required")
    });

    const secondPageValidationSchema = Yup.object().shape({
        name: Yup.string().required("A name is required"),
        email: Yup.string().email("Please enter a valid e-mail").required("E-mail is required"),
        phone: Yup.string().phone("US", "Please enter a valid phone number").required("Phone number is required")
    })


    return (
        <section className="backgroundBanner">
            <div className="content standardTopMargin" style={{display: "flex", justifyContent: "center"}}>
                <div className="reservationsCard primaryGreen background">
                    <div className="tabRow">
                        <Tab isActive={currentPage===0} isClickable={true} caption="1. Choose a time" onClick={returnToFirstPage}/>
                        <Tab isActive={currentPage===1} isClickable={currentPage===1} caption="2. Contact details" page={1} onClick={() => setCurrentPage(1)}/>
                    </div>
                    {/* We use a div rather than conditional rendering so as to preserve the state of the first page form if you switch back to it from the second page */}
                    <div style={{display: currentPage === 0 ? "" : "none"}}>  
                            <Formik
                                initialValues={{date: new Date().toLocaleDateString("en-CA"), time: -1, partySize: -1, occasion: -1}}
                                validationSchema={firstPageValidationSchema}
                                onSubmit={values => onSubmitFirstPage(values)}
                                validateOnMount={true}
                            >
                                {(props) => {
                                    return (<Form>
                                        <EntryField caption="Date" ghostText={new Date().getDate().toString()} type="date" formikStuff={props.getFieldProps("date")} onChange={() => setAvailableTimes([])}/>
                                        <OptionDropdown caption="Time" ghostText="Choose a time" options={timeOptionsList} formikStuff={props.getFieldProps("time")} onChange={() => setAvailableTimes([])}/>
                                        <OptionDropdown caption="Party Size" ghostText="How many people in your group?" options={partySizeOptions} formikStuff={props.getFieldProps("partySize")} onChange={() => setAvailableTimes([])}/>
                                        <OptionDropdown caption="Occasion" ghostText="What is your occasion?" options={occasionOptions} formikStuff={props.getFieldProps("occasion")} onChange={() => setAvailableTimes([])}/>
                                        <button type="submit" className={"submitButton primaryYellow background shadow " + (props.isValid ? "active" : "inactive")}><span className="headerMedium primaryGreen text">Search</span></button>
                                    </Form>);
                                }}
                            </Formik>
                            <SearchResultList availableTimes={availableTimes} onClick={selectTime}></SearchResultList>
                    </div>
                    <div style={{display: currentPage === 0 ? "none" : ""}}>
                        <Formik
                                initialValues={{name: "", email: "", phone: "", }}
                                validationSchema={secondPageValidationSchema}
                                onSubmit={values => onSubmitSecondPage(values)}
                                validateOnMount={true}
                        >
                            {(props) => {
                                return (<Form>
                                    <EntryField caption="Name" ghostText={"Jane Doe"} type="text" formikStuff={props.getFieldProps("name")}/>
                                    <EntryField caption="E-mail" ghostText="jane@example.com" type="email" formikStuff={props.getFieldProps("email")}/>
                                    <EntryField caption="Phone" ghostText="Phone Number" type="tel" formikStuff={props.getFieldProps("phone")}/>
                                    <button type="submit" className={"submitButton primaryYellow background shadow " + (props.isValid ? "active" : "inactive")}><span className="headerMedium primaryGreen text">Confirm Reservation</span></button>
                                </Form>);
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>

    )
};

const Tab = ({isActive, isClickable, caption, onClick}) =>
{
    //const backgroundStyles = isActive ? "primaryYellow active" : "primaryGreen inactive";
    //const textStyles = isActive ? "primaryGreen" : "highlightWhite";

    const backgroundStyles = `${isActive ? "primaryYellow active" : "primaryGreen inactive"} ${isClickable === false ? "noClick" : "clickable"}`;
    const textStyles = `${isActive ? "primaryGreen" : "highlightWhite"}`;

    return (
        <div className={`tab sectionTitle background ${backgroundStyles}`} onClick={onClick}>
            <span className={`sectionTitle text ${textStyles}`}>
                {caption}
            </span>
        </div>
    )
}

const EntryField = ({caption, ghostText, type, onChange, formikStuff}) =>
{
    const inputRef = useRef(null);

    // useLayoutEffect(() => {
    //     inputRef.current.valueAsDate = formikStuff.value;
    // }, [formikStuff]);
    
    return (
        <div className="entryField">
            <label htmlFor={formikStuff.name}>
                <h2 className="highlightWhite text caption" >
                    {caption}
                </h2>
            </label>
            <Field type={type} min={type==="date" && new Date().toLocaleDateString("en-CA")} placeholder={ghostText} className="highlightWhite background inputText" {...formikStuff} onChange={e => {formikStuff.onChange(e); onChange && onChange();}} innerRef={inputRef}></Field>
            {/* <ErrorMessage name={formikStuff.name} component="span" className="errorMessage cta secondaryOrange text"></ErrorMessage> */}
            <span className="errorMessage cta secondaryOrange text">
                <ErrorMessage name={formikStuff.name}/>
                &nbsp;
            </span>
        </div>
    )
};

const OptionDropdown = ({caption, ghostText, options, formikStuff, onChange}) => 
{
    return (
        <div className="entryField">
            <label htmlFor={formikStuff.name}>
                <h2 className="highlightWhite text caption">
                    {caption}
                </h2>
            </label>
            <Field component="select" {...formikStuff} className="highlightWhite background inputText" onChange={e => {formikStuff.onChange(e); onChange && onChange();}}>
                <option key={-1} value={-1} disabled>{ghostText}</option>
                {options}
            </Field>
            <span className="errorMessage cta secondaryOrange text">
                <ErrorMessage name={formikStuff.name}/>
                &nbsp;
            </span>
            {/* <select placeholder={ghostText} className="highlightWhite background inputText">
                <option key={-1} value={null}>{ghostText}</option>
                {options}
            </select> */}
        </div>
    );
};

const SearchResultList = ({availableTimes, onClick}) =>
{
    return (
        <div style={{display: "flex", gap: 15, padding: 15}}>
            {availableTimes.map(time => <div className="primaryYellow background shadow timeResult" key={time} onClick={e => onClick(e)}><span className="cta" style={{fontWeight: 600}}>{time}</span></div>)}
        </div>
    )
}

const occasionNames = [
    "Birthday",
    "Engagement",
    "Anniversary"
];


export default Reservations;