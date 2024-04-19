export class John
{
	static stylingNode() {
		FamilyTree.templates.base.defs =
			`
				<g id="john_up">
					<circle cx="115" cy="30" r="15" fill="#fff" stroke="#b1b9be" stroke-width="1"></circle>
					${FamilyTree.icon.ft(20, 80, '#b1b9be', 80, 5)}
				</g>
			`;
	}
}