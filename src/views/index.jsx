import React from 'react';
import ReactDOM from 'react-dom';
import "./../assets/sass/index.scss";


class App extends React.Component{
    constructor() {
        super();
    }
    render() {
        //JSX here!
        return (
          <div className="container">
            <section className="jumbotron">
              <h3 className="jumbotron-heading">yld</h3>
            </section>
          </div>
        )
    }
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);