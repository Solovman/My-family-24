import {Helper} from "./helper.js";
import {Requests} from "./requests.js";

export class CreatedNode
{

	static requestCreationNode(nodeId, family, onUpdateNodeAdded, onUpdatePerson, self)
	{

		let treeID =  parseInt(window.location.href.match(/\d+/));

		if (nodeId && typeof nodeId === "string" && !onUpdateNodeAdded)
		{
			onUpdateNodeAdded = this.addRequestNode(family, onUpdateNodeAdded, self);
		}
		else if(!onUpdatePerson)
		{
			onUpdatePerson = true;

			family.onUpdateNode(async (args) => {

				if (Object.keys(args.addNodesData).length !== 0) {
					return;
				}

				const formData = new FormData();
				const fileInput = document.querySelector('input[type="file"]');
				formData.append(fileInput.name, fileInput.files[0]);

				const updateNodes = args.updateNodesData;

				const id = updateNodes[0].id;
				const gender = updateNodes[0].gender[0];
				const name = updateNodes[0].name;
				const imageId = updateNodes[0].imageId;
				let surname = updateNodes[0].surname;
				let active = updateNodes[0].active;
				let birthDate = updateNodes[0].birthDate;
				let deathDate = Helper.formatDate(updateNodes[0].deathDate);
				let weight = updateNodes[0].weight;
				let height = updateNodes[0].height;
				const education = updateNodes[0].education[0];

				if (Number(weight) < 0) {
					weight = null;
				}

				if (Number(height)  < 0) {
					height = null;
				}

				if (surname.length === 0) {
					surname = null;
				}

				if (active) {
					active = '1'
				} else {
					active = '0'
				}

				if (updateNodes[0].deathDate.length === 0) {
					deathDate = null;
				}

				if (updateNodes[0].birthDate.length === 0) {
					birthDate = null;
				}

				if (BX('photoName').value !== '')
				{
					fetch(
						`/tree/${treeID}/`,
						{
							method: 'POST',
							headers: {
								"X-Bitrix-Csrf-Token": BX.bitrix_sessid()
							},
							body: formData
						}
					)
						.then((response) => {
							if (!response.ok) {
								throw new Error('Network response was not ok');
							}
							return response.json();
						})
						.then((response) => {
							const lastImageId = updateNodes[0].imageId;
							updateNodes[0].imageId = response.data.fileId;
							const imageId = updateNodes[0].imageId;

							Requests.updateNode(id, active, imageId, lastImageId, name, surname, birthDate, deathDate, gender, treeID, weight, height, education).then(node => {
								self.reload();
								return node;
							})
						})
						.catch((error) => {
							console.error('Error while changing item:', error);
						});
				}
				else
				{
					Requests.updateNode(id, active, imageId, 0, name, surname, birthDate, deathDate, gender, treeID, weight, height, education).then(node => {
						self.reload();
						return node;
					})
				}
			})
		}

		return [onUpdateNodeAdded, onUpdatePerson];
	}

	static addRequestNode(family, onUpdateNodeAdded, self)
	{
		let treeID =  parseInt(window.location.href.match(/\d+/));
		onUpdateNodeAdded = true;

		family.onUpdateNode((args) =>
		{
			const updateNodes = args.updateNodesData;
			const addNodes = args.addNodesData;
			const removeNodes = args.removeNodeId;

			const formData = new FormData();
			const fileInput = document.querySelector('input[type="file"]');
			formData.append(fileInput.name, fileInput.files[0]);

			if (BX('photoName').value !== '')
			{
				fetch(
					`/tree/${treeID}/`,
					{
						method: 'POST',
						headers: {
							"X-Bitrix-Csrf-Token": BX.bitrix_sessid()
						},
						body: formData
					}
				)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then((response) => {
						updateNodes[0].imageId = response.data.fileId;

						this.addNode(family, updateNodes, addNodes, removeNodes, self);
					})
					.catch((error) => {
						console.error('Error while changing item:', error);
					});
			}
			else
			{
				updateNodes[0].imageId = 1;
				this.addNode(family, updateNodes, addNodes, removeNodes, self);
			}
		});

		return onUpdateNodeAdded;
	}

	static addNode(family, updateNodes, addNodes, removeNodes, self)
	{
		let treeID =  parseInt(window.location.href.match(/\d+/));

		if (Object.keys(addNodes).length === 0 && removeNodes === null)
		{
			const gender = updateNodes[0].gender[0];
			const name = updateNodes[0].name;
			let active = updateNodes[0].active;
			const imageId = updateNodes[0].imageId;
			let surname = updateNodes[0].surname;
			let birthDate = Helper.formatDate(updateNodes[0].birthDate);
			let deathDate = Helper.formatDate(updateNodes[0].deathDate);
			let weight = updateNodes[0].weight;
			let height = updateNodes[0].height;
			const education = updateNodes[0].education[0];

			if (surname.length === 0) {
				surname = null;
			}

			if (Number(weight) < 0) {
				weight = null;
			}

			if (Number(height)  < 0) {
				height = null;
			}

			console.log(surname);

			if (active) {
				active = '1'
			} else {
				active = '0'
			}

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

				Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, weight, height, education, personConnectedId, 'child').then(node => {
					if (node)
					{
						self.reload();
					}
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

				Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, weight, height, education, personConnectedId, 'parent').then(node => {
					if (node)
					{
						self.reload();
					}
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

				Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, weight, height, education, personConnectedId, 'partnerParent').then(node => {
					if (node)
					{
						self.reload();
					}
				});

				return;
			}

			if (updateNodes[0].pids.length !== 0)
			{
				Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, weight, height, education, personConnectedId, 'partner').then(node => {
					if (node)
					{
						self.reload();
					}
				});

				return;
			}

			Requests.addNode(active, imageId, name, surname, gender, birthDate, deathDate, treeID, weight, height, education, [0], 'init').then(node => {
				if (node)
				{
					self.reload();
				}
			});
		}
	}
}