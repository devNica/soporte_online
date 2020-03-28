import React, { Component } from 'react';
import {uploadImage} from '../../helpers/helpers';

import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
//import validator from 'validator';

class UploadImage extends Component {

    state={
        fileSelected: '',
        notificationStatus: false
    }

    createNotifiacion = (message, type, title, duration) =>{
        store.addNotification({
            title,
            message,
            type,                        // 'default', 'success', 'info', 'warning' 'danger'
            container: 'top-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration,
              onScreen: true,
            //   pauseOnHover: true
            }
          })
    }

    

    fileSelecttedHandler = e =>{
        //console.log(e.target.files[0]);
        var reader = new FileReader();

        reader.onload = (e)=>{
            document.getElementById('preview').src = e.target.result;
        }

        reader.readAsDataURL(e.target.files[0]);
        this.setState({fileSelected: e.target.files[0]});
        
        
    }

    fileUploadHandler = e =>{

        let fileSelected = this.state.fileSelected;
        if(fileSelected === ''){
            this.createNotifiacion('No image selected', 'danger', '', 3500);
        }
        else{
            
            const fd = new FormData();
            fd.append('image', this.state.fileSelected, this.state.fileSelected.name);
            fd.append('employeeID', this.props.employeeID)
            uploadImage(fd).then(res=>{
                this.createNotifiacion(res.msg, res.type,'', 3500);
            });
        }


        
    }

    render() {
        return (
            <div className="modal fade" id="uploadImageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload Image</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                        <div className="row">
                            <div className="col 12 col-sm-12 col-md-8 offset-md-4 col-lg-6 offset-lg-3">
                                <div className="card">
                                    <div className="card-header bg-danger text-white">
                                        Upload your image...
                                    </div>
                                    <img 
                                        src={this.state.fileSelected}
                                        id='preview' 
                                        className="img-fluid img-profile rounded-circle mx-auto my-4" 
                                        alt="...">
                                    </img>
                                    <div className="card-body">
                                    <input 
                                        type="file" 
                                        name="fileSelected" 
                                        id="fileSelected" 
                                        className="form-control"
                                        onChange={this.fileSelecttedHandler}
                                    />
                                    </div>
                                    <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-8"></div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-primary btn-block"
                                                onClick={this.fileUploadHandler}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        

                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button"
                            className="btn btn-secondary" 
                            data-dismiss="modal"
                            onClick={this.handleOnSave}
                        >
                        Close
                        </button>
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadImage;