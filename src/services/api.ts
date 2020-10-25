const isProduction: boolean = process.env.NODE_ENV === "production";

export function getUrl(path: string): string {
  if (isProduction) {
    return `https://api.${window.location.host}${path}`;
  } else {
    return `http://${window.location.host}/api${path}`;
  }
}
