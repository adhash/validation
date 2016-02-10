# Form Validation jQuery Plugin ver.1.0

##### Example:

```
$(form_selector).validation({ options });
```

##### form_selector: 

```
'form', '.form', '#form';
```

##### Options:

```
event        : 'blur' || 'keyup' || 'focus'; //etc.
errorClass   : 'class_name'; //(error message class name)
invalidClass : 'class_name'; //(invalid input class name)
```

Plugin have two usefull methods:

```
$(form_selector).isvalid(); //(returns true or false)
$(input_selector).validate(); //(validate provide manual validation, usefull when inputs values are set dynamiclly.) 
 ```
 
Plugin have some build in regex patterns but you can provide your own patterns. You can do this in two ways. First way is by external JavScript file custom_patterns.js :  