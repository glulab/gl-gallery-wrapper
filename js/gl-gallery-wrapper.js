/* jshint esversion: 6 */

import $ from 'jquery';
import 'lightgallery';
import 'lightgallery/src/js/lg-autoplay';
import 'lightgallery/src/js/lg-fullscreen';
import 'lightgallery/src/js/lg-hash';
import 'lightgallery/src/js/lg-pager';
import 'lightgallery/src/js/lg-thumbnail';
import 'lightgallery/src/js/lg-video';
import 'lightgallery/src/js/lg-zoom';
// import debounce from 'lodash/debounce';

export class GlGalleryWrapper {

    constructor(options) {
        
        this.debug = typeof window.debug !== 'undefined' ? window.debug : false;
    }
    
    consoleLog(log = '', prefix = 'GlGalleryWrapper: ') {
        if (this.debug || window.debug) {
            if (prefix !== false) {
                console.log(prefix + log);
            } else {
                console.log(log);
            }
        }
    }
    
    init() {
        if (this.check()) {
            this.prepare();
            this.run();
        }
    }
    
    check() {
        return true;
    }
    
    prepare() {
        this.consoleLog('prepare [' + $().jquery + ']');
        
        this.$window = $(window);
        this.$document = $(document);
    }
    
    run() {
        this.consoleLog('run [' + $().jquery + ']');
        
        this.galleries = {};
        this.setGalleryClass();
        this.setGalleryItem();
        this.lightWrap();
    }
    
    setGalleryClass(galleryClass = '.js-gallery') {
        this.galleryClass = galleryClass;
    }
    
    setGalleryItem(galleryItem = false) {
        this.galleryItem = galleryItem;
    }
    
    lightWrap() {
        this.consoleLog('Search for gallery classs: ' + this.galleryClass);
        
        let $galleries = $(this.galleryClass);
        $galleries.each((index, Element) => {
            let idName = $(Element).attr('id');
            this.lightDestroy(idName);
            this.lightInit(idName);
        });
    }
    
    lightDestroy(idName) {
        if (typeof this.galleries[idName] !== 'undefined') {
            this.galleries[idName] = undefined;
        }
    }
    
    lightInit(idName) {
        this.consoleLog('lightInit ' + idName);
        
        let $galleryElement = $('#' + idName);
        
        let galleryOptions = {};
        
        if(this.galleryItem !== false) {
            galleryOptions['selector'] = '#' + idName + ' ' + this.galleryItem;
            $('#' + idName + ' ' + this.galleryItem).css('cursor', 'pointer');
        } else {
            $galleryElement.children().css('cursor', 'pointer');
        }
        
        galleryOptions['mode'] = 'lg-fade';
        
        this.galleries[idName] = $galleryElement.lightGallery(galleryOptions);
    }
}

///////////
// init  //
///////////

const xGlGalleryWrapper = new GlGalleryWrapper();

$(() => {
    xGlGalleryWrapper.init();
});

export default xGlGalleryWrapper;