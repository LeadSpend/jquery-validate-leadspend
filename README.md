LeadSpend jQuery Validate Plugin
================================

The LeadSpend jQuery Validate plugin allows for LeadSpend's email validation
to be applied to an online form by adding a custom rule for the existing
jQuery Validate plugin.  With a few caveats, his new rule behaves just like any
other provided by jQuery Validate.  

Getting Started
---------------
Calls to LeadSpend's API used for this plugin are authenticated using domain-
based authenticaiton.  Before getting started with LeadSpend email validation,
info@leadspend.com and we'll get you all set up.

### Form Integration

Integrating jQuery Validate into your form with the LeadSpend validate rule is
very simple and consists of three steps:
* Include the required files. See [demo/index.html](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/index.html#L7-19).
* Add the class attribute "LeadSpendEmail" to the email field you wish to be validated. See [ demo/index.html](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/index.html#L29-33).
* Initialize jQuery Validate on your form with the recommended configurations below. See [demo/js/leadspend](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.custom.tutorial.js#L1-41) for initialization and [Recommended Configuration](https://github.com/LeadSpend/jquery-validate-leadspend/edit/master/README.md#recommended-validation-handling) for configuration details.

Recommended jQuery Validate Configuration
-----------------------------------------

The following are recommended configurations which will improve your experience using
the LeadSpendEmail rule.  In the following sections, there are two items which
refer to HTML elements of the form being validated:
* ID_OF_FORM refers to the ID attribute of the form being validated.
* EMAIL_FIELD_NAME refers to the name attribute of the email address field.
	
### Recommended Validation Handling

By default, jQuery validate is set to re-validate a field each time a keystroke
is detected in that field.  Using this methodology for LeadSpend validation
doesn't make sense because it will make calls to the API before the email
address has been completely typed.  To prevent this from happening,
we must customize the default onkeyup action.  For an example of this, see [demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.custom.tutorial.js#L31-36)
	
### Recommended Form Submission Handling

While the LeadSpend result is pending, the email address field is considered invalid
even though the address may actually be a good one.  If a user tries to
submit the form before the LeadSpend API call completes, the form will not be sent.

LeadSpend provides a method for attempting to automatically re-submit the form
once a valid result is returned.  To utilize this, simply add a function call
to the default invalidHandler as is shown in lines X-Z in demo/custom [demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.custom.tutorial.js#L31-36)

Invalid States and Custom Error Messages
----------------------------------------

By default, jQuery Validate places an error message next to each field which has
been filled out incorrectly.  The LeadSpend plugin is no exception, and provides
default messages for each invalid state.  These states are as follows:

* Deny Email Eddress: An email address has been classified by LeadSpend as invalid.  This can mean the address is undeliverable, unreachable, illegitimate, or disposable and LeadSpend recommends not accepting these addresses.

* Email Validity Pending: An email address has been sent to the LeadSpend API to be classified, but the result has not been returned yet.  Don't worry, we'll have a response, but sometimes these things take time (our default timeout is 5 seconds).

These messages may be customized using either a string or a function, by assigning custom
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