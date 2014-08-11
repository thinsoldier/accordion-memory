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
	<script src="listingform-accordion.js"></script>
	<script>
		$(document).ready( function(){ LFJS.init(); } );
	</script>

</head>
<body>



<p id="toggleAll"> <span class="button">Expand / Collapse All</span></p>

<p onclick="LFJS.toggleSection($('.section-header').first())"> toggle first </p>
<p onclick="LFJS.toggleSection($('.section-header').last())"> toggle last </p>
<p onclick="LFJS.toggleSection($('.section-header').eq(5))"> toggle youtube </p>

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