LeadSpend jQuery Validation Plugin
================================

**Please note that while we believe this plugin is stable, this product is in beta and is still undergoing testing before its official release.**

The LeadSpend jQuery Validation plugin allows for LeadSpend's email validation
to be applied to an online form by adding a custom rule to the existing
jQuery Validate plugin.  With a few caveats, this new rule behaves just like any
other provided by jQuery Validation.  

Getting Started
---------------
The calls to LeadSpend's API used for this plugin are authenticated using domain-
based authentication.  Before getting started with LeadSpend email validation,
email us at info@leadspend.com and we'll get you all set up.

### Form Integration

Integrating jQuery Validation into your form with the LeadSpend rule is
very simple and consists of three steps:
* Include the required files. See [demo/index.html](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/index.html#L7-16).
* Add the class attribute "LeadSpendEmail" to the email field you wish to be validated. See [ demo/index.html](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/index.html#L28-32).
* Initialize jQuery Validation on your form with the jQuery Validation configurations
below. See [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L7-8) for initialization and the [Recommended jQuery Validate Configuration](https://github.com/LeadSpend/jquery-validate-leadspend#recommended-jquery-validate-configuration) section for details.

Recommended jQuery Validation Configuration
-----------------------------------------

The following configurations of jQuery Validation options are highly recommended
to improve the functionality of a form utilizing the LeadSpendEmail rule.  

In the following sections and demo code, there are two items which refer to HTML elements of the form being validated:
* "ID_OF_FORM" refers to the ID attribute of the form being validated.
* "EMAIL_FIELD_NAME" refers to the name attribute of the email address field.
	
### Recommended Validation Handling

In order to prevent jQuery Validate from re-validating the LeadSpendEmail field on each keystroke, we must customize the default onkeyup action.  To do this, pass a custom onkeyup function as part of the jQuery Validation options object:

	onkeyup: function(element) {
		if ($(element).attr('name') != $(".LeadSpendEmail").attr("name")) {
			$.validator.defaults.onkeyup.apply(this,arguments);
		}
	}

See [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L10-15) for an example.
	
### Recommended Form Submission Handling

While the LeadSpend result is pending, submitting your form will be disabled even though the address may actually be a good one.  LeadSpend provides a method for attempting to automatically re-submit the form once a valid result is returned.  To do this,  pass a custom invalidhandler function as part of the jQuery Validation options object:  

	invalidHandler: function(form, validator) {
		LeadSpend.invalidHandler(form, validator);
	}

See [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L16-19) for an example.

Invalid States and Custom Error Messages
----------------------------------------

By default, jQuery Validation places an error message next to each field which has been filled out incorrectly.  The LeadSpendEmail rule provides default messages for each invalid state.  These states are as follows:

* Email Validity Pending: An email address has been sent to the LeadSpend API to be classified, but the result has not been returned yet.

* Deny Email Eddress: An email address has been classified by LeadSpend as invalid.
(For more information about our results and what to accept, check out our
[results onesheet](http://leadspend.com/documentation/Results-LeadSpend.pdf).)

These messages may be customized using either a string or a function, by setting custom parameters for the rule through jQuery Validation.  If a function is used, the function must accept one parameter and return a string. For an example of both, see  [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L20-37).
	
When a function is used to determine the message, it is passed a validity object. For more detailed information about this object, please check out our [API documentation](http://leadspend.com/documentation/LeadSpend-Validation-API-v2.2d.pdf).  An example in jSON is below:
	
    {
		address: "email.address@provider.com"	//email address you verified
		elapsed_milliseconds: 3695		//elapsed time
		request_timestamp: "2012-08-13T20:31:28.209Z"	//when request was made
		result: "verified"	//LeadSpend result for email validity
	 }
