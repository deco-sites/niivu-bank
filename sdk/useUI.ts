/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayMenu = signal(false);
const displayCorporateForm = signal(false);
const sendSolicitationLoading = signal(false);

const state = {
  displayMenu,
  displayCorporateForm,
  sendSolicitationLoading
};

export const useUI = () => state;
