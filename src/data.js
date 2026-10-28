export const D = {
"Electric circuit": {
 def:["An electric circuit is a closed path that electric charge can flow around. It usually has a battery, wires, a switch and something to power, like a bulb.","An electric circuit is a closed conducting loop in which a source maintains a potential difference, driving current through components such as resistors, lamps and switches."],
 nodes:[
  {l:"Battery",x:70,y:60,t:"The battery gives a push",s:["A battery pushes electric charge around. Think of the + and the − ends like the top and bottom of a slide.","The cell’s chemical reaction creates a potential difference (voltage) between its terminals, which drives charge round the loop."]},
  {l:"Switch",x:330,y:60,t:"The switch opens or closes the path",s:["The switch closes the gap in the loop. With the gap shut, charge can pass through.","A closed switch completes the conducting path. An open switch is an air gap with near-infinite resistance, so current stops."]},
  {l:"Bulb",x:330,y:200,t:"The bulb uses the energy",s:["The bulb’s thin wire resists the flow, so it heats up and glows.","The filament has high resistance; electrical energy is dissipated as heat and light (P = VI)."]},
  {l:"Wire",x:70,y:200,t:"The wire brings charge back",s:["The wire carries charge back to the battery so the loop is complete.","The return conductor completes the circuit. Current is the same at every point of a series loop."]}],
 terms:[["Voltage","The push from the battery.","Energy per unit charge, measured in volts (V)."],["Current","How much charge flows each second.","Rate of flow of charge, in amperes (A): I = Q/t."],["Resistance","How hard it is for charge to flow.","Opposition to current, in ohms (Ω). V = IR."],["Conductor","A material charge flows through easily, like copper.","A material with many free charge carriers, e.g. metals."]],
 real:["A torch is this exact circuit: a battery, a switch and a bulb in one closed loop. The wiring in your home works the same way, with the mains supply as the source.","A torch is a series circuit. Household wiring uses parallel branches so each appliance gets full supply voltage and can be switched independently."],
 quiz:[["What must a circuit have for the bulb to light up?",["A closed loop","An open gap","No battery","Only one wire"],0,"Charge only flows round a complete, closed loop."],["What does the switch do?",["Makes voltage","Opens or closes the path","Stores charge","Cools the wire"],1,"It closes or breaks the loop."],["Which is a good conductor?",["Rubber","Plastic","Copper","Wood"],2,"Copper has many free charges that move easily."]]},
"Water cycle": {
 def:["The water cycle is the way water moves around Earth: up into the air, into clouds, down as rain, and back to the sea.","The hydrological cycle is the continuous circulation of water between ocean, atmosphere and land, driven by solar energy and gravity."],
 nodes:[
  {l:"Evaporation",x:70,y:200,t:"The sun heats the water",s:["Heat from the sun turns water from seas and lakes into invisible vapour that rises.","Solar energy gives surface water molecules enough energy to escape as vapour (latent heat absorbed)."]},
  {l:"Condensation",x:110,y:60,t:"Vapour cools into clouds",s:["High up it is cold, so the vapour turns back into tiny drops that make clouds.","Rising air cools below its dew point; vapour condenses onto particles, releasing latent heat."]},
  {l:"Precipitation",x:330,y:60,t:"Water falls",s:["When cloud drops get heavy they fall as rain, hail or snow.","Droplets coalesce until gravity wins, falling as rain, sleet, snow or hail."]},
  {l:"Collection",x:330,y:200,t:"Water gathers again",s:["Rain runs into rivers and seas, and the cycle starts over.","Runoff, infiltration and groundwater flow return water to the oceans."]}],
 terms:[["Evaporation","Liquid water turning into vapour.","Phase change from liquid to gas at a surface."],["Condensation","Vapour turning back into drops.","Phase change gas to liquid on cooling."],["Precipitation","Water falling from clouds.","Any liquid or solid water falling to the surface."],["Runoff","Water flowing over the ground.","Surface flow of water that does not infiltrate soil."]],
 real:["Wet clothes drying on a line are evaporation. Drops on a cold glass are condensation.","Cloud seeding and reservoir planning both depend on understanding each stage’s rate."],
 quiz:[["What makes water evaporate?",["Wind only","Heat from the sun","Cold","Salt"],1,"Heat gives molecules the energy to escape."],["What forms clouds?",["Condensation","Collection","Runoff","Melting"],0,"Vapour cools and condenses into tiny drops."],["Rain, hail and snow are called…",["Evaporation","Precipitation","Collection","Vapour"],1,"Precipitation means water falling from clouds."]]},
"Photosynthesis": {
 def:["Photosynthesis is how plants make their own food using sunlight, water and air.","Photosynthesis converts light energy into chemical energy: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂, in chloroplasts."],
 nodes:[
  {l:"Roots",x:70,y:200,t:"Roots take in water",s:["Roots soak up water from the soil and send it up to the leaves.","Water is absorbed by root hairs and moves through xylem to the leaves."]},
  {l:"Leaf",x:110,y:60,t:"Leaves catch sunlight",s:["Green chlorophyll in the leaf catches sunlight.","Chlorophyll in chloroplasts absorbs mainly red and blue light, driving the light reactions."]},
  {l:"Stomata",x:330,y:60,t:"Air comes in",s:["Tiny holes called stomata let carbon dioxide into the leaf.","Stomata allow CO₂ in and O₂ and water vapour out; guard cells control opening."]},
  {l:"Glucose",x:330,y:200,t:"Food and oxygen are made",s:["The leaf makes sugar for the plant and releases oxygen for us to breathe.","The Calvin cycle fixes CO₂ into glucose; O₂ is released from splitting water."]}],
 terms:[["Chlorophyll","The green stuff that catches light.","Pigment in chloroplasts that absorbs light energy."],["Stomata","Tiny holes in leaves.","Pores that regulate gas exchange."],["Glucose","The sugar plants make.","A C₆H₁₂O₆ carbohydrate, the product of the Calvin cycle."],["Chloroplast","The part of the cell that does the work.","Organelle containing chlorophyll and the enzymes for photosynthesis."]],
 real:["Plants on your windowsill lean toward light. Forests keep the air’s oxygen topped up.","Crop yield, biofuels and artificial photosynthesis research all build on these steps."],
 quiz:[["Which gas do plants take in?",["Oxygen","Carbon dioxide","Nitrogen","Helium"],1,"CO₂ enters through the stomata."],["What catches sunlight?",["Chlorophyll","Roots","Soil","Stem"],0,"Chlorophyll absorbs light energy."],["What do plants release?",["Carbon dioxide","Oxygen","Smoke","Iron"],1,"Oxygen is released when water is split."]]}
};

D["Electric circuit"].pts=[[70,120],[70,40],[200,40],[330,40],[330,120],[330,200],[200,200],[70,200]];
D["Electric circuit"].nodes=[
{l:"Battery",x:70,y:120,p:0,bw:104,bh:46,t:"The battery gives a push",s:["A battery pushes electric charge around. Think of the + and the \u2212 ends like the top and bottom of a slide.","The cell\u2019s chemical reaction creates a potential difference (voltage) between its terminals, which drives charge round the loop."]},
{l:"Wire",x:200,y:40,p:2,bw:90,bh:26,t:"The charge flows along the wire",s:["Charge travels along the wire like water in a pipe, all the way round the loop.","Conduction electrons drift through the metal; the current is the same at every point of a series loop."]},
{l:"Bulb",x:330,y:120,p:4,bw:64,bh:64,t:"The bulb lights up",s:["The thin wire inside the bulb resists the flow, so it heats up and glows.","The filament has high resistance; electrical energy is dissipated as heat and light (P = VI)."]},
{l:"Switch",x:200,y:200,p:6,bw:100,bh:50,t:"The switch opens or closes the path",s:["Closing the switch fills the gap, so charge can pass. Open it and everything stops.","A closed switch completes the conducting path. An open switch is an air gap with near-infinite resistance, so current stops."]}];
D["Electric circuit"].deco='<path class="wire" d="M70 98V40H330V94M330 146V200H225M175 200H70V142"/><g class="bat"><path d="M48 108h44M58 128h24" stroke="#eef2f7" stroke-width="6" stroke-linecap="round"/><text x="36" y="112">+</text><text x="36" y="134">\u2212</text><text x="98" y="122" style="font-size:12px">Battery</text></g><g transform="translate(330 120)"><circle id="bulb" r="26" fill="none" stroke="#eef2f7" stroke-width="3"/><path d="M-12 8L-6-8 0 4 6-8 12 8" fill="none" stroke="#eef2f7" stroke-width="3"/><text x="-12" y="-34" style="font-size:12px">Bulb</text></g><circle cx="175" cy="200" r="6" fill="#8a93a6"/><circle cx="225" cy="200" r="6" fill="#8a93a6"/><line id="arm" x1="175" y1="200" x2="215" y2="176" stroke="#eef2f7" stroke-width="4" stroke-linecap="round"/><text x="188" y="232" style="font-size:12px">Switch</text>';
export const ALIAS={"circuit":"Electric circuit","electricity":"Electric circuit","water":"Water cycle","rain":"Water cycle","plants":"Photosynthesis","photosynthesis":"Photosynthesis"};


// ===== ILLUSTRATED DIAGRAMS for Water cycle and Photosynthesis =====
// (paste this at the very bottom of data.js)
 
// ---------- WATER CYCLE ----------
D["Water cycle"].pts = [[85,200],[140,130],[240,50],[250,95],[215,195]];
[[85,200,0,140,44],[240,48,2,100,40],[245,92,3,90,34],[215,195,4,90,36]].forEach((v, i) => {
  const n = D["Water cycle"].nodes[i];
  n.x = v[0]; n.y = v[1]; n.p = v[2]; n.bw = v[3]; n.bh = v[4];
});
D["Water cycle"].deco =
  '<rect x="0" y="200" width="400" height="60" fill="#4a3f2a"/>' +
  '<polygon points="225,200 330,82 400,200" fill="#4a5a73"/>' +
  '<polygon points="319,96 330,82 341,96 333,93 328,98 323,93" fill="#e8ecf6"/>' +
  '<path d="M262 160Q235 195 150 203" fill="none" stroke="#5b9dff" stroke-width="3" opacity=".7"/>' +
  '<ellipse cx="85" cy="203" rx="70" ry="16" fill="#5b9dff"/>' +
  '<g stroke="#5b9dff" stroke-width="2.5" fill="none" stroke-linecap="round">' +
    '<path d="M105 180q-7-8 0-16t0-16t0-16"/>' +
    '<path d="M130 180q-7-8 0-16t0-16t0-16"/>' +
    '<path d="M155 180q-7-8 0-16t0-16t0-16"/></g>' +
  '<g fill="#f5a524" stroke="#f5a524" stroke-width="2.5" stroke-linecap="round">' +
    '<circle cx="50" cy="45" r="17" stroke="none"/>' +
    '<path d="M50 18v8M50 64v8M23 45h8M69 45h8M31 26l6 6M63 58l6 6M69 26l-6 6M37 58l-6 6" fill="none"/></g>' +
  '<g fill="#3a4658"><ellipse cx="240" cy="48" rx="34" ry="14"/><ellipse cx="222" cy="40" rx="18" ry="13"/><ellipse cx="252" cy="36" rx="20" ry="14"/></g>' +
  '<g stroke="#5b9dff" stroke-width="2" stroke-linecap="round">' +
    '<path d="M222 70l-3 10M238 70l-3 10M254 70l-3 10M230 82l-3 10M246 82l-3 10"/></g>' +
  '<text x="50" y="84" text-anchor="middle">Sun</text>' +
  '<text x="285" y="34">Cloud</text>' +
  '<text x="85" y="206" text-anchor="middle" style="font-size:10px">Lake</text>' +
  '<text x="362" y="195" text-anchor="middle">Mountain</text>';
 
// ---------- PHOTOSYNTHESIS ----------
D["Photosynthesis"].pts = [[190,228],[148,110],[212,100],[190,165]];
[[190,228,0,70,40],[148,110,1,84,66],[212,100,2,44,50],[190,165,3,36,44]].forEach((v, i) => {
  const n = D["Photosynthesis"].nodes[i];
  n.x = v[0]; n.y = v[1]; n.p = v[2]; n.bw = v[3]; n.bh = v[4];
});
D["Photosynthesis"].deco =
  '<rect x="0" y="205" width="400" height="55" fill="#4a3f2a"/>' +
  '<circle cx="60" cy="232" r="2" fill="#7a6a4a"/><circle cx="110" cy="245" r="2" fill="#7a6a4a"/><circle cx="300" cy="238" r="2" fill="#7a6a4a"/><circle cx="340" cy="228" r="2" fill="#7a6a4a"/>' +
  '<g stroke="#cbb892" stroke-width="2" fill="none" stroke-linecap="round">' +
    '<path d="M190 205Q180 230 158 246"/><path d="M190 205V250"/><path d="M190 205Q200 230 222 246"/></g>' +
  '<path d="M190 205V100" stroke="#3ecf8e" stroke-width="8" stroke-linecap="round" fill="none"/>' +
  '<path d="M188 125C170 78 108 75 106 112C120 142 170 147 188 125Z" fill="#3ecf8e" stroke="#f5a524" stroke-width="2"/>' +
  '<path d="M192 118C195 85 215 78 228 82C230 105 212 122 192 118Z" fill="#3ecf8e" stroke="#f5a524" stroke-width="2"/>' +
  '<g fill="#f5a524" stroke="#f5a524" stroke-width="2.5" stroke-linecap="round">' +
    '<circle cx="50" cy="48" r="16" stroke="none"/>' +
    '<path d="M50 22v7M50 67v7M24 48h7M69 48h7M32 30l5 5M63 61l5 5M68 30l-5 5M37 61l-5 5" fill="none"/></g>' +
  '<g stroke="#f5a524" stroke-width="2" stroke-dasharray="5 4" fill="none">' +
    '<path d="M66 52L125 92"/><path d="M66 46L150 84"/><path d="M62 60L168 104"/></g>' +
  '<g fill="#111923" stroke="#8a93a6" stroke-width="2">' +
    '<circle cx="310" cy="78" r="12"/><circle cx="335" cy="104" r="12"/><circle cx="305" cy="128" r="12"/></g>' +
  '<g style="font-size:9px" text-anchor="middle"><text x="310" y="81">CO₂</text><text x="335" y="107">CO₂</text><text x="305" y="131">CO₂</text></g>' +
  '<g stroke="#8a93a6" stroke-width="1.5" stroke-dasharray="3 3"><path d="M296 82L236 98"/><path d="M322 106L238 102"/><path d="M293 126L234 108"/></g>' +
  '<text x="50" y="84" text-anchor="middle">Sun</text>' +
  '<text x="128" y="72" text-anchor="middle">Leaf</text>' +
  '<text x="212" y="72" text-anchor="middle">Stomata</text>' +
  '<text x="212" y="172">Glucose</text>' +
  '<text x="228" y="252">Roots</text>';
 