// script.js
document.addEventListener('DOMContentLoaded', () => {
	const track1 = document.querySelector('.slider-track');
	const track2 = document.querySelector('.slider-track2');

	const reviews1 = document.querySelectorAll('.slider1 .review');
	const reviews2 = document.querySelectorAll('.slider2 .review2');

	function duplicateReviews(reviews, track) {
		reviews.forEach(review => {
			const clone = review.cloneNode(true);
			track.appendChild(clone);
		});
	}

	duplicateReviews(reviews1, track1);
	duplicateReviews(reviews2, track2);
});
