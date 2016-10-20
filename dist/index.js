'use strict';

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
function libFactory(react, MockImage) {
    function createImageOnLoadPromise(url, key) {
        return new Promise(function (resolve, reject) {
            var image = MockImage ? new MockImage() : new Image();
            image.name = key;
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject(image);
            };
            image.src = url;
        });
    }
    function withImagesLoadedComponent(ImageDataSource, CompositionComponent) {
        var ImagesLoadedPromise = react.createClass({
            getInitialState: function () {
                function getInitialState() {
                    var promiseCollection = [];
                    for (var key in ImageDataSource) {
                        promiseCollection.push(createImageOnLoadPromise(ImageDataSource[key], key));
                    }
                    return {
                        promiseCollection: promiseCollection,
                        imageData: {},
                        isLoaded: false
                    };
                }

                return getInitialState;
            }(),
            componentDidMount: function () {
                function componentDidMount() {
                    var _this = this;

                    Promise.all(this.state.promiseCollection).then(function (result) {
                        var imageData = {};
                        result.map(function (image) {
                            imageData[image.name] = image.src;
                        });
                        _this.setState({
                            imageData: imageData,
                            isLoaded: true
                        });
                    });
                }

                return componentDidMount;
            }(),
            render: function () {
                function render() {
                    return React.createElement(CompositionComponent, __assign({ ref: 'child', images: this.state.imageData, isImageLoaded: this.state.isLoaded }, this.props));
                }

                return render;
            }()
        });
        return ImagesLoadedPromise;
    }
    return {
        createImageOnLoadPromise: createImageOnLoadPromise,
        withImagesLoadedComponent: withImagesLoadedComponent
    };
}
exports.libFactory = libFactory;
if (typeof exports !== 'undefined') {
    var React = require('react');
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = {
            libFactory: libFactory,
            createImageOnLoadPromise: libFactory(React).createImageOnLoadPromise,
            ImagesLoadedComponent: libFactory(React).withImagesLoadedComponent
        };
    }
    exports.imageLoaded = {
        libFactory: libFactory,
        createImageOnLoadPromise: libFactory(React).createImageOnLoadPromise,
        ImagesLoadedComponent: libFactory(React).withImagesLoadedComponent
    };
} else {
    var ImagesLoaded = libFactory(React);
}