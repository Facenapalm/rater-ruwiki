/* Это НЕ РАБОЧАЯ версия скрипта, она публикуется для тестов и отладки. Пожалуйста, не используйте её. */
/*
 * Rater: диалоговый интерфейс для добавления, удаления и изменения баннеров вики-проектов
 * Автор: Evad37; локализация: Facenapalm
 * Лицензия: MIT / CC-BY 4.0 [https://github.com/Facenapalm/rater-ruwiki/blob/master/LICENSE]
 * 
 * Собрано из исходного кода, опубликованного в репозитории GitHub [https://github.com/Facenapalm/rater-ruwiki].
 * Все изменения должны проводиться в репозитории, в противном случае они будут потеряну.
 * 
 * Чтобы обновить скрипт из GitHub, вам нужно настроить локальный репозиторий.
 * Далее следуйте инструкциям в [https://github.com/Facenapalm/rater-ruwiki/blob/master/README.md]
 */
/* jshint esversion: 5, laxbreak: true, undef: true, eqnull: true, maxerr: 3000 */
/* globals console, document, window, $, mw, OO, extraJs */
/* <nowiki> */
$.when(
	mw.loader.using([
		"mediawiki.util", "mediawiki.api", "mediawiki.Title",
		"oojs-ui-core", "oojs-ui-widgets", "oojs-ui-windows",
		"oojs-ui.styles.icons-content", "oojs-ui.styles.icons-interactions",
		"oojs-ui.styles.icons-moderation", "oojs-ui.styles.icons-editing-core",
		"mediawiki.widgets", "mediawiki.widgets.NamespacesMultiselectWidget",
	]),
	$.ready
).then(function() {
	var conf = mw.config.get(["wgNamespaceNumber", "wgPageName"]);
	if ( conf.wgPageName != "Песочница" ) {
		if ( conf.wgNamespaceNumber != 0 && conf.wgNamespaceNumber != 1 ) {
			return;
		}
		if ( $("li.new[id|=ca-nstab]").length ) {
			return;
		}
	}