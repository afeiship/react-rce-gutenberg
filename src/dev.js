import './dev.scss';
import './globals';
import ReactRceGutenberg from './main';

/*===example start===*/

// install: npm install afeiship/react-rce-gutenberg --save
// import : import ReactRceGutenberg from 'react-rce-gutenberg'

class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

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
