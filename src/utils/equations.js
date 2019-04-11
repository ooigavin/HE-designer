export const ReTube = (params) => {
  console.log('\ncalculating reynolds tube...')
  const at = At(params.innerD, params.noTubes)
  const ut = Ut(params, at)
  const ret = (params.tsDensity * ut * params.innerD)/params.tsViscosity
  console.log('Reynolds tube side is ',ret)

  return ret;
};

export const Pr = (params) => {
  console.log('\ncalculating Pr...')
  let pr = (params.tsHeatCap * params.tsViscosity)/params.tsConductivity
  console.log('Pr is ',pr)

  return pr;
};

export const Ft = (re) => {
  console.log('\ncalculating ft...')
  let ln = Math.log(re)
  let inter = (1.58 * ln) - 3.28
  let ft = Math.pow(inter, -2)
  console.log('ft is ', ft)

  return ft;
};

export const NuTube = (params, re, pr, ft) => {
  console.log('\ncalculating NuTube...')
  let nu = 0
  const friction = ft/2
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
  console.log('\ncalculating ht...')
  let ht = (nu * params.tsConductivity)/params.innerD
  console.log('ht is ', ht)

  return ht;
};

export const PressureTube = (params, ft, ut) => {
  console.log('\ncalculating pressureTube...')
  let inter1 = (ft * params.tubeLength * params.noPasses)/params.innerD
  let inter2 = inter1 + (4 * params.noPasses)
  let inter3 = (params.tsDensity * Math.pow(ut, 2))/2
  let pressureTube = 4 * inter2 * inter3

  console.log('pressureTube is ', pressureTube)
  
  return pressureTube;
};

export const De = (params) => {
  console.log('\ncalculating De...')
  let De = 0
  let inter1 = 0
  let inter2 = 0

  if ([45, 90].includes(params.tubeLayout)){
    console.log('layout is square')
    inter1 = Math.pow(params.tubePitch, 2) 
    inter2 = (Math.PI * Math.pow(params.outerD, 2))/4
    De = (4 * (inter1 - inter2))/(Math.PI * params.outerD)
  }else{
    console.log('layout is triangular')
    inter1 = (Math.pow(params.tubePitch, 2) * Math.pow(3, 1/2))/4
    inter2 = (Math.PI * Math.pow(params.outerD, 2))/8
    De = (4 * (inter1- inter2))/((Math.PI * params.outerD)/2)
  };

  console.log('De is ', De)
  return De
};

export const AreaS = (params) => {
  console.log('\ncalculating As...')
  let As = (1 - (params.outerD/params.tubePitch)) * params.shellD * params.baffleSpacing
  console.log('As is ', As)

  return As
};

export const ReShell = (params, As, De) => {
  console.log('\ncalculating reShell...')
  let reShell = (params.ssMassFlow * De)/(As * params.ssViscosity)

  console.log('reShell is ', reShell)
  return reShell
};

export const jColburn = (params) => {
  console.log('\ncalculating something...')
  console.log('something is ', something)
};

export const hIdeal = (params) => {
  console.log('\ncalculating something...')
  console.log('something is ', something)
};

export const overallHTC = (params) => {
  console.log('\ncalculating something...')
  console.log('something is ', something)
};

export const At = (inner, noTubes) => {
  let at = (Math.PI/4) * Math.pow(inner, 2) * noTubes;
  console.log('At is ', at)
  return at
};

export const Ut = (params, At) => {
  let ut = params.tsMassFlow/(params.tsDensity * At)
  console.log('ut is ',ut)
  return ut
};

export const generateHTML = (name, plan, params, results) => {
  let passText = ''
  if (results.passed){
    passText = `<h3 style="display: inline-block; color: green;">Passed</h3>`
  }else{
    passText = `<h3 style="display: inline-block; color: red;">Failed</h3>`
  }
  let html = ''
  if (plan === 'rating'){
    html = `
    <div>
    <h2 style="margin-bottom: 0;margin-left: 10;color: #59C6D1">Rating Analysis: ${name}</h2>
    <table cellpadding="10">
        <tr valign='top'>

            <td>
                <h3 style="margin-bottom: 0;color: #3B4F51">Fluid Properties</h3>
                <table style="font-size: 14.5px" cellpadding="10" border="1|0">
                    <tr>
                        <th>Fluid Parameters</th>
                        <th>Shell-Side</th>
                        <th>Tube-Side</th>
                    </tr>
                    <tr>
                        <td>Inlet Temperature</td>
                        <td>${params.ssInletTemp}</td>
                        <td>${params.tsInletTemp}</td>
                    </tr>
                    <tr>
                        <td>Outlet Temperature</td>
                        <td>${params.ssOutletTemp}</td>
                        <td>${params.tsOutletTemp}</td>
                    </tr>
                    <tr>
                        <td>Mass Flow Rate</td>
                        <td>${params.ssMassFlow}</td>
                        <td>${params.tsMassFlow}</td>
                    </tr>
                    <tr>
                        <td>Specific Heat Capacity</td>
                        <td>${params.ssHeatCap}</td>
                        <td>${params.tsHeatCap}</td>
                    </tr>
                    <tr>
                        <td>Dynamic Viscosity</td>
                        <td>${params.ssViscosity}</td>
                        <td>${params.tsViscosity}</td>
                    </tr>
                    <tr>
                        <td>Thermal Conductivity</td>
                        <td>${params.ssConductivity}</td>
                        <td>${params.tsConductivity}</td>
                    </tr>
                    <tr>
                        <td>Density</td>
                        <td>${params.ssDensity}</td>
                        <td>${params.tsDensity}</td>
                    </tr>
                </table>
            </td>

            <td>
                <h3 style="margin-bottom: 0;color: #3B4F51">Physical Properties</h3>
                <table style="font-size: 14.5px" cellpadding="10" border="1|0">
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>Number of Tubes</td>
                        <td>${params.noTubes}</td>
                    </tr>
                    <tr>
                        <td>Tube Pitch</td>
                        <td>${params.tubePitch}</td>
                    </tr>
                    <tr>
                        <td>Tube Inner Diameter</td>
                        <td>${params.innerD}</td>
                    </tr>
                    <tr>
                        <td>Tube Outer Diameter</td>
                        <td>${params.outerD}</td>
                    </tr>
                    <tr>
                        <td>Tube Layout</td>
                        <td>${params.tubeLayout}</td>
                    </tr>
                    <tr>
                        <td>Number of Passes</td>
                        <td>${params.noPasses}</td>
                    </tr>
                    <tr>
                        <td>Number of Baffles</td>
                        <td>${params.noBaffles}</td>
                    </tr>
                    <tr>
                        <td>Baffle Cut</td>
                        <td>${params.baffleCut}</td>
                    </tr>
                    <tr>
                        <td>Baffle Spacing</td>
                        <td>${params.baffleSpacing}</td>
                    </tr>
                    <tr>
                        <td>Shell Diameter</td>
                        <td>${params.shellD}</td>
                    </tr>
                    <tr>
                        <td>Tube Unsupported Length</td>
                        <td>${params.tubeUnsupported}</td>
                    </tr>
                    <tr>
                        <td>Tube Youngs Modulus</td>
                        <td>${params.tubeYoungs}</td>
                    </tr>
                    <tr>
                        <td>Tude Longitudinal Stress</td>
                        <td>${params.tubeLongitStress}</td>
                    </tr>
                    <tr>
                        <td>Added Mass Coefficient</td>
                        <td>${params.addedMassCoeff}</td>
                    </tr>
                    <tr>
                        <td>Metal Mass/Unit Length</td>
                        <td>${params.metalMassPer}</td>
                    </tr>
                    <tr>
                        <td>Acceptable Fouling</td>
                        <td>${params.acceptableFouling}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<!-- results -->
<br/>
<div style="margin-top: 20;">
    <table cellpadding="18">
        <tr valign='top'>
            <td>
                <h3 style="color: #3B4F51">Rating Results</h3>
                <table cellpadding="10" border="1|0">
                    <tr>
                        <th>Parameters</th>
                        <th>Results</th>
                    </tr>
                    <tr>
                        <td>Tube-side heat transfer coefficient</td>
                        <td>${results.hTube}</td>
                    </tr>
                    <tr>
                        <td>Tube-side pressure drop</td>
                        <td>${results.pressureTube}</td>
                    </tr>
                    <tr>
                        <td>Shell-side heat transfer coefficient</td>
                        <td>${results.hShell}</td>
                    </tr>
                    <tr>
                        <td>Shell-side pressure drop</td>
                        <td>${results.pressureShell}</td>
                    </tr>
                </table>
            </td>
            <td>
                <h3 style="color: #3B4F51">Fouling & Vibration Checks</h3>
                <table cellpadding="10" border="1|0">
                    <tr>
                        <th>Parameters</th>
                        <th>Results</th>
                    </tr>
                    <tr>
                        <td>Critical Flow Velocity</td>
                        <td>${results.critSpeed}</td>
                    </tr>
                    <tr>
                        <td>Damping Constant</td>
                        <td>${results.damp}</td>
                    </tr>
                    <tr>
                        <td>Natural Frequency</td>
                        <td>${results.fn}</td>
                    </tr>
                    <tr>
                        <td>Calculated Fouling Resistance</td>
                        <td>${results.fouling}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<div>
    <h3 style="display: inline-block; margin-left: 10;">Overall Rating Result: </h3>
    ${passText}
</div>
    `
  }else{
    html = `
    <div>
  <h2 style="margin-bottom: 0;margin-left: 10;color: #59C6D1">Sizing Analysis: ${name}</h2>
              <h3 style="margin-bottom: 0;color: #3B4F51">Fluid Properties</h3>
              <table width='100%' style="font-size: 14.5px" cellpadding="10" border="1|0">
                  <tr>
                      <th>Fluid Parameters</th>
                      <th>Shell-Side</th>
                      <th>Tube-Side</th>
                  </tr>
                  <tr>
                      <td>Inlet Temperature</td>
                      <td>${params.ssInletTemp}</td>
                      <td>${params.tsInletTemp}</td>
                  </tr>
                  <tr>
                      <td>Outlet Temperature</td>
                      <td>${params.ssOutletTemp}</td>
                      <td>${params.tsOutletTemp}</td>
                  </tr>
                  <tr>
                      <td>Specific Heat Capacity</td>
                      <td>${params.ssHeatCap}</td>
                      <td>${params.tsHeatCap}</td>
                  </tr>
                  <tr>
                      <td>Mass Flow Rate</td>
                      <td>${params.ssMassFlow}</td>
                      <td>${params.tsMassFlow}</td>
                  </tr>
                  <tr>
                      <td>Tube-side Velocity</td>
                      <td colspan="2">${params.tsVelocity}</td>
                  </tr>
                  <tr>
                      <td>Tube-side Density</td>
                      <td colspan="2">${params.tsDensity}</td>
                  </tr>
                  <tr>
                      <td>Number of Passes</td>
                      <td colspan="2">${params.noPasses}</td>
                  </tr>
                  <tr>
                      <td>Tube Pitch</td>
                      <td colspan="2">${params.tubePitch}</td>
                  </tr>
                  <tr>
                      <td>Tube Layout</td>
                      <td colspan="2">${params.tubeLayout}</td>
                  </tr>
                  <tr>
                      <td>Tube Inner Diameter</td>
                      <td colspan="2">${params.innerD}</td>
                  </tr>
                  <tr>
                      <td>Tube Outer Diameter</td>
                      <td colspan="2">${params.outerD}</td>
                  </tr>
              </table>
</div>
<!-- results -->
<div style="margin-top: 20;">
    <h3 style="color: #3B4F51">Sizing Results</h3>
    <table cellpadding="10" width='100%' border="1|0">
        <tr>
            <th>Parameters</th>
            <th>Results</th>
        </tr>
        <tr>
            <td>Shell Diameter</td>
            <td>${results.shellD}</td>
        </tr>
        <tr>
            <td>Number of Tubes</td>
            <td>${results.noTubes}</td>
        </tr>
        <tr>
            <td>Tube Length</td>
            <td>${results.tubeLength}</td>
        </tr>
    </table>
</div>

    `
  };

  return html
};