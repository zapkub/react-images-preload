'use strict'

declare var React: any;
namespace ImagesPromise {

    interface ImageLoadedStatic {
        createImageOnLoadPromise: (url: string, key: string) => Promise<HTMLImageElement>,
        withImagesPromise: (ImageDataSource: any, CompositionComponent: any) => any;
    }

    export function libFactory(React?, MockImage?): ImageLoadedStatic {
        if(!React) {
            if (typeof require !== 'undefined') {
                React = require('react');
            } else {
                
            }
        }
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
        function withImagesPromise(ImageDataSource: any, CompositionComponent: any) {

            type ImageLoadState = {
                imageData: any;
                isLoaded: boolean;
                promiseCollection: any[];
            }
            /** 
             * Create Promise
             */
            const ImagesLoadedPromise = React.createClass({
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
                    return <CompositionComponent images={this.state.imageData} isImagesLoaded={this.state.isLoaded} {...this.props} />
                }
            })
            return ImagesLoadedPromise;
        }
        return {
            createImageOnLoadPromise,
            withImagesPromise
        }
    }



    export const withImagesPromise = libFactory().withImagesPromise;
    export const createImageOnLoadPromise = libFactory().withImagesPromise;
    
}


var ImagesLoaded = ImagesPromise.libFactory((window as any).React || undefined);
(window as any).module = (window as any).module || {};
export = ImagesPromise;