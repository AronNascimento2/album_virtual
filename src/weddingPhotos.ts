export interface WeddingPhotosProps {
  cerimonia: string[];
  decoracao: string[];
  makingOfNoiva: string[];
  makingOfNoivo: string[];
  recepcao: string[];
}
export interface TitleProps {
  cerimonia: string;
  decoracao: string;
  makingOfNoiva: string;
  makingOfNoivo: string;
  recepcao: string;
}
const generateImagePaths = (
  folder: string,
  prefix: string,
  start: number,
  end: number
): string[] =>
  Array.from(
    { length: end - start + 1 },
    (_, i) => `/casamento1/${folder}/${prefix}${start + i}.jpg`
  );
export const weddingPhotos: WeddingPhotosProps = {
  cerimonia: generateImagePaths("CERIMÔNIA OFICIAL", "HF_-", 2, 576),
  decoracao: generateImagePaths("DECORAÇÃO OFICIAL", "HF_-", 2, 49),
  makingOfNoiva: generateImagePaths("MAKING OF NOIVA OFICIAL", "HF_-", 2, 196),
  makingOfNoivo: generateImagePaths(
    "NOIVOS E PADRINHOS OFICIAL",
    "HF_-",
    2,
    80
  ),
  recepcao: generateImagePaths("RECEPÇÃO OFICIAL", "HF_-", 2, 243),
};
export const sectionTitles: TitleProps = {
  cerimonia: "Cerimônia",
  decoracao: "Decoração",
  makingOfNoiva: "Making of Noiva",
  makingOfNoivo: "Noivos e Padrinhos",
  recepcao: "Recepção",
};

export const sectionPastes: TitleProps = {
  cerimonia: "CERIMÔNIA OFICIAL",
  decoracao: "DECORAÇÃO OFICIAL",
  makingOfNoiva: "MAKING OF NOIVA OFICIAL",
  makingOfNoivo: "NOIVOS E PADRINHOS OFICIAL",
  recepcao: "RECEPÇÃO OFICIAL",
};
