<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<style>
	html {
	background: #fff;
	font-family: verdana;
	font-size: 12px;
	}
	body {
	width: 50%;
	margin: auto;
	padding: 2em;
	background: #eee;
	}
	.section-header {
	background: lightyellow;
	padding: 0.3em;
	margin: 0 0 0.4em 0;
	}
	.section-pin {
	display: inline-block;
	color: transparent;
	width: 20px;
	height: 20px;
	background: #ccc;
	vertical-align: bottom;
	border-radius: 10px;
	}
	.section-wrapper {
	background: #fff;
	margin-bottom: 2em;
	padding: 0.3em;
	}
	
	.section-wrapper:last-child {
	margin:0;
	}
	
	h2 {  }
	</style>
	
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>
$(document).ready( function(){ 
	LFJS.init(); 
	
} );

var LFJS = {

foo: 'bar',
that: this,
headerClassSelector: '.section-header',
wrapperClassSelector: '.section-wrapper',
sectionHeaders: [],
sectionWrappers: [],

init: function()
{
	this.sectionHeaders = $( this.headerClassSelector );
	this.sectionWrappers = $( this.wrapperClassSelector );

	
	// close all sections initially (unless specified in cookie/storage to stay open)
	this.closeUnPinnedSections();

	// watch all section headers for clicks
	this.watchSectionHeaders();
},


// Closes form sections EXCEPT those the user wants to keep open all the time
// user choice stored in cookie or local storage
closeUnPinnedSections: function()
{
	//console.log(this);
	$( this.wrapperClassSelector ).hide();
},



watchSectionHeaders: function()
{
	this.sectionHeaders.click(
		function(clickevent)
		{
			ele = clickevent.target;
			// find next sibling that wraps the form fields and expand it
			var wrapper = $(ele).next('.section-wrapper');
			wrapper.slideToggle("0.1");
			//that.toggleSection( ele );
		}
	)
},


toggleSection: function( header )
{
	var wrapper = $(header).next('.section-wrapper');
	console.log( 'header', header );
	console.log( 'wrapper',  wrapper );

}, 


toggleAllSections: function (clickevent)
{
	if( typeof allToggleState === 'undefined' )
	{
		// base initial toggle state on whatever the first section is doing
		var wrappers = this.sectionWrappers;
		if(wrappers[0].style.display === '' )
		{ allToggleState = 'openstate'; }  //open
		else { allToggleState = 'closedstate'; } //close
	}
	
	if( allToggleState === 'closedstate' )
	{ this.expandAllSections(); allToggleState = 'openstate'; } 
	else { this.collapseAllSections(); allToggleState = 'closedstate'; }
},



// forces all sections to close
collapseAllSections: function ()
{
	this.sectionWrappers.slideUp();
},


// forces all sections to open
expandAllSections: function ()
{
	this.sectionWrappers.slideDown();
}

} // end LFJS app object wrapper




</script>

</head>
<body>






<h2 class="section-header">Listing Details <span title="Click here to have this section automatically open on every page load" class="section-pin">Keep Open</span></h2>
<div id="sectDetails" class="section-wrapper">
	section 1
</div>



<h2 class="section-header">Location <span class="section-pin">Keep Open</span></h2>
<div id="sectLocation" class="section-wrapper">
	section 2
</div>



<h2 class="section-header">Description <span class="section-pin">Keep Open</span></h2>
<div id="sectDescription" class="section-wrapper">
	section 3
</div>



<h2 class="section-header">Property Types &amp; Key Features __ <span class="section-pin">Keep Open</span></h2>
<div id="sectProptype" class="section-wrapper fieldspecific">
 section 4
</div>




<h2 class="section-header">Commercial Sale Specific <span class="section-pin">Keep Open</span></h2>
<div id="sectCommSale" class="section-wrapper fieldspecific">
section 5
</div>





<h2 class="section-header">Youtube Videos, Classified Advert &amp; Other Details <span class="section-pin">Keep Open</span></h2>
<div id="sectClassified" class="section-wrapper">
section 6
</div>




<h2 class="section-header">Common Features, Amenities, &amp; Facilities <span class="section-pin">Keep Open</span></h2>
<div id="sectCommonAmenities" class="section-wrapper">

section 7
</div>



<h2 class="section-header">Notes <span class="section-pin">Keep Open</span> </h2>
<div id="sectNotes" class="section-wrapper">
section 8
</div>

</body>

</html>

<? /*
// http://www.dustindiaz.com/smallest-domready-ever
function ddDR(f){/in/.test(document.readyState)?setTimeout('ddDR('+f+')',9):f()}

ddDR( function(){LFJS.init} );


//ddDR( watchSectionHeaders );

//ddDR( closeAllSections );

*/ ?>