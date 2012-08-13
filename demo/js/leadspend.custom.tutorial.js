/** 
 * jQuery validate integration.  You should only need to add the class
 * "LeadSpendEmail" to the field you wish to perform validation on and 
 * edit the following values:
 *
 *		LeadSpend.setMessages may be used to set custom error messages to be
 *		displayed while the validation is pending and when an address is
 *		undeliverable.  Either or both may be uncommented and edited.
 *
 * 	The variable EMAIL_FIELD_NAME should be changed to the name attribute of
 * 	the field you wish to perform LeadSpend email validation on.
 * 	
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
					validityPendingMessage: "Pending...",
					denyAddressMessage: function(validity){
						if (typeof validity != "undefined"){
							return "Email address is "+validity.result+".";
						}
						return "Invalid address.";
					}
				}
			}
		},
		//override the default onkeyup action
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