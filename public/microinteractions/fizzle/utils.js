const compose = (...fns) => {
  const x = (...otherArgs) => {
    let res = otherArgs;
    for (f of fns) {
      console.log(f);
      console.log(res);
      res = [f(...res)];
    }

    return res[0];
  };

  return x;
};

/* Script exports */
const c = compose;

const isDefined = (value) => typeof value !== "undefined";
const isUndefined = (value) => !isDefined(value);

const allDefined = (...args) => args.every(isDefined);
const someUndefined = (...args) => args.some(isUndefined);

// const inc = (a) => a + 1;
// const double = (a) => a * 2;
// const sdouble = (a) => `${a}${a}`;

// console.log(c(double, inc)(5));
