
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('omset_report_monthly', function(req, res){
	var query = new Parse.Query("LamasysTransaksi");
	console.log(req.params.startMonth);
	console.log(req.params.endMonth);
	query.greaterThanOrEqualTo("createdAt", new Date(req.params.startMonth));
	var endMonth = new Date(req.params.endMonth);
	endMonth.setMonth(endMonth.getMonth() + 1);
	query.lessThanOrEqualTo("createdAt", endMonth);

	query.find({
		success: function(results) {
			// console.log(results);
			var dateString = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
				"Juli", "Agustus", "September", "Oktober", "November", "Desember"];
			var dat = [];
			if(results.length > 0){
		    	var date =  results[0].get("createdAt").getMonth();
			    var count = 0;
			    for (var i = 0; i < results.length; i++) {
			    	var object = results[i];
					if(date != object.get("createdAt").getMonth()){
						console.log("push");
						dat.push({date: dateString[date], count: count});
						date =  object.get("createdAt").getMonth();
						count = 0;
					}
					count  = count + object.get("total");
				    
			      	if(i+1 == results.length){
			      		console.log("push end");
			      		dat.push({date: dateString[date], count: count});
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

Parse.Cloud.define('produk_report_monthly', function(req, res){
	var query = new Parse.Query("LamasysTransaksiDetil");
	console.log(req.params.startMonth);
	console.log(req.params.endMonth);
	query.greaterThanOrEqualTo("createdAt", new Date(req.params.startMonth));
	var endMonth = new Date(req.params.endMonth);
	endMonth.setMonth(endMonth.getDate() + 1);
	query.lessThanOrEqualTo("createdAt", endMonth);
	query.include("Produk");
	query.ascending("produkName");
	query.find({
		success: function(results) {

			if(results.length > 0){
				var dat = [];
				var count = 0;
				var produk = results[0].get("Produk").get("namaProduk");
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					
					if(produk != object.get("Produk").get("namaProduk")){
						console.log("push");
						dat.push({date: date, count: count});
						produk =  results[i].get("Produk").get("namaProduk");
						count = 0;
					} else{
						count = count + 1;
					}
					if(i+1 == results.length){
			      		console.log("push end");
			      		dat.push({produkName: produk, qty: count});
			      	}
				}
			}
			res.success(dat);
		},
		error: function(error) {
		  res.error(error.message);
		}
	});
})
