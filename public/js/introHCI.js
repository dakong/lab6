'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	$.get('/project/'+idNumber, addProject.bind(this));
}

function addProject(result){
	var description = 
		"<h1>" + result.title + "</h1>" +
		"<h3>" + result.date + "</h3>" +
		"<img src='"+result.image+"' width='250' />" +
		"<p>" + result.summary + "</p>";

	// $(this).next().html(description);
	$(this).siblings('.details').html(description);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get('/palette', getPalette);
}

function getPalette(result){
	var colors = result.colors;
	$('body').css({
		'background-color': colors[0]
	})
}