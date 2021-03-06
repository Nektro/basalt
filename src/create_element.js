/**
 * https://github.com/nektro/basalt/blob/master/src/create_element.js
 * https://github.com/nektro/basalt/blob/master/docs/create_element.md
 */
//
"use strict";
//


/**
 * @param  {String} name
 * @param  {Map<String,String>} attributes
 * @param  {Array<Node>} children
 * @param  {Map<String,Function<Event>>} events
 * @return {HTMLElement}
 */
export function create_element(name, attributes, children, events) {
    const element = document.createElement(name);
    for (const attr of (attributes || new Map()).entries()) element.setAttribute(attr[0], attr[1]);
    for (const child of (children || [])) element.appendChild(child);
    for (const listener of (events || new Map()).entries()) element.addEventListener(listener[0], listener[1]);
    return element;
}
