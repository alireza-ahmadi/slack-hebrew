document.getElementById('msg_input').dir = 'auto';

function elementShouldBeRTL(element) {
    return /[\u0590-\u05ff\u0600-\u06ff]/.test(element.innerHTML);
}

function alreadyApplied(element) {
    return element.children.length == 1 && (
            element.children[0].tagName == 'P' || element.children[0].tagName == 'p');
}

function applyTo(element) {
    element.innerHTML = '<p style="direction: rtl; text-align: left; margin: 0;">' + element.innerHTML + '</p>';
    for (var i in element.children[0].children) {
        var child = element.children[0].children[i];
        if (!(child.style instanceof CSSStyleDeclaration))
            continue;
        child.style.textAlign = 'initial';
    }
}

function setDirections() {
    var contents = document.getElementsByClassName('c-message__body');
    for (var i in contents) {
        var element = contents[i];
        if (!elementShouldBeRTL(element))
            continue;
        if (alreadyApplied(element))
            continue;
        applyTo(element);
    }
}

function domModified() {
    document.body.removeEventListener('DOMSubtreeModified', domModified);
    setTimeout(function() { // debouce modifications
        setDirections();
        document.body.addEventListener('DOMSubtreeModified', domModified);
    }, 500);
}

document.body.addEventListener('DOMSubtreeModified', domModified);
