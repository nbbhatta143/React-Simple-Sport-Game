class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shotsTaken: 0,
      score: 0,
    };
    this.shotSound = new Audio("./assets/sounds/FOOTBALLKICK.mp3");
    this.scoreSound = new Audio("./assets/sounds/Bounces.mp3");
  }

  shotsHandle = (event) => {
    let score = this.state.score;
    this.shotSound.play();
    if (Math.random() > 0.5) {
      score += 1;
      setTimeout(() => {
        this.scoreSound.play();
      }, 1000);
    }
    this.setState((state, props) => ({
      shotsTaken: state.shotsTaken + 1,
      score,
    }));
  };

  render() {
    let shootingPercentageDisplay = "";
    if (this.state.shotsTaken) {
      let percentScore = Math.round((this.state.score / this.state.shotsTaken) * 100);
      shootingPercentageDisplay = <strong>Shooting %: {percentScore}</strong>;
    }

    return (
      <div className="Team">
        <div>{this.props.name}</div>
        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>
        <strong>Shots Taken: {this.state.shotsTaken}</strong>
        <strong>Score: {this.state.score}</strong>
        {shootingPercentageDisplay}
        <button onClick={this.shotsHandle}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}!</h1>
      <div className="stats">
        <Team name={props.visitingTeam.name} logo={props.visitingTeam.logo} />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team name={props.homeTeam.name} logo={props.homeTeam.logo} />
      </div>
    </div>
  );
}
function App(props) {
  const dog = {
    name: "Dog Basketball Club",
    logo: "./assets/images/dog-basketball.jpg",
  };
  const raccoon = {
    name: "Raccoon Basketball",
    logo: "./assets/images/raccoon-basketball.jpg",
  };
  const human = {
    name: "People Basketball",
    logo: "./assets/images/human-basketball.png",
  };
  const bunny = {
    name: "Bunny National Association",
    logo: "./assets/images/bunny-basketball.jpg",
  };
  return (
    <div className="App">
      <Game venue="Animal Arena" homeTeam={dog} visitingTeam={raccoon} />
      <Game venue="AT&T Center!" homeTeam={human} visitingTeam={bunny} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
