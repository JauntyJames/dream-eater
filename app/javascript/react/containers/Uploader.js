import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    }
    this.passFile = this.passFile.bind(this)
  }

  passFile(accepted) {
    this.props.acceptFile(accepted)
  }

  render() {

    return(
      <div>
        <div className="dropzone">

          <Dropzone
            accept="application/pdf"
            multiple={false}
            onDrop={(accepted, rejected) => { this.passFile(accepted); this.setState({ accepted, rejected }); }}
          >
            Drop in your comic PDF here!<br />
            Or click to open file dialogue
          </Dropzone>
        </div>
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>

      </div>
    )
  }
}

export default Uploader;
