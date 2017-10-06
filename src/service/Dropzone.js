/**
 * Created by Igor Martucelli on 12/08/2017.
 */

import React, {Component} from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import PubSub from 'pubsub-js';


class Dropzone extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {file: '', limitFile: props.limitFile};

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

        this.handlePost = this.handlePost.bind(this);

        this.dropzone = null;

        PubSub.subscribe('dropzone-make-upload', this.handlePost);
    };

    limitFileService()
    {
        if(this.state.limitFile === true)
        {
            if (this.dropzone.files[1] != null)
            {
                this.dropzone.removeFile(this.dropzone.files[0]);
            }
        }
    };

    handleFileAdded(file)
    {
        console.log(this.dropzone);
        this.limitFileService();
        this.setState({file: file});
    };

    handlePost()
    {
        alert("uppando ...");
        this.dropzone.processQueue();
    };

    render()
    {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers =
        {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this)
        };

        return (
            <div style={{marginTop: '2%'}}>
                <DropzoneComponent
                    config={config}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

export default Dropzone;
