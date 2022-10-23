import { useEffect } from "react";

export const useRedirect = (doRedirect: boolean, url: string) => {
  useEffect(() => {
    if (doRedirect) window.location.replace(url);
  }, [doRedirect]);
};

export const useRedirectError = (doRedirect: boolean, message: string) =>
  useRedirect(doRedirect, `/error?message=${message}`);

export const useRedirectNotFound = (doRedirect: boolean) =>
  useRedirect(doRedirect, "/notfound");

export const useReload = (doRedirect: boolean) => useRedirect(doRedirect, "");
