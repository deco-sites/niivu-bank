import type { AppContext } from "$store/apps/site.ts";
import { HEADER_AUTH_TOKEN } from "deco-sites/niivu-bank/packs/utils/constants.ts";

export default async function loader(
    props: {
      id: string;
    },
    _req: Request,
    ctx: AppContext,
  ) {
    const { id } = props;
   
    if(!id){
      return {
        error: "error, id_solicitation_risk3.",
      };
    }
    
    const { risk3, supabaseClient } = ctx;
    const { clientRisk3, password, username, _product } = risk3;

    const usernameStr = typeof username === "string" ? username : username?.get();
    const passwordSrt = typeof password === "string" ? password : password?.get();
  
    if (!usernameStr || !passwordSrt) {
      return {
        error: "risk3-credentials",
      };
    }
  
    const response = await clientRisk3["POST /api/v0/login"]({
      username: usernameStr,
      password: passwordSrt,
    }).then((res) => res.json());
  
    const { data, status, message } = response;
  
    if (status === "error" && !data) {
      return {
        error: message,
      };
    }
  
    const headers = new Headers({ [HEADER_AUTH_TOKEN]: data.token });

    const analisys = await clientRisk3["GET /api/v0/analises/id/:solicitationId"]({ solicitationId: id }, { headers }).then((res) => res.json());

    const solicitation = await supabaseClient.from("solicitations").select("*").eq("id_risk3", id).single();

    if(!solicitation){
      return {
        error: "error, solicitation not found.",
      };
    }

    const updateSolicitation = await supabaseClient.from("solicitations").update({status: 1, statusText: "Em análise"}).eq("id_risk3", id)

    if(updateSolicitation.error){
      return {
        error: "error, update solicitation.",
      };
    }

    return {
      status: 200,
    }
  }
