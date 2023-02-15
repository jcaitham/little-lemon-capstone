

import { fireEvent, render, screen, act } from "@testing-library/react";
import ReservationsCard from "./ReservationsCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("ReservationsForm", () =>
{
	test("Submission is initially disabled", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});

		const onClick = jest.fn();

		const submitButton = screen.getByRole("button");
		submitButton.addEventListener("click", onClick);

		await act(async () =>
		{
			fireEvent.click(submitButton);
		});

		// formik validation is apparently async, so on the very first initial render, the button is actually briefly active, and then is immediately inactivated
		expect(submitButton).toHaveClass("inactive");
	});

	test("Submission is enabled after inputs", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		const onClick = jest.fn();

		const submitButton = screen.getByRole("button");
		submitButton.addEventListener("click", onClick);

		await act(async () =>
		{
			const timeDropDownOptions = screen.getByLabelText("Time").children;
			fireEvent.change(screen.getByLabelText("Time"), { target: { value: timeDropDownOptions[1].value } });
			expect(timeDropDownOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const partyOptions = screen.getByLabelText("Party Size").children;
			fireEvent.change(screen.getByLabelText("Party Size"), { target: { value: partyOptions[1].value } });
			expect(partyOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const occasionOptions = screen.getByLabelText("Occasion").children;
			fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: occasionOptions[1].value } });
			expect(occasionOptions.length).toBeGreaterThan(1);
		});

		expect(submitButton).toHaveClass("active");

		await act(async () => 
		{
			fireEvent.click(submitButton);
		});

		expect(onClick).toHaveBeenCalled();
	});

	test("Submission still disabled after some inputs", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		const onClick = jest.fn();

		const submitButton = screen.getByRole("button");
		submitButton.addEventListener("click", onClick);

		await act(async () =>
		{
			const timeDropDownOptions = screen.getByLabelText("Time").children;
			fireEvent.change(screen.getByLabelText("Time"), { target: { value: timeDropDownOptions[1].value } });
			expect(timeDropDownOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const occasionOptions = screen.getByLabelText("Occasion").children;
			fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: occasionOptions[1].value } });
			expect(occasionOptions.length).toBeGreaterThan(1);
		});

		expect(submitButton).toHaveClass("inactive");

		await act(async () => 
		{
			fireEvent.click(submitButton);
		});
	});

	test("Full workflow successful", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		const onClick = jest.fn();

		const submitButton = screen.getByRole("button");
		submitButton.addEventListener("click", onClick);

		await act(async () =>
		{
			const timeDropDownOptions = screen.getByLabelText("Time").children;
			fireEvent.change(screen.getByLabelText("Time"), { target: { value: timeDropDownOptions[1].value } });
			expect(timeDropDownOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const partyOptions = screen.getByLabelText("Party Size").children;
			fireEvent.change(screen.getByLabelText("Party Size"), { target: { value: partyOptions[1].value } });
			expect(partyOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const occasionOptions = screen.getByLabelText("Occasion").children;
			fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: occasionOptions[1].value } });
			expect(occasionOptions.length).toBeGreaterThan(1);
		});

		expect(submitButton).toHaveClass("active");

		await act(async () => 
		{
			fireEvent.click(submitButton);
		});

		expect(onClick).toHaveBeenCalled();

		const tabs = document.getElementsByClassName("tab");

		expect(tabs[1]).toHaveClass("active");

		const page2Submit = document.getElementById("page2Submit");

		expect(page2Submit).toHaveClass("inactive");

		await act(async () =>
		{
			fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Darth Vader" } });
		});

		await act(async () =>
		{
			fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "dv@empire.com" } });
		});

		await act(async () =>
		{
			fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "8003838888" } });
		});

		expect(page2Submit).toHaveClass("active");


		await act(async () => 
		{
			fireEvent.click(page2Submit);
		});

	});

	test("Full workflow incomplete", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		const onClick = jest.fn();

		const submitButton = screen.getByRole("button");
		submitButton.addEventListener("click", onClick);

		await act(async () =>
		{
			const timeDropDownOptions = screen.getByLabelText("Time").children;
			fireEvent.change(screen.getByLabelText("Time"), { target: { value: timeDropDownOptions[1].value } });
			expect(timeDropDownOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const partyOptions = screen.getByLabelText("Party Size").children;
			fireEvent.change(screen.getByLabelText("Party Size"), { target: { value: partyOptions[1].value } });
			expect(partyOptions.length).toBeGreaterThan(1);
		});

		await act(async () =>
		{
			const occasionOptions = screen.getByLabelText("Occasion").children;
			fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: occasionOptions[1].value } });
			expect(occasionOptions.length).toBeGreaterThan(1);
		});

		expect(submitButton).toHaveClass("active");

		await act(async () => 
		{
			fireEvent.click(submitButton);
		});

		expect(onClick).toHaveBeenCalled();

		const tabs = document.getElementsByClassName("tab");

		expect(tabs[1]).toHaveClass("active");

		const page2Submit = document.getElementById("page2Submit");

		expect(page2Submit).toHaveClass("inactive");

		await act(async () =>
		{
			fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Darth Vader" } });
		});


		expect(page2Submit).toHaveClass("inactive");


		await act(async () => 
		{
			fireEvent.click(page2Submit);
		});

	});

	test("date input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Date")).toHaveAttribute("min");
		expect(screen.getByLabelText("Date")).toHaveAttribute("id");
		expect(screen.getByLabelText("Date").type).toEqual("date");
	});

	test("time input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Time")).toHaveAttribute("id");
		expect(screen.getByLabelText("Time").children.length).toBeGreaterThan(1);
	});

	test("party size input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Party Size")).toHaveAttribute("id");
		expect(screen.getByLabelText("Party Size").children.length).toBeGreaterThan(1);
	});

	test("occasion input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Occasion")).toHaveAttribute("id");
		expect(screen.getByLabelText("Occasion").children.length).toBeGreaterThan(1);
	});

	test("name input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Name")).toHaveAttribute("id");
		expect(screen.getByLabelText("Name")).toHaveAttribute("placeholder");
	});

	test("email input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("E-mail")).toHaveAttribute("id");
		expect(screen.getByLabelText("E-mail")).toHaveAttribute("placeholder");
	});

	test("Phone input has expected attributes", async () =>
	{
		await act(async () =>
		{
			render(<BrowserRouter><ReservationsCard /></BrowserRouter>);
		});
		expect(screen.getByLabelText("Phone")).toHaveAttribute("id");
		expect(screen.getByLabelText("Phone")).toHaveAttribute("placeholder");
	});
});