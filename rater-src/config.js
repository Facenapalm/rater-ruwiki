// <nowiki>
const packagejson = require("../package.json");
var version = packagejson.version;

// A global object that stores all the page and user configuration and settings
var config = {
	// Script info
	script: {
		// Advert to append to edit summaries
		advert:  ` ([[:en:WP:RATER#${version}|Rater]])`,
		version: version
	},
	// Default preferences, if user subpage raterPrefs.json does not exist
	defaultPrefs: {
		"autostart": false,
		"autostartRedirects": false,
		"autostartNamespaces": [0],
		"minForShell": 1000,
		"bypassRedirects": true,
		"autofillClassFromOthers": true,
		"autofillClassFromOres": true,
		"autofillImportance": true,
		"collapseParamsLowerLimit": 6,
		"watchlist": "preferences"
	},
	// MediaWiki configuration values
	mw: mw.config.get( [
		"skin",
		"wgPageName",
		"wgNamespaceNumber",
		"wgUserName",
		"wgFormattedNamespaces",
		"wgMonthNames",
		"wgRevisionId",
		"wgScriptPath",
		"wgServer",
		"wgCategories",
		"wgIsMainPage"
	] ),
	bannerDefaults: {
		classes: [
			"ИС",
			"ХС",
			"ДС",
			"I",
			"II",
			"III",
			"IV",
			"ИСП",
			"Список"
		],
		importances: [
			"высшая",
			"высокая",
			"средняя",
			"низкая"
		],
		extendedClasses: [
		],
		extendedImportances: [
		]
	},
	customBanners: {
	},
	shellTemplates: [
	],
	defaultParameterData: {
		"auto": {
			"label": {
				"en": "Auto-rated"
			},
			"description": {
				"en": "Automatically rated by a bot. Allowed values: ['yes']."
			},
			"autovalue": "yes"
		},
		"listas": {
			"label": {
				"en": "List as"
			},
			"description": {
				"en": "Sortkey for talk page"
			}
		},
		"small": {
			"label": {
				"en": "Small?",
			},
			"description": {
				"en": "Display a small version. Allowed values: ['yes']."
			},
			"autovalue": "yes"
		},
		"attention": {
			"label": {
				"en": "Attention required?",
			},
			"description": {
				"en": "Immediate attention required. Allowed values: ['yes']."
			},
			"autovalue": "yes"
		},
		"needs-image": {
			"label": {
				"en": "Needs image?",
			},
			"description": {
				"en": "Request that an image or photograph of the subject be added to the article. Allowed values: ['yes']."
			},
			"aliases": [
				"needs-photo"
			],
			"autovalue": "yes",
			"suggested": true
		},
		"needs-infobox": {
			"label": {
				"en": "Needs infobox?",
			},
			"description": {
				"en": "Request that an infobox be added to the article. Allowed values: ['yes']."
			},
			"aliases": [
				"needs-photo"
			],
			"autovalue": "yes",
			"suggested": true
		}
	}
};

export default config;
// </nowiki>