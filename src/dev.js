import './dev.scss';
import './globals';
import ReactRceGutenberg from './main';
import './blocks/tu-chart'
/*===example start===*/

// install: npm install afeiship/react-rce-gutenberg --save
// import : import ReactRceGutenberg from 'react-rce-gutenberg'

class App extends React.Component {
  render() {
    return (
      <div className="hello-react-rce-gutenberg">
        <ReactRceGutenberg ref="rc" />
      </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(<App />, document.getElementById('app'));
