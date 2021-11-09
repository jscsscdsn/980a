// JavaScript Document
var system = {
	'score': {//评分
		'raty': function(){
			if( $('.ff-score').length ){
				$.ajaxSetup({ 
					cache: true 
				});
				$("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//lib.baomitu.com/raty/2.7.1/jquery.raty.min.css"}).appendTo("head");
				//
				$.getScript("//lib.baomitu.com/raty/2.7.1/jquery.raty.min.js", function(response, status) {
					$(".ff-score").each(function(i){
						$(".ff-score").eq(i).find('.ff-score-raty').raty({ 
							starType: 'i',
							number: 5,
							numberMax : 5,
							half: true,
							score : function(){
								return $(this).attr('data-score');
							},
							click: function(score, evt) {
								 
								$this = $(this);
								$.ajax({
									type: 'get',
									url: maccms.path+'/index.php/ajax/score?mid='+$(this).attr('data-module')+'&id='+$(this).attr('data-id')+'&score='+(score),
									timeout: 5000,
									dataType:'json',
									error: function(){
										$this.attr('title', '网络异常！').tooltip('show');
									},
									success: function(json){
										if(json.code==1){
											console.log(json.data.score) 
											$('#ff-score-val').html(json.data.score);
										}else{
											$this.attr('title', json.msg).tooltip('show');
										}
										 
									}
								});
							}
						});					
					});
				});
			}
		}
	},
	'lazyload': function(){//延迟加载
		console.log('lazyload')
		$.ajaxSetup({
			cache: true
		});
         
			$("img.ff-img").lazyload({
				placeholder : maccms.path_tpl+"/images/no.jpg",
				effect : "fadeIn",
				failurelimit: 15
				//threshold : 400
				//skip_invisible : false
				//container: $(".carousel-inner"),
			}); 
		 
	},
	'playurl': {//播放地址
		'more':function(){//...效果
			$('.ff-playurl').each(function(i){
				$this = $(this);
				$config = $this.attr('data-more')*1;
				$max = $this.find('li a').size();
				if(($config+2) < $max && $config>0){
					$max_html = $($this.find('li:last').prop("outerHTML")).find('a').attr('href','#all').html('全部...');
					$max_html = '<li class="'+$this.find('li').attr('class')+'">'+$max_html.prop("outerHTML")+'</li>';
					$this.find('li').each(function(n){
						if(n+1 > $config){
							$(this).hide();
						}
					});
					$this.find('li').eq($config).after($max_html);
					$this.find('li:last').show();
				}
			});
			//more点击
			$('.ff-playurl').on('click', 'a', function(e){
				if($(this).attr('href') == '#all'){
					$(this).parent().parent().find('li').show();
					$(this).parent().remove();
					return false;
				}
			});
		},
	},
	
}
$(document).ready(function(){
 system.lazyload();
 system.score.raty();
 system.playurl.more();
});