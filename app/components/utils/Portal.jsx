import React, { PropTypes } from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import Button from 'components/utils/Button';
import classNames from 'classnames/bind';
import styles from 'material-design-lite/src/menu/_menu';
import stylesCustom from 'scss/components/_dropdownmenu';
import { Link } from 'react-router';
const cx = classNames.bind(Object.assign(styles,stylesCustom));



function portalListeners(){
  //arguments.forEach(item)
  
}


//portalListeners(port,button)

function portalClose(port,button,closeListener,event){
  console.log('close Listenr klik');
  
  event.stopPropagation();
  port.removeEventListener('click',closeListener);
  button.removeEventListener('click',closeListener);
  unmountComponentAtNode(port);
  port.parentElement.removeChild(port);
  window.removeEventListener('click',closeListener);
  
}  

function wClick(event,port,init,eList,pList,wList){
  
 console.log('window klik');
 port.removeEventListener('click',pList);
 init.removeEventListener('click',eList);
 unmountComponentAtNode(port);
 port.parentElement.removeChild(port);
 window.removeEventListener('click',wList);
 
}
function cClick(port,init,eList,pList,wList,close){
 console.log(close);
 console.log('close klik');
 port.removeEventListener('click',pList);
 init.removeEventListener('click',eList);
 unmountComponentAtNode(port);
 port.parentElement.removeChild(port);
 window.removeEventListener('click',wList);
 
}

function portMute(event){
  console.log('portMute');
  event.stopPropagation();
}

//portal caller
function eClick(event,port,init,eList,pList,wList){
  //console.log(port);
  console.log('eklik');
  event.stopPropagation();
  port.removeEventListener('click',pList);
  init.removeEventListener('click',eList);
  unmountComponentAtNode(port);
  port.parentElement.removeChild(port);
  window.removeEventListener('click',wList);
}

function portalDiv(name){
    var port = document.querySelector("body>"+name);
    if(!port){
         port = document.createElement('div');
     } 
      port.id = name;
    return port; 
}

function portalDOM(Element,port,props){
      var element = <Element {...props}  />;
      document.body.appendChild(port);
      render(element, port);
}





export const MenuPortal = (Element, props) => {
    var port = portalDiv(Element.name);
    
    
    var { event, ...other } = props;
    var stop = ()=>{event.stopPropagation()}
    var rekt = event.currentTarget.getBoundingClientRect();
    var target = event.currentTarget;
    var evt = { 
      style: "top:"+(window.pageYOffset+rekt.bottom)+"px;left:"+rekt.left+"px;z-index:"+event.currentTarget.style.zIndex+2+";",
      target: event.currentTarget,stop: stop}; 
    var style = { 
      top: (window.pageYOffset+rekt.bottom)+"px",
      left: rekt.left+"px",
      zIndex: event.currentTarget.style.zIndex+2,
    }
      
      
      var closeListener = function(event){portalClose(port,target,closeListener,event)}
      //var eList = function(event){eClick(event,port,target,eList,pList,wList)};
      var portListener = function(event){portMute(event)};
      //var wList = function(event){wClick(event,port,target,eList,pList,wList)};
      //var close = function(close){cClick(port,target,eList,pList,wList,close)};
  
      //gets called if same element is pressed, so close the menu
      target.addEventListener('click', closeListener);
      //gets called if any of the children get clicked
      port.addEventListener('click', portListener);
      //prevents window.onclick firing on declaration 
      window.addEventListener('click',function evt(event){
           window.addEventListener('click',closeListener);
           window.removeEventListener('click', evt);
        });
    
    
    portalDOM(Element,port,{closeNow: close,style: style,...other});
  
}

