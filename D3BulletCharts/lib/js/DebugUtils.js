// ------------------------------------------------------------------
// Extension helper functions
// ------------------------------------------------------------------
function ConsoleLog(msg) {
    if (typeof console != "undefined") {
        console.log(msg);
    }
}
function ConsoleInfo(msg) {
    if (typeof console != "undefined") {
        console.info(msg);
    }
}
function ConsoleError(msg) {
    if (typeof console != "undefined") {
        console.error(msg);
    }
}
function ConsoleWarn(msg) {
    if (typeof console != "undefined") {
        console.warn(msg);
    }
}
function ConsoleClear() {
    if (typeof console != "undefined") {
        console.clear();
    }
}