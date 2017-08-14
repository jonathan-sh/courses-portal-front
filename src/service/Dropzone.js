/**
 * Created by Igor Martucelli on 12/08/2017.
 */

import React, {Component} from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class Dropzone extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {file: ''};

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig =
        {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg, image/png, image/gif, application/pdf",
            autoProcessQueue: false
        };

        this.componentConfig =
        {
            iconFiletypes: ['.jpg', '.png', '.gif', '.pdf'],
            showFiletypeIcon: true,
            postUrl: '/url-server-upload'
        };

        this.dropzone = null;
    }

    handleFileAdded(file)
    {
        console.log(file);
        this.setState({file: file});
    }

    handlePost()
    {
        this.dropzone.processQueue();
        console.log(this.state.file);
    }

    render()
    {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers =
        {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this)
        }

        return (
            <div>
                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                <button onClick={this.handlePost.bind(this)}>Upload</button>
            </div>
        );
    }
}
export default Dropzone;
