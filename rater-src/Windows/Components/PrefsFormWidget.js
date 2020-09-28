import config from "../../config";
// <nowiki>

function PrefsFormWidget( config ) {
	// Configuration initialization
	config = config || {};
	// Call parent constructor
	PrefsFormWidget.super.call( this, config );

	this.$element.addClass("rater-prefsFormWidget");

	this.layout =  new OO.ui.FieldsetLayout( {
		label: "Настройки",
		$element: this.$element
	} );

	this.preferences = {
		"autostart": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Автозапуск Rater"
		},
		"autostartRedirects": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Автозапуск в перенаправлениях"
		},
		"autostartNamespaces": {
			input: new mw.widgets.NamespacesMultiselectWidget(),
			label: "Автозапуск в этих пространствах имён"
		},
		"minForShell": {
			input: new OO.ui.NumberInputWidget( { "min": 2 } ),
			label: "Минимальное число баннеров для оборачивания их в шаблон-обёртку"
		},
		"bypassRedirects": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Обходить перенаправления на баннеры"
		},
		"autofillClassFromOthers":  {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Автоматически заполнять уровень по другим шаблонам"
		},
		"autofillClassFromOres": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Автоматически заполнять уровень по предсказанию ORES"
		},
		"autofillImportance": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "Автоматически заполнять низкую важность"
		},
		"collapseParamsLowerLimit": {
			input: new OO.ui.NumberInputWidget( { "min": 1 } ),
			label: "Минимальное количество параметров, показываемых несвёрнутыми"
		},
		"watchlist": {
			input: new OO.ui.ButtonSelectWidget( {
				items: [
					new OO.ui.ButtonOptionWidget( {
						data: "preferences",
						label: "По-умолчанию",
						title: "Использует те же настройки, как и при ручном редактировании страницы, согласно Служебная:Настройки"
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: "watch",
						label: "Всегда",
						title: "Всегда добавлять страницы, отредактированные с помощью Rater, в ваш список наблюдения"
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: "nochange",
						label: "Никогда",
						title: "Никогда не добавлять страницы, отредактированные с помощью Rater, в ваш список наблюдения"
					} ),
				]
			}).selectItemByData("preferences"),
			label: "Добавлять редактируемые страницы в список наблюдения"
		},
		"resetCache": {
			input: new OO.ui.ButtonWidget( {
				label: "Сбросить кэш",
				title: "Удалить все закэшированные данные, включая список проектов и параметров шаблонов",
				flags: ["destructive"]
			} )
		}
	};

	for (let prefName in this.preferences ) {
		this.layout.addItems([
			new OO.ui.FieldLayout( this.preferences[prefName].input, {
				label: this.preferences[prefName].label,
				align: "right"
			} )
		]);
	}

	this.preferences.resetCache.input.connect(this, {"click": "onResetCacheClick"});
}
OO.inheritClass( PrefsFormWidget, OO.ui.Widget );

PrefsFormWidget.prototype.setPrefValues = function(prefs) {
	for (let prefName in prefs ) {
		let value = prefs[prefName];
		let input = this.preferences[prefName] && this.preferences[prefName].input;
		switch (input && input.constructor.name) {
		case "OoUiButtonSelectWidget":
			input.selectItemByData(value);
			break;
		case "OoUiNumberInputWidget":
		case "OoUiToggleSwitchWidget":
			input.setValue(value);
			break;
		case "MwWidgetsNamespacesMultiselectWidget":
			input.clearItems();
			value.forEach(ns =>
				input.addTag(
					ns.toString(),
					ns === 0
						? "(Основное)"
						: config.mw.wgFormattedNamespaces[ns]
				)
			);
			break;
		}
	}
};

PrefsFormWidget.prototype.getPrefs = function() {
	var prefs = {};
	for (let prefName in this.preferences ) {
		let input = this.preferences[prefName].input;
		let value;
		switch (input.constructor.name) {
		case "OoUiButtonSelectWidget":
			value = input.findSelectedItem().getData();
			break;
		case "OoUiToggleSwitchWidget":
			value = input.getValue();
			break;
		case "OoUiNumberInputWidget":
			value = Number(input.getValue()); // widget uses strings, not numbers!
			break;
		case "MwWidgetsNamespacesMultiselectWidget":
			value = input.getValue().map(Number); // widget uses strings, not numbers!
			break;
		}
		prefs[prefName] = value;
	}
	return prefs;
};

PrefsFormWidget.prototype.onResetCacheClick = function() {
	OO.ui.confirm("После очистки кэша Rater закроется и перезапустится. Все изменения будут потеряны.")
		.then(confirmed => {
			if (confirmed) { 
				this.emit("resetCache");
			}
		});
};

export default PrefsFormWidget;
// </nowiki>