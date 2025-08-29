/**
 * Import styles
 */
import './index.scss';

/**
 * Import icons
 */
import { IconStar } from '@codexteam/icons';

/**
 * Import types
 */
import { cardStatisticsData, cardStatisticsConfig } from './types';
import { API, BlockAPI, BlockTool } from '@editorjs/editorjs';

/**
 * card-statistics Tool for Editor.js
 */
export default class cardStatistics implements BlockTool {
  /**
   * Code API — public methods to work with Editor
   * 
   * @link https://editorjs.io/api
   */
   private readonly api: API;

  /**
   * Block API — methods and properties to work with Block instance
   * 
   * @link https://editorjs.io/blockapi
   */
  private readonly block: BlockAPI;

  /**
   * Read-only mode flag
   */
  private readonly readOnly: boolean;

  /**
   * Tool data for input and output
   */
  private data: cardStatisticsData;

  /**
   * Configuration object that passed through the initial Editor configuration.
   */
  private config: cardStatisticsConfig;

  /**
   * Tool's HTML nodes
   */
  private nodes: {[key: string]: HTMLElement|null};

  /**
   * Value input placeholder
   */
  private valuePlaceholder: string;

  /**
   * Title input placeholder
   */
  private titlePlaceholder: string;

  /**
   * Description input placeholder
   */
  private descriptionPlaceholder: string;

  /**
   * Class constructor
   * 
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({ data, config, api, block, readOnly }: { data: cardStatisticsData, config: cardStatisticsConfig, api: API, block: BlockAPI, readOnly: boolean }) {
    this.data = {
      value: data.value || '',
      title: data.title || '',
      description: data.description || '',
    };

    this.valuePlaceholder = config.valuePlaceholder || 'Add statistics value';
    this.titlePlaceholder = config.titlePlaceholder || 'Add title';
    this.descriptionPlaceholder = config.descriptionPlaceholder || 'Add description';

    this.config = config;
    this.api = api;
    this.block = block;
    this.readOnly = readOnly;

    /**
     * Declare Tool's nodes
     */
    this.nodes = {
      wrapper: null,
      value: null,
      title: null,
      description: null,
    };
  }

  /**
   * PUBLIC METHODS
   * 
   * @link https://editorjs.io/tools-api#public-methods
   */

  /**
   * Creates UI of a Block
   * Required
   * @link https://editorjs.io/tools-api#render
   * 
   * @returns {HTMLElement}
   */
  render() {
    this.nodes.wrapper = document.createElement('div');
    this.nodes.wrapper.classList.add('cdx-card-statistics');

    // Value input
    this.nodes.value = document.createElement('div');
    this.nodes.value.className = 'cdx-card-statistics__value';
    this.nodes.value.contentEditable = !this.readOnly ? 'true' : 'false';
    this.nodes.value.innerHTML = this.data.value || '';
    this.nodes.value.dataset.placeholder = this.valuePlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.value);

    // Title input
    this.nodes.title = document.createElement('div');
    this.nodes.title.className = 'cdx-card-statistics__title';
    this.nodes.title.contentEditable = !this.readOnly ? 'true' : 'false';
    this.nodes.title.innerHTML = this.data.title || '';
    this.nodes.title.dataset.placeholder = this.titlePlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.title);

    // Description input
    this.nodes.description = document.createElement('div');
    this.nodes.description.className = 'cdx-card-statistics__description';
    this.nodes.description.contentEditable = !this.readOnly ? 'true' : 'false';
    this.nodes.description.innerHTML = this.data.description || '';
    this.nodes.description.dataset.placeholder = this.descriptionPlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.description);

    return this.nodes.wrapper;
  }

  /**
   * Extracts Block data from the UI
   * Required
   * @link https://editorjs.io/tools-api#save
   * 
   * @returns {cardStatisticsData} saved data
   */
  save(): cardStatisticsData {
    return {
      value: this.nodes.value?.innerHTML || '',
      title: this.nodes.title?.innerHTML || '',
      description: this.nodes.description?.innerHTML || '',
    };
  }

  /**
   * Validates Block data after saving
   * @link https://editorjs.io/tools-api#validate
   * 
   * @param {cardStatisticsData} savedData
   * @returns {boolean} true if data is valid, otherwise false
   */ 
  // validate() {}

  /**
   * 
   * Returns HTML that will be appended at the top of Block-settings
   * @link https://editorjs.io/tools-api#render-settings
   * 
   * @returns {HTMLElement}
   */ 
  // renderSettings() {}

  /**
   * Clear Tools stuff: cache, variables, events.
   * Called when Editor instance is destroying.
   * @link https://editorjs.io/tools-api#destroy
   * 
   * @returns {void}
   */
  // destroy() {}

  /**
   * Handle content pasted by ways that described by pasteConfig static getter
   * @link https://editorjs.io/tools-api#on-paste
   * 
   * @param {PasteEvent} event - event with pasted content
   * @returns {void}
   */  
  // onPaste() {}

  /**
   * Specifies how to merge two similar Blocks
   * @link https://editorjs.io/tools-api#merge
   * 
   * @param {card-statisticsData} data - data of second Block
   * @returns {card-statisticsData} - merged data
   */
  // merge() {} 

  /**
   * STATIC GETTERS
   * 
   * @link https://editorjs.io/tools-api#static-getters
   */

  /**
   * Process pasted content before appending to the Editor
   * @link https://editorjs.io/tools-api#pasteconfig
   * 
   * @returns {tags?: string[], files?: { mimeTypes: string[], extensions: string[] }, patterns?: { [string]: RegEx }}
   */ 
  // static get pasteConfig() {
  //   return {
  //     /**
  //      * Paste HTML into Editor
  //      */
  //     tags: [],
    
  //     /**
  //      * Paste URL of media into the Editor
  //      */
  //     patterns: {},
    
  //     /**
  //      * Drag n drop file from into the Editor
  //      */
  //     files: {
  //       mimeTypes: [ ],
  //     },
  //   };
  // }

  /**
   * Clean unwanted HTML tags or attributes
   * @link https://editorjs.io/tools-api#sanitize
   * 
   * @returns {{[string]: boolean|object}} - Sanitizer rules
   */
  // static get sanitize() {
  //   return {};
  // } 

  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   * 
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      title: 'card-statistics',
      icon: IconStar,
    };
  }

  /**
   * Shortcut that fires render method and inserts new Block
   * @link https://editorjs.io/tools-api#shortcut
   * 
   * @returns {string}
   */
  // static get shortcut() {
  //   // return 'CMD+SHIFT+I';
  // }

  /**
   * Config allows Tool to specify how it can be converted into/from another Tool
   * 
   * @link https://editorjs.io/tools-api#conversionconfig
   * 
   * @returns {{export: string|function, import: string|function}}
   */
  // static get conversionConfig() {
  //   // return {
  //   //   export: (data) => {
  //   //     return data.items.join('.'); // in this example, all list items will be concatenated to an export string
  //   //   },
  //   //  
  //   //   /**
  //   //    * In this example, List Tool creates items by splitting original text by a dot symbol. 
  //   //    */
  //   //   import: (string) => {
  //   //     const items = string.split('.');
  //   //
  //   //     return {
  //   //       items: items.filter( (text) => text.trim() !== ''),
  //   //       type: 'unordered'
  //   //     };
  //   //   }
  //   // };
  // }

  /**
   * With this option, Editor.js won't handle Enter keydowns
   * @link https://editorjs.io/tools-api#enablelinebreaks
   * 
   * @returns {boolean}
   */ 
  // static get enableLineBreaks() {
  //   return true;
  // }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   * 
   * @returns {boolean}
   */
  // static get isReadOnlySupported() {
  //   return true;
  // } 

  /**
   * LIFE CYCLE HOOKS
   * 
   * These methods are called by Editor.js core
   * @link https://editorjs.io/tools-api#lifecycle-hooks
   */

  /**
   * Called after Block contents is added to the page
   */
  // rendered() {}

  /**
   * Called each time Block contents is updated
   */
  // updated() {}

  /**
   * Called after Block contents is removed from the page but before Block instance deleted
   */
  // removed() {}

  /**
   * Called after Block is moved by move tunes or through API
   * 
   * @param {MoveEvent} event 
   */
  // moved(event) {}
};
