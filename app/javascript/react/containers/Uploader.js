import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: this.props.file
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
            maxSize={8000000}
            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
          >
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return "This file is authorized";
              }
              if (isDragReject) {
                return "This file is not authorized";
              }
              return acceptedFiles.length || rejectedFiles.length
                ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                : `Drop in your comic PDF here - Limit 8MB`;
            }}
          </Dropzone>
        </div>
        <aside>
          <h5>Dropped file:</h5>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </div>
    )
  }
}

export default Uploader;
