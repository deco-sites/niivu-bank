import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const getAccessToken = () => {
  const ACCESS_TOKEN = "access_token";
  const url = new URL(window.location.href.replace("#", "?"));
  const access_token = url.searchParams.get(ACCESS_TOKEN);
  if (!access_token) return;
  document.cookie = `niivo_auth=${access_token};path=/;`;
  window.location.href = "/minha-conta";
};

function getToken() {
  return <script defer src={scriptAsDataURI(getAccessToken)} />;
}

export default getToken;
