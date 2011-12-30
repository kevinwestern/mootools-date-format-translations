describe("", function(){
	describe("addFormatTranslations", function(){
		
		it("should add a language when it doesn't exist", function(){
			expect(Date.languageTranslations['test']).toBeUndefined();
			Date.addFormatTranslations('test',{'a': '1'});
			expect(Date.languageTranslations['test']).toBeDefined();			
		});
		
		it("should unobtrusively merge languages if one already exists", function(){
			Date.addFormatTranslations('test', {'a': '1'});
			Date.addFormatTranslations('test', {'a': '2', 'b': '3'});
			expect(Date.languageTranslations['test']).toEqual({'a': '1', 'b': '3'});
		});
	});

	describe("formatWithLanguageTranslation", function(){
		var testDate = Date.parse('2011-01-02 03:04:05');
		
		it("should replace given language format with mootools equivalent", function(){
			Date.addFormatTranslations('mylang', {'z': 'b', 'b': 'd'});
			expect(testDate.formatWithLanguageTranslation('z', 'mylang')).toEqual(testDate.format('%b'));
			expect(testDate.formatWithLanguageTranslation('z b', 'mylang')).toEqual(testDate.format('%b %d'));
		});
		
		it("should use format as-is when language doesn't exist", function(){
			expect(testDate.formatWithLanguageTranslation('b', 'nolang')).toEqual('b');
		});
		
		it("should use iso and rfc when the translation results in an iso or rfc", function(){
			expect(testDate.formatWithLanguageTranslation('c', 'php')).toEqual(testDate.format('iso8601'));
		});				
	});
	
});