/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayMenu = signal(false);
const displayCorporateForm = signal(false);
const sendSolicitationLoading = signal(false);
const errosForm = signal({
  full_name: false,
  phone: false,
  zip_code: false,
  street: false,
  number: false,
  complement: false,
  cpf: {
    empty: false,
    invalid: false,
    message: "CPF inválido",
  },
  rg: false,
  city: false,
  state: false,
  CNPJ: {
    empty: false,
    invalid: false,
    message: "CNPJ inválido",
  },
  business_name: false,
  legal_zip_code: false,
  legal_street: false,
  legal_number: false,
  legal_complement: false,
  legal_city: false,
  legal_state: false,
});

const state = {
  displayMenu,
  displayCorporateForm,
  sendSolicitationLoading,
  errosForm,
};

export const useUI = () => state;
