/** 
 * jQuery validate integration demo.  This is a demonstration of integrating
 * LeadSpend Email Validation info a form.  For more information about these
 * customizations, please check out the README file found in the root folder.
 */
$(document).ready(function(){
	jQuery.validator.addMethod("LeadSpendEmail",
		function(value) {
			return LeadSpend.getEmailValidity(value);
		},
		function(value, field){
			return LeadSpend.getMessage(field);
		}
	);

	//Bind jQuery Validate to the form
	$("#ID_OF_FORM").validate({
		rules:{
			EMAIL_FIELD_NAME:{
				"LeadSpendEmail":{
					validityPendingMessage: "Validation in progress...",
					denyAddressMessage: function(validity){
						if (typeof validity != "undefined"){
							return "This email address is "+validity.result+". Please use another.";
						}
						return "Invalid address.";
					}
				}
			}
		},
		onkeyup: function(element) {
			//prevent onkeyup validiation for specific fields
			if ($(element).attr('name') != $(".LeadSpendEmail").attr("name")) {
				$.validator.defaults.onkeyup.apply(this,arguments);
			}
		},
		invalidHandler: function(form, validator) {
			LeadSpend.invalidHandler(form, validator);
		 }
	});
}); 