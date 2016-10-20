/// <reference path="../src/index.d.ts" />
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ImagesPromise from "../dist/index";
const mountPoint = document.createElement('div');
mountPoint.id = 'mount';
document.body.appendChild(mountPoint);

const App = (props: {images: any[], isImagesLoaded: boolean}) => (
    <div>
        {
            !props.isImagesLoaded ? 'Loading...' : 'Done'
        }
        <img src={props.images['image1']} />
        <img src={props.images['fox']} />
    </div>
)

const WithimagesLoaded = ImagesPromise.withImagesPromise({
    image1: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
    fox: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg'
}, App);

ReactDom.render(
    <WithimagesLoaded />,
    document.getElementById('mount')
)