import { defineNuxtPlugin } from "#app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faSearch);
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
