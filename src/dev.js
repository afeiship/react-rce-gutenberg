import './dev.scss';
import './globals';
import ReactRceGutenberg from './main';
import './blocks/tu-chart';
import './blocks/tu-column2/column';
import './blocks/tu-column2';
import './blocks/advanced-rich-text-tools/dist';
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
