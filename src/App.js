import "./App.css";
import { useState } from "react";

function App() {
  const [aliens, setAliens] = useState([]);
  const [name, setName] = useState("");
  const [tech, setTech] = useState("");
  const [sub, setSub] = useState(false);

  const handleAliens = async () => {
    try {
      const response = await fetch(
        "https://l3wnk8vf66.execute-api.ap-south-2.amazonaws.com/prod/aliens"
      );
      const data = await response.json();
      setAliens(data);
    } catch (error) {
      console.error("Failed to fetch aliens:", error);
    }
  };

  const handleAddAlien = async () => {
    try {
      const response = await fetch(
        "https://l3wnk8vf66.execute-api.ap-south-2.amazonaws.com/prod/aliens",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, tech, sub }),
        }
      );

      if (response.ok) {
        console.log("✅ Alien added");
        handleAliens(); // refresh the list
      } else {
        console.error("❌ Failed to add alien");
      }
    } catch (error) {
      console.error("❌ Error posting alien:", error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Add Alien</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tech"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={sub}
            onChange={(e) => setSub(e.target.checked)}
          />
          Subscribed
        </label>
        <button onClick={handleAddAlien}>Add Alien</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleAliens}>Click to get the aliens</button>
        <ul>
          {aliens.map((alien) => (
            <li key={alien._id}>
              <strong>Name:</strong> {alien.name} <br />
              <strong>Tech:</strong> {alien.tech} <br />
              <strong>Subscribed:</strong> {alien.sub ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
