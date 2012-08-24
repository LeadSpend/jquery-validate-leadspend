LeadSpend jQuery Validation Plugin
================================

**Please note that while we believe this plugin is stable, this is product is in beta and is still undergoing testing before its official release.**

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

In the following sections, there are two items which refer to HTML elements of
the form being validated:
* "ID_OF_FORM" refers to the ID attribute of the form being validated.
* "EMAIL_FIELD_NAME" refers to the name attribute of the email address field.
	
### Recommended Validation Handling

By default, jQuery Validation is set to re-validate a field each time a keystroke
is detected in that field.  Using this methodology for the LeadSpend rule
doesn't make sense because calls will be made to the API before the email
address has been completely typed.  To prevent this from happening,
we must customize the default onkeyup action.  For an example of this, see [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L10-15)
	
### Recommended Form Submission Handling

While the LeadSpend result is pending, the email address field is considered invalid
even though the address may actually be a good one.  If the user tries to
submit the form before the LeadSpend API call completes, jQuery Validate will
block the form submission.  This is correct behavior, because the field will
still be considered invalid.

LeadSpend provides a method for attempting to automatically re-submit the form
once a valid result is returned.  To utilize this, simply add a function call
to the default invalidHandler as is shown here:  [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L16-19)

Invalid States and Custom Error Messages
----------------------------------------

By default, jQuery Validation places an error message next to each field which has
been filled out incorrectly.  The LeadSpend plugin is no exception, and provides
default messages for each invalid state.  These states are as follows:

* Email Validity Pending: An email address has been sent to the LeadSpend API to be classified, but the result has not been returned yet (our median response time is
500 milliseconds).

* Deny Email Eddress: An email address has been classified by LeadSpend as invalid.
(For more information about our results and what to accept, check out our
[results onesheet](http://leadspend.com/documentation/Results-LeadSpend.pdf).)

These messages may be customized using either a string or a function, by setting
custom parameters for the rule through jQuery Validation.  If a function is used,
the function must accept one parameter and return a string. For an example of
both, see  [demo/js/leadspend.demo.js](https://github.com/LeadSpend/jquery-validate-leadspend/blob/master/demo/js/leadspend.demo.js#L20-37).
	
When a function is used to determine the messae, it is passed a validity object.
For more detailed information about this object, please check out our [API
documentation](http://leadspend.com/documentation/LeadSpend-Validation-API-v2.2d.pdf).  An example in jSON is below:
	
    {
		address: "email.address@provider.com"	//email address you verified
		elapsed_milliseconds: 3695		//elapsed time
		request_timestamp: "2012-08-13T20:31:28.209Z"	//when request was made
		result: "verified"	//LeadSpend result for email validity
	 }