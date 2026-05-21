class FootballFormation extends HTMLElement {
    static get observedAttributes() {
        return ["formation", "team-name", "players"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.selectedPlayerName = null;
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    handlePlayerClick(player) {
        this.selectedPlayerName = player.name;

        this.dispatchEvent(
            new CustomEvent("player-selected", {
                detail: player,
                bubbles: true,
                composed: true,
            })
        );

        this.render();
    }

    render() {
        const formation = this.getAttribute("formation") || "4-3-3";
        const teamName = this.getAttribute("team-name") || "Football Formation";

        const defaultNames = ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LW", "ST", "RW"];
        let playerNames = defaultNames;

        try {
            const playersAttribute = this.getAttribute("players");
            if (playersAttribute) {
                playerNames = JSON.parse(playersAttribute);
            }
        } catch (error) {
            playerNames = defaultNames;
        }

        const formations = {
            "4-3-3": [
                { position: "GK", x: 50, y: 90 },
                { position: "LB", x: 22, y: 72 },
                { position: "CB", x: 40, y: 74 },
                { position: "CB", x: 60, y: 74 },
                { position: "RB", x: 78, y: 72 },
                { position: "CM", x: 30, y: 52 },
                { position: "CM", x: 50, y: 48 },
                { position: "CM", x: 70, y: 52 },
                { position: "LW", x: 25, y: 28 },
                { position: "ST", x: 50, y: 20 },
                { position: "RW", x: 75, y: 28 },
            ],
            "4-4-2": [
                { position: "GK", x: 50, y: 90 },
                { position: "LB", x: 22, y: 72 },
                { position: "CB", x: 40, y: 74 },
                { position: "CB", x: 60, y: 74 },
                { position: "RB", x: 78, y: 72 },
                { position: "LM", x: 20, y: 50 },
                { position: "CM", x: 40, y: 52 },
                { position: "CM", x: 60, y: 52 },
                { position: "RM", x: 80, y: 50 },
                { position: "ST", x: 40, y: 22 },
                { position: "ST", x: 60, y: 22 },
            ],
            "4-2-3-1": [
                { position: "GK", x: 50, y: 90 },
                { position: "LB", x: 22, y: 72 },
                { position: "CB", x: 40, y: 74 },
                { position: "CB", x: 60, y: 74 },
                { position: "RB", x: 78, y: 72 },
                { position: "CDM", x: 38, y: 58 },
                { position: "CDM", x: 62, y: 58 },
                { position: "LAM", x: 25, y: 40 },
                { position: "CAM", x: 50, y: 36 },
                { position: "RAM", x: 75, y: 40 },
                { position: "ST", x: 50, y: 18 },
            ],
            "3-5-2": [
                { position: "GK", x: 50, y: 90 },
                { position: "CB", x: 30, y: 72 },
                { position: "CB", x: 50, y: 74 },
                { position: "CB", x: 70, y: 72 },
                { position: "LWB", x: 12, y: 52 },
                { position: "CM", x: 35, y: 54 },
                { position: "CDM", x: 50, y: 58 },
                { position: "CM", x: 65, y: 54 },
                { position: "RWB", x: 88, y: 52 },
                { position: "ST", x: 40, y: 22 },
                { position: "ST", x: 60, y: 22 },
            ],
        };

        const selectedFormation = formations[formation] || formations["4-3-3"];

        const players = selectedFormation.map((player, index) => ({
            ...player,
            name: playerNames[index] || player.position,
        }));

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    font-family: Arial, sans-serif;
                    width: 100%;
                }

                .title {
                    color: white;
                    font-size: clamp(28px, 5vw, 48px);
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-align: center;
                    text-shadow: 0 4px 12px rgba(0,0,0,0.4);
                }

                .container {
                    width: 40vw;
                    aspect-ratio: 1.12;
                    position: relative;
                    border-radius: clamp(18px, 3vw, 28px);
                    overflow: hidden;
                    border: 5px solid rgba(255,255,255,0.95);
                    background:
                        repeating-linear-gradient(
                            90deg,
                            #2e7d32 0px,
                            #2e7d32 100px,
                            #348a38 100px,
                            #348a38 200px
                        );
                    box-shadow:
                        0 25px 50px rgba(0,0,0,0.5),
                        inset 0 0 40px rgba(0,0,0,0.2);
                }

                .middle-line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(255,255,255,0.95);
                    transform: translateY(-50%);
                }

                .center-circle {
                    position: absolute;
                    width: 20%;
                    aspect-ratio: 1;
                    border: 4px solid rgba(255,255,255,0.95);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .center-dot {
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background: white;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .top-box {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 35%;
                    height: 17%;
                    border: 4px solid white;
                    border-top: none;
                }

                .bottom-box {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 35%;
                    height: 17%;
                    border: 4px solid white;
                    border-bottom: none;
                }

                .top-arc {
                    position: absolute;
                    top: 17%;
                    left: 50%;
                    transform: translateX(-50%) rotate(180deg);
                    width: 16%;
                    height: 10%;
                    border: 4px solid white;
                    border-bottom: none;
                    border-radius: 140px 140px 0 0;
                }

                .bottom-arc {
                    position: absolute;
                    bottom: 17%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 16%;
                    height: 10%;
                    border: 4px solid white;
                    border-bottom: none;
                    border-radius: 140px 140px 0 0;
                }

                .player {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    width: clamp(48px, 9vw, 85px);
                    height: clamp(48px, 9vw, 85px);
                    border-radius: 50%;
                    border: clamp(2px, 0.6vw, 4px) solid #0f3d17;
                    background: #ffffff;
                    color: #1b5e20;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    z-index: 20;
                    font-weight: 800;
                    box-shadow: 0 8px 18px rgba(0,0,0,0.35);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }

                .player:hover {
                    transform: translate(-50%, -50%) scale(1.1);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.45);
                }

                .player.selected {
                    background: #ffd54f;
                    color: #1a1a1a;
                    border-color: #ffffff;
                    transform: translate(-50%, -50%) scale(1.12);
                }

                .player-position {
                    font-size: clamp(11px, 2.2vw, 18px);
                    line-height: 1;
                }

                .player-name {
                    margin-top: 4px;
                    font-size: clamp(7px, 1.4vw, 10px);
                    opacity: 0.75;
                    line-height: 1;
                    max-width: 70px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                @media (max-width: 600px) {
                    .wrapper {
                        gap: 16px;
                    }

                    .container {
                        width: 96vw;
                        aspect-ratio: 0.72;
                        border-width: 3px;
                    }

                    .center-circle,
                    .top-box,
                    .bottom-box,
                    .top-arc,
                    .bottom-arc {
                        border-width: 3px;
                    }

                    .center-dot {
                        width: 10px;
                        height: 10px;
                    }

                    .middle-line {
                        height: 3px;
                    }

                    .player-name {
                        max-width: 45px;
                    }
                }
            </style>

            <div class="wrapper">
                <div class="title">
                    ${teamName} - ${formation}
                </div>

                <div class="container">
                    <div class="middle-line"></div>
                    <div class="center-circle"></div>
                    <div class="center-dot"></div>
                    <div class="top-box"></div>
                    <div class="bottom-box"></div>
                    <div class="bottom-arc"></div>
                    <div class="top-arc"></div>

                    ${players.map(player => `
                        <button
                            class="player ${this.selectedPlayerName === player.name ? "selected" : ""}"
                            style="left: ${player.x}%; top: ${player.y}%;"
                            data-name="${player.name}"
                            data-position="${player.position}"
                            data-x="${player.x}"
                            data-y="${player.y}"
                        >
                            <span class="player-position">${player.position}</span>
                            <span class="player-name">${player.name}</span>
                        </button>
                    `).join("")}
                </div>
            </div>
        `;

        this.shadowRoot.querySelectorAll(".player").forEach((button) => {
            button.addEventListener("click", () => {
                const player = {
                    name: button.dataset.name,
                    position: button.dataset.position,
                    x: Number(button.dataset.x),
                    y: Number(button.dataset.y),
                    formation,
                    teamName,
                };

                this.handlePlayerClick(player);
            });
        });
    }
}

customElements.define("football-formation", FootballFormation);