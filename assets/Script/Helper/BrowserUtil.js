module.exports = {
	showCursorText: function() {
		this.isCursorAuto() || this.setCursor("text")
	},
	showCursorPointer: function() {
		this.isCursorAuto() || this.setCursor("pointer")
	},
	showCursorMove: function() {
		this.isCursorAuto() || this.setCursor("move")
	},
	showCursorAuto: function() {
		this.isCursorAuto() || this.setCursor("auto")
	},
	showCursorFish: function() {
		// /assets/fish_game_arrow.png
		// /app/editor/static/preview-templates/assets/fish_game_arrow.png
		cc.sys.isBrowser && (cc.game.canvas.style.cursor = "url('/assets/fish_game_arrow.png'), auto");
	},
	showCursorAutoForce: function() {
		cc.sys.isBrowser && this.setCursor("auto")
	},
	isCursorAuto: function() {
		return !!cc.sys.isBrowser && "auto" === document.getElementById("GameDiv").style.cursor
	},
	setCursor: function(t) {
		cc.sys.isBrowser && (cc.game.canvas.style.cursor = t)
	},
	showTooltip: function(t) {
		cc.sys.isBrowser && (document.body.title = t)
	},
	focusGame: function() {
		cc.sys.isBrowser && cc.game.canvas.focus()
	},
	getHTMLElementByEditBox: function(t) {
		return t._impl._elem
	},
	checkEditBoxFocus: function(t) {
		return t.isFocused();
	},
	focusEditBox: function(t) {
		//t._impl._elem.style.display = "block";
		t._impl._elem.focus();
		t.focus();
	},
	unFocusEditBox: function(t) {
		//t._impl._elem.style.display = "none";
	},
	inputAddEvent: function(input, event, callback) {
		input._impl._elem.addEventListener(event, callback);
	},
	inputRemoveEvent: function(input, event, callback) {
		input._impl._elem.removeEventListener(event, callback);
	},
	readOnlyEditBox: function(t) {
		t.readOnly = !0;
	}
}
