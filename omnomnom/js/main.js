;(function(e) {
    var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    !matches ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
            return e === th;
        });
    }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);
(function(e){ 
 e.closest = e.closest || function(css){ 
   var node = this;
  
   while (node) { 
      if (node.matches(css)) return node; 
      else node = node.parentElement; 
   } 
   return null; 
 } 
})(Element.prototype);

function fAddClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) return;
  }
  classes.push(cls);
  obj.className = classes.join(' ');
}
function fRemoveClass(obj, cls) {
  var classes = obj.className.split(' ');
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) {
      classes.splice(i, 1);
      i--;
    }
  }
  obj.className = classes.join(' ');
}
function toggleClassCust(el){
  if (el.className.indexOf('disabled') == -1) {
	var cName = arguments.length == 1 ? 'selected' : arguments[1];
	if (el.className.indexOf(cName) > -1) {
		fRemoveClass(el, cName);
	} else {
		fAddClass(el, cName);
	}
  }
}
document.addEventListener("DOMContentLoaded", function(event) {
	var actelements = document.querySelectorAll('.js-selectsticker');
	/**/
	var ri = Math.round(0.5 + Math.random() * (actelements.length)) - 1;
	fAddClass(actelements[ri], 'disabled');
	fAddClass(actelements[ri].previousElementSibling, 'disabled');
	actelements[ri].innerHTML = 'Печалька, ' + actelements[ri].previousElementSibling.querySelector('h2 span').textContent + ' закончился.';
	/* * */
	for (var i = 0; i < actelements.length; i++){
		actelements[i].previousElementSibling.onclick = function(event){
			var sticker = event.target.closest('.sticker')
			toggleClassCust(sticker);
			Array.prototype.forEach.call(sticker.nextElementSibling.getElementsByTagName('span'), function(childspan) {
				toggleClassCust(childspan, 'js-hidden');
			});
		}
		Array.prototype.forEach.call(actelements[i].getElementsByTagName('a'), function(item){
			item.onclick = function(event) {
				event = event || window.event;
				var label = item.closest('label');
				toggleClassCust(label.previousElementSibling);
				Array.prototype.forEach.call(label.getElementsByTagName('span'), function(childspan) {
					toggleClassCust(childspan, 'js-hidden');
				});
				if (event.preventDefault) {
					event.preventDefault();
				} else event.returnValue = false;
			}
		});
	}
	
});