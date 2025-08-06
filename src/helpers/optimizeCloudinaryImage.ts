const optimizeCloudinaryUrl = (url: string, width: number) =>
  url.replace("/upload/", `/upload/w_${Math.round(width + 300)},q_auto:best,f_auto,dpr_auto/`);

export default optimizeCloudinaryUrl;
