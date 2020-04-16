
//swaps content on the page, only used in the main-div as parent
//could be used for other swappable content if parent-child structure in html and style in css is set up the same way
//parameters are the parent div and the child div content should swap to
function swapPages(parent, currentPage){
	$('.'+parent).children().css("display", "none");
	$('.'+currentPage).css("display", "inline-block");
}

//sends post message to backend
//parameter is object containing data to be sent
function donate(donationData){
	$.ajax({
			url: '/donate',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(donationData),
			//swap to thanks page if server responds with success
			success: function(res){
				swapPages('main-div', 'thankspage');
			},
			error: function(res){
				alert("Jotain meni vikaan");
			}
	});
}

//collect data from input fields to be sent to backend
function collectData(){

	//data to be sent
	var data = {};
	//collect errors on invalid inputs 
	var errors = [];

	//check the donation sum radiobutton
	var amount = $('input[name=radioamount]:checked').val();
	if (amount == 0) {
		//check the amount if custom sum is checked
		amount = $("input[name=custom-money-amount]").val();
		if(amount < 1){
			errors.push("Viallinen lahjoitussumma");
		}
	}
	data["amount"] = amount;

	//check name field
	var name = $("input[name=field-name]").val();
	if (name === "") {
		errors.push("Syötä nimesi");
	}else
		data["name"] = name;

	//check email field
	var email = $("input[name=field-email]").val();
	if (email === "") {
		errors.push("Syötä sähköpostisi");
	}
	else
		data["email"] = email;

	//add message, but its optional so no checking
	data["message"] = $("#field-message").val();

	//check gift checkbox
	if($("input[name=field-gift-check]").prop('checked')){
		var receiver = $("input[name=field-gift-name]").val();
		if (receiver === "") {
			errors.push("Syötä lahjan saajan nimi");
		}
		else
			data["receiver"] = receiver;
		//checking of other checkboxes is unnecessary unless we want to actually send emails or or do something with that info
	}

	//check payment type radiobutton
	var type = $('input[name=radiopayment]:checked').val();
	data["type"] = type;

	//if any errors found, print that info with alert popup
	//if no errors found, call donate() to send POST message
	if(errors && errors.length)
		alert(errors.join('\n'));
	else
		donate(data);
}

//toggle extra content with checkbox
//parameters are the input checkbox and div to be hidden/shown
function toggleOptions(checkbox, div){
	if($(checkbox).prop("checked"))
		$(div).css("display", "inherit");
	else
		$(div).css("display", "none");
}

//opens gallery modal
function openModal() {
	$("#galleryModal").css("display", "block");
}
//closes gallery modal
function closeModal() {
	$("#galleryModal").css("display", "none");
}

//value used with the gallery modal to keep track of navigation
var slideIndex = 1;

//gallery modal navigation with left/right buttons
//parameter is either 1 or -1 (next/previous image)
function moveSlides(n) {
	showSlides(slideIndex += n);
}
//set modal to open with chosen index
//parameter is the index of the chosen image
function currentSlide(n) {
	showSlides(slideIndex = n);
}

//opens the lightbox modal with gallery image
//first modify the slideIndex value, then call this function with it as parameter
//parameter is slideIndex which points to the current image to be shown
function showSlides(n) {
	var i;
	var slides = $(".gallery-slides");
	var captions = $("#slideCaptions").children();
	if(n > slides.length)
		slideIndex = 1
	if(n < 1)
		slideIndex = slides.length
	//hide other images
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	//hide other captions for images
	for (i = 0; i < captions.length; i++) {
		captions[i].style.display = "none";
	}
	//show  current gallery image
	slides[slideIndex-1].style.display = "block";
	//if caption exist, show that as well
	if(slideIndex-1 >= 0 && slideIndex-1 < captions.length){
		captions[slideIndex-1].style.display = "block";
	}
}