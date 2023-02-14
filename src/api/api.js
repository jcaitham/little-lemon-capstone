export const seededRandom = function (seed)
{
	var m = 2 ** 35 - 31;
	var a = 185852;
	var s = seed % m;
	return function ()
	{
		return (s = s * a % m) / m;
	};
};

export const fetchAPI = function (date)
{
	let result = [];
	let random = seededRandom(date.getDate());

	const start = 500;
	const end = 1000;

	let numericTime = start;


	while (numericTime < end)
	{
		if (random() < .5)
		{
			result.push(`${Math.floor(numericTime / 100)}:${("" + numericTime).slice(-2)} pm`);
		}

		if (numericTime % 100 === 30)
		{
			numericTime += 70;
		}
		else
		{
			numericTime += 30;
		}
	}
	return result;
};
export const submitAPI = function (formData)
{
	return true;
};