import { ComponentChildren } from "preact";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  children: ComponentChildren;
}

function RenderCorpForm({ children }: Props) {
  const { displayCorporateForm } = useUI();
  return (
    <>
      {displayCorporateForm.value && children}
    </>
  );
}

export default RenderCorpForm;
