export class Helper
{
	static addRelation(list)
	{
		if (list.familyRelations.length !== 0) {
			list.familyRelations.forEach(parent => {
				const nodeToUpdateParent = list.persons.find(node => node.id === parent.childId);

				const parents = list.persons.find(node => node.id === parent.parentId);

				if (parents.gender === 'male') {
					nodeToUpdateParent.fid = parent.parentId;
				}
				else
				{
					nodeToUpdateParent.mid = parent.parentId;
				}

			});
		}

		if (list.familyRelationsMarried.length !== 0) {
			list.familyRelationsMarried.forEach(partner => {
				const nodeToUpdateMarried = list.persons.find(node => node.id === partner.personID);

				if (nodeToUpdateMarried)
				{
					if (!nodeToUpdateMarried.pids) {
						nodeToUpdateMarried.pids = [];
					}
					if (!nodeToUpdateMarried.pids.includes(partner.partnerID)) {
						nodeToUpdateMarried.pids.push(partner.partnerID);
					}
				}
			})
		}

	}
	static isNumeric(str)
	{
		return !isNaN(parseFloat(str)) && isFinite(str);
	}

	static formatDate(date)
	{
		const dateObject = new Date(date);

		const day = dateObject.getDate();
		const month = dateObject.getMonth() + 1;
		const year = dateObject.getFullYear();

		const formattedDay = day < 10 ? '0' + day : day;
		const formattedMonth = month < 10 ? '0' + month : month;

		return `${year}-${formattedMonth}-${formattedDay}`;
	}

	static getRootOf(node, family) {
		while (node) {
			if (!family.getNode(node.mid)) {
				break;
			}

			node = family.getNode(node.mid);
		}


		return node;
	}
}