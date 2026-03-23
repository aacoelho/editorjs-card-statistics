import { BlockToolData } from '@editorjs/editorjs';

/**
 * cardImage Tool's input and output data format
 */
export interface cardImageData extends BlockToolData {
  value?: string;
  title?: string;
  description?: string;
  align?: string;
}

/**
 * cardImage Tool's configuration object that passed through the initial Editor config
 */
export interface cardImageConfig {
  valuePlaceholder?: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}
