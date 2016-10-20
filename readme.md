
# React Images preload promise [![Build Status](https://travis-ci.org/zapkub/react-images-preload.svg?branch=master)](https://travis-ci.org/zapkub/react-images-preload)

This libray help you deal with all messy preloading image in your react component

### Feature
 - use as Higher order component
 - use as Component (Soon)

## Installation
NPM
```

```
Bower
```
```

## Usage
With out using module import
```
<script src="../bower_components/react-images-preload/dist/index.js"></script>

<script>
var WithimagesLoaded = ImagesLoaded.withImagesPromise({
    image1: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
    fox: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg'
}, Component);
</script>
```

```
```


### API 

#### ImagesPreload.withImagesPromise

```
ReactClass withImagesPromise ( imagesURLDatasource: any, component: ReactClass ) 
```

This function provider [higher order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) that will receive collection of image url an composite component then do preload state and update composite component props.

#### ImagesPreload.createImageOnLoadPromise

```
Promise<HTMLImageElement> createImageOnLoadPromise ( url: string, key: string ) 
```

helper function that create [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will resolve Image object after request done.

