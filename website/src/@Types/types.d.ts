export declare type PictureMode = "camera" | "upload";

export declare type AnimalKeysCertian =
  | "elephant"
  | "gorilla"
  | "rhino"
  | "tiger";

export declare type AnimalKeys = AnimalKeysCertian | undefined;

export declare type AnimalData = { [key: string]: AnimalInfo };

export declare interface AnimalInfo {
  title: string;
  ar?: { img: string; usdz: string; echoarId: string };
  mapPoints?: MapPoint[];
  info: string;
  resources?: { label: string; link: string }[];
  animalsToTry?: string[];
}

export declare interface MapPoint {
  lat: number;
  long: number;
  count: number;
  date: string;
}
