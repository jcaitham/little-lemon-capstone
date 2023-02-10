import "./Reservations.css";
import {useState} from "react";

const Reservations = () => 
{
    
    const partySizeOptions = Array.from(Array(12).keys()).map(number => <option value={number + 1} key={number}>{number + 1}</option>);
    const occasionOptions = occasionNames.map(occ => <option value={occ} key={occ}>{occ}</option>);

    const [timeOptions, setTimeOptions] = useState([]);

    const onDateChange = () =>
    {
        let time = 500;

        const newTimeOptions = [];

        while (time < 1000)
        {
            if (Math.random() < .5)
            {
                newTimeOptions.push(`${Math.floor(time / 100)}:${(""+time).slice(-2)} pm`)
            }

            if (time % 100 === 45)
            {
                time += 55;
            }
            else{
                time += 15;
            }
        }

        setTimeOptions(newTimeOptions);
    }

    const timeOptionsList = timeOptions.map(time => <option value={time} key={time}>{time}</option>);

    return (
        <section className="backgroundBanner">
            <div className="content standardTopMargin" style={{display: "flex", justifyContent: "center"}}>
                <div className="reservationsCard primaryGreen background" style={{height: 700, width: 700}}>
                    <EntryField caption="Date" ghostText={new Date().getDate().toString()} type="date" onChange={onDateChange}/>
                    {/* //<EntryField caption="Time" ghostText="hello" type="time"/> */}
                    <OptionDropdown caption="Time" ghostText="Choose a time" options={timeOptionsList}/>
                    <OptionDropdown caption="Party Size" ghostText="How many people in your group?" options={partySizeOptions}/>
                    <OptionDropdown caption="Occasion" ghostText="What is your occasion?" options={occasionOptions}/>
                </div>
            </div>
        </section>

    )
};

const EntryField = ({caption, ghostText, type, onChange}) =>
{
    return (
        <div className="entryField">
            <h2 className="highlightWhite text caption" >
                {caption}
            </h2>
            <input type={type} placeholder={ghostText} className="highlightWhite background inputText" onChange={onChange}/>
        </div>
    )
};

const OptionDropdown = ({caption, ghostText, options}) => 
{
    return (
        <div className="entryField">
            <h2 className="highlightWhite text caption" >
                {caption}
            </h2>
            <select placeholder={ghostText} className="highlightWhite background inputText">
                <option key={-1} value={null}>{ghostText}</option>
                {options}
            </select>
        </div>
    );
};

const occasionNames = [
    "Birthday",
    "Engagement",
    "Anniversary"
];


export default Reservations;