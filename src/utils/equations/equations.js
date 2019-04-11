export const ReTube = (params) => {
  console.log('calculating reynolds tube...')
  const at = At(params.innerD, params.noTubes)
  const ut = Ut(params.tsMassFlow, params.tsDensity, at)
  const ret = (params.tsDensity * ut * params.innerD)/params.tsViscosity
  console.log('Reynolds tube side is ',ret)
};

export const Pr = () => {
  console.log('hello there!')
};

export const NuTube = () => {
  console.log('hello there!')
};

export const As = () => {
  console.log('hello there!')
};

export const ReShell = () => {
  console.log('hello there!')
};

export const jColburn = () => {
  console.log('hello there!')
};

export const hIdeal = () => {
  console.log('hello there!')
};

export const overallHTC = () => {
  console.log('hello there!')
};

let At = (inner, noTubes) => {
  At= (Math.PI/4) * Math.pow(inner, 2) * noTubes;
  console.log('At is ',At)
  return At
};

let Ut = (massFlow, density, At) => {
  ut = massFlow/(density * At * 3600)
  console.log('ut is ',ut)
  return ut
};