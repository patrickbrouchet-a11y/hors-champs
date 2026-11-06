import './style.css';
import content from '../content.yaml';

const { brand, announcement, navigation, drop, manifesto, lookbook, products, details, access, footer } = content;

// Échappe le texte venant du YAML avant de l'injecter dans le HTML.
const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Placeholder d'image : clairement identifié comme tel, jamais présenté comme une photo réelle.
const placeholder = (caption, extraClass = '') => `
  <div class="ph ${extraClass}" role="img" aria-label="Image à venir : ${esc(caption)}">
    <span class="ph__tag">Image à venir</span>
    <span class="ph__caption">${esc(caption)}</span>
  </div>`;

const sections = {
  announcement: () => `
    <div class="announcement">
      <p class="label">${esc(announcement.text)}</p>
    </div>`,

  header: () => `
    <header class="header">
      <a class="header__logo" href="#top">${esc(brand.name)}</a>
      <nav class="header__nav" aria-label="Navigation principale">
        ${navigation.map((l) => `<a class="label" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
      </nav>
      <a class="header__cta label" href="${esc(drop.primary_cta.href)}">${esc(drop.primary_cta.label)}</a>
    </header>`,

  hero: () => `
    <section class="hero" id="top">
      <div class="hero__text">
        <p class="label hero__kicker">${esc(drop.label)}</p>
        <h1 class="hero__title">${esc(drop.title)}</h1>
        <p class="hero__tagline">${esc(brand.tagline)}</p>
        <div class="hero__ctas">
          <a class="btn btn--primary" href="${esc(drop.primary_cta.href)}">${esc(drop.primary_cta.label)}</a>
          <a class="btn btn--ghost" href="${esc(drop.secondary_cta.href)}">${esc(drop.secondary_cta.label)}</a>
        </div>
        <dl class="hero__meta">
          <div><dt class="label">Lancement</dt><dd>${esc(drop.launch_date)}</dd></div>
          <div><dt class="label">Disponibilité</dt><dd><span class="dot" aria-hidden="true"></span>${esc(drop.availability)}</dd></div>
          <div><dt class="label">Statut</dt><dd>${esc(drop.status)}</dd></div>
        </dl>
      </div>
      ${placeholder(drop.hero_image.placeholder, 'hero__image')}
    </section>`,

  manifesto: () => `
    <section class="manifesto section section--dark" id="manifesto">
      <p class="label">Manifeste</p>
      <h2 class="h2">${esc(manifesto.title)}</h2>
      <p class="manifesto__text">${esc(manifesto.text)}</p>
      <ul class="manifesto__points">
        ${manifesto.points.map((p) => `<li>${esc(p)}</li>`).join('')}
      </ul>
      <ul class="territory" aria-label="Territoire de marque">
        ${brand.territory.map((t) => `<li class="label">${esc(t)}</li>`).join('')}
      </ul>
    </section>`,

  lookbook: () => `
    <section class="lookbook section" id="lookbook">
      <div class="section__head">
        <p class="label">Lookbook</p>
        <h2 class="h2">${esc(lookbook.title)}</h2>
        <p class="section__intro">${esc(lookbook.intro)}</p>
      </div>
      <div class="lookbook__grid">
        ${lookbook.looks
          .map(
            (look, i) => `
          <figure class="look look--${i + 1}">
            ${placeholder(look.placeholder)}
            <figcaption><span class="label">${esc(look.label)}</span> ${esc(look.caption)}</figcaption>
          </figure>`
          )
          .join('')}
      </div>
    </section>`,

  products: () => `
    <section class="products section" id="collection">
      <div class="section__head">
        <p class="label">Collection</p>
        <h2 class="h2">${esc(drop.name)}</h2>
      </div>
      <ul class="products__grid">
        ${products
          .map(
            (p, i) => `
          <li class="product">
            ${placeholder(p.placeholder)}
            <div class="product__body">
              <p class="label">${String(i + 1).padStart(2, '0')} · ${esc(p.status)}</p>
              <h3 class="product__name">${esc(p.name)}</h3>
              <p class="product__desc">${esc(p.description)}</p>
            </div>
          </li>`
          )
          .join('')}
      </ul>
    </section>`,

  details: () => `
    <section class="details section" id="details">
      <div class="section__head">
        <p class="label">Détails techniques</p>
        <h2 class="h2">${esc(details.title)}</h2>
        <p class="section__intro">${esc(details.intro)}</p>
      </div>
      <ol class="details__list">
        ${details.items.map((d) => `<li><p class="label">${esc(d.label)}</p><p>${esc(d.text)}</p></li>`).join('')}
      </ol>
    </section>`,

  access: () => `
    <section class="access section section--dark" id="access">
      <p class="label">Accès anticipé</p>
      <h2 class="h2">${esc(access.title)}</h2>
      <p class="access__text">${esc(access.text)}</p>
      <form class="access__form" novalidate>
        <label class="label" for="email">${esc(access.input_label)}</label>
        <div class="access__row">
          <input id="email" name="email" type="email" autocomplete="email" placeholder="nom@exemple.fr" required />
          <button class="btn btn--primary" type="submit">${esc(access.button_label)}</button>
        </div>
        <p class="access__feedback" role="status" aria-live="polite"></p>
        <p class="access__note label">${esc(access.note)}</p>
      </form>
    </section>`,

  footer: () => `
    <footer class="footer">
      <p class="footer__brand">${esc(brand.name)}</p>
      <nav class="footer__links" aria-label="Liens du pied de page">
        ${footer.links.map((l) => `<a class="label" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
      </nav>
      <nav class="footer__legal" aria-label="Informations légales">
        ${footer.legal.map((l) => `<a class="label" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
      </nav>
      <p class="footer__disclaimer">${esc(footer.disclaimer)}</p>
    </footer>`,
};

document.querySelector('#app').innerHTML = `
  ${sections.announcement()}
  ${sections.header()}
  <main>
    ${sections.hero()}
    ${sections.manifesto()}
    ${sections.lookbook()}
    ${sections.products()}
    ${sections.details()}
    ${sections.access()}
  </main>
  ${sections.footer()}
`;

// Formulaire visuel uniquement : aucune donnée n'est envoyée ni stockée.
const form = document.querySelector('.access__form');
const feedback = form.querySelector('.access__feedback');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input');
  if (!input.checkValidity()) {
    feedback.textContent = 'Entre une adresse email valide.';
    feedback.dataset.state = 'error';
    input.focus();
    return;
  }
  feedback.textContent = access.confirmation_message;
  feedback.dataset.state = 'ok';
  form.reset();
});
