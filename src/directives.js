import {
  getAttribute,
  applySelector,
  getDataFromVar,
  getContent
} from './utils';

import {
  CHECK,
  REPLACE,
  GET
} from './exr';

import {
  renderElementArray
} from './core';

export const Directives = [

  {
    regex: GET('ATTR'),
    method: (component,dom,val) => {
        const attribute = getAttribute(component,val);
        dom.el.setAttribute(attribute.attr,attribute.value);
    }
  },

  {
    regex: GET('DATA'),
    method: (component,dom,val) => {
      const data = getDataFromVar(component,val);
       if(!applySelector(dom.el,data))
        dom.el.innerHTML = data;
    }
  },

   {
    regex: GET('EVENT'),
    method: (component,dom,val) => {
      var format = val.replace('!','').replace(/\s/,'').split(':');
      dom.el[format[0]] = (e) => {
        component[format[1]](component,e);
      }
    }
  },

  {
    regex: GET('IF'),
    method: (component,dom,val) => {
      const exp = val.replace(/^\?\s+/,'');
      if(CHECK(exp,'DATA')){
        const data = component.data[REPLACE(exp,'DATA','')];
        if(!data) dom.el.style.display = 'none';
      }
    }
  },

  {
    regex: GET('FOR'),
    method: (component,dom,val,template) => {
      const args = val.replace(GET('FOR'),'').split(/\s+\in\s+/);
      const data = component.data[args[1].replace(GET('DATA'),'')];
      const temp = args[0].replace(GET('DATA'),'');
      for(let item in data){
        component.data[temp] = data[item];
        renderElementArray(component,dom,getContent(template))
      }
      return true;
    }
  }

]
