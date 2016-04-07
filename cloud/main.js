
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('omset_report', function(req, res){
	var query = new Parse.Query("Transaksi");
	query.equalTo("objectId", "DZzREmkddM");
	query.find({
		success: function(results) {
		  
		  res.success(results[0].attributes);
		},
		error: function(error) {
		  res.error(error.message);
		}
	});
});
