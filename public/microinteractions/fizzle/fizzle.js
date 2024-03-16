if (typeof isDefined === "undefined") {
  console.error("fizzle has a dependency on utils.js");
}

if (someUndefined(createTransformSteps, insertDynamicCSSRule)) {
  console.error("fizzle has a dependency on aniUtils.js");
}

const fizzleContainer = document.getElementById("fizzle-container");
let centroid = { x: 0, y: 0 };
const adjustCentroid = (newX, newY) =>
  (centroid = { x: Math.floor(newX) - 13, y: Math.floor(newY) - 13 });

const generateId = (() => {
  let id = 0;
  return () => id++;
})();

const DISTANCE = 80;
const dynamicKeyframe = () => {
  let id = generateId();
  const name = `fizzle_${id}`;

  const randomDist = Math.floor((Math.random() - 0.5) * DISTANCE * 2.5);
  const randomDeg = (Math.random() - 0.5) * 520;

  // TODO - we want to allow them to randomly pop and split.
  // How do we do that ? occasionally set an interval where we remove the element and spawn a new one ?
  // TODO - we'd like to have vertical distance be irregular as well.

  const [s0, s1, s2, s3] = createTransformSteps(
    `translate(${centroid.x + randomDist / 8}px, ${
      centroid.y - 15
    }px) scale(1, 1)`,
    `translate(0%, -200%) translate(0px, -20px)`,
    `translate(${randomDist}px, -${DISTANCE}px) scale(2, 2)`,
    `rotate(${randomDeg}deg) scale(.3,.3)`
  );

  const keyframeRule = `
  @keyframes ${name} {
    0% {
      opacity: 1;
      transform: ${s0};
      animation-timing-function: linear;
      background-color: rgba(253, 250, 173, 1);
    }
    25% {
      animation-timing-function: linear;
      background-color: rgba(246, 58, 9, 1);
    }
    50% {
      animation-timing-function: linear;
      background-color: rgba(103, 103, 104, 1);
    }
    100% {
      opacity: 1;
      transform: ${s3};
      background-color: rgba(39, 39, 39, 1);
    }
  }`;

  return [name, keyframeRule];
};

const animationClass = (aniName) => `
  .${aniName} {
    /* Apply or start animation? */
    animation-name: ${aniName};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    /* animation-fill-mode: forwards; */
  }
`;

const spawnTriangle = () => {
  if (document.getElementById("fizzle-text").textContent === 'Loading...') {
    debugger;
  }
  const triangle = document.createElement("div");

  const [aniName, keyframeRule] = dynamicKeyframe();
  insertDynamicCSSRule(keyframeRule);
  insertDynamicCSSRule(animationClass(aniName));
  triangle.classList.add(aniName);
  triangle.classList.add("triangle");
  // remove rule at ruleIndex and rule at

  setTimeout(() => {
    triangle.remove();
    removeMostRecentTriangleCSSRules();
  }, 2000);

  fizzleContainer.append(triangle);
};

let fizzleIntervalId;
let pauseCtr = 0;

// We use a pause ctr because we don't want to display fizzle if
// - the mouse is off the button
// - the button has been clicked
// Instead of having two separate states, we have one good state, and if either or both of the states is happening.
// This is good bc it covers the edge case where we disable the button, move our mouse off and the button tries to resume again.

const fizzleSetup = () => {
  const startAnimation = (e) => {
    pauseCtr += 1;
    if (pauseCtr <= 0) return;
    fizzleIntervalId = setInterval(() => spawnTriangle(), 30);
  };
  const stopAnimation = (e) => {
    pauseCtr -= 1;
    clearInterval(fizzleIntervalId);
  };

  fizzleContainer.addEventListener("pointerover", startAnimation);
  fizzleContainer.addEventListener("pointerout", stopAnimation);

  fizzleContainer.addEventListener("click", () => {
    console.log('CLICK')
    if (pauseCtr <= 0) return;
    stopAnimation();
    console.log('fizzle container clicked')
    document.getElementById("fizzle-text").textContent = "Loading...";
    pauseCtr -= 1;
    setTimeout(() => {
      console.log('fizzle container clicked - timeout')
      document.getElementById("fizzle-text").textContent = "Sizzle!";
      pauseCtr += 1;
      startAnimation();
    }, 2500);
  });

  fizzleContainer.addEventListener(
    "pointermove",
    (e) => {
      if (e.target.id === "fizzle-text") {
        const { x, y } = relativeCoords(e);
        adjustCentroid(x, y);
      } else {
        adjustCentroid(e.offsetX, e.offsetY);
      }
    },
    true
  );
};

console.log('TESTING LOGS')

fizzleSetup();

function relativeCoords(event) {
  var bounds = fizzleContainer.getBoundingClientRect();
  var x = event.clientX - bounds.left;
  var y = event.clientY - bounds.top;
  return { x: x, y: y };
}

const stopPropagationIfTriangle = (e) => {
  if (e.target.classList.contains("triangle")) {
    e.stopPropagation();
  }
};

document.addEventListener("pointerover", stopPropagationIfTriangle, true);
document.addEventListener("pointerout", stopPropagationIfTriangle, true);
document.addEventListener("pointermove", stopPropagationIfTriangle, true);
