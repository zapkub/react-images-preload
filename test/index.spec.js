'use strict'
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import { libFactory } from '../dist/index';


class MockImage {
    name = '';
    onload = function () { }
    _src = '';
    set src(str) {
        this._src = str;
        setTimeout(this.onload, 300);
    }
    get src() {
        return this._src;
    }

}
const withImagesPromise = libFactory(React, MockImage).withImagesPromise;

const imgURL = `https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150`;
console.log('begin test')
describe('withImageLoaded', function () {
    var Enchant, Component, wrapper;
    beforeEach(function () {
        Component = React.createClass({
            render() {
                return <div>Testing <img src={this.props.images.image1} /></div>;
            }
        })
        Enchant = withImagesPromise({
            image1: imgURL
        }, Component);
        wrapper = mount(<Enchant />);
    });
    it('module should work', function (done) {
        done();
    });

    describe('Higher order component', function () {

        it('should render composite component inside it', function (done) {

            expect(wrapper.find(Component)).to.have.length(1);
            done();
        });

        it('should have imageData in state as an Object and isLoaded as Boolean inside', function (done) {
            expect(wrapper.state().imageData).to.be.a('Object');
            expect(wrapper.state().isLoaded).to.be.a('Boolean');
            done();
        });

        it('should generate promise collection in component state', function (done) {
            expect(wrapper.state().promiseCollection).to.be.a('Array');
            expect(wrapper.state().isLoaded).to.be.false;
            done();
        });

        it('state should update isLoaded to true when every promises are resolve', function (done) {
            expect(wrapper.state().isLoaded).to.be.false;
            setTimeout(() => {
                expect(wrapper.state().isLoaded).to.be.true;
                done();
            }, 400)
        });
    })


    describe('composite component', function () {
        it('should receive props isLoaded as false and img is not have src', function (done) {
            expect(wrapper.find('img')).to.have.length(1);
            expect(wrapper.find('img').props().src).to.be.a('undefined');
            expect(wrapper.find(Component).props().isImagesLoaded).to.be.a('boolean');
            expect(wrapper.find(Component).props().isImagesLoaded).to.be.false;
            done();
        });

        it('should update props isLoaded = true, img src available after promises resolve ', function (done) {
            setTimeout(() => {
                expect(wrapper.find('img')).to.have.length(1);
                expect(wrapper.find('img').props().src).to.not.be.null
                expect(wrapper.find(Component).props().isImagesLoaded).to.be.a('boolean');
                expect(wrapper.find(Component).props().isImagesLoaded).to.be.true;
                done();
            }, 400);
        });
    })

});