import "./App.css";
import { useEffect, useState } from "react";
import Moon from "./components/SVG/moon";
import Sun from "./components/SVG/sun";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import TabGroupList from "./components/TabGroupList";

function App() {
  const [newTabGroupName, setNewTabGroupName] = useState("");
  const [tabGroupNames, setTabGroupNames] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const darkModeButtonSize = "24";

  //FIXME: dark-mode theme works when adding list items beyond initalt height
  //FIXME: Wonky Moon svg size
  //FIXME: Dark mode button positioning
  //TODO: Save latest used dark/light mode and try to retireve on startup

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
    let queryOptions = { currentWindow: true };

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
    <Card className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Card.Header>
        Tabs Manager{" "}
        {darkMode ? (
          <Sun
            role='button'
            onClick={() => setDarkMode(!darkMode)}
            height={darkModeButtonSize}
            width={darkModeButtonSize}
            fill='#ffffff'
          />
        ) : (
          <Moon
            role='button'
            onClick={() => setDarkMode(!darkMode)}
            height={darkModeButtonSize}
            width={darkModeButtonSize}
          />
        )}
      </Card.Header>

      <InputGroup className={`mb-3 ${darkMode ? "dark-mode" : "light-mode"}`}>
        <FormControl
          name='tabGroupName'
          onChange={(e) => setNewTabGroupName(e.target.value)}
          value={newTabGroupName}
          aria-describedby='basic-addon2'
        />
        <Button
          onClick={setTabList}
          variant='outline-secondary'
          id='button-addon2'
        >
          New tab group
        </Button>
      </InputGroup>

      <TabGroupList
        tabGroupNames={tabGroupNames}
        setTabGroupNames={setTabGroupNames}
      />
    </Card>
  );
}

export default App;
