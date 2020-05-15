import React from 'react';
import './App.css';

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://api.vidscrip.com/api/v1/specialties')
      .then(res => res.json())
      .then(
        (result) => {
          const specialties = result.data.specialties
          this.setState({
            isLoaded: true,
            items: specialties
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        shuffleArray(items);
        shuffleArray(items);
      return (
        <ul>
          {items.map(item => 
            <li key={item.name}>
                {item.name}
            </li>
          )}
        </ul>
      );
    }
  }
}

export default App;


