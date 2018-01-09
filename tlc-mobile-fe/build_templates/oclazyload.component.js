/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 */
 
(function(angular) {
	'use strict';

	var app = angular		
		.module('ocLazyLoad.component', [])
		.config(config)
		
	config.$inject = ['$ocLazyLoadProvider'];		
	
	function config($ocLazyLoadProvider) {
		
		$ocLazyLoadProvider.config({
			// debug: true,
			serie: true,
			modules: [<% ocLazyLoad.views.forEach(function (file, i) { %>
				{name: '<%= file.name %>', files: [<% file.files.forEach(function (file2, j) {%>
					'<%=file2%>'<%=(j<file.files.length-1)?',':''%><%});%>
				], serie: true}<%=(i<ocLazyLoad.views.length-1)?',':''%>
				<% }); %>
			]
		});
	}

}(angular));