var animationSpeed				= 700
var iindevCustomScroller_Easing = 'linear'
var	$thepopUpBox 				= ''
var $overlay					= ''

;(function($){
	$(function(){ // Starting Document Ready

		/************* CODE FOR INPUT EFFECTS  ********/
		$('input:text').focus(function(){
			if(this.value==this.defaultValue){this.value=''}
		})
		$('input:text').blur(function(){
			if(!this.value){this.value=this.defaultValue;}
		})
		$('input:password').focus(function(){
			if(this.value==this.defaultValue){this.value=''}
		})
		$('input:password').blur(function(){
			if(!this.value){this.value=this.defaultValue;}
		})
		$('textarea').focus(function(){
			if(this.value==this.defaultValue){this.value=''}
		})
		$('textarea').blur(function(){
			if(!this.value){this.value=this.defaultValue;}
		})
		/************* END CODE FOR INPUT EFFECTS  ********/
		$('head').append('<!--[if IE 8]><style>.customDropdown ul{background:#bbb8af}</style><![endif]-->')
		$('.main-nav > ul > li > ul').append('<li class="last"><img src="images/main-nav-dropdown-btm.png" alt="" /></li>')
		$('.main-nav > ul > li').mouseenter(function(){
			$(this).addClass('dropdown')
		})
		$('.main-nav > ul > li').mouseleave(function(){
			$(this).removeClass('dropdown')
		})
		// End main navigation rollover for dropdown
		
		$('.international > ul').hide()
		$('.international').mouseenter(function(){
			$(this).find('ul').show()
			$(this).addClass('international-dropbox')
		})
		$('.international').mouseleave(function(){
			$(this).find('ul').hide()
			$(this).removeClass('international-dropbox')
		})
		// End footer international rollover for dropdown
		 
		// Home page footer slider
		iindevSlideShowInit()
		
		// custom selects
		findAndInitCustomSelects()
		
		// custom checkbox
		iindevStyledCheckBox()
		
		$('div.dropdown-options').each(function(i){
			$(this).css({ 'zIndex' : 9999 - i })
		})
		
		/* dynamic-vertical-centered-image */
		$('img.dynamic-vertical-centered-image').each(function(i){
			$(this).css({'top':  ( Math.round( $('div.vertical-centered-image-parent').eq(i).height() / 2 ) - ( $(this).height() / 2) + 1 ) })
		})
		/* End dynamic-vertical-centered-image */
		
		/* PopUp box show hide Begin */
		jQuery('body').append('<div id="overlay_layer"></div>')// Creat the overlay_layer div
		$overlay = $('#overlay_layer')
		
		$overlay.animate({opacity:'hide'}, 0)// Initialy hiding the mask
		
		$('.modal-container').each(function(){
			$(this).css({'left' : 0}).animate({opacity:'hide'}, 0)// Initialy hiding the popup box
		})
		
		$('#pay-btn').click(function(e){
			e.preventDefault()
			showAndHidepopupBox('#popup-box')
		})// END PAY BTN CLICK
		$('#next-btn').click(function(){
			$('#overlay_layer').animate( {opacity:'hide'}, animationSpeed )
			$('#popup-box').animate( {opacity:'hide'}, animationSpeed )
		})// END SUCCESFUL POPUP NEXT BTN CLICK
		
		$('#employer-references-edit-btn').click(function(e){
			e.preventDefault()
			showAndHidepopupBox('#popup-box')
		})// END EMPLOYER REFERENCES EDIT BTN CLICK
		
		$('#curriculam-vitae-tab').click(function(e){
			e.preventDefault()
			showAndHidepopupBox('#cv-tab-popup-box')
		})// END CURRICULAM VITAE TAB CLICK
		
		$('a.close-popup').each(function(){
			$(this).click(function(e){
				e.preventDefault()
				$('#overlay_layer').animate( {opacity:'hide'}, animationSpeed )
				$('#cv-tab-popup-box').animate( {opacity:'hide'}, animationSpeed )
				$('#popup-box').animate( {opacity:'hide'}, animationSpeed )
			})
		})
		
		/* PopUp box show hide End */
		 
		// HELP BUTTON MOUSE FUNCTIONS 
		$('div.help-popup').css({ left:'auto' , right:'26px'})
		$('#help-btn').parent().find('div.help-popup').hide()
		$('#help-btn').mouseenter(function(){
			$(this).parent().find('div.help-popup').show()
		})
		$('#help-btn').mouseleave(function(){
			$(this).parent().find('div.help-popup').hide()
		})
		$('#help-btn').click(function(e){
			e.preventDefault()
		})// HELP BUTTON MOUSE FUNCTIONS END
		 
	})// END OF DOCUMENT READY FUNCTION

	$(window).load(function(){ // Starting Window load
		
		/* Code for iindev-custom-scroller */
		iindevCustomScroller_Easing = 'easeOutSine'
		
		$('div.iindev-custom-scroller').each(function(){
			$(this).wrapInner('<div class="iindev-custom-scroller-inner-wrap"></div>')
			var $innerWrapperPointer	=  $(this).find('div.iindev-custom-scroller-inner-wrap')
			$innerWrapperPointer.width( $(this).width() )
			$innerWrapperPointer.data( 'scrollableHeight' , ( $innerWrapperPointer.height() - $(this).height() < 0 ? 0 : $innerWrapperPointer.height() - $(this).height() ) )
			$innerWrapperPointer.data( 'presentPosition' , 0 )
		})
		
		$('a.down-scroller').each(function(){
			// Prevent the default behaviour
			$(this).click(function(e){e.preventDefault()})
			
			$(this).mouseenter(function(){
				var $thisScrollingDiv = $(this).parents('div.iindev-custom-scroller-topmost-wrap').find('div.iindev-custom-scroller-inner-wrap')
				$thisScrollingDiv.animate({'top' : -$thisScrollingDiv.data('scrollableHeight')}, ( ( $thisScrollingDiv.data('scrollableHeight') +  $thisScrollingDiv.data( 'presentPosition') ) * 6 ), iindevCustomScroller_Easing )
			})
			$(this).mouseleave(function(){
				var $thisScrollingDiv = $(this).parents('div.iindev-custom-scroller-topmost-wrap').find('div.iindev-custom-scroller-inner-wrap')
				$thisScrollingDiv.stop(true, false)
				$thisScrollingDiv.data( 'presentPosition' , parseInt( $thisScrollingDiv.css('top') ) )
			})
		})
		
		$('a.up-scroller').each(function(){
			
			$(this).click(function(e){e.preventDefault()})
			
			$(this).mouseenter(function(){
				var $thisScrollingDiv = $(this).parents('div.iindev-custom-scroller-topmost-wrap').find('div.iindev-custom-scroller-inner-wrap')
				$thisScrollingDiv.animate({'top' : 0}, Math.abs( $thisScrollingDiv.data( 'presentPosition')  * 6 ), iindevCustomScroller_Easing )
			})
			
			$(this).mouseleave(function(){
				var $thisScrollingDiv = $(this).parents('div.iindev-custom-scroller-topmost-wrap').find('div.iindev-custom-scroller-inner-wrap')
				$thisScrollingDiv.stop(true, false)
				$thisScrollingDiv.data( 'presentPosition' , parseInt( $thisScrollingDiv.css('top') ) )
			})
			
		})
		/* Ending iindev-custom-scroller */

	}) // Ending Window load

})(jQuery)

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/****** CUSTOM SELECTS *******/
/**** PLEASE DO NOT EDIT *****/

var customSelectOpened				= false
var $toBeReplacedWithCustomDropdown	= false

function findAndInitCustomSelects(){
	$toBeReplacedWithCustomDropdown = jQuery('select.toBeReplacedWithCustomDropdown')
	if($toBeReplacedWithCustomDropdown.length){
		$toBeReplacedWithCustomDropdown.each(function(i){
			handleCustomSelectIssues( jQuery(this), i );
		})
		
		jQuery('body').click(function(){
			if (customSelectOpened){
				jQuery('.customDropdown ul').css({'left':'-999999px','right':'auto'}).removeClass('opened')
				customSelectOpened = false
			}
		})
	}
} // Ending function findAndInitCustomSelects()

function handleCustomSelectIssues( $customSelectInput, customInputItemNo){
	var selectOptions = ''
	$customSelectInput.find('option').each(function(i){
		selectOptions+='<li'+ ((jQuery(this).attr('selected') == true ) ? ' class="selected"' : '') +'>'+jQuery(this).text()+'</li>'
	})
	
	$customSelectInput.css({'visibility':'hidden', 'position':'absolute', 'left':'-999999px', 'top':'0'})
	$customSelectInput.after('<div class="customDropdown"><div class="ul-head"><span>'+jQuery('select.toBeReplacedWithCustomDropdown:eq('+customInputItemNo+') option:selected').text()+'</span><div class="customDropdownArrow"></div></div>'+((selectOptions != '') ? ('<ul class="dropdown-ul">'+selectOptions+'</ul>') : '')+'</div>')
	
	var $customSelectDiv;
	$customSelectDiv		= jQuery('div.customDropdown').eq(customInputItemNo)
	
	$customSelectDiv.css({'zIndex' : 999999 - customInputItemNo , 'width' : $customSelectInput.width(), 'float' : $customSelectInput.css('float'), 'clear' :$customSelectInput.css('clear'), 'margin-top' : $customSelectInput.css('margin-top'), 'margin-right' : $customSelectInput.css('margin-right'), 'margin-bottom' : $customSelectInput.css('margin-bottom'), 'margin-left' : $customSelectInput.css('margin-left') })	
	$customSelectDiv.find('.ul-head').css({'width' : $customSelectInput.width()})
	
	var $customSelectDi_ul		= $customSelectDiv.find('ul')
	var customSelectSettings	= $customSelectDi_ul.parents('div.dropdown-container').find('select').attr('class').split(' ')

	$customSelectDi_ul.css({'left':'-999999px', 'right' : 'auto'})
	
	if( customSelectSettings.length <= 2 ) $customSelectDi_ul.css({'width' : $customSelectInput.width() })
	else $customSelectDi_ul.css({'width' : parseInt(customSelectSettings[2].substr(1)) })

		
	
	$customSelectDiv.find('div.ul-head').click(function(e){
		e.stopPropagation()
		if(customSelectOpened){
			
			if( $customSelectDi_ul.hasClass('opened') ) $customSelectDi_ul.css({'left':'-999999px','right':'auto'}).removeClass('opened')
			else {
				jQuery('div.customDropdown').find('ul').css({'left':'-999999px','right':'auto'}).removeClass('opened')
				
				if( customSelectSettings.length == 1 ) $customSelectDi_ul.css({'left':0}).addClass('opened')
				else{
					if( customSelectSettings[1] == 'left-aligned' ) $customSelectDi_ul.css({'left':0}).addClass('opened')
					else $customSelectDi_ul.css({'left':'auto', 'right': 0}).addClass('opened')
				}
				customSelectOpened = true
			}
		}
		else{
			if( customSelectSettings[0] == 'left-aligned' ) $customSelectDi_ul.css({'left':0}).addClass('opened')
			else $customSelectDi_ul.css({'left':'auto', 'right': 0}).addClass('opened')
			customSelectOpened = true
		}
	})
	
	$customSelectDiv.find('li').each(function(i){
		var $this_li	= jQuery(this)
		$this_li.css({'width' : $customSelectDi_ul.width() - (parseInt($this_li.css('padding-left'))+parseInt($this_li.css('padding-right')) )  })
		$this_li.click(function(e){
			e.stopPropagation()
			
			// remove and add the selected class
			$customSelectDi_ul.find('li.selected').removeClass('selected')
			$this_li.addClass('selected')
			
			// Remove previously selected option and set the newly selected option
			$customSelectInput.find('option[selected="selected"]').removeAttr('selected')
			$customSelectInput.find('option:eq('+i+')').attr('selected', true)

			// hide the open options
			$customSelectDi_ul.css({'left':'-999999px','right':'auto'}).removeClass('opened')
			customSelectOpened = false
			
			// Replacing the selected text of the upper span
			$customSelectDiv.find('span').html( $this_li.text() )
		})
	})
} // Ending Function handleCustomSelectIssues

/****** CUSTOM SELECTS ENDS *******/

/*
Code for check-box styling starts
------------------------------------
*/
function iindevStyledCheckBox(){
	jQuery("input[type=checkbox].styled-checkbox").wrap('<div class="styled-check-Items"></div>')
	jQuery(".styled-check-Items").append('<span></span>')

	jQuery(".styled-check-Items span").each(function(i){
		
		// Find for required css properties of the checkbox to be applied to the upper wrap

		jQuery(this).parent().css({'float' : jQuery("input[type=checkbox].styled-checkbox").eq(i).css('float')})
		jQuery(this).parent().css({'clear' : jQuery("input[type=checkbox].styled-checkbox").eq(i).css('clear')})
		
		
		if( jQuery(this).parent().css('float') == 'left' ){
			if( jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-right') == 'auto' || jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-right') == '3px' ) jQuery(this).parent().css({marginRight : '3px'})
			else jQuery(this).parent().css({marginRight : parseInt(jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-right'))+3+'px'})
		}
		
		if( jQuery(this).parent().css('float') == 'right' ){
			if( jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-left') == 'auto' || jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-left') == '3px' ) jQuery(this).parent().css({marginLeft : '3px'})
			else jQuery(this).parent().css({marginLeft : parseInt(jQuery("input[type=checkbox].styled-checkbox").eq(i).css('margin-left'))+3+'px'})
		}
		
		
		jQuery("input[type=checkbox].styled-checkbox").eq(i).css({ 'position' : 'absolute', 'z-index' : 1, 'left' : '-99999px', 'top' : '0px' });
		
		// First check the status of the particular checkbox and set the backgournd according to that status
		if( jQuery("input[type=checkbox].styled-checkbox").eq(i).attr('checked') ){
			jQuery(this).css({'background-position':'0 -100px'})
		}
		else {
			jQuery(this).css({'background-position':'0 0'})
		}
		
		// When click completed
		jQuery(this).mouseup(function(){
			if( jQuery("input[type=checkbox].styled-checkbox").eq(i).attr('checked') ){
				jQuery("input[type=checkbox].styled-checkbox").eq(i).attr('checked','')
				jQuery(this).css({'background-position':'0 0px'})
			}
			else {
				jQuery("input[type=checkbox].styled-checkbox").eq(i).attr('checked','checked')
				jQuery(this).css({'background-position':'0 -100px'})
			}
		})
		
		// Pressed
		jQuery(this).mousedown(function(){
			if( jQuery("input[type=checkbox].styled-checkbox").eq(i).attr('checked') ){
				jQuery(this).css({'background-position':'0 0px'})
			}
			else {
				jQuery(this).css({'background-position':'0 -100px'})
			}
		})		

	}) // Ending each .styled-check-Items span
}
/*
Code for check-box styling ends
------------------------------------
*/

// Begining function showpopupBox
function showAndHidepopupBox(popupBoxId){
	/* Begin  Pointers and Varriables */
	$thepopUpBox			= jQuery(popupBoxId)
	var $body		 		= jQuery('body')
	var	$window		 		= jQuery(window)
	var $page		 		= jQuery('#page')
	
	var thepopUpboxHeight	= $thepopUpBox.height()
	var thepopUpboxWidth	= $thepopUpBox.width()
	var bodyHeight			= $body.height()
	var bodyWidth			= $body.width()
	var windowHeight		= $window.height()
	var windowWidth			= $window.width()
	var pageouterWidth		= $page.outerWidth()
	var overlayHeight		= $overlay.height()
	var overlayWidth		= $overlay.width()
	var verticalPosition	= 0 
	var horizontalPosition	= 0
	/* End Pointers and Varriables */
		
	if(bodyHeight>windowHeight){
		overlayHeight=bodyHeight
	}
	else{
		overlayHeight=windowHeight
	}
	if(bodyWidth>pageouterWidth){
		overlayWidth=bodyWidth
	}
	else{
		overlayWidth=pageouterWidth
	}
	if(windowHeight>thepopUpboxHeight){
		verticalPosition = $window.scrollTop() + Math.round( (windowHeight-thepopUpboxHeight)/2 )
	}
	else{
		verticalPosition = $window.scrollTop()
	}
	if(windowWidth>thepopUpboxWidth){
		horizontalPosition = $window.scrollLeft() + Math.round( (windowWidth-thepopUpboxWidth)/2 )
	}
	else{
		horizontalPosition = $window.scrollLeft()
	}

	$overlay.css({ 
		'height'	: overlayHeight,
		'width'		: overlayWidth,
		'position'	: 'absolute',
		'left'		: 0,
		'top'		: 0,
		'z-index'	: 3,
		'opacity'	: 0.6,
		'background': '#000'
	})//Set the properties of the overlay div
	
	$overlay.animate( {opacity:'show'}, animationSpeed )//show the mask
	
	$thepopUpBox
		.css({ 
			 'display'	: 'block',
			 'top'		: verticalPosition,
			 'left'		: horizontalPosition
		})
		.animate( {opacity:'show'}, animationSpeed )
		// popup box position at the center of the window (verticaly and horizontaly)
		
	$overlay.click(function(){
		jQuery(this).animate( {opacity:'hide'}, animationSpeed )
		$thepopUpBox.animate( {opacity:'hide'}, animationSpeed )
	})
} // Ending function showpopupBox

/****** iindev SLIDE SHOW BEGIN ******/
var slidingDelay			= 3000 // This sets the sliding delay to 3 seconds
var slidingSpeed			= 900
var slidingEasing			= 'easeInOutCubic'

var $slidingTray			= false
var $slideLeftArrow			= false
var $slideRightArrow		= false

var currentlyRunning		= true
var autoSlidingPointer		= false

var lengthToTravel			= 924
var totalLengthToTravel		= 0
var itemDistanceCount		= 0

var activeItemNo			= 0
var nextActiveItemNo		= 1
var maxItemNo				= 0

function iindevSlideShowInit(){
	$slidingTray	= jQuery('#sliding-tray')
	
	if($slidingTray.length) {
		var itemCount	= $slidingTray.find('div').length
		maxItemNo = itemCount - 1
		
		if( itemCount ){
			
			$slideLeftArrow			= jQuery('#slide-left')
			$slideRightArrow		= jQuery('#slide-right')
			
			// Set the width of the $slidingTray
			$slidingTray.width(itemCount * lengthToTravel)
						
			$slidingTray.find('div').each(function(i){
				
				var slidingImageIdName	= 'slidingImageNumber'+i
				jQuery(this).attr('id', slidingImageIdName)
				
				if( jQuery(this).hasClass('active') ){
					activeItemNo = i
				}
			})
			
			$slidingTray.animate({'left' : 0},  slidingSpeed, slidingEasing, function(){
				nextActiveItemNo = ( activeItemNo == maxItemNo ) ? 0: activeItemNo+1
				currentlyRunning = false
			})
			
			$slideRightArrow.click(function(){
				if(!currentlyRunning){
					showParticularSlide(nextActiveItemNo)
				}
			})
			
			$slideLeftArrow.click(function(){
				if(!currentlyRunning){
					showParticularSlide( ((activeItemNo == 0) ? maxItemNo : (activeItemNo-1)) )
				}
			})
						
		} // Ending if(imgageCount)
	} // Ending if($slidingTray.length)
}

function showNextSlide(){
	showParticularSlide(nextActiveItemNo)
}

function showParticularSlide(nextItemToShow){
	
	if(nextItemToShow != nextActiveItemNo){
		nextActiveItemNo = nextItemToShow
	}
	
	currentlyRunning = true
	
	itemDistanceCount = Math.abs( activeItemNo - nextActiveItemNo)
	
	$slidingTray.animate({'left' : - lengthToTravel * nextActiveItemNo},  ( (itemDistanceCount == 1) ? slidingSpeed : Math.round(slidingSpeed * itemDistanceCount * 0.7) ), slidingEasing, function(){
	
		activeItemNo = nextActiveItemNo;
		nextActiveItemNo = ( activeItemNo == maxItemNo ) ? 0 : activeItemNo+1
		currentlyRunning = false
		
	})
}
/****** iindev SLIDE SHOW ENDS ******/

