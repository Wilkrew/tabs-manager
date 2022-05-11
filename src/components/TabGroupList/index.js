import TabGroupListItem from "./TabGroupListItem";
import Stack from "react-bootstrap/esm/Stack";

function TabGroupList({ tabGroupNames, setTabGroupNames }) {
	return (
		<Stack className="col-md-5" gap={2}>
			{tabGroupNames.map(function (tabGroupName) {
				function removeTabGroup() {
					chrome.storage.sync.set({ [tabGroupName]: {} });
					const newTabGroupNames = tabGroupNames.filter((item) => item !== tabGroupName);
					setTabGroupNames(newTabGroupNames);
					chrome.storage.sync.set({ tabGroupNames: newTabGroupNames });
				}

				return <TabGroupListItem removeTabGroup={removeTabGroup} tabGroupItem={tabGroupName} />;
			})}
		</Stack>
	);
}

export default TabGroupList;
