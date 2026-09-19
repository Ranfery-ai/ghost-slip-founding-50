
const cfg = window.GS_CONFIG || {};
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const copy = {
  en: {
    title:"Always with you. Never in your way.",
    sub:"The Founding 50",
    hero:"Your phone belongs with you — not in the way.",
    lede:"Ghost-Slip is a rear-waist phone carrier being developed to free your pockets while keeping your phone secure, discreet and easy to grab.",
    reserve:"Reserve my Ghost-Slip",
    watch:"See the prototype",
    problem:"We got used to the phone being in the way.",
    problemText:"Driving. Restaurants. Travel. Sitting. Work. Stairs. Exercise. We keep moving a tiny computer from pocket to hand to table because we accepted the pocket as its permanent home.",
    answer:"What if the phone simply had a better place to live?",
    demo:"The real prototype",
    demoText:"The next demo video will show insertion, walking, sitting, bending, stairs and jumping with a different phone.",
    features:"Built around real movement",
    founding:"Become one of the Founding 50",
    reserveText:"A small refundable reservation is our first real market test. Founder reservations receive first-production priority, founder pricing and first color choice.",
    status:"Development status",
    faq:"Questions before reserving?"
  },
  es: {
    title:"Siempre contigo. Nunca estorbando.",
    sub:"Los Primeros 50",
    hero:"Tu teléfono debe ir contigo — no estorbándote.",
    lede:"Ghost-Slip es un portateléfono de cintura trasera en desarrollo para liberar tus bolsillos y mantener el teléfono seguro, discreto y fácil de tomar.",
    reserve:"Reservar mi Ghost-Slip",
    watch:"Ver el prototipo",
    problem:"Nos acostumbramos a que el teléfono estorbe.",
    problemText:"Manejando. En restaurantes. Viajando. Sentados. Trabajando. Subiendo escaleras. Haciendo ejercicio. Movemos una pequeña computadora del bolsillo a la mano y a la mesa porque aceptamos el bolsillo como su hogar permanente.",
    answer:"¿Y si el teléfono simplemente tuviera un mejor lugar donde vivir?",
    demo:"El prototipo real",
    demoText:"El siguiente video mostrará inserción, caminar, sentarse, agacharse, subir escaleras y saltar con otro teléfono.",
    features:"Diseñado para movimiento real",
    founding:"Sé parte de los Primeros 50",
    reserveText:"Una pequeña reservación reembolsable es nuestra primera prueba real de mercado. Las reservaciones fundadoras reciben prioridad de producción, precio fundador y primera elección de color.",
    status:"Estado de desarrollo",
    faq:"¿Preguntas antes de reservar?"
  }
};

let lang = localStorage.getItem("gs_lang") || "en";
function applyLang(){
  document.documentElement.lang=lang;
  $$("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(copy[lang][key]) el.textContent=copy[lang][key];
  });
  $("#langBtn").textContent = lang==="en" ? "ES" : "EN";
}
$("#langBtn")?.addEventListener("click",()=>{lang=lang==="en"?"es":"en";localStorage.setItem("gs_lang",lang);applyLang();});
applyLang();

$("#depositAmount").textContent = `${cfg.depositMXN || 250} MXN`;
$("#campaignName").textContent = cfg.campaignName || "The Founding 50";

if(cfg.videoEmbedUrl){
  $("#videoShell").innerHTML = `<iframe src="${cfg.videoEmbedUrl}" title="Ghost-Slip prototype demo" allowfullscreen></iframe>`;
}

if(cfg.setupMode){
  $$(".setup-alert").forEach(el=>el.style.display="block");
}

const form = $("#reserveForm");
form?.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const params = new URLSearchParams(location.search);
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(k=>fd.append(k,params.get(k)||""));
  fd.append("language",lang);
  fd.append("reservation_amount_mxn", cfg.depositMXN || 250);

  if(!cfg.formEndpoint){
    $("#formStatus").textContent = lang==="en"
      ? "Reservation form is ready, but the form endpoint must be connected before public launch."
      : "El formulario está listo, pero hay que conectar el destino del formulario antes del lanzamiento público.";
    return;
  }
  $("#formStatus").textContent = lang==="en" ? "Sending..." : "Enviando...";
  try{
    const res = await fetch(cfg.formEndpoint,{method:"POST",body:fd,headers:{"Accept":"application/json"}});
    if(!res.ok) throw new Error("Form submission failed");
    if(cfg.paymentUrl){
      location.href=cfg.paymentUrl;
    } else {
      $("#formStatus").textContent = lang==="en"
        ? "Reservation received. Payment link will be sent separately."
        : "Reservación recibida. El enlace de pago se enviará por separado.";
      form.reset();
    }
  }catch(err){
    $("#formStatus").textContent = lang==="en"
      ? "Could not submit. Please try again or contact the founder."
      : "No se pudo enviar. Intenta de nuevo o contacta al fundador.";
  }
});

function injectAnalytics(){
  if(cfg.ga4Id){
    const s=document.createElement("script"); s.async=true; s.src=`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`; document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments)}; gtag("js",new Date()); gtag("config",cfg.ga4Id);
  }
  if(cfg.metaPixelId){
    // lightweight Meta Pixel loader
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init',cfg.metaPixelId);fbq('track','PageView');
  }
}
injectAnalytics();
