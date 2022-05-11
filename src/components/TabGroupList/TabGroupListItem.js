import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import TrashCanSVG from "./TrashCanSVG";

function TabGroupListItem({ removeTabGroup, tabGroupItem: tabGroupName }) {
	function openTabs() {
		chrome.storage.sync.get(tabGroupName).then((response) => {
			response[tabGroupName].forEach((tab) => {
				console.log(tab);
				chrome.tabs.create({ url: tab.url });
			});
		});
	}

	return (
		<InputGroup className="mb-3 Flex-grow">
			<Button className="Flex-grow" variant="outline-secondary" onClick={openTabs}>
				{tabGroupName}
			</Button>
			<Button variant="outline-danger" onClick={removeTabGroup}>
				<TrashCanSVG />
			</Button>
		</InputGroup>
	);
}

export default TabGroupListItem;
