export class Helper
{
	static dateFormat(dateString)
	{
		const months = [
			"янв", "фев", "мар", "апр", "май", "июн",
			"июл", "авг", "сен", "окт", "ноя", "дек"
		];

		const date = new Date(dateString);

		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${day} ${month}. ${year} ${hours}:${minutes}`;
	}
}