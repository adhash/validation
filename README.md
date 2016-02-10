# Form Validation jQuery Plugin ver.1.0

##### Example:
`$(form_selector).validation({ options });`

##### form_selector: 
`'form', '.form', '#form';`
##### Options:
```js
event        : 'blur' || 'keyup' || 'focus'; //etc.
errorClass   : 'class_name'; //(error message class name)
invalidClass : 'class_name'; //(invalid input class name)
```
##### HTML:
```html
<form>
  <label>Enter Email</label>
  <input type="text" 
         id="email1" 
         data-val="email" 
         data-val-msg="Please enter valid email adress">
  <label>Reapeat Email</label>
  <input type="text" 
         id="email2" 
         data-val-compare="#email1" 
         data-val-msg="Emails don`t match">
</form>
```
Plugin have two usefull methods:
```js
$(form_selector).isvalid(); //(returns true or false)
$(input_selector).validate(); //(validate provide manual validation, usefull when inputs values are being set dynamiclly.) 
```
Plugin have some build in regex patterns but you can provide your own patterns. You can do this in two ways. First way is by external JavScript file custom_patterns.js :
```js
(function($){
	$.fn.custom_patterns = {
	  regex_name: /regex_pattern/,
	}
})(jQuery);
```
and then you can simply use it as shown below:
```html
<form>
  <input type="text" data-valid="regex_name">
</form>
```
remeber to include custom_patterns.js before validation.js. First load patterns then validate:
```html
  ...
  <script src="lib/jquery.min.js"></script>
  <script src="lib/custom_patterns.js"></script>
  <script src="lib/validation.js"></script>
  <script src="js/your_app.js"></script>
 </body>
```
Second way is by putting regex_pattern directly into data-val:
```html
<form>
  <input type="text" data-val="regex_pattern flags"> //e.g. [0-5] i
</form>
```