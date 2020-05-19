import React from 'react';
import './App.css';
import { FixedSizeList as List } from "react-window";
import './styles.css'

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
        let arr = items.map(item=>item.name);
        const Row = ({ index, style }) => (
          <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
             {arr[index]}
          </div>
        );
        const Example = () => (
          <List
            className="List"
            height={35*items.length}
            itemCount={items.length}
            itemSize={35}
            width={300}
          >
            {Row}
          </List>
        );
      return (
            <Example/>
      );
    }
  }
}

export default App;


