

//#region General Utils
function nullOrEmpty(obj) {
    if (obj == null || obj.length == 0 || obj == 'undefined') {
        return true;
    }
    return false;
}
//#endregion

//#region String Utils
//#region String Extensions
// ------------------------------------------------------------------
// String Extensions
// ------------------------------------------------------------------
String.prototype.startsWith = function (s) {
    return (this.indexOf(s) == 0);
};
//#endregion
//#endregion