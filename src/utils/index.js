class Utils {
	static dateString = timestamp => {
		const date = new Date(parseInt(timestamp));
		console.log(date.toISOString());
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dev"
		];
		const day =
			date.getDate().toString().length === 2
				? date.getDate()
				: "0" + date.getDate();
		return "" + months[date.getMonth()] + " " + day + ", " + date.getFullYear();
	};
}

export default Utils;
