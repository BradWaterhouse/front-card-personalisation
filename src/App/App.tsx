import React, {ChangeEvent, useState} from 'react';
import 'bulma';
import './App.css';

interface CardConfig {
    id: number;
    name: string;
    image: { url: string, previewUrl: string }
    areas: Area[]
}

interface Area {
    id: number;
    type: string;
    name: string;
    value?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const images: string[] = [
    "https://eu-west-1.template.prod.moonpig.net/image/85484aaf3a84d5f2",
    "https://eu-west-1.template.prod.moonpig.net/image/b67a37753a40b5b6",
    "https://eu-west-1.template.prod.moonpig.net/image/afc8a0572d5ea869",
    "https://eu-west-1.template.prod.moonpig.net/image/333765d0775f6bc6",
    "https://eu-west-1.template.prod.moonpig.net/image/792d65f2a5f05f8b"


]

const cardConfig = [
    {
        id: 1,
        name: "3 picture card",
        image: {
            url: "https://eu-west-1.template.prod.moonpig.net/image/0de933115341287e",
            previewUrl: "https://eu-west-1.template.prod.moonpig.net/image/0de933115341287e"
        },
        areas: [
            {
                id: 1,
                type: "image",
                name: "main-image",
                x: -1.5,
                y: -3,
                width: 136.129,
                height: 76.2,
                value: "https://eu-west-1.template.prod.moonpig.net/image/3442c9ddd8f50907"
            },
            {
                id: 2,
                type: "image",
                name: "bottom-image-left",
                x: -1.5,
                y: 102.569,
                width: 66.411,
                height: 87.445,
                value: "https://eu-west-1.template.prod.moonpig.net/image/bb820d7fe2c2e53e"
            },
            {
                id: 3,
                type: "image",
                name: "bottom-image-right",
                x: 65.043,
                y: 102.172,
                width: 66.751,
                height: 88.072,
                value: "https://eu-west-1.template.prod.moonpig.net/image/43286667448bfa87"
            },
            {id: 4, name: "text-1", type: "text", x: 4.585, y: 78.492, width: 740, height: 59, value: "HAPPY BIRTHDAY"},
            {
                id: 5,
                name: "text-2",
                type: "text",
                x: 3.262,
                y: 87.169,
                width: 751,
                height: 80,
                value: "Have a great day!"
            }
        ]
    },
    {
        id: 2,
        name: "1 picture card",
        image: {
            url: "https://eu-west-1.template.prod.moonpig.net/image/42912aab91196025",
            previewUrl: "https://eu-west-1.template.prod.moonpig.net/image/42912aab91196025"
        },
        areas: [
            {
                id: 1,
                type: "image",
                name: "main-image",
                value: "https://eu-west-1.template.prod.moonpig.net/image/85484aaf3a84d5f2",
                x: 12,
                y: 17,
                width: 108.559,
                height: 135.593
            },
            {id: 2, type: "text", name: "top-text", value: "Happy Birthday", x: 14.973, y: 12, width: 660, height: 86},
            {id: 3, type: "text", name: "bottom-text", value: "Some random", x: 20.973, y: 160, width: 660, height: 86}
        ]
    }
];

const App = () => {
    const [selectedCardConfig, setSelectedCardConfig] = useState<CardConfig>(cardConfig[0]);

    console.log(selectedCardConfig);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newConfig = {...selectedCardConfig};
        const id = event.target.dataset.id;

        if (id) {
            const index = newConfig.areas.findIndex((area: Area) => area.id === parseInt(id))
            newConfig.areas[index].value = event.target.value;
        }

        setSelectedCardConfig(newConfig);
    }

    const randomiseImage = (id: number): void => {
        const newConfig = {...selectedCardConfig};

        const index = newConfig.areas.findIndex((area: Area) => area.id === id)
        newConfig.areas[index].value = images[Math.floor(Math.random() * 4) + 1]

        setSelectedCardConfig(newConfig);
    }

