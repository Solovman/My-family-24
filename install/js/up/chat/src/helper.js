export class Helper
{
	static dateFormat(dateString)
	{
		const months = [
			"UP_TREE_CHATS_HELPER_JAN", "UP_TREE_CHATS_HELPER_FEB", "UP_TREE_CHATS_HELPER_MAR",
			"UP_TREE_CHATS_HELPER_APR", "UP_TREE_CHATS_HELPER_MAY", "UP_TREE_CHATS_HELPER_JUN",
			"UP_TREE_CHATS_HELPER_JUL", "UP_TREE_CHATS_HELPER_AUG", "UP_TREE_CHATS_HELPER_SEP",
			"UP_TREE_CHATS_HELPER_OCT", "UP_TREE_CHATS_HELPER_NOV", "UP_TREE_CHATS_HELPER_DEC"
		];

		const date = new Date(dateString);

		const day = date.getDate();
		const month = BX.message(months[date.getMonth()]);
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${day} ${month}. ${year} ${hours}:${minutes}`;
	}
}