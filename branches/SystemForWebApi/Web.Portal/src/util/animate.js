/**
 * 动画帮助类的封装
 * author: le0zh
 *
 * 依赖于jQuery, animate.css
 * 具体的动画效果可以查看： http://daneden.github.io/animate.css/
 *
 * 注意：动画完有可能会移除掉目标上的原有CSS class,还未解决，请注意！
 */

define(['jquery'], function($) {
	var helper = {
		show: function (elementId, animateType) {
			$('#' + elementId).removeClass().addClass(animateType + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass();
			});
		}
	};

	return helper;
});