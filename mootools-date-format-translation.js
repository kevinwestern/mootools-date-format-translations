// Add to date object
Date.extend({
	languageTranslations: {},
	
	addFormatTranslations: function (language, translations)
	{		
		var languageTranslations = Date.languageTranslations[language] || translations;
		if (Date.languageTranslations[language])
		{
			// check for pre 1.3
			var merge = (Object && Object.merge) ? Object.merge : Hash.combine;
			languageTranslations = merge(translations, languageTranslations);
		}
		Date.languageTranslations[language] = languageTranslations;
	}
});

// Add to Date prototype
Date.implement({		
	formatWithLanguageTranslation: function (format, language)
	{
		var translations = Date.languageTranslations[language];
		console.log(language, translations);
		if (translations === undefined) return this.format(format);

		return this.format(format.replace(/[a-z0-9]/gi, 
			function(matched){
				var prefix = '',
					translated = translations[matched] || matched;
					
				if (!translated.match(/(iso|rfc)[0-9]+/)) prefix = '%';
				return prefix + translated;
			})
		);
	}
});