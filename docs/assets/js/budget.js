/*
Author       : Dreamstechnologies
Template Name: Social Web Dev - Bootstrap Admin Template
*/
(function () {
    "use strict";
	
	// Budgets
	$(document).on('click','.add-revenue',function(){

		var revenuescontent = '<div class="grid grid-cols-12 gap-x-6 items-end revenues-cont">' +
			'<div class="col-span-6">' +
				'<div class="mb-3">' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
			'<div class="col-span-6">' +
				'<div class="flex items-center mb-3">' +
					'<div>' +
						'<div class="flex items-center">' + 
							'<input type="text" class="form-control">' +
							'<div class="ms-2">' +
								'<a href="javascript:void(0);" class="btn btn-icon trash-revenue size-8 btn-primary rounded-full"><i class="ti ti-trash"></i></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +		
		'</div>';

		
		$(".revenues-content").append(revenuescontent);
		return false;
	});

	// Remove Budget
	$(document).on('click', '.trash-revenue', function () {
		$(this).closest('.revenues-cont').remove();
		return false;
	});

	// Add Expense
	$(document).on('click','.add-expenses',function(){

		var expensescontent = '<div class="grid grid-cols-12 gap-x-6 items-end expenses-cont">' +
			'<div class="col-span-6">' +
				'<div class="mb-3">' +
					'<input type="text" class="form-control">' +
				'</div>' +
			'</div>' +
			'<div class="col-span-6">' +
				'<div class="flex items-center mb-3">' +
					'<div>' +
						'<div class="flex items-center">' + 
							'<input type="text" class="form-control">' +
							'<div class="ms-2">' +
								'<a href="javascript:void(0);" class="btn btn-icon trash-expenses size-8 btn-primary rounded-full"><i class="ti ti-trash"></i></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +		
		'</div>';

		$(".expenses-content").append(expensescontent);
		return false;
	});

	// Remove Expense
	$(document).on('click', '.trash-expenses', function () {
		$(this).closest('.expenses-cont').remove();
		return false;
	});
		
})();