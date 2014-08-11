// 2014-08-11
// Depends on jquery and cookie.js

var LFJS = {

headerClassSelector: '.section-header',
wrapperClassSelector: '.section-wrapper',
sectionHeaders: [],
sectionWrappers: [],

init: function()
{
	this.sectionHeaders = $( this.headerClassSelector );
	this.sectionWrappers = $( this.wrapperClassSelector );

	// Create a cookie to store pinned open form section preferences in
	Cookie.init({name: 'realtycore', expires: 1});
	if( !Cookie.getData('keepOpen') ) { Cookie.setData('keepOpen',[]) }

	
	// close all sections initially (unless specified in cookie/storage to stay open)
	this.closeUnPinnedSections();

	this.watchToggleAll();

	// watch all section headers for clicks
	this.watchSectionHeaders();
},


// Closes form sections EXCEPT those the user wants to keep open all the time
// user choice stored in cookie or local storage
closeUnPinnedSections: function()
{
	var cookieData = Cookie.getData('keepOpen');
	
	
	//console.log(this);
	this.sectionWrappers.each( function( index, node )
		{
			// if sections node.id is Not found in cookie, hide section
			if( cookieData.indexOf( node.id ) < 0 )
			{	node.style.display="none";	}
			// if it is found, change class of section-pin element to indicate it's pinned open
			else 
			{
				// find this sections wrappers section-header & section-pin
				var header = node.previous();
				var pin = header.down('.section-pin');
				// change section pin class name
				pin.toggleClassName('pinned');
				// console.log( pin )
			}
		} );
},


// observe the expand/collapse all button
watchToggleAll: function()
{
	var api = this;
	$('#toggleAll').click( function(clik){ api.toggleAllSections(clik); } );
},



watchSectionHeaders: function()
{
	var api = this;

	this.sectionHeaders.click(
		function(clickevent)
		{
			api.toggleSection( clickevent.target );
		}
	)
},


toggleSection: function( header )
{
	// find next sibling that wraps the form fields and expand it
	var wrapper = $(header).next('.section-wrapper');
	wrapper.slideToggle("0.1");
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