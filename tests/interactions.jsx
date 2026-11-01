import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://example.github.io/portfolio/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
const { createRoot } = await import('react-dom/client');
const { default: App, STORAGE_KEY } = await import('../src/App.jsx');
const container = document.getElementById('root');
let root = createRoot(container);
const click = async (element) => { assert.ok(element, 'Expected clickable element'); await act(async () => element.click()); };
const button = (text) => [...document.querySelectorAll('button')].find((element) => element.textContent.includes(text));
const field = async (id, value) => {
  const input = document.getElementById(id);
  await act(async () => {
    Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value').set.call(input, value);
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  });
};

try {
  await act(async () => root.render(<App />));
  assert.match(document.body.textContent, /Nwa Khalid Kareem/);
  assert.equal(document.querySelector('#skills-title').textContent, 'Digital Marketing');
  assert.equal(document.querySelector('.salary-value').textContent, '$1,000 – $1,600');
  assert.match(document.querySelector('#salary').textContent, /Negotiable/);
  assert.match(document.querySelector('#salary').textContent, /\$12,000 – \$19,200/);
  assert.equal(document.querySelector('a[href^="tel:"]').getAttribute('href'), 'tel:+9647740911169');
  console.log('✓ Profile, salary, contact links and section wording');

  assert.equal(document.querySelectorAll('.design-card').length, 6);
  await click(button('Show all 17'));
  assert.equal(document.querySelectorAll('.design-card').length, 17);
  await click(button('Sports'));
  assert.equal(document.querySelectorAll('.design-card').length, 4);
  assert.ok([...document.querySelectorAll('.design-card figcaption')].every((element) => element.textContent.includes('Sports')));
  const artwork = document.querySelector('.design-card a');
  artwork.focus();
  await click(artwork);
  assert.equal(document.querySelector('dialog').open, true);
  const firstImage = document.querySelector('.design-viewer-image').getAttribute('src');
  await click(button('Next →'));
  assert.notEqual(document.querySelector('.design-viewer-image').getAttribute('src'), firstImage);
  await act(async () => document.querySelector('dialog').dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })));
  assert.equal(document.querySelector('.design-viewer-image').getAttribute('src'), firstImage);
  await act(async () => document.querySelector('dialog').dispatchEvent(new dom.window.Event('cancel', { bubbles: false, cancelable: true })));
  assert.equal(document.querySelector('dialog'), null);
  assert.equal(document.activeElement, artwork);
  console.log('✓ Gallery expansion, category filters, viewer navigation and close/focus restoration');

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  await click(tabs[3]);
  assert.equal(document.querySelectorAll('[role="tabpanel"]:not([hidden])').length, 1);
  assert.equal(document.querySelector('[role="tabpanel"]:not([hidden])').id, 'blu-shot-3');
  await act(async () => tabs[3].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })));
  assert.equal(tabs[0].getAttribute('aria-selected'), 'true');
  assert.equal(document.activeElement, tabs[0]);
  await click(document.querySelector('.blu-shot:not([hidden]) button'));
  assert.match(document.querySelector('#viewer-title').textContent, /Dashboard/);
  await click(document.querySelector('[aria-label="Close image viewer"]'));
  console.log('✓ Screenshot tabs, keyboard navigation and image viewer');

  await click(button('Edit portfolio'));
  await field('field-name', 'Nwa React Test');
  await field('field-salaryMax', '900');
  await act(async () => document.querySelector('dialog form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })));
  assert.match(document.querySelector('[role="alert"]').textContent, /maximum salary/);
  await field('field-salaryMax', '1600');
  await act(async () => document.querySelector('dialog form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })));
  assert.equal(document.querySelector('dialog'), null);
  assert.equal(JSON.parse(localStorage.getItem(STORAGE_KEY)).name, 'Nwa React Test');
  await act(async () => root.unmount());
  root = createRoot(container);
  await act(async () => root.render(<App />));
  assert.equal(document.querySelector('.identity strong').textContent, 'Nwa React Test');
  await click(button('Edit portfolio'));
  await click(button('Restore website details'));
  assert.equal(document.querySelector('.identity strong').textContent, 'Nwa Khalid Kareem');
  assert.equal(localStorage.getItem(STORAGE_KEY), null);
  console.log('✓ Editor validation, saving, reload persistence and restore');

  const details = [...document.querySelectorAll('#project-grid details')];
  details[0].open = true;
  window.dispatchEvent(new dom.window.Event('beforeprint'));
  assert.ok(details.every((element) => element.open));
  window.dispatchEvent(new dom.window.Event('afterprint'));
  assert.equal(details[0].open, true);
  assert.ok(details.slice(1).every((element) => !element.open));
  console.log('✓ Print details expansion and restoration');
} finally {
  await act(async () => root.unmount());
  dom.window.close();
}
