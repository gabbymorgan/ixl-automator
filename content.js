
var waitOneMoment;
var choiceNodeClassNames = ['TileSkinBare', 'SelectableTile', 'numberButton'];
var startWaiting = () => {
  waitOneMoment = setTimeout(() => {
    document.getElementsByClassName('crisp-button')[3].click();
  }, 10000);
}
var stopWaiting = () => {
  clearTimeout(waitOneMoment);
}
var init = () => {
  for (let i = 0; i < choiceNodeClassNames.length; i++) {
    const choiceNodes = Array.from(document.getElementsByClassName(choiceNodeClassNames[i]));
    if (choiceNodes.length) {
      choiceNodes.forEach(node => {
        node.onclick = () => {
          stopWaiting();
          startWaiting();
        }
      });
    }
  }
}

var clockWatcher = new MutationObserver(function (mutations) {
  alert("Time's up!");
});

var observerConfig = {
  attributes: true,
  attributeFilter: ["class"]
};

var targetNode = document.getElementById('time-elapsed');
clockWatcher.observe(targetNode, observerConfig);

window.addEventListener("DOMNodeInserted", init);