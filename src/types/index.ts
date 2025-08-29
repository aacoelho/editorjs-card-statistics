import { BlockToolData } from '@editorjs/editorjs';

/**
 * cardStatistics Tool's input and output data format
 */
export interface cardStatisticsData extends BlockToolData {
  value?: string;
  title?: string;
  description?: string;
  align?: string;
}

/**
 * cardStatistics Tool's configuration object that passed through the initial Editor config
 */
export interface cardStatisticsConfig {
  valuePlaceholder?: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}
