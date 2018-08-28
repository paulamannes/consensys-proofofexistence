import React from 'react'
import FileContainer from './../../layouts/file/FileContainer'

class File extends React.Component {
    render() {
        return (
            <section className="__pofland__default_wrapper">
                <div className="">
                    <div className="container __pofland__img_background">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1 className="__pofland__home_title text-center">
                                    This image is registered on the blockchain
                                </h1>
                                <div className="text-center">
                                  <FileContainer { ...this.props } /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        )
    }
}

export default File
