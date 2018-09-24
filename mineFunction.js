var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    return element
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var ele = elements[i]
        bindEvent(ele, eventName, callback)
    }
}
