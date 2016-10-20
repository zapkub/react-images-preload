# React Images preload promise [![Build Status](https://travis-ci.org/zapkub/react-images-preload.svg?branch=master)](https://travis-ci.org/zapkub/react-images-preload)

This libray help you deal with all messy preloading image in your react component

### Feature
 - use as Higher order component
 - use as Component (Soon)

## Installation
NPM
```
npm install --save react-images-preload
```
Bower
```
bower install --save react-images-preload
```

## Usage
With out using module import
```
<script src="../bower_components/react-images-preload/dist/index.js"></script>

<script>
var Component = React.createClass({....})
var WithimagesLoaded = ImagesLoaded.withImagesPromise({
    image1: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
    fox: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg'
}, Component);
... render to DOM
</script>
```

```

import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as ImagesPromise from 'react-images-preload';

const mountPoint = document.createElement('div');
mountPoint.id = 'mount';
document.body.appendChild(mountPoint);

const App = ({images, isImagesLoaded}) => (
    <div>
        {
            !isImagesLoaded ? 'Loading...' : 'Done'
        }
        <img src={images['image1']} />
        <img src={images['fox']} />
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

```


### API 

#### ImagesPreload.withImagesPromise

```
ReactClass withImagesPromise ( imagesURLDatasource: any, component: ReactClass<ImagePromisePropsType> ) 
```

This function provider [higher order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) that will receive collection of image url an composite component 
then do preload state and update composite component props.

#### Composite component props type
```
    interface ImagesPromisePropsType {
         // object of imagesURLDataSource. ( will resolve after every images onload)
        images: any 
         // images list preload status.
        isImagesLoaded: boolean 
    }
```


#### ImagesPreload.createImageOnLoadPromise

```
Promise<HTMLImageElement> createImageOnLoadPromise ( url: string, key: string ) 
```

helper function that create [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will resolve Image object after request done.

