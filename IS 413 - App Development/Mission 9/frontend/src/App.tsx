import { useState, useEffect } from "react";
import "./App.css";
import teamsData from "./CollegeBasketballTeams.json";

// Component: Heading
const Heading = () => {
  return (
    <header className="header">
      <h1>NCAA Basketball Teams</h1>
      <p>Explore information about all the colleges in NCAA Basketball.</p>
    </header>
  );
};

// Component: TeamCard (Displays individual team info)
const TeamCard = ({ school, name, city, state }: { school: string; name: string; city: string; state: string }) => {
  return (
    <div className="team-card">
      <h2>{school}</h2>
      <p><strong>Mascot:</strong> {name}</p>
      <p><strong>Location:</strong> {city}, {state}</p>
    </div>
  );
};

// Component: TeamList (Displays all teams)
const TeamList = () => {
  const [teams, setTeams] = useState<{ school: string; name: string; city: string; state: string }[]>([]);

  useEffect(() => {
    console.log("Loading team data: ", teamsData);
    // If the teamsData is an object that contains an array 'teams', access it
    if (Array.isArray(teamsData)) {
      setTeams(teamsData); // Assuming teamsData is an array already
    } else if (teamsData.teams) {
      setTeams(teamsData.teams); // Assuming teamsData is an object with 'teams' property
    } else {
      // Optional: Handle invalid data structure gracefully
      console.error("Invalid data structure in teamsData");
    }
  }, []);

  return (
    <div className="team-list">
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <TeamCard key={index} school={team.school} name={team.name} city={team.city} state={team.state} />
        ))
      ) : (
        <p>Loading teams...</p> // Show loading message until teams are available
      )}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Heading />
      <TeamList />
    </div>
  );
}

export default App;
