export const ReTube = (params) => {
  console.log('calculating reynolds tube...')
  const at = At(params.innerD, params.noTubes)
  const ut = Ut(params.tsMassFlow, params.tsDensity, at)
  const ret = (params.tsDensity * ut * params.innerD)/params.tsViscosity
  console.log('Reynolds tube side is ',ret)

  return ret;
};

export const Pr = (params) => {
  console.log('calculating Pr...')
  let pr = (params.tsHeatCap * params.tsViscosity)/params.tsConductivity
  console.log('Pr is ',pr)

  return pr;
};

export const Ft = (re) => {
  console.log('calculating ft...')
  console.log(re)
  let ln = Math.log(re)
  console.log(ln)
  let inter = (1.58 * ln) - 3.28
  console.log(inter)
  let ft = Math.pow(inter, -2)
  console.log('ft is ', ft)

  return ft;
};

export const NuTube = (params, re, pr) => {
  console.log('calculating NuTube...')
  let nu = 0
  const friction = Ft(re)/2
  if (re > 2000){
    let inter1 = friction * re * pr
    let inter2 = Math.pow(friction, 1/2)
    let inter3 = Math.pow(pr, 2/3) - 1

    nu = inter1/(1.07 + (12.7 * inter2 * inter3))
  }else {
    let inter = Math.pow(((re * pr * params.innerD)/params.tubeLength), 1/3)
    nu = 1.86 * inter
  };
  console.log('nu is ', nu)

  return nu;
};

export const Ht = (params, nu) => {
  console.log('calculating ht...')
  let ht = (nu * params.tsConductivity)/params.innerD
  console.log('ht is ', ht)
  return ht;
};

export const As = (params) => {
  console.log('calculating something...')
  console.log('something is ', something)
};

export const ReShell = (params) => {
  console.log('calculating something...')
  console.log('something is ', something)
};

export const jColburn = (params) => {
  console.log('calculating something...')
  console.log('something is ', something)
};

export const hIdeal = (params) => {
  console.log('calculating something...')
  console.log('something is ', something)
};

export const overallHTC = (params) => {
  console.log('calculating something...')
  console.log('something is ', something)
};

let At = (inner, noTubes) => {
  let at = (Math.PI/4) * Math.pow(inner, 2) * noTubes;
  console.log('At is ', at)
  return at
};

let Ut = (massFlow, density, At) => {
  let ut = massFlow/(density * At * 3600)
  console.log('ut is ',ut)
  return ut
};