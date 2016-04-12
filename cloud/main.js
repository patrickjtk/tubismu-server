
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('omset_report_monthly', function(req, res){
	var query = new Parse.Query("Transaksi");
	console.log(req.params.startMonth);
	console.log(req.params.endMonth);
	query.equalTo("objectId", "DZzREmkddM");
	query.find({
		success: function(results) {
		  
		  res.success(req.params);
		},
		error: function(error) {
		  res.error(error.message);
		}
	});
});
