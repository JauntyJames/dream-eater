import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: props.acceptfile
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
      </div>
    )
  }
}

export default Uploader;
