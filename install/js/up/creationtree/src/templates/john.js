export class John
{
	static stylingNode() {
		FamilyTree.templates.base.defs =
			`
				<g id="john_up">
					<circle cx="115" cy="30" r="15" fill="#fff" stroke="#b1b9be" stroke-width="1"></circle>
					${FamilyTree.icon.ft(20, 80, '#b1b9be', 80, 5)}
				</g>
				<g style="cursor: pointer;" id="base_tree_menu">
					<rect x="0" y="0" width="25" height="25" fill="transparent"></rect>
					${FamilyTree.icon.addUser(25, 25, 'grey', 0, 0)}
				</g>
			`;
	}
}