export function absoluteUrl(path) {
    return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
      }${path}`;
  }