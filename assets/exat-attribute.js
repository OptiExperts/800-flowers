exat_startAttribute();
function exat_startAttribute() {
	if (exat_page == "cart") {
		pifyJquery(document).ready(function() {
			if (pifyJquery(".exat-adjust-price").length > 0) {
				var b = "input[name='checkout'], input[value='Checkout'], button[name='checkout'], [href$='checkout'], button[value='Checkout'],button[type='submit']";
				var a = false;
				pifyJquery(document).on("click", b,
				function(i) {
					pifyJquery.ajaxSettings.async = false;
					var d = pifyJquery(this);
					if (!a) {
						if (pifyJquery(".exat-attribute").parents("form").valid()) {
							i.preventDefault();
							var h = [];
							pifyJquery(".exat-attribute select").each(function(k, l) {
								var j = pifyJquery(l).find("option:selected");
								if (j != undefined) {
									if (j.val() != "" && j.attr("is-adjust-price") == "true") {
										var e = j.attr("variant-id");
										h.push(e)
									}
								}
							});
							pifyJquery(".exat-attribute .adjust-price-radio").each(function(j, k) {
								if (pifyJquery(this).is(":checked")) {
									var e = pifyJquery(this).attr("variant-id");
									h.push(e)
								}
							});
							pifyJquery(".exat-attribute .adjust-price-checkbox").each(function(j, k) {
								if (pifyJquery(this).is(":checked")) {
									var e = pifyJquery(this).attr("variant-id");
									h.push(e)
								}
							});
							var c = [];
							pifyJquery.get("/cart.js",
							function(e) {
								pifyJquery(e.items).each(function(j, k) {
									if (k.vendor == "Pifyapp") {
										c.push(k.variant_id)
									}
								})
							},
							"json");
							if (h.length > 0) {
								var f = "";
								pifyJquery(c).each(function(e, j) {
									f = f + "updates[" + j + "]=0&"
								});
								if (f.length > 0) {
									f = f.substr(0, f.length - 1)
								}
								pifyJquery.post("/cart/update.js", f);
								var g = "";
								pifyJquery(h).each(function(e, j) {
									g = g + "updates[" + j + "]=1&"
								});
								if (g.length > 0) {
									g = g.substr(0, g.length - 1)
								}
								pifyJquery.post("/cart/update.js", g,
								function(e) {
									a = true;
									d.click()
								})
							} else {
								a = true;
								d.click()
							}
						}
					}
				})
			}
		})
	}
	if (exat_page == "cart" || exat_page == "register") {
		pifyJquery(document).ready(function() {
			pifyJquery(".exat-attribute").parents("form").validate({
				ignore: ":not(.exat-attribute select, .exat-attribute input,.exat-attribute textarea)"
			});
			pifyJquery("#RegisterForm").validate();
			pifyJquery(".exat-datepicker").datepicker({
				dateFormat: "yy/mm/dd",
				changeMonth: true,
				changeYear: true,
				yearRange: "c-70:c+10",
			});
			if (pifyJquery(".exat-attribute").length > 0) {
				pifyJquery.ajax({
					url: "https://customized-attribute.pifyapp.com/api/pricing/check_available?shop=" + pify_shop,
					dataType: "json",
					success: function(a) {
						if (! (a.code == 1)) {
							pifyJquery(".exat-attribute").find("input").attr("disabled", "disabled");
							pifyJquery(".exat-attribute").find("textarea").attr("disabled", "disabled");
							pifyJquery(".exat-attribute").find("select").attr("disabled", "disabled");
							pifyJquery(".exat-attribute").find("input").css("background-color", "#dedede");
							pifyJquery(".exat-attribute").find("textarea").css("background-color", "#dedede");
							pifyJquery(".exat-attribute").find("select").css("background-color", "#dedede")
						}
					},
				})
			}
          
          pifyJquery.ajaxSetup({
          async:false
          });
          pifyJquery(".checkout-button").click(function(e){
            
        // pifyJquery(".exat-attribute input").each(function(i,input){
        // switch(pifyJquery(this).attr("type")){
        // case "text":
        // jQuery.post(window.Shopify.routes.root + 'cart/update.js', pifyJquery(input).attr("name")+"="+escape(pifyJquery(input).val()));
        // break;
        // case "radio":
        // jQuery.post(window.Shopify.routes.root + 'cart/update.js', pifyJquery(input).attr("name")+"="+escape(pifyJquery('input[name="'+pifyJquery(input).attr("name")+'"]:checked').val()));
        // break;
        // }
        
        // });
        
        pifyJquery(".exat-attribute textarea").each(function(i,tt){
            if(pifyJquery(tt).attr("required")!=undefined&&pifyJquery(tt).val()==""){
              alert('Please input the required field.');
              e.preventDefault();
              return;
            }

           jQuery.post(window.Shopify.routes.root + 'cart/update.js', pifyJquery(tt).attr("name")+"="+escape(pifyJquery(tt).val().replace(/\“/g,"'").replace(/\”/g,"'").replace(/\"/g,"'")));
        });
            

           });
          pifyJquery(".exat-attribute textarea").change(function(){
           jQuery.post(window.Shopify.routes.root + 'cart/update.js', pifyJquery(this).attr("name")+"="+escape(pifyJquery(this).val().replace(/\“/g,"'").replace(/\”/g,"'").replace(/\"/g,"'")));
          });
		})
	} else {
		if (exat_page == "account") {
			pifyJquery(document).ready(function() {
				var a = pifyJquery("#exat_account_attribute_wrap");
				var d = a.attr("shop");
				var c = a.attr("customer-id");
				var e = "<h4>Additional</h4>";
				var b = "<ul>{items}</ul>";
				pifyJquery.ajax({
					url: "https://customized-attribute.pifyapp.com/api/customer/note/list?shop=" + d + "&customerId=" + c,
					dataType: "json",
					success: function(i) {
						console.log(i);
						var f = "";
						var h = "<li>{itemContent}</li>";
						if (i != null && i.length > 0) {
							for (var g = 0; g < i.length; g++) {
								f = f + h.replace("{itemContent}", i[g].key + " : " + i[g].value)
							}
							b = b.replace("{items}", f);
							a.html(e + "\n" + b)
						}
					},
				})
			})
		}
	}
}
function exat_fun_checkbox(d, e) {
	var c = "";
	var a = document.getElementsByName(d);
	for (var b = 0; b < a.length; b++) {
		if (a[b].checked) {
			c = c + a[b].value + ","
		}
	}
	if (c.length > 0) {
		c = c.substr(0, c.length - 1)
	}
	document.getElementById(e).value = c
};