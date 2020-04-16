

function swapPages(parent, currentPage){
	$('.'+parent).children().css("display", "none");
	$('.'+currentPage).css("display", "inline-block");
}

function donate(donationData){
	$.ajax({
			url: '/donate',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(donationData),
			success: function(res){
				swapPages('main-div', 'thankspage');
			},
			error: function(res){
				alert("Jotain meni vikaan");
			}
	});
}

function collectData(){

	data = {};

	var amount = $('input[name=radioamount]:checked').val();
	if (amount == 0) {
		amount = $("input[name=custom-money-amount]").val();
		if(amount < 1){
			alert("viallinen summa");
			return;
		}
	}
	data["amount"] = amount;
	var name = $("input[name=field-name]").val();
	if (name === "") {
		alert("syötä nimi");
		return;
	}
	data["name"] = name;
	var email = $("input[name=field-email]").val();
	if (email === "") {
		alert("syötä email");
		return;
	}
	data["email"] = email;
	var message = $("#field-message").val();
	if($("input[name=field-gift-check]").prop('checked')){
		var receiver = $("input[name=field-gift-name]").val();
		if (receiver === "") {
			alert("syötä saajan nimi");
			return;
		}
		data["receiver"] = receiver;
		//checking of other checkboxes is unnecessary unless we want to actually send emails or or do something with that info
	}
	var type = $('input[name=radiopayment]:checked').val();
	data["type"] = type;

	donate(data);
}

function toggleOptions(checkbox, div){
	if($(checkbox).prop("checked"))
		$(div).css("display", "inherit");
	else
		$(div).css("display", "none");
}

function openModal() {
	$("#galleryModal").css("display", "block");
}
function closeModal() {
	$("#galleryModal").css("display", "none");
}

function moveSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = $(".gallery-slides");
	var captions = $("#slideCaptions").children();
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < captions.length; i++) {
		captions[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
	if(slideIndex-1 >= 0 && slideIndex-1 < captions.length){
		captions[slideIndex-1].style.display = "block";
	}
}