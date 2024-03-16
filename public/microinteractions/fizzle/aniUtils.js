let styleSheet;

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

const insertDynamicCSSRule = (ruleString) => {
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
  }

  // We insert at the tail to treat the rule list like a queue
  const tailIndex = styleSheet.sheet.cssRules.length;
  styleSheet.sheet.insertRule(ruleString, tailIndex);
};

const removeDynamicCSSRule = (ruleIndex) => {
  styleSheet.sheet.removeRule(ruleIndex);
};

const removeMostRecentTriangleCSSRules = () => {
  removeDynamicCSSRule(1);
  removeDynamicCSSRule(0);
};
