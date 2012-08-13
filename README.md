LeadSpend jQuery Validate Plugin
================================

The LeadSpend jQuery Validate plugin allows for LeadSpend's email validation
to be applied to an online form by creating a custom rule for the existing
jQuery Validate plugin.  

Contents
--------

The included files are as follows:

	jquery.validate.leadspend.js
	demo/index.html
	demo/js/leadspend.jsonp.js
	demo/js/leadspend.custom.tutorial.js
	
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
site.

### Custom Error Messages

By default, jQuery Validate places an error message next to each field which has
been filled out incorrectly.  The LeadSpend plugin is no exception, and provides
default messages for each invalid state.  These states are as follows:

	Invalid Email Eddress: An email address has been classified by LeadSpend as
	invalid.  This can mean the address is undeliverable, unreachable, illegitimate,
	or disposable, and LeadSpend recommends not accepting these addresses.
	
	Email Validity Pending: An email address has been sent to the LeadSpend API to
	be classified, but the result has not been returned yet.  Don't worry, we have
	a response, but sometimes these things take time (our default timeout is 5
	seconds).

These may be customized using either a string or a function, by assigning custom
rules to the LeadSpendEmail class of your email field.  This is 
