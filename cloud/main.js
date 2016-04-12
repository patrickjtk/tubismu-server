
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('omset_report_monthly', function(req, res){
	var query = new Parse.Query("Transaksi");
	console.log(req.params.startMonth);
	console.log(req.params.endMonth);
	query.greaterThanOrEqualTo("createdAt", new Date(req.params.startMonth));
	var endMonth = new Date(req.params.endMonth);
	endMonth.setMonth(endMonth.getMonth() + 1);
	query.lessThanOrEqualTo("createdAt", endMonth);
	
  	query.find({
	  success: function(results) {
	  	console.log(results);
	    // alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    

	    console.log(dat);
	    
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

	query.find({
		success: function(results) {
			var dat = [];
			if(results.length > 0){
		    	var date =  results[0].attributes.createdAt.getMonth();
			    var count = 0;
			    for (var i = 0; i < results.length; i++) {
			    	var object = results[i];
					if(date != object.attributes.createdAt.getMonth()){
						console.log("beda");
						dat.push({date: date, count: count});
						date =  results[i].attributes.createdAt.getMonth();
						count = 0;
					}
					console.log(object.attributes.produk.length);
				    for (var j = 0; j < object.attributes.produk.length; j++) {
			      		count  = count + object.attributes.produk[j].harga;
			      	};
			      	if(i+1 == results.length){
			      		dat.push({date: date, count: count});
			      	}
			      // alert(object.id + ' - ' + object.get('playerName'));
			      
			    }
		    }
		  	res.success(dat);
		},
		error: function(error) {
		  res.error(error.message);
		}
	});
});
