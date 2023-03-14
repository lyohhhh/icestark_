import { ref, Ref } from "vue";

interface USE_URL {
  currUrl: Ref<string>;
  isListening: Ref<boolean>;
  addListener: () => void;
  removeListener: () => void;
}

/**
 * @returns { USE_URL }
 */
export const useUrl = (): USE_URL => {
  const currUrl = ref(location.href);
  const isListening = ref(false);

  const urlChangeHandle = () => {
    currUrl.value = location.href;
  };

  const addListener = () => {
    window.addEventListener("popstate", urlChangeHandle, false);
    window.addEventListener("hashchange", urlChangeHandle, false);
  };

  const removeListener = () => {
    window.removeEventListener("popstate", urlChangeHandle, false);
    window.removeEventListener("hashchange", urlChangeHandle, false);
  };

  addListener();

  return { currUrl, isListening, addListener, removeListener };
};
