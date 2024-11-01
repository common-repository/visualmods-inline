
function getParentByClassName(e, IDstring){
    var IDregex = new RegExp('(\\s|^)'+IDstring+'(\\s|$)');
    if(typeof(e)!='undefined'){
        e=e.parentNode;
        while(!IDregex.test(e.getAttribute('class')) && e!=document.body){
              e=e.parentNode;
    	  if(e == document.body){
    	    if(!IDregex.test(e.getAttribute('class'))){
    	      return undefined;
    	    }
              }
        }
      return e;
    }
}
   
function realParentUp(e){
    var siblings = e.children;
    while (siblings.length==1) {
      e = e.parentNode;
      siblings = e.children;
    }
   return e;
   
}
function realParentDown(e){
  var siblings = e.children;
  while (siblings.length==1) {
    e=siblings[0];
    siblings = e.children;
  }
  return  e;
}

function realChild(e){
   var nextChild =e.children[0];
   var lastChild = nextChild;
   while(nextChild){
      lastChild = nextChild;
      nextChild = nextChild.children[0];      
   }
   return lastChild;
}

function getAllParents(e){
  var parentArray = [];
  while (e) {
      parentArray.unshift(e);
      e = e.parentNode;
  }
  return parentArray;
}
  

function addHTML (e, newHTML){
  var prevHTML=e.innerHTML;
  e.innerHTML=newHTML+prevHTML;
}
function deleteClass(e, c){
  var classVal = e.getAttribute('class');
  var classRegex = new RegExp("(^|\\s)"+c+"(\\s|$)");
  if (classRegex.test(classVal)){
    var classVal = classVal.replace(classRegex,'');
    e.setAttribute('class', classVal);
  }
}
 
 function insertClasses (e, c){
  var classRegex = new RegExp("(^|\\s)"+c+"(\\s|$)");
  var classVal = e.getAttribute('class');
  if(!classRegex.test(classVal)){
    var classVal = classVal + " " + c;
    e.setAttribute('class', classVal);
  }
}
function addToAttribute(element, attribute, attrValue, stylevalue){
   var currentVal = element.getAttribute(attribute);
   if(!currentVal){element.setAttribute(attribute,''); currentVal='';}
   currentVal=String(currentVal);
   if( attribute=='style'){
     addStyle(element, attrValue, stylevalue);
     return;
   }
   else{
      var valRegex= new RegExp("(^|\\s)"+attrValue+"(\\s|$)");
      currentVal=currentVal.replace(valRegex, ' ');
      var newVal=currentVal+''+attrValue;
   }
   element.setAttribute(attribute, newVal);
}

function addStyle(element, styleName, stylevalue){
      
   var currentStyle=element.style.cssText;
   if(currentStyle==''){
    var newStyles=styleName+':'+stylevalue+';';
      }
   else{
     currentStyle=String(currentStyle);
     var styleRegex= new RegExp("(^|;|;\\s*)"+styleName+":.*?(;|$)");
     currentStyle=currentStyle.replace(styleRegex, ';');
     var newStyle=styleName+':'+stylevalue+';';
     var newStyles=currentStyle+'; '+newStyle;
   }
   element.setAttribute('style', newStyles);
   }
function removeStyle(element, styleName){
    var currentStyle=element.style.cssText;
    currentStyle=String(currentStyle);
    var styleRegex = new RegExp("(^|;|;\\s*)"+styleName+":.*?(;|$)");
    var newStyles=currentStyle.replace(styleRegex, ';');   
    element.setAttribute('style', newStyles);
}


function doCssAt(querie, element, rules, selector){
	var headTag = document.getElementsByTagName('head')[0];
	if(typeof(selector)=='undefined'){
		selectorSlug = element.getAttribute('id');
		selector = '#'+selectorSlug;
	}else{
		selectorSlug = selector.slice(1);
	}
	if(selectorSlug != null){
		if(document.getElementById(selectorSlug+'-style') != null){
			headTag.removeChild(document.getElementById(selectorSlug+'-style'));
		}
		
		var newStyle = document.createElement('style');
		newStyle.setAttribute('id', selectorSlug+'-style');
		newStyle.innerHTML = "@media (" + querie + "){"+selector+"{"+rules+";}}";
		document.getElementsByTagName('head')[0].appendChild(newStyle);
	}
}
