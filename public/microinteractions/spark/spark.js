let styleSheet = null;

const SPARK_ELEMENT_WIDTH = 30;
const DISTANCE = 40;

const RANDOMNESS_ON = true;

/**
 * A burst is a grouping of many sparks
 * A spark is some individual dom element generally used with other sparks to create interesting UI effects.
 **/

/**
 * Util for creating sequences of css transform steps cleanly
 */
function createTransformSteps() {
  if (Array.from(arguments).length === 0) {
    throw Exception("arguments to createTransformSteps should never be empty!");
  }

  const inputSteps = Array.from(arguments);
  const outputSteps = [inputSteps.shift()];
  inputSteps.forEach((step, i) => {
    outputSteps.push(`${outputSteps[i]} ${step}`);
  });

  return outputSteps;
}

/**
 * Creates a new keyframe rule available in css context with a specific spark rotation
 */
const dynamicAnimation = (name, rotation) => {
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);
  }

  /**
  Explaining the transform rules
  1. prepares spark
  2. shoots the spark out
  3. keeps the spark in place while scaling it down
*/

  const randomDist = RANDOMNESS_ON
    ? Math.floor((Math.random() - 0.5) * DISTANCE * 0.7)
    : 0;

  // Scale 0.001
  const [s1, s2, s3] = createTransformSteps(
    `translate(-50%, -50%) rotate(${rotation}deg) translate(10px, 0px)`,
    `translate(${DISTANCE + randomDist}px, 0px) scale(0.5, 0.5)`,
    `translate(${SPARK_ELEMENT_WIDTH / 2}px, 0) scale(0.001,0.001)`
  );

  // todo some axis would be good here.
  styleSheet.sheet.insertRule(
    `@keyframes ${name} {
     0% {
       transform: ${s1};
     }
     70% {
       transform: ${s2};
     }
     100% {
       transform: ${s3};
     }
  }`,
    styleSheet.length
  );
};

document.getElementById("btn").addEventListener("click", (e) => {
  const center = { x: e.pageX, y: e.pageY };
  makeBurst(center);
});

const makeBurst = (center) => {
  for (let i = 0; i < 8; i++) {
    const randomSpace = RANDOMNESS_ON
      ? Math.floor(-17 + Math.random() * 34)
      : 0;
    makeSpark(center, 45 * i + randomSpace);
  }
};

/**
 * Creates a spark
 */
const makeSpark = (center, rotation) => {
  const div = document.createElement("div");
  const aniName = `disappear_${rotation}`;
  dynamicAnimation(aniName, rotation);

  div.classList.add("spark");
  div.style.left = `${center.x}px`;
  div.style.top = `${center.y}px`;
  div.style.animation = `${aniName} 500ms ease-out both`;

  document.body.append(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 550);
};
