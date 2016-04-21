import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import classNames from 'classnames/bind';
import stylesCustom from 'scss/components/_dropdownmenu';
import {Modal} from 'components/utils/Modal';
const cx = classNames.bind(stylesCustom);

 
function portalListeners(portal, button){
        console.log('listeners init');
        portal.listener = function(event){portalMute(event)};
        var closeListener = function(event){portalClose(portal,closeListener,event)};
         if(button){
             closeListener.item = button;
             button.addEventListener('click', closeListener);
         }
         
        portal.addEventListener('click', portal.listener);
        //prevents window.onclick firing on declaration 
        
        window.addEventListener('mousedown',function evt(event){
           //event.stopPropagation(); 
           window.addEventListener('click',closeListener);
           window.removeEventListener('mousedown', evt);
        });
       var close = function(event){console.log('close butt');portalClose(portal,closeListener,event)}.bind(this);
    return close; 
         
};

    
function portalClose(portal,close,event){
      console.log('close Listenr klik');
 
      if(event){event.stopPropagation();}
      portal.removeEventListener('click',close);
      portal.removeEventListener('click',portal.listener);
      if(close.item){close.item.removeEventListener('click',close);}
      //try making classnames react to 'closing' parent
      
      portal.className += cx('closing');
      setTimeout(function(){unmountComponentAtNode(portal);portal.parentElement.removeChild(portal); }, 200);
      window.removeEventListener('click',close);
    }  

function portalMute(event){
  //console.log('portalMute');
  event.stopPropagation();
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
    var rekt = event.currentTarget.getBoundingClientRect();
    console.log(event.currentTarget.getBoundingClientRect());
    var target = event.currentTarget;
    var style = { 
      top: (window.pageYOffset+rekt.bottom)+"px",
      left: rekt.left+"px",
      zIndex: event.currentTarget.style.zIndex+2,
    };
    if(rekt.right < 300){
        style.transformOrigin="0 100"
        style.transform="translateX(-100%)"
    }
    var close = portalListeners(port,target);
    
    return portalDOM(Element,port,{closeNow: close,style: style,...other});

};


export const ModalPortal = (Element, props) => {
    var port = portalDiv(Element.name);
    var { event, ...other } = props;
    var zIndex = event.currentTarget.style.zIndex
    var close = portalListeners(port);
    
      var element = <Modal zIndex={zIndex} closeNow={close}><Element closeNow={close} {...other}/></Modal>;
      document.body.appendChild(port);
      render(element, port);
}
