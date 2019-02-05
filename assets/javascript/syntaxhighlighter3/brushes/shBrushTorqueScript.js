/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
    // CommonJS
    SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

    function Brush()
    {
        var keywords =  'datablock function singleton new if for ' +
            'true false foreach while '+
            'switch case default break else in';

        var functions = 'vectoradd vectorsub vectornormalize bezierprojectiledata' +
            'bezierprojectile spelldata';

        var concats = 'SPC TAB @';

        function fixComments(match, regexInfo)
        {
            var css = (match[0].indexOf("///") == 0)
                    ? 'color1'
                    : 'comments'
                ;

            return [new SyntaxHighlighter.Match(match[0], match.index, css)];
        }

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,	func : fixComments },		// one line comments
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
            { regex: /@"(?:[^"]|"")*"/g,								css: 'string' },			// @-quoted strings
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// strings
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// strings
            { regex: new RegExp(this.getKeywords(keywords), 'gmi'),     css: 'keyword' },			// c# keyword
            { regex: /%(?!this)\w+/g,                                   css: 'variable' },	    	// local variables
            { regex: /\$(?:\w|\:)+/g,                                   css: 'color2' },	    	// global variables
            { regex: new RegExp(this.getKeywords(functions), 'gmi'),    css: 'script' },			// global functions
            { regex: new RegExp(this.getKeywords(concats), 'gmi'),      css: 'comments' },			// global functions
            { regex: /%this/gi,                                         css: 'color3' },   	        // preprocessor tags like #region and #endregion
            { regex: /\s\d+\.?\d*/gi,                                   css: 'value' },   	        // decimals
        ];

        this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
    };

    Brush.prototype	= new SyntaxHighlighter.Highlighter();
    Brush.aliases	= ['ts', 'torquescript', 'torque'];

    SyntaxHighlighter.brushes.TorqueScript = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
