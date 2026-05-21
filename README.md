# Football Formation Builder

**Football Formation Builder** is an interactive and reusable Web Component designed for rendering football tactical formations in modern web applications.

This project demonstrates the creation of a custom HTML element (`custom element`) capable of dynamically displaying player positioning, tactical layouts, and interactive player selection while maintaining full component encapsulation through **Shadow DOM**.

The component was integrated into a React application to demonstrate the excellent interoperability between Web Components standards and modern frontend frameworks.

The project was developed for the **Framework Design** course, under the requirement category:
> *"A new component for a given framework"*

The resulting component is completely independent and can be easily reused in:
* React applications
* Vue applications
* Angular applications
* Vanilla JavaScript projects
* Any environment that natively supports Custom Elements.

---

## Project Goals

The main purpose of the project is to explore and demonstrate modern frontend component architecture concepts:
* **Reusable Web Components:** Creating custom elements that work anywhere, without external dependencies.
* **Shadow DOM Encapsulation:** Isolating CSS styles and DOM structure to prevent conflicts with the host application.
* **Responsive Design:** Perfect adaptation of the tactics board on both desktop screens and mobile devices.
* **Event-Driven Communication:** Using Custom DOM events to transmit the component's internal state to the outside.
* **Interoperability:** Seamlessly integrating a Custom Element into React's lifecycle and data flow.
* **Dynamic Configurability:** Modifying behavior and layout through standard HTML attributes.

---

## Technologies Used

The project is built exclusively on modern web standards and fast development tools:
* **JavaScript:** Dynamic component logic and DOM manipulation.
* **Custom Elements API:** Defining the new `<football-formation>` tag.
* **Shadow DOM:** Ensuring complete encapsulation of styles and structure.
* **React:** The host framework used to demonstrate integration.
* **Vite:** Ultra-fast build tool for serving and bundling code.
* **CSS:** Flexbox, Grid, and CSS variables used for drawing the pitch and animations/positioning.

---

## Main Features

* **Interactive Tactics Board:** Rendering a modern football pitch inspired by professional sports analysis applications.
* **Dynamic Formation Rendering:** Instant repositioning of players on the pitch based on the selected formation.
* **Multi-Formation Support:** Native support for multiple classic and modern systems.
* **Player Interaction:** Selecting a player triggers visual feedback and sends data to the parent application.
* **Custom Events:** Emitting events like `playerSelected` with ID and position details.
* **Clean Architecture:** Strict separation between the application's business logic and the component's presentation logic.

---

## Supported Tactical Formations

The component calculates the coordinates of each player and translates them into percentages/positions on the pitch for the following systems:
* **4-3-3** (Balanced system, based on possession and wingers)
* **4-4-2** (Classic system, compact, with two lines of four)
* **4-2-3-1** (Modern system, focused on midfield control and an attacking midfielder)
* **3-5-2** (System with three centre-backs and wide midfielders/wingbacks)

Every change to the `formation` attribute automatically and fluidly rearranges the player nodes within the Shadow DOM space.

---

## How to Use the Component in Your Project

Because this is a native Web Component, it has zero dependencies. You do not need npm packages or complex build setups to use it.

### 1. Copy the Component File
Simply copy the FootballFormation.js file from the src/web-components/ directory and place it anywhere in your own project.

### 2. Import the Component
Import the file in your HTML or JavaScript entry point to register the custom element with the browser.
```javascript
import './path/to/FootballFormation.js';
```

### 3. Use the HTML Tag
Once imported, the  tag is registered and ready to be used just like a standard HTML tag.

---

## Component API reference

| Attribute | Type   | Example                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                      |
| ----------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| formation | String | 4-3-3                                                                                                                                                                                                                                    | Defines the tactical layout. Supported values are: 4-3-3, 4-4-2, 4-2-3-1, and 3-5-2. If you change this attribute dynamically, the component will automatically rearrange the players to match the new system.   |
| team-name | String | Real Madrid                                                                                                                                                                                                                              | Sets the name of the team to be displayed on or alongside the tactics board.                                                                                                                                     |
| players | String (JSON)| JSON.stringify(players) | A stringified JSON array or object containing the specific data for each player (e.g., name, shirt number, id). Because HTML attributes only accept strings, complex data must be passed using JSON.stringify(). |

---

## Integration examples
### 1. Vanilla HTML / JavaScript Integration
Use the component directly in a basic HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Football Tactics Board</title>
  <!-- Import the component as a module -->
  <script type="module" src="./src/web-components/FootballFormation.js"></script>
</head>
<body>

  <!-- Use the custom element with the initial attribute -->
  <football-formation formation="4-3-3" id="tactics-board"></football-formation>

  <script>
    const board = document.getElementById('tactics-board');
    
    // Listen for custom events emitted by the component
    board.addEventListener('playerSelected', (event) => {
      console.log('Player selected:', event.detail.playerId);
      console.log('Tactical position:', event.detail.position);
    });

    // Dynamically change the formation after 3 seconds
    setTimeout(() => {
      board.setAttribute('formation', '4-2-3-1');
    }, 3000);
    setTimeout(() => {
        board.setAttribute('formation', '4-2-2');
    }, 6000);
  </script>
</body>
</html>
```

### 2. Usage in a framework
Because it is a native HTML element, you can use it inside a React or Angular component. You just need to use a ref to attach the custom event listener.

```javascript
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
```
---

# Project Structure

```txt
src/
│
├── web-components/
│   └── FootballFormation.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
