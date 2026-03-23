/**
 * Import styles
 */
import './index.scss';

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
  private _data!: cardStatisticsData;

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
   * Available alignments
   */
  private aligns = [
    {
      name: 'left',
      title: 'Align left',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M85.282 500.778c3.357 3.32 7.207 5.222 11.997 5.222H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86-3.357-3.32-7.207-5.223-11.997-5.223H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.541 5.282 11.86Zm0-101.549c3.357 3.32 7.207 5.222 11.997 5.222h342.71c4.812 0 8.64-1.902 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.86v-33.702c0-4.757-1.925-8.542-5.282-11.861-3.357-3.32-7.185-5.223-11.997-5.223H97.28c-4.79 0-8.64 1.903-11.997 5.223-3.357 3.319-5.282 7.104-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861Zm0-102.035c3.357 3.32 7.207 5.223 11.997 5.223h411.355c4.79 0 8.64-1.903 11.997-5.223 3.357-3.319 5.282-7.125 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861-3.358-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.902-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861Zm0-101.57c3.357 3.341 7.207 5.223 11.997 5.223h308.645c4.32 0 8.639-1.882 11.996-5.222 3.358-3.32 4.79-7.104 4.79-11.861v-33.68c0-4.758-1.432-8.542-4.79-11.862-3.357-3.34-7.677-5.222-11.996-5.222H97.279c-4.79 0-8.64 1.882-11.997 5.222-3.357 3.32-5.282 7.104-5.282 11.861v33.68c0 4.758 1.925 8.542 5.282 11.862Z"/></svg>`
    },
    {
      name: 'center',
      title: 'Align center',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M554.718 138.222c-3.357-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.542 5.282 11.86 3.357 3.32 7.207 5.223 11.997 5.223H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86Zm-51 101c-3.357-3.32-7.207-5.222-11.997-5.222h-342.71c-4.812 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.757 1.925 8.542 5.282 11.86 3.357 3.32 7.185 5.223 11.997 5.223h342.71c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86ZM525.721 336H114.366c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.542 5.282 11.86 3.358 3.32 7.207 5.223 11.997 5.223H525.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86-3.357-3.32-7.207-5.223-11.997-5.223Zm-52 102.021H165.076c-4.32 0-8.639 1.882-11.996 5.222-3.358 3.32-4.79 7.104-4.79 11.862v33.68c0 4.757 1.432 8.542 4.79 11.86 3.357 3.341 7.677 5.223 11.996 5.223h308.645c4.79 0 8.64-1.882 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.68c0-4.758-1.925-8.542-5.282-11.862-3.357-3.34-7.207-5.222-11.997-5.222Z"/></svg>`
    },
    {
      name: 'right',
      title: 'Align right',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M554.718 138.222c-3.357-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.541 5.282 11.86 3.357 3.32 7.207 5.223 11.997 5.223H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86Zm0 101.549c-3.357-3.32-7.207-5.222-11.997-5.222h-342.71c-4.812 0-8.64 1.902-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.86v33.702c0 4.757 1.925 8.542 5.282 11.861 3.357 3.32 7.185 5.223 11.997 5.223h342.71c4.79 0 8.64-1.903 11.997-5.223 3.357-3.319 5.282-7.104 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861Zm0 102.035c-3.357-3.32-7.207-5.223-11.997-5.223H131.366c-4.79 0-8.64 1.903-11.997 5.223-3.357 3.319-5.282 7.125-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861 3.358 3.32 7.207 5.222 11.997 5.222H542.72c4.79 0 8.64-1.902 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861Zm0 101.57c-3.357-3.341-7.207-5.223-11.997-5.223H234.076c-4.32 0-8.639 1.882-11.996 5.222-3.358 3.32-4.79 7.104-4.79 11.861v33.68c0 4.758 1.432 8.542 4.79 11.862 3.357 3.34 7.677 5.222 11.996 5.222h308.645c4.79 0 8.64-1.882 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.68c0-4.758-1.925-8.542-5.282-11.862Z"/></svg>`
    }
  ];

  /**
   * Default alignment type
   * @public
   * @returns {string}
   */
  static get DEFAULT_ALIGN_TYPE() {
    return 'left';
  }

  /**
   * Class constructor
   * 
   * @link https://editorjs.io/tools-api#class-constructor
   */
  constructor({ data, config, api, block, readOnly }: { data: cardStatisticsData, config: cardStatisticsConfig, api: API, block: BlockAPI, readOnly: boolean }) {
    this.config = config;
    this.api = api;
    this.block = block;
    this.readOnly = readOnly;

    this.valuePlaceholder = config.valuePlaceholder || 'Add statistics value';
    this.titlePlaceholder = config.titlePlaceholder || 'Add title';
    this.descriptionPlaceholder = config.descriptionPlaceholder || 'Add description';

    // Use data setter to automatically sanitize
    this.data = data;

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
   * Class names
   *
   * @returns {Object}
   */
  get classes() {
    return {
      wrapper: 'cdx-card-statistics',
      value: 'cdx-card-statistics__value',
      title: 'cdx-card-statistics__title',
      description: 'cdx-card-statistics__description',
      wrapperForAlignType: (alignType: string) => `cdx-card-statistics--${alignType}`,
    };
  }

  /**
   * Data setter
   * @param {cardStatisticsData} data - Raw data to store (Editor.js handles sanitization automatically)
   */
  set data(data: cardStatisticsData) {
    this._data = Object.assign({}, {
      value: data.value || "",
      title: data.title || "",
      description: data.description || "",
      align: data.align || cardStatistics.DEFAULT_ALIGN_TYPE,
    });
  }

  /**
   * Data getter
   * @returns {cardStatisticsData} Current tool data
   */
  get data(): cardStatisticsData {
    return this._data;
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
    this.nodes.wrapper = this.make('div', this.classes.wrapper);

    // Value input
    this.nodes.value = this.make('div', this.classes.value, {
      contentEditable: !this.readOnly ? 'true' : 'false',
      innerHTML: this._data.value || '',
    });
    this.nodes.value.dataset.placeholder = this.valuePlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.value);

    // Title input
    this.nodes.title = this.make('div', this.classes.title, {
      contentEditable: !this.readOnly ? 'true' : 'false',
      innerHTML: this._data.title || '',
    });
    this.nodes.title.dataset.placeholder = this.titlePlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.title);

    // Description input
    this.nodes.description = this.make('div', this.classes.description, {
      contentEditable: !this.readOnly ? 'true' : 'false',
      innerHTML: this._data.description || '',
    });
    this.nodes.description.dataset.placeholder = this.descriptionPlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.description);

    // Apply alignment
    this.updateAlign(this._data.align || cardStatistics.DEFAULT_ALIGN_TYPE);

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
      value: this.getCleanContent(this.nodes.value?.innerHTML || ''),
      title: this.getCleanContent(this.nodes.title?.innerHTML || ''),
      description: this.getCleanContent(this.nodes.description?.innerHTML || ''),
      align: this._data.align,
    };
  }

  /**
   * Validates Block data after saving
   * @link https://editorjs.io/tools-api#validate
   * 
   * @param {cardStatisticsData} savedData
   * @returns {boolean} true if data is valid, otherwise false
   */ 
  validate(savedData: cardStatisticsData): boolean {
    // Require at least a value or title to be present
    return !!(savedData.value?.trim() || savedData.title?.trim());
  }

  /**
   * 
   * Returns HTML that will be appended at the top of Block-settings
   * @link https://editorjs.io/tools-api#render-settings
   * 
   * @returns {HTMLElement}
   */ 
  renderSettings() {
    const alignTypes = this.aligns.map((align) => ({
      icon: align.icon,
      name: `align-${align.name}`,
      label: align.title,
      toggle: 'align',
      isActive: this._data.align === align.name,
      onActivate: () => {
        this.updateAlign(align.name);
      },
    }));

    return alignTypes;
  }

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
  static get sanitize() {
    return {
      value: true,     // Keep numbers as plain text
      title: true,      // Allow all inline formatting in titles
      description: true, // Allow all inline formatting in descriptions
      align: false,     // Keep alignment as plain text
    };
  } 

  /**
   * Describe an icon and title here
   * Required if Tools should be added to the Toolbox
   * @link https://editorjs.io/tools-api#toolbox
   * 
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      title: 'Statistics card',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM140,80v96a8,8,0,0,1-16,0V95l-11.56,7.71a8,8,0,1,1-8.88-13.32l24-16A8,8,0,0,1,140,80Z"></path></svg>',
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
  static get enableLineBreaks() {
    return true;
  }

  /**
   * This flag tells core that current tool supports the read-only mode
   * @link https://editorjs.io/tools-api#isreadonlysupported
   * 
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  } 

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

  /**
   * HELPER METHODS
   */

  /**
   * Clean HTML content and return empty string for "empty" content
   * 
   * @param {string} content - HTML content to clean
   * @returns {string} - Cleaned content or empty string
   */
  private getCleanContent(content: string): string {
    if (!content) return '';
    
    // Remove common "empty" HTML patterns that browsers insert
    const cleanedContent = content
      .replace(/^<br\/?>$/i, '') // Single <br> or <br/>
      .replace(/^<p><br\/?>?<\/p>$/i, '') // <p><br></p> or <p><br/></p>
      .replace(/^<div><br\/?>?<\/div>$/i, '') // <div><br></div> or <div><br/></div>
      .replace(/^\s*$/, ''); // Whitespace only
    
    return cleanedContent;
  }

  /**
   * Update Align
   * 
   * @param {string} currentAlign 
   */
  updateAlign(currentAlign: string) {
    if (this._data.align === currentAlign && this.nodes.wrapper?.classList.contains(this.classes.wrapperForAlignType(currentAlign))) {
      return;
    }

    this._data.align = currentAlign;

    this.aligns.forEach(align => {
      this.nodes.wrapper?.classList.toggle(this.classes.wrapperForAlignType(align.name), this._data.align === align.name);
    });
  }

  /**
   * Helper for creating DOM elements
   * @param {string} tagName - Element tag name
   * @param {string|string[]} classNames - Class names to add
   * @param {object} attributes - Attributes to set
   * @returns {HTMLElement}
   */
  private make(tagName: string, classNames: string | string[] = [], attributes: Record<string, any> = {}): HTMLElement {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      (el as any)[attrName] = attributes[attrName];
    }

    return el;
  }
};
