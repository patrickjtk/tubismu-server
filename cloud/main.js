
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('omset_report_monthly', function(req, res){
	var query = new Parse.Query("Transaksi");
	console.log(req.param.startMonth);
	console.log(req.param.endMonth);
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
