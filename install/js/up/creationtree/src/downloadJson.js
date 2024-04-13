export class DownloadJson
{
	static download(obj, name)
	{
		const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
		const anchorElement = document.createElement('a');
		anchorElement.href = dataUri;
		anchorElement.download = `${name}.json`;
		document.body.appendChild(anchorElement);
		anchorElement.click();
		document.body.removeChild(anchorElement);
	}

	static changeKey(obj, oldKey, newKey) {
		if (obj.hasOwnProperty(oldKey)) {
			obj[newKey] = obj[oldKey];
			delete obj[oldKey];
		}
	}
}