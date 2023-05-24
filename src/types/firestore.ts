export interface VidDoc {
  id: string;
  url: string;
}

export interface SubsDoc {
  id: string;
  subs: string;
}

export interface UploadSubData {
  id: number;
  start: number;
  end: number;
  text: string;
}