    const handleSelectCard = (event: ChangeEvent<HTMLSelectElement>) => {
        const id = event.target.value;
        const index = cardConfig.findIndex((config: CardConfig) => config.id === parseInt(id))

        if (typeof index !== 'undefined') {
            setSelectedCardConfig(cardConfig[index]);
        }
    }

    return (
        <div className="container">
            <div className="columns mt-2">
                <div className="column is-4">
                    <h1 className="title">Personalisation Options</h1>

                    <h2><b className="has-text-weight-bold">Text</b></h2>
                    {selectedCardConfig.areas.filter((area: Area) => area.type === "text").map((area: Area) => {
                        return (
                            <>
                                <label htmlFor="bottom-text">{area.name}</label>
                                <input className="input mb-3" name={area.name} id={area.id.toString()} data-id={area.id}
                                       value={area.value} onChange={handleChange}/>
                            </>
                        )
                    })}

                    <h2><b className="has-text-weight-bold">Images</b></h2>
                    {selectedCardConfig.areas.filter((area: Area) => area.type === "image").map((area: Area) => {
                        return (
                            <>
                                <label htmlFor="bottom-text mb-2">{area.name}</label><br/>
                                <button className="button mb-2" onClick={() => randomiseImage(area.id)}>Randomise
                                    Image
                                </button>
                                <br/>
                            </>
                        )
                    })}


                    <h2><b className="has-text-weight-bold mt-5">Change card config</b></h2>

                    <label htmlFor="config">Choose card style:</label><br/>

                    <select className="select" name="cards" id="cards" onChange={handleSelectCard}>
                        {cardConfig.map((config: CardConfig) => <option value={config.id}>{config.name}</option>)}
                    </select><br/>
                </div>

                <div className="column is-6">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%"
                         viewBox="-8 -8 149 203" style={{inset: "0px"}}>
                        <g data-testid="mp-editor-region-root" transform="matrix(1 0 0 1 0 0)">
                            <g data-testid="mp-editor-region-front-cover" transform="matrix(1 0 0 1 0 0)">
                                <g clipPath="url(#ed-page-clip-1)">


                                    {selectedCardConfig.areas.filter((area: Area) => area.type === "image").map((area: Area) => {
                                        return (
                                            <g data-testid="ed-element-1:1"
                                               transform={`matrix(1 0 0 1 ${area.x} ${area.y})`}>
                                                <g>
                                                    <image x="0" y="0" width={area.width} height={area.height}
                                                           href={area.value}
                                                           preserveAspectRatio="none"/>
                                                    <rect x="0" y="0" width={area.width} height={area.height}
                                                          fill="rgba(255, 255,255, 0.7)"/>
                                                </g>
                                            </g>
                                        )
                                    })}

                                    <g data-testid="ed-element-1:2" transform="matrix(1 0 0 1 -1.5 -3)">
                                        <image width="136" height="193"
                                               href={selectedCardConfig.image.url}
                                               preserveAspectRatio="none" aria-hidden="true"/>
                                    </g>

                                    {selectedCardConfig.areas.filter((area: Area) => area.type === "text").map((area: Area) => {
                                        return (
                                            <g data-testid="ed-element-1:3"
                                               transform={`matrix(1 0 0 1 ${area.x} ${area.y})`}>
                                                <g data-testid="ed-text-root"
                                                   transform="matrix(0.16666666666666666 0 0 0.16666666666666666 0 0)">
                                                    <foreignObject width={area.width} height={area.height}
                                                                   style={{pointerEvents: "none", overflow: "visible"}}>
                                                        <div className="ed-text-none-selectable"
                                                             style={{display: "flex", alignItems: "center"}}>
                                                            <div data-testid="ed-text-element" style={{
                                                                color: "rgb(24, 73, 92)",
                                                                fontSize: "76.248px",
                                                                lineHeight: 1.05556,
                                                                fontFamily: "mp-1240"
                                                            }}>
                                                                {area.value?.toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </foreignObject>
                                                </g>
                                            </g>
                                        )
                                    })}
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default App;
