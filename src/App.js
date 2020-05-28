import React from 'react';
import './App.css';
import { FixedSizeGrid as Grid } from "react-window";
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

  async componentDidMount() {
   var res = "";

    try {
    res = await fetch('https://nameless-caverns-23945.herokuapp.com/api/v1/stats/2');
     if (!res.ok) {
        throw Error(res.statusText);
     }
    } catch (error) {
      console.log(error);
    }
  
    const json = await res.json();

    const arr = Object.entries(json);
    console.log(arr);

    this.setState({
      isLoaded: true,
      items: arr
    });

}
  
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        let arr = items.map(item=>item);
        const Cell = ({columnIndex, rowIndex, style }) => (
          <div className = {((rowIndex+columnIndex) % 2) ? 'ListItemOdd' : 'ListItemEven'} style={style}>
             {columnIndex === 1 ? arr[rowIndex][1] : arr[rowIndex][0]}
          </div>
        );
        const Example = () => (
          <Grid
            className="Grid"
            columnCount={2}
            columnWidth={200}
            height={items.length*35}
            rowCount={items.length}
            rowHeight={35}
            width={400}
          >
            {Cell}
          </Grid>
        );
    
      return (
            <Example/>
      );
    }
  }
}

export default App;
