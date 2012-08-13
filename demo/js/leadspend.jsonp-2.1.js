/* LeadSpend Validation Javascript V2.1
 *
 * Dependencies:
 * 	jQuery: https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
 *		jQuery-JSONP: https://github.com/jaubourg/jquery-jsonp
 */

if (typeof LeadSpend == 'undefined') {

   /* Establish namespace for future use */
   var LeadSpend = new function() {
		
      var subdomain = "primary";
		
		/* Expose validation function */
		this.validate = function(emailAddress, timeoutInSeconds, callback) {
			jQuery.jsonp({
				emailAddress: emailAddress,
				url: "https://" + subdomain + ".api.leadspend.com/v2/validity/" + encodeURIComponent(emailAddress) + "?timeout=" + timeoutInSeconds,
				callbackParameter: "callback",
				timeout: timeoutInSeconds * 1000,
				success: function(data, status) { callback(data); },
				error: function(xOptions, textStatus) {
					callback({
						address: xOptions.emailAddress,
						result: "unknown"
					});
				}
			});
		};
	};
}