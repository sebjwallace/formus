"use strict";

import {render} from './renderer';

class SchemaEngine{
  constructor(){
    this.render = render;
    const cssContainer = document.createElement('div');
    cssContainer.id = '--rendered-styles';
    document.body.appendChild(cssContainer);
  }
}

export default SchemaEngine;
