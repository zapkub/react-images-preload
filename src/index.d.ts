declare module "react-images-preload" {

    export function libFactory();
    export function withImagesPromise(ImageDataSource: any, CompositionComponent: any);
    export function createImageOnLoadPromise( url: string, key: string);

}

declare namespace ImagesPromise {
    export function libFactory();
    export function withImagesPromise(ImageDataSource: any, CompositionComponent: any);
    export function createImageOnLoadPromise( url: string, key: string);
}


export = ImagesPromise;