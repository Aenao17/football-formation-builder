import { useEffect, useRef, useState } from "react";
import "./web-components/FootballFormation";
import "./App.css";

function App() {
  const [formation, setFormation] = useState("4-3-3");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const formationRef = useRef(null);

  const players = [
    "Courtois",
    "Mendy",
    "Rüdiger",
    "Militão",
    "Carvajal",
    "Bellingham",
    "Tchouaméni",
    "Valverde",
    "Vinícius",
    "Mbappé",
    "Rodrygo",
  ];

  useEffect(() => {
    const element = formationRef.current;

    const handlePlayerSelected = (event) => {
      setSelectedPlayer(event.detail);
    };

    element.addEventListener("player-selected", handlePlayerSelected);

    return () => {
      element.removeEventListener("player-selected", handlePlayerSelected);
    };
  }, []);

  return (
      <div className="app">
        <h1 className="app-title">Football Formation Builder</h1>

        <select
            className="formation-select"
            value={formation}
            onChange={(event) => {
              setFormation(event.target.value);
              setSelectedPlayer(null);
            }}
        >
          <option value="4-3-3">4-3-3</option>
          <option value="4-4-2">4-4-2</option>
          <option value="4-2-3-1">4-2-3-1</option>
          <option value="3-5-2">3-5-2</option>
        </select>

        {selectedPlayer && (
            <div className="selected-player-card">
              Selected player:{" "}
              <span>{selectedPlayer.name}</span> — {selectedPlayer.position}
            </div>
        )}

        <football-formation
            ref={formationRef}
            formation={formation}
            team-name="Real Madrid"
            players={JSON.stringify(players)}
        ></football-formation>
      </div>
  );
}

export default App;