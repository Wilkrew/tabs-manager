import "./App.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import TabGroupList from "./components/TabGroupList";

function App() {
	const [newTabGroupName, setNewTabGroupName] = useState("");
	const [tabGroupNames, setTabGroupNames] = useState([]);

	useEffect(() => {
		chrome.storage.sync
			.get("tabGroupNames")
			.then(({ tabGroupNames }) => {
				setTabGroupNames(tabGroupNames);
			})
			.catch(() => {
				chrome.storage.sync.set({ tabGroupNames: [] });
			});
	}, []);

	async function getCurrentTabs() {
		let queryOptions = { windowId: 1 };
		let tabs = await chrome.tabs.query(queryOptions);
		return tabs;
	}

	function setTabList() {
		getCurrentTabs().then((response) => {
			chrome.storage.sync.set({ [newTabGroupName]: response });
			const newTabGroupNames = [...tabGroupNames, newTabGroupName];
			setTabGroupNames(newTabGroupNames);
			chrome.storage.sync.set({ tabGroupNames: newTabGroupNames });
		});
	}

	return (
		<Card className="App">
			<Card.Header>Tabs Manager</Card.Header>
			<InputGroup className="mb-3">
				<FormControl
					name="tabGroupName"
					onChange={(e) => setNewTabGroupName(e.target.value)}
					value={newTabGroupName}
					aria-describedby="basic-addon2"
				/>
				<Button onClick={setTabList} variant="outline-secondary" id="button-addon2">
					New tab group
				</Button>
			</InputGroup>

			<TabGroupList tabGroupNames={tabGroupNames} setTabGroupNames={setTabGroupNames} />
		</Card>
	);
}

export default App;
