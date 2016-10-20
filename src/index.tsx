'use strict'

export interface ImageLoadedStatic {
    createImageOnLoadPromise: (url: string, key: string) => Promise<HTMLImageElement>,
    withImagesLoadedComponent: (ImageDataSource: any, CompositionComponent: any) => any;
} 


function libFactory(react, MockImage?): ImageLoadedStatic{

    function createImageOnLoadPromise(url: string, key: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = MockImage ? new MockImage() : new Image();
            image.name = key;
            image.onload = function () {
                resolve(image);
            }
            image.onerror = function () {
                reject(image);
            }
            image.src = url;
        });
    }

    /** 
     * @params {[propsName]: [ImageURL]}, Component
     * @return React class
     */
    function withImagesLoadedComponent(ImageDataSource: any, CompositionComponent: any) {
        
        type ImageLoadState = {
            imageData: any;
            isLoaded: boolean;
            promiseCollection: any[];
        }
        /** 
         * Create Promise
         */
        const ImagesLoadedPromise = react.createClass({
            getInitialState() {
                const promiseCollection: Promise<HTMLImageElement>[] = [];
                for (const key in ImageDataSource) {
                    promiseCollection.push(createImageOnLoadPromise(ImageDataSource[key], key));
                }
                return {
                    promiseCollection,
                    imageData: {},
                    isLoaded: false
                }
            },
            componentDidMount() {
                Promise.all<HTMLImageElement>(this.state.promiseCollection).then(
                    (result) => {
                        const imageData = {};
                        result.map(image => {
                            imageData[image.name] = image.src;
                        });
                        this.setState({
                            imageData,
                            isLoaded: true
                        });
                    }
                );
            },
            render() {
                return <CompositionComponent ref='child' images={this.state.imageData} isImageLoaded={this.state.isLoaded} {...this.props} />
            }
        })
        return ImagesLoadedPromise;
    }
    return {
        createImageOnLoadPromise,
        withImagesLoadedComponent
    }
}

/**
 * backward support
 * */ 
if (typeof exports !== 'undefined') {
    var React = require('react');
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = {
            libFactory,
            createImageOnLoadPromise: libFactory(React).createImageOnLoadPromise,
            ImagesLoadedComponent: libFactory(React).withImagesLoadedComponent
        };
    }
    exports.imageLoaded = {
        libFactory,
        createImageOnLoadPromise: libFactory(React).createImageOnLoadPromise,
        ImagesLoadedComponent: libFactory(React).withImagesLoadedComponent
    };
} else {
    // static lib
    var ImagesLoaded = libFactory(React);
}