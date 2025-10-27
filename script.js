/* Serenity Hotel - Interactions */
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Year
  const y = $('#year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click',()=>{
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-pressed', String(isOpen));
    });
  }

  // Hero slider
  const slides = $$('.hero-slider .slide');
  let slideIdx = 0;
  function rotateSlides(){
    slides.forEach((el,i)=>el.classList.toggle('active', i===slideIdx));
    slideIdx = (slideIdx + 1) % slides.length;
  }
  if(slides.length){
    setInterval(rotateSlides, 5000);
  }

  // Scroll to top button
  const toTop = $('.to-top');
  if(toTop){
    window.addEventListener('scroll',()=>{
      toTop.classList.toggle('show', window.scrollY > 600);
    });
    toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  // Rooms filter
  const chips = $$('.filters .chip');
  const roomCards = $$('[data-room-list] .card');
  function setChipActive(activeChip){
    chips.forEach(c=>{
      const on = c===activeChip;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    const f = activeChip.getAttribute('data-filter');
    roomCards.forEach(card => {
      const type = card.getAttribute('data-type');
      const visible = f==='all' || type===f;
      card.style.display = visible ? '' : 'none';
    });
  }
  chips.forEach(ch => {
    // initialize aria-pressed
    ch.setAttribute('role','button');
    ch.setAttribute('aria-pressed', String(ch.classList.contains('active')));
    ch.tabIndex = 0;
    ch.addEventListener('click',()=> setChipActive(ch));
    ch.addEventListener('keydown',(e)=>{
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        setChipActive(ch);
      }
    });
  });

  // Room details modal
  const modal = $('#roomModal');
  const modalContent = $('#roomContent');
  const roomButtons = $$('[data-room-details]');
  function openModal(html){
    if(!modal) return;
    modalContent.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }
  roomButtons.forEach(btn => btn.addEventListener('click',()=>{
    const data = JSON.parse(btn.getAttribute('data-room-details'));
    const list = data.amenities.map(a=>`<li>${a}</li>`).join('');
    openModal(`
      <div class="stack">
        <p><strong>Tipe:</strong> ${data.type}</p>
        <p><strong>Ukuran:</strong> ${data.size}</p>
        <p><strong>Ranjang:</strong> ${data.bed}</p>
        <p><strong>Fasilitas:</strong></p>
        <ul>${list}</ul>
      </div>
    `);
  }));
  if(modal){
    modal.addEventListener('click',(e)=>{
      if(e.target.matches('[data-close]') || e.target === modal.querySelector('.modal-backdrop')){
        closeModal();
      }
    });
    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape' && !modal.hidden) closeModal();
    });
  }

  // Carousel controls
  const carousel = $('[data-carousel]');
  if(carousel){
    const track = $('.car-track', carousel);
    const prev = $('.car-btn.prev', carousel);
    const next = $('.car-btn.next', carousel);
    const scrollBy = () => track.clientWidth * .9;
    prev.addEventListener('click',()=> track.scrollBy({left:-scrollBy(),behavior:'smooth'}));
    next.addEventListener('click',()=> track.scrollBy({left:scrollBy(),behavior:'smooth'}));
  }

  // Availability form simple check
  const availabilityForm = $('#availabilityForm');
  const availabilityResult = $('#availabilityResult');
  if(availabilityForm){
    availabilityForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fd = new FormData(availabilityForm);
      const ci = new Date(fd.get('checkin'));
      const co = new Date(fd.get('checkout'));
      if(!(ci instanceof Date) || !(co instanceof Date) || isNaN(ci) || isNaN(co)){
        availabilityResult.textContent = 'Tanggal tidak valid.';
        availabilityResult.style.color = '#ef4444';
        return;
      }
      if(co <= ci){
        availabilityResult.textContent = 'Check‑out harus setelah check‑in.';
        availabilityResult.style.color = '#ef4444';
        return;
      }
      // Dummy availability always true
      availabilityResult.textContent = 'Kamar tersedia! Lanjutkan pemesanan di bawah.';
      availabilityResult.style.color = '#10b981';
      document.getElementById('bCheckin').value = fd.get('checkin');
      document.getElementById('bCheckout').value = fd.get('checkout');
      document.getElementById('bGuests').value = fd.get('guests');
      document.getElementById('bRoomType').value = fd.get('roomType');
      document.getElementById('booking').scrollIntoView({behavior:'smooth'});
    });
  }

  // Booking form validation + price calc
  const bookingForm = $('#bookingForm');
  const totalEl = $('#bookingTotal');
  const nightly = { standard: 850000, deluxe: 1350000, suite: 2600000 };
  function calcNights(ci, co){
    const ms = co - ci;
    return Math.max(1, Math.round(ms / (1000*60*60*24)));
  }
  function rupiah(n){
    return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
  }
  function updateTotal(){
    const ci = new Date($('#bCheckin').value);
    const co = new Date($('#bCheckout').value);
    const type = $('#bRoomType').value;
    if(!isNaN(ci) && !isNaN(co) && co>ci){
      const nights = calcNights(ci, co);
      const base = nightly[type] * nights;
      const guests = Math.max(1, parseInt($('#bGuests').value || '1',10));
      const addGuest = Math.max(0, guests-2) * 150000 * nights; // extra guest fee
      const tax = 0.1 * (base + addGuest);
      totalEl.textContent = `Perkiraan: ${rupiah(base + addGuest + tax)}`;
    } else {
      totalEl.textContent = 'Perkiraan: Rp 0';
    }
  }
  ['bCheckin','bCheckout','bRoomType','bGuests'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', updateTotal);
  });
  updateTotal();

  function setError(id, msg){
    const err = document.querySelector(`[data-error-for="${id}"]`);
    if(err){ err.textContent = msg || ''; }
  }
  function validateEmail(v){
    return /.+@.+\..+/.test(v);
  }
  if(bookingForm){
    bookingForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      let ok = true;
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const ci = new Date($('#bCheckin').value);
      const co = new Date($('#bCheckout').value);
      const guests = parseInt($('#bGuests').value || '1',10);
      if(name.length < 3){ setError('name','Nama minimal 3 karakter'); ok=false; } else setError('name');
      if(!validateEmail(email)){ setError('email','Email tidak valid'); ok=false; } else setError('email');
      if(isNaN(ci) || isNaN(co) || co<=ci){ setError('bCheckin','Periksa tanggal'); setError('bCheckout','Periksa tanggal'); ok=false; } else { setError('bCheckin'); setError('bCheckout'); }
      if(!(guests>=1 && guests<=4)){ setError('bGuests','Tamu 1-4'); ok=false; } else setError('bGuests');
      if(!ok) return;
      updateTotal();
      const summary = `Terima kasih, ${name}! Permintaan pemesanan Anda telah diterima. Kami akan menghubungi ${email} untuk konfirmasi.`;
      alert(summary);
      bookingForm.reset();
      updateTotal();
    });
  }
})();


