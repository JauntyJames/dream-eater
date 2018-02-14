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
        <div >
          <Dropzone
            accept="application/pdf"
            multiple={false}
            maxSize={8000000}
            className="dropzone"
            activeClassName="dropzone-active"
            rejectClassName="dropzone-reject"
            onDrop={(accepted, rejected) => { this.passFile(accepted); this.setState({ accepted, rejected }); }}
          >
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return "Here comes a comic book!";
              }
              if (isDragReject) {
                return "Oh God no not that one!";
              }
              return acceptedFiles.length || rejectedFiles.length
                ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                : <p> <i className="fas fa-upload"></i> Drop in your comic PDF here - Limit 8MB</p> ;
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
