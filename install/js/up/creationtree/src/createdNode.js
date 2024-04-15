import {Helper} from "./helper.js";
import {Requests} from "./requests.js";

export class CreatedNode
{
	static addNode(updateNodes, addNodes, removeNodes, self)
	{
		let treeID =  parseInt(window.location.href.match(/\d+/));

		if (Object.keys(addNodes).length === 0 && removeNodes === null)
		{
			const gender = updateNodes[0].gender[0];
			const name = updateNodes[0].name;
			const imageId = updateNodes[0].imageId;
			const surname = updateNodes[0].surname;
			let birthDate = Helper.formatDate(updateNodes[0].birthDate);
			let deathDate = Helper.formatDate(updateNodes[0].deathDate);

			if (updateNodes[0].deathDate.length === 0) {
				deathDate = null;
			}

			if (updateNodes[0].birthDate.length === 0) {
				birthDate = null;
			}

			let personConnectedId = [Number(updateNodes[0].pids[0])];

			if (updateNodes[0].mid || updateNodes[0].fid)
			{
				if (Helper.isNumeric(updateNodes[0].mid) && Helper.isNumeric(updateNodes[0].fid))
				{
					personConnectedId = [Number(updateNodes[0].mid), Number(updateNodes[0].fid)];
				}
				else if (Helper.isNumeric(updateNodes[0].mid) && !Helper.isNumeric(updateNodes[0].fid))
				{
					personConnectedId = [Number(updateNodes[0].mid)];
				}
				else if (Helper.isNumeric(updateNodes[0].fid) && !Helper.isNumeric(updateNodes[0].mid))
				{
					personConnectedId = [Number(updateNodes[0].fid)]
				}

				Requests.addNode(imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'child').then(node => {
					self.reload();
				});

				return;
			}

			if (updateNodes[0].child && updateNodes[0].pids.length === 0 && updateNodes[0].pids[0] !== 0) {

				if (updateNodes[0].child.mid ) {
					personConnectedId = [updateNodes[0].child.mid];
				}
				else
				{
					personConnectedId = [updateNodes[0].child.fid];
				}

				Requests.addNode(imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'parent').then(node => {
					self.reload();
				});

				return;
			}

			if (updateNodes[0].child && updateNodes[0].pids.length !== 0 && updateNodes[0].pids[0] !== 0)
			{
				const partner = updateNodes[0].pids[0];
				let childID = 0;

				if (updateNodes[0].child.mid ) {
					childID = updateNodes[0].child.mid;
				}
				else
				{
					childID = updateNodes[0].child.fid;
				}

				personConnectedId = [partner, childID];

				Requests.addNode(imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'partnerParent').then(node => {
					self.reload();
				});

				return;
			}

			if (updateNodes[0].pids.length !== 0)
			{
				Requests.addNode(imageId, name, surname, gender, birthDate, deathDate, treeID, personConnectedId, 'partner').then(node => {
					self.reload();
				});

				return;
			}

			Requests.addNode(imageId, name, surname, gender, birthDate, deathDate, treeID, [0], 'init').then(node => {
				self.reload();
			});
		}
	}
}