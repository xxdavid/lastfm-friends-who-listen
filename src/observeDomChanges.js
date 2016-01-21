export default function observeDomChanges(callback) {
    var target = document.querySelector('div#content.main-content');

    if (target) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length > 0) {
                    callback();
                }
            });
        });

        var config = {childList: true};
        observer.observe(target, config);
    }
}
