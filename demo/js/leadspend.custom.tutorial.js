/** 
 * jQuery validate integration tutorial.  This is a demonstration of customization that
 * can be done to a form that LeadSpend Email Validation is being used on.  For
 * more information about these customizations, please check out the README file
 * found in the root folder.
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