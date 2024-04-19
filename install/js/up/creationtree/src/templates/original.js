export class Original
{
	static stylingNode(family)
	{
		FamilyTree.templates.base.defs =
		`
		<g style="cursor: pointer;" id="base_tree_menu">
		<rect x="0" y="0" width="25" height="25" fill="transparent"></rect>
		${FamilyTree.icon.addUser(25, 25, '#fff', 0, 0)}
		</g>`;

		FamilyTree.templates.tommy_male.defs =
			`<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart">
       			 <path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/>
			<g>
			`;

		FamilyTree.templates.tommy.node =
			'<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="grey" stroke="#aeaeae" rx="15" ry="15"></rect>';

		family.on('expcollclick', function (sender, isCollapsing, nodeId) {
			let node = family.getNode(nodeId);
			if (isCollapsing) {
				family.expandCollapse(nodeId, [], node.ftChildrenIds);
			} else {
				family.expandCollapse(nodeId, node.ftChildrenIds, []);
			}
			return false;
		});

		family.on('render-link', function (sender, args) {
			if (args.cnode.ppid != undefined)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xa) + '" y="' + (args.p.ya) + '"/>';
			if (args.cnode.isPartner && args.node.partnerSeparation == 30)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xb) + '" y="' + (args.p.yb) + '"/>';
		});
	}
}