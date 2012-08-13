LeadSpend jQuery Validate Plugin
================================

The LeadSpend jQuery Validate plugin allows for LeadSpend's email validation
to be applied to an online form by creating a custom rule for the existing
jQuery Validate plugin.  

Contents
--------

The included files are as follows:

* jquery.validate.leadspend.js
* demo/index.html
* demo/js/leadspend.jsonp.js
* demo/js/leadspend.custom.tutorial.js
	
### jquery.validate.leadspend.js
The LeadSpend jQuery Validate plugin.  Calling this file is all that is
necessary to add LeadSpend validation as a jQuery Validate rule.

### demo/index.html
Contains a demo form as an example of how to integrate the LeadSpend jQuery
Validate plugin into a form.

### demo/js/leadspend.jsonp.js
This is the file required to make a call to LeadSpend's validation API.

### demo/js/leadspend.custom.tutorial.js
This file contains an example of various customizations for jQuery Validate
integration.

Getting Started
---------------

Before getting started with LeadSpend email validation, you will need to be
set up with an account.  Calls to LeadSpend's API used for this plugin are
authenticated using domain-based authenticaiton, so you will need to contact
info@leadspend.com and request for your development environment to be approved.

Basic integration is very easy.  Simply include the required files, add the css
class "LeadSpendEmail" to the email field you wish to be validated, and call
jQuery Validate on your form.  An example of this is provided in the demo folder,
along with a few recommended customizations.  For more information about the
jQuery Validate plugin, please see http://bassistance.de/jquery-plugins/jquery-plugin-validation/.

Customizing the Plugin
----------------------

There are a number of customizations, configured through the normal jQuery
Validate settings, which may improve your experience using LeadSpend on your
site.  In the following examples, the string "ID_OF_FORM" refers to the ID attribute
of the form being validated and EMAIL_FIELD_NAME refers to the name attribute of the
email address field.

### Custom Error Messages

By default, jQuery Validate places an error message next to each field which has
been filled out incorrectly.  The LeadSpend plugin is no exception, and provides
default messages for each invalid state.  These states are as follows:

* Deny Email Eddress: An email address has been classified by LeadSpend as invalid.  This can mean the address is undeliverable, unreachable, illegitimate, or disposable, and LeadSpend recommends not accepting these addresses.

* Email Validity Pending: An email address has been sent to the LeadSpend API to be classified, but the result has not been returned yet.  Don't worry, we have a response, but sometimes these things take time (our default timeout is 5 seconds).

These may be customized using either a string or a function, by assigning custom
rules to the LeadSpendEmail class of your email field.  If a function is used,
the function must accept one parameter and return a string. The example below is
used in demo/js/leadspend.custom.tutorial.js.

	$("#ID_OF_FORM").validate({
		rules:{
			EMAIL_FIELD_NAME:{
				"LeadSpendEmail":{
					//example of string message
					validityPendingMessage: "Pending...",
					
					//example of function
					denyAddressMessage: function(validity){
						if (typeof validity != "undefined"){
							return "This email address is "+validity.result+". Please use another.";
						}
						return "Invalid address.";
					}
				}
			}
		}
	});
	
When a function is used to determine the messae, it is passed a validity object
which contains the following variables:
	
    {
		address: "email.address@provider.com"	//email address you verified
		elapsed_milliseconds: 3695		//elapsed time
		request_timestamp: "2012-08-13T20:31:28.209Z"	//when request was made
		result: "verified"	//LeadSpend result for email validity
	 }
	 
### Custom onkeyup Validation Handling

By default, jQuery validate is set to re-validate a field each time a keystroke
is detected in that field.  Using this methodology for LeadSpend validation
doesn't make sense, because it will create unnecessary calls to the API before
the email address has been completely typed.  To prevent this from happening,
we must customize the default onkeyup action like so:

	$("#ID_OF_FORM").validate({
		onkeyup: function(element) {
			//prevent onkeyup validiation for specific fields
			if ($(element).attr('name') != $(".LeadSpendEmail").attr("name")) {
				$.validator.defaults.onkeyup.apply(this,arguments);
			}
		}
	});
	
### Optional Form Submission Handling

While the LeadSpend result is pending, the email address field is considered invalid
even though the address a user inputs may actually be valid.  If a user tries to
submit the form before the LeadSpend API call completes, the form will not be sent.
Even though everything is working fine behind the scenes, and the user is told that
the email address is "Validating..." they may still believe that the form is broken.

In order to prevent this, LeadSpend provides a method for automatically re-submitting
the form once the valid result is returned.  This will only occur if every field in
the form is still valid.  To utilize this, simply add a function call to the default
invalidHandler like so:

	$("#ID_OF_FORM").validate({
		invalidHandler: function(form, validator) {
			LeadSpend.invalidHandler(form, validator);
		 }
	});