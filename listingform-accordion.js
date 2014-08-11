var LFJS = {

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

	this.watchToggleAll();

	// watch all section headers for clicks
	this.watchSectionHeaders();
},


// Closes form sections EXCEPT those the user wants to keep open all the time
// user choice stored in cookie or local storage
closeUnPinnedSections: function()
{
	//console.log(this);
	this.sectionWrappers.hide();
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