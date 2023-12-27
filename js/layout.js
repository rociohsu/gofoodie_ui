// JavaScript Document
$(function(){

	//searchbar click
	$('.select_sort').change(function () {
		var option_val = "";
		$('.select_sort option:selected').each(function() {
			option_val += $( this ).val() + " ";
		});
		$('.searchbar .searchbar_box > div').hide();
		$('.searchbar .searchbar_box .'+option_val).show();
	}).change();
	  
	//search input focus
	$('.search_location .search_text').focus(function(){
		$('.autocomplete.search_focus').slideDown();
	});
	$('.search_location .search_text').blur(function(){
		$('.autocomplete.search_focus').slideUp();
	});
	//gps
	$('.search_location .gps_btn').click(function(){
		$('.search_location .icon-gps').hide();
		$('.search_location .loader').show();
		$('.autocomplete.gps_click').slideDown();
	});
	
	//會員資料設定
	//刪除地址
	$('.userdata .address .delete').click(function(){
		var id = $(this).closest('.address').find('input[type="radio"]').attr('id');
		var address = $(this).closest('.address').find('.flex_center span').html();
		$('#alert ul li:eq(0) span').attr('class',id).html(address);
	});

	$('#alert .btn.submit').click(function(){
		var id = $('#alert ul li:eq(0) span').attr('class');
		$('#'+id).closest('.address').remove();
	});

	//計算輸入框的字數
	if( $('.userdata_edit').length > 0 ){
        var n = $('.userdata_edit .text_box').length;
        for(i=0;i++;i<n){
            var limit_num = $('.userdata_edit .text_box:eq('+i+') input').not(':disabled').val().length;
            $('.userdata_edit .limit_num:eq('+i+') i').text(limit_num);
        }
	}
	$('.userdata_edit .text_box input').not(':disabled').keyup(function(){
		limit_num = $(this).val().length;
        $(this).closest('.text_box').prev('.limit_num').find('i').text(limit_num);
	});

	//清除輸入框內容
	$('.userdata_edit .text_box button').click(function(){
		$(this).closest('.text_box').find('input').not(':disabled').val('');
		$(this).closest('.text_box').prev('.limit_num').find('i').text(0);
	});
    
    //發送簡訊認證
    $('.userdata_edit .send').click(function(){
		$(this).hide();
        $('.userdata_edit .sent').show();
        $('.userdata_edit .verify').show();
	});
    
    //banner plugin
	if( $('.banner').length > 0 ){
		$.fn.shuffle = function(){
			var allElems = this.get(),
					getRandom = function(max) {
							return Math.floor(Math.random() * max);
					},
					shuffled = $.map(allElems, function(){
							var random = getRandom(allElems.length),
									randEl = $(allElems[random]).clone(true)[0];
							allElems.splice(random, 1);
							return randEl;
				 });
			this.each(function(i){
					$(this).replaceWith($(shuffled[i]));
			});
			return $(shuffled);
		};

		var owl = $('.banner');

		//讓banner random
		/* owl.on('initialize.owl.carousel', function(e) {
			owl.children().shuffle();
		}); */
		owl.owlCarousel({            
			items: 1,
			margin: 0,
			loop: false,
			lazyLoad: false,
			autoHeight: true,
			autoplay : true,
			autoplayHoverPause: true,
			autoplayTimeout: 5000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: true
		});	
	}

	//店家封面多圖輪播
	if( $('.store_img').length > 0 ){
		//顯示當前數字和總數
		var owl = $('.store_img');
		owl.on('changed.owl.carousel', function(e) {
			if (!e.namespace)  {
				return;
			}
			var carousel = e.relatedTarget;
			$('.store_img_num').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
		});

		owl.owlCarousel({            
			items: 1,
			margin: 0,
			loop: false,
			lazyLoad: false,
			autoHeight: false,
			autoplay : true,
			autoplayHoverPause: true,
			autoplayTimeout: 5000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: false
		});
	}
    
    //訂單進度定點在當前狀態
    if( $('.order_status').length > 0 ){
        var width = $(document).width()/3;
        var position = $('.order_status > span.active').position();
        $('.order_status').scrollLeft( position.left - width );
	}

	//商品目錄頁呈現方式
	if( $('.product').length > 0 ){
		//分類選單滑動到分類商品
		$('nav.category a').click(function(){
			var categoryID = $(this).attr('href').split("#")[1];
			$('html,body').animate({
				scrollTop: $('#'+categoryID).offset().top-100 //-100高度才不會擋到分類標題
			},300);
			return false;
		});

		//頁面捲動自動做分類選單切換效果
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop() + $(window).outerHeight()/2; //加上視窗一半高度, 使用上比較順
			var categoryTotal = $('.product .product_list').length; //總共有多少商品分類
			for(i=0;i<categoryTotal;i++){
				//分類選單抓距離和寬度
				var categoryLeft = $('nav.category a').eq(i).position().left;
				var categoryWidth = $('nav.category a').eq(i).width();
				
				//商品分類抓相對距離, 去切換選單當前是哪個分類
				var categoryTop = $('.product .product_list').eq(i).offset().top;
				if( scrollTop > categoryTop ){
					$('nav.category a').removeClass('current');
					$('nav.category a').eq(i).addClass('current');
					$('nav.category .container').scrollLeft(categoryLeft - categoryWidth);
				}
			}
		});
	}

	//商品詳情頁多圖輪播
	if( $('.product_img').length > 0 ){
		//顯示當前數字和總數
		var owl = $('.product_img');
		owl.on('changed.owl.carousel', function(e) {
			if (!e.namespace)  {
				return;
			}
			var carousel = e.relatedTarget;
			$('.product_img_num').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
		});

		owl.owlCarousel({            
			items: 1,
			margin: 0,
			loop: false,
			lazyLoad: false,
			autoHeight: false,
			autoplay : false,
			nav: false
		});
	}

	//點＋選購彈出商品規格
	$('.add[href="#product_select"]').click(function(){
		$('#product_select').show(0,function(){
			$('#product_select .mask').fadeIn(300);
			$('#product_select .click_area').slideDown(300);
		});
		return false;
	});

	//關閉商品規格視窗
	$('#product_select .mask, #product_select .close').click(function(){
		$('#product_select .mask').fadeOut(300);
		$('#product_select .click_area').slideUp(300,function(){
			$('#product_select').hide(0);
		});
	});

	//揪團明細開關
	$('.order_detail .title .open-btn').click(function(){
		$(this).hide();
		$(this).next('.close-btn').show();
		$('.groupbuy_list .order_detail_list').show();
	});
	$('.order_detail .title .close-btn').click(function(){
		$(this).hide();
		$(this).prev('.open-btn').show();
		$('.groupbuy_list .order_detail_list').hide();
	});
	$('.groupbuy_list .member_order').click(function(){
		$(this).next('.order_detail_list').toggle();
	});
});

