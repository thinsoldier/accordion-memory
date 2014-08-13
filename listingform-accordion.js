// 2014-08-11
// Depends on jquery and cookie.js

function AccordionMemory( opts )
{

var $ = jQuery;

this.headerClassSelector = '.section-header';
this.wrapperClassSelector = '.section-wrapper';
this.sectionHeaders = [];
this.sectionWrappers = [];

this.sectionHeaders = $( this.headerClassSelector );
this.sectionWrappers = $( this.wrapperClassSelector );

// Create a cookie to store pinned open form section preferences in an array
this.cookie = new Cookie('realtycore', {expires: 5} );
if( !this.cookie.get('keepOpen') ) { this.cookie.set('keepOpen',[]); }

	this.construct = function()
	{
		// close all sections initially (unless specified in cookie/storage to stay open)
		this.closeUnPinnedSections();

		this.watchToggleAll();

		// watch all section headers for clicks
		this.watchSectionHeaders();

		this.watchSectionPins();
	};




// Closes form sections EXCEPT those the user wants to keep open all the time
// user choice stored in cookie or local storage
this.closeUnPinnedSections = function()
{
	var cookieData = this.cookie.get('keepOpen');
	
	
	//console.log(this);
	this.sectionWrappers.each( function( index, node )
		{
			$node = $(node);
			// if sections node.id is Not found in cookie, hide section
			if( cookieData.indexOf( node.id ) < 0 )
			{	node.style.display="none";	}
			// if it is found, change class of section-pin element to indicate it's pinned open
			else 
			{
				// find this sections wrappers section-header & section-pin
				var header = $node.prev();
				var pin = header.find('.section-pin');
				// change section pin class name
				pin.toggleClass('pinned');
			}
		} );
}


// observe the expand/collapse all button
this.watchToggleAll = function()
{
	var api = this;
	$('#toggleAll').click( function(clik){ api.toggleAllSections(clik); } );
}


this.watchSectionHeaders = function()
{
	var api = this;

	this.sectionHeaders.click(
		function(clickevent)
		{
			api.toggleSection( clickevent.target );
		}
	)
}

this.watchSectionPins = function()
{
	var api = this;

	$('.section-pin').click( 
		function(clickevent)
		{
			api.storeSectionPref( clickevent.target );
		}
	)
}

this.toggleSection = function( header )
{
	// find next sibling that wraps the form fields and expand it
	var wrapper = $(header).next('.section-wrapper');
	wrapper.slideToggle("0.1");
}

this.toggleAllSections = function (clickevent)
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
}


// forces all sections to close
this.collapseAllSections = function ()
{
	this.sectionWrappers.slideUp();
}


// forces all sections to open
this.expandAllSections = function ()
{
	this.sectionWrappers.slideDown();
}


this.storeSectionPref = function( element )
{
	$element = $(element);
	// if text of element at time of clicking said "keep open"
	// then keep it open
	var text = $element.text();
	//console.log(text);
	
	var section = $element.parent().next('.section-wrapper');
	//console.log(section);
	
	var cookieData = this.cookie.get('keepOpen');
	//console.log(cookieData);
	
	// if element does not already have classname "pinned", add its section id to list of keepOpen sections in cookie
	if( $element.hasClass('pinned') == false )
	{
		if(cookieData.indexOf( section[0].id ) < 0 ) { cookieData.push( section[0].id ) }
	}
	// if element already has the classname 'pinned' remove its section id from list of keepOpen sections in cookie
	else {
		var find = cookieData.indexOf( section[0].id );
		cookieData.splice( find, 1 ); // delete it from array
	}
	
	// Inspect newest cookie data based changes that may have happened above.
	console.log(cookieData);
	
	// The pinned class is toggled every time a pin is clicked.
	$element.toggleClass('pinned')
	
	// Replace keepOpen array in cookie with latest info.
	this.cookie.set('keepOpen', cookieData);

}


	this.construct();

}  // end LFJS app object wrapper






