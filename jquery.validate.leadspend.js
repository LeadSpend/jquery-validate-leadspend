/**
 * LeadSpend jQuery Validate integration V1.0
 *
 * Adds functions to the LeadSpend namespace to aid with integration into jQuery
 * validate.
 *
 *
 * Dependencies:
 * 	LeadSpendValidate.js V2.1
 *		jQuery Validate: http://jzaefferer.github.com/jquery-validation/jquery.validate.js
 *		jQuery
 */

/** 
 * getEmailValidity is a function designed for use with the jQuery Validate
 * plugin as a custom rule.  This function calls the asynchronous
 * LeadSpend.validate function and triggers the event "LeadSpendCallback" when
 * the validity is returned.
 *
 * @param {string} address This is the email address to be verified.
 * @returns {boolean} Returns whether the email address is valid or not, returns
 * false if the LeadSpend result has not yet been returned.
 */
LeadSpend.getEmailValidity = function(address){
	//if the form has not been validated, assume the response is not valid
	if (typeof LeadSpend.allowAddress == 'undefined'){
		//values are added to the LeadSpend namespace to avoid collisions
		LeadSpend.allowAddress = false;
		LeadSpend.lastVerifiedAddress = address;
	}
	//if this email address has not changed, don't make a duplicate call to LS
	else if(LeadSpend.lastVerifiedAddress == address){
		return LeadSpend.allowAddress;
	}
	//if the validity is still pending, the form is not valid
	else if(LeadSpend.validityPending){
		return false;
	}
	
	LeadSpend.validityPending = true;
	LeadSpend.lastVerifiedAddress = address;
	timeout = 5;
	
	//call the LeadSpend validate function with a custom callback
	LeadSpend.validate(address, timeout, function(validity){
		LeadSpend.validity = validity;
		LeadSpend.allowAddress = validity.result == "unknown" || validity.result == "verified";
		
		LeadSpend.validityPending = false;
		
		//now that the result has been obtained, revalidate the field
		LeadSpend.reValidate();
	});
	return false;
}


/** 
 * getEmailValidity is a function designed for use with the jQuery Validate
 * plugin as part of a custom invalidHandler.  If this user has pressed submit
 * while the email address was being validated, this is stored as
 * LeadSpend.submitAttempted.
 *
 * @param {form} form This is the form object used by jQuery
 * validate.
 * @param {validator} validator This is the validator object used by jQuery
 * validate.
 * 
 */
LeadSpend.invalidHandler = function(form, validator){
	LeadSpend.validator = validator;
	LeadSpend.formID = form.target.id;
	var errors = validator.numberOfInvalids();

	if (errors == 1 && LeadSpend.validityPending){
		LeadSpend.submitAttempted = true;
	}
}


/** 
 * reValidate is triggered after the email result has been returned, and is
 * used to update the validity of the email field.
 * 
 */
LeadSpend.reValidate = function(){
	$("form").validate().element(".LeadSpendEmail");

	//submit the form if a submit was previously blocked by a validating email
	if (LeadSpend.submitAttempted && LeadSpend.validator.numberOfInvalids() == 0){
		document.forms[LeadSpend.formID].submit.click();
	}
	
	//otherwise they have made the form invalid since pressing submit, so they
	//need to keep changing stuff
	else if (LeadSpend.validator.numberOfInvalids >= 1){
		LeadSpend.submitAttempted = false;
	}
}


/** 
 * setMessages is used to set custom messages for the two possible error
 * messages that can be returned by LeadSpend: one for validiation in progress,
 * and one for an invalid email.
 * 
 */
LeadSpend.setEmailMessages = function(field){
	lsRules = $("form").validate().settings.rules[field.name].LeadSpendEmail;
	
	//set default LeadSpend messages for various stages of invalid addresses
	if(typeof lsRules.validityPendingMessage == "string"){
		LeadSpend.validityPendingMessage = lsRules.validityPendingMessage;
	}
	else if(typeof lsRules.validityPendingMessage == "function"){
		LeadSpend.validityPendingMessage = messages.validityPending(LeadSpend.validity);
	}
	else{
		LeadSpend.validityPendingMessage = "Validating...";
	}
	
	if(typeof lsRules.denyAddressMessage == "string"){
		LeadSpend.denyAddressMessage = lsRules.denyAddressMessage;
	}
	else if(typeof lsRules.denyAddressMessage == "function"){
		LeadSpend.denyAddressMessage = lsRules.denyAddressMessage(LeadSpend.validity);
	}
	else{
		LeadSpend.denyAddressMessage = LeadSpend.defaultDenyAddressMessage(LeadSpend.validity);
	}
}

LeadSpend.defaultDenyAddressMessage = function(validity){
	if (typeof validity != "undefined"){
		return "Email address is "+validity.result+".";
	}
	return "Invalid address.";
}


/** 
 * getMessage is a function designed for use with the jQuery Validate
 * plugin as part of a custom message function.  Returns a custom error message
 * for the two possible error conditions: email validation pending and invalid
 * email address.
 * 
 */
LeadSpend.getMessage = function(field){
	LeadSpend.setEmailMessages(field);
	
	//return the appropriate message for the current state
	if (LeadSpend.validityPending){
		return LeadSpend.validityPendingMessage;
	}
	else{
		return LeadSpend.denyAddressMessage;
	}
}

