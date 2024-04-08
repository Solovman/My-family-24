export class Helper
{
	static addRelation(list)
	{
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

	static isNumeric(str)
	{
		return !isNaN(parseFloat(str)) && isFinite(str);
	}
}