
var waitOneMoment;
var timerInProgress;
var choiceNodeClassNames = ['TileSkinBare', 'SelectableTile', 'numberButton', "TileSkinClassic"];
var startWaiting = () => {
  waitOneMoment = setTimeout(() => {
    document.getElementsByClassName('crisp-button')[3].click();
  }, 10000);
};

var stopWaiting = () => {
  clearTimeout(waitOneMoment);
};

// must explicitly apply each value because of DOM strangeness
var applyAttrs = (object, attrs) => {
  Object.keys(attrs).forEach(attribute => {
    object[attribute] = attrs[attribute];
  });
};

var checkForBreak = () => {
  // const score = document.getElementById('currentscore').innerText;
  const attempts = document.getElementById('problems-attempted').innerText;
  console.log({ attempts });
  if (attempts % 20 === 0 && !timerInProgress) {
    const takeBreak = document.createElement('div');
    takeBreakStyles = {
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(100, 100, 100, .5)",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    applyAttrs(takeBreak.style, takeBreakStyles);
    const iframeAttrs = {
      width: "724",
      height: "407",
      src: "https://www.youtube.com/embed/u5dVwQp4liA?autoplay=1",
      frameborder: "0",
      allow: "autoplay;",
      autoplay: true,
    }
    const breakTimer = document.createElement('iframe');
    applyAttrs(breakTimer, iframeAttrs);
    takeBreak.appendChild(breakTimer);
    document.body.appendChild(takeBreak);
    timerInProgress = true;
    setTimeout(() => {
      takeBreak.remove();
      timerInProgress = false;
    }, 1000 * 60 * 10.25);
  }
};

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
  var submitButton = document.getElementsByClassName('crisp-button')[3]
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      stopWaiting();
      console.log('submit')
      checkForBreak();
    });
  }
};

var clockWatcher = new MutationObserver(function (mutations) {
  if (Array.from(mutations[0].target.classList).includes("timer-paused")) {
    alert('Times up! Make a selection and hit submit!');
  }
});

var observerConfig = {
  attributes: true,
  attributeFilter: ["class"]
};

var targetNode = document.getElementById('time-elapsed');
clockWatcher.observe(targetNode, observerConfig);

window.addEventListener("DOMNodeInserted", init);