/**
 * JAAT-AI Feature: Text-to-Image Generation
 * Version: 1.0.0
 * 
 * This module provides advanced text-to-image generation capabilities including:
 * - High-quality image generation from text prompts
 * - Multiple style and aesthetic options
 * - Image customization (size, aspect ratio, quality)
 * - Multiple model support (DALL-E, Stable Diffusion, Midjourney, etc.)
 * - Prompt optimization and enhancement
 * - Image variation and editing
 */

class TextToImage {
  constructor() {
    // Core properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Generation settings
    this.provider = "openai"; // openai, stability, midjourney, local
    this.model = "dall-e-3"; // dall-e-3, stable-diffusion-xl, midjourney-v5, etc.
    this.defaultImageSize = "1024x1024"; // Default image size
    this.defaultImageFormat = "png"; // png, jpg, webp
    this.defaultQuality = "standard"; // standard, hd
    
    // Advanced settings
    this.enablePromptOptimization = true; // Enhance prompts automatically
    this.enableNegativePrompts = true; // Support for negative prompts
    this.maxPromptLength = 1000; // Maximum prompt length in characters
    this.maxBatchSize = 4; // Maximum number of images per request
    this.enableStyleTransfer = false; // Apply style transfer
    
    // Cache settings
    this.enableCache = true;
    this.maxCacheSize = 50; // Maximum number of cached images
    
    // API Keys (should be set securely)
    this.apiKeys = {};
    
    // Internal state
    this._generationCache = {};
    this._currentGenerations = new Map();
    this._promptEnhancers = {};
    this._stylePresets = {};
    this._listeners = {
      onGenerationStart: [],
      onGenerationComplete: [],
      onGenerationError: []
    };
  }
  
  /**
   * Initialize the text-to-image system
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Text-to-Image system...");
      
      // Apply custom options
      if (options.provider) this.provider = options.provider;
      if (options.model) this.model = options.model;
      if (options.defaultImageSize) this.defaultImageSize = options.defaultImageSize;
      if (options.defaultImageFormat) this.defaultImageFormat = options.defaultImageFormat;
      if (options.defaultQuality) this.defaultQuality = options.defaultQuality;
      if (options.enablePromptOptimization !== undefined) this.enablePromptOptimization = options.enablePromptOptimization;
      if (options.enableNegativePrompts !== undefined) this.enableNegativePrompts = options.enableNegativePrompts;
      if (options.maxPromptLength !== undefined) this.maxPromptLength = options.maxPromptLength;
      if (options.maxBatchSize !== undefined) this.maxBatchSize = options.maxBatchSize;
      if (options.enableStyleTransfer !== undefined) this.enableStyleTransfer = options.enableStyleTransfer;
      if (options.enableCache !== undefined) this.enableCache = options.enableCache;
      if (options.maxCacheSize !== undefined) this.maxCacheSize = options.maxCacheSize;
      if (options.apiKeys) this.apiKeys = {...this.apiKeys, ...options.apiKeys};
      
      // Set up providers based on available API keys
      await this.initializeProviders();
      
      // Set up prompt enhancement if enabled
      if (this.enablePromptOptimization) {
        this.initializePromptEnhancers();
      }
      
      // Set up style presets
      this.initializeStylePresets();
      
      this.initialized = true;
      console.log("Text-to-Image system initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Text-to-Image:", error);
      return false;
    }
  }
  
  /**
   * Initialize image generation providers
   * @returns {Promise<void>}
   * @private
   */
  async initializeProviders() {
    // Check API keys and adjust available providers
    if (this.apiKeys.openai) {
      console.log("OpenAI API key found, enabling DALL-E provider");
    } else {
      console.warn("No OpenAI API key found, some features may be limited");
    }
    
    if (this.apiKeys.stability) {
      console.log("Stability API key found, enabling Stable Diffusion provider");
    }
    
    if (this.apiKeys.midjourney) {
      console.log("Midjourney API key found, enabling Midjourney provider");
    }
    
    // Always enable local provider as fallback
    console.log("Local provider enabled as fallback");
  }
  
  /**
   * Initialize prompt enhancers
   * @private
   */
  initializePromptEnhancers() {
    // Add default prompt enhancers
    this._promptEnhancers = {
      detail: {
        name: "Detail Enhancer",
        description: "Adds details to create more vivid images",
        process: (prompt, options) => {
          if (prompt.toLowerCase().includes("detailed") || prompt.includes("high detail")) {
            return prompt;
          }
          return `${prompt}, highly detailed, sharp focus, high quality`;
        }
      },
      style: {
        name: "Style Suggester",
        description: "Suggests artistic styles for the image",
        process: (prompt, options) => {
          // If prompt already has style cues, don't modify
          const styleTerms = ["style of", "in the style", "artistic", "painting", "drawing", "render", "realistic", "cartoon"];
          if (styleTerms.some(term => prompt.toLowerCase().includes(term))) {
            return prompt;
          }
          
          // Add a neutral style suggestion
          return `${prompt}, artistic rendering`;
        }
      },
      composition: {
        name: "Composition Improver",
        description: "Improves image composition and framing",
        process: (prompt, options) => {
          // If prompt already has composition cues, don't modify
          const compositionTerms = ["composition", "framing", "centered", "background", "foreground"];
          if (compositionTerms.some(term => prompt.toLowerCase().includes(term))) {
            return prompt;
          }
          
          // Add composition guidance
          return `${prompt}, well composed, balanced lighting`;
        }
      }
    };
  }
  
  /**
   * Initialize style presets
   * @private
   */
  initializeStylePresets() {
    // Add default style presets
    this._stylePresets = {
      photorealistic: {
        name: "Photorealistic",
        description: "Highly detailed, realistic photography style",
        promptModifier: "photorealistic, highly detailed, sharp focus, clear lighting, realistic textures, 8k resolution",
        negativePrompt: "cartoon, drawing, painting, sketch, unrealistic, blurry, low quality"
      },
      cinematic: {
        name: "Cinematic",
        description: "Dramatic, movie-like style with theatrical lighting",
        promptModifier: "cinematic, dramatic lighting, high contrast, movie still, 35mm film, theatrical, depth of field",
        negativePrompt: "flat lighting, cartoon, simple, anime"
      },
      anime: {
        name: "Anime",
        description: "Japanese anime style artwork",
        promptModifier: "anime style, japanese animation, vibrant colors, clean lines, 2D art style, anime artwork",
        negativePrompt: "photorealistic, 3D, realistic, detailed faces"
      },
      abstract: {
        name: "Abstract",
        description: "Non-representational, abstract art style",
        promptModifier: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressionist",
        negativePrompt: "realistic, detailed, photographic, figurative"
      },
      vintage: {
        name: "Vintage",
        description: "Retro, nostalgic aesthetic from the past",
        promptModifier: "vintage, retro, old film grain, nostalgic, faded colors, analog photography, 1970s",
        negativePrompt: "modern, digital, sharp, clean, vibrant"
      },
      fantasy: {
        name: "Fantasy",
        description: "Magical, fantastical art style",
        promptModifier: "fantasy art, magical, mythical, ethereal, matte painting, dreamlike, concept art",
        negativePrompt: "mundane, realistic, everyday, ordinary"
      },
      cyberpunk: {
        name: "Cyberpunk",
        description: "Futuristic dystopian style with neon and tech",
        promptModifier: "cyberpunk, neon lights, futuristic, dystopian, high tech, low life, cyber, digital, night scene",
        negativePrompt: "natural, rural, historical, daytime"
      },
      watercolor: {
        name: "Watercolor",
        description: "Soft, flowy watercolor painting style",
        promptModifier: "watercolor painting, soft colors, fluid, flowing, paint bleeds, artistic, traditional art",
        negativePrompt: "digital, sharp edges, photorealistic, 3D"
      }
    };
  }
  
  /**
   * Generate an image from text prompt
   * @param {string} prompt - Text prompt describing the image
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result with image data
   */
  async generateImage(prompt, options = {}) {
    if (!this.initialized) {
      throw new Error("Text-to-Image system not initialized");
    }
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new Error("Valid prompt is required");
    }
    
    // Validate API key availability based on provider
    const provider = options.provider || this.provider;
    if (provider !== 'local' && !this.apiKeys[provider]) {
      throw new Error(`No API key found for provider: ${provider}`);
    }
    
    try {
      // Sanitize and limit prompt length
      let processedPrompt = prompt.trim();
      
      if (processedPrompt.length > this.maxPromptLength) {
        processedPrompt = processedPrompt.substring(0, this.maxPromptLength);
      }
      
      // Apply prompt optimization if enabled
      if (this.enablePromptOptimization && !options.skipOptimization) {
        processedPrompt = this.optimizePrompt(processedPrompt, options);
      }
      
      // Apply style preset if specified
      if (options.stylePreset && this._stylePresets[options.stylePreset]) {
        const preset = this._stylePresets[options.stylePreset];
        processedPrompt = `${processedPrompt}, ${preset.promptModifier}`;
        
        // Apply negative prompt from preset if enabled and not already specified
        if (this.enableNegativePrompts && !options.negativePrompt && preset.negativePrompt) {
          options.negativePrompt = preset.negativePrompt;
        }
      }
      
      // Check cache if enabled
      if (this.enableCache && !options.skipCache) {
        const cacheKey = this.getCacheKey(processedPrompt, options);
        
        if (this._generationCache[cacheKey]) {
          return {
            success: true,
            prompt: prompt,
            processedPrompt,
            ...this._generationCache[cacheKey],
            fromCache: true
          };
        }
      }
      
      // Generate a unique ID for this generation
      const generationId = this.generateId();
      
      // Prepare options
      const generationOptions = {
        size: options.size || this.defaultImageSize,
        format: options.format || this.defaultImageFormat,
        quality: options.quality || this.defaultQuality,
        n: options.n || 1, // Number of images to generate
        model: options.model || this.model,
        negativePrompt: options.negativePrompt || null,
        seed: options.seed || null,
        ...options
      };
      
      // Limit batch size
      if (generationOptions.n > this.maxBatchSize) {
        generationOptions.n = this.maxBatchSize;
      }
      
      // Track current generation
      this._currentGenerations.set(generationId, {
        prompt,
        processedPrompt,
        options: generationOptions,
        startTime: Date.now(),
        status: 'processing'
      });
      
      // Notify listeners
      this._notifyListeners("onGenerationStart", {
        id: generationId,
        prompt,
        processedPrompt,
        options: generationOptions,
        timestamp: Date.now()
      });
      
      // Generate the image using the appropriate provider
      let result;
      
      switch (provider) {
        case 'openai':
          result = await this.generateWithOpenAI(processedPrompt, generationOptions);
          break;
        
        case 'stability':
          result = await this.generateWithStability(processedPrompt, generationOptions);
          break;
        
        case 'midjourney':
          result = await this.generateWithMidjourney(processedPrompt, generationOptions);
          break;
        
        case 'local':
          result = await this.generateLocally(processedPrompt, generationOptions);
          break;
        
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
      
      // Add generation metadata
      result.id = generationId;
      result.prompt = prompt;
      result.processedPrompt = processedPrompt;
      result.timestamp = Date.now();
      result.processingTime = result.timestamp - this._currentGenerations.get(generationId).startTime;
      
      // Update generation status
      const currentGeneration = this._currentGenerations.get(generationId);
      currentGeneration.status = 'completed';
      currentGeneration.result = result;
      
      // Cache result if enabled
      if (this.enableCache) {
        const cacheKey = this.getCacheKey(processedPrompt, options);
        this._generationCache[cacheKey] = result;
        
        // Trim cache if needed
        this.trimCache();
      }
      
      // Notify listeners
      this._notifyListeners("onGenerationComplete", {
        id: generationId,
        ...result,
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      // Generate a unique ID if not already tracking
      const generationId = options.id || this.generateId();
      
      // Notify listeners
      this._notifyListeners("onGenerationError", {
        id: generationId,
        prompt,
        error: error.message,
        timestamp: Date.now()
      });
      
      console.error("Image generation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate a variation of an existing image
   * @param {Blob|string} image - Image to vary (Blob or base64 string)
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   */
  async generateVariation(image, options = {}) {
    if (!this.initialized) {
      throw new Error("Text-to-Image system not initialized");
    }
    
    if (!image) {
      throw new Error("Valid image is required");
    }
    
    // Validate API key availability based on provider
    const provider = options.provider || this.provider;
    if (provider !== 'local' && !this.apiKeys[provider]) {
      throw new Error(`No API key found for provider: ${provider}`);
    }
    
    try {
      // Generate a unique ID for this generation
      const generationId = this.generateId();
      
      // Prepare options
      const generationOptions = {
        size: options.size || this.defaultImageSize,
        format: options.format || this.defaultImageFormat,
        quality: options.quality || this.defaultQuality,
        n: options.n || 1, // Number of images to generate
        model: options.model || this.model,
        variationStrength: options.variationStrength || 0.5, // 0.0 to 1.0
        ...options
      };
      
      // Limit batch size
      if (generationOptions.n > this.maxBatchSize) {
        generationOptions.n = this.maxBatchSize;
      }
      
      // Track current generation
      this._currentGenerations.set(generationId, {
        type: 'variation',
        options: generationOptions,
        startTime: Date.now(),
        status: 'processing'
      });
      
      // Notify listeners
      this._notifyListeners("onGenerationStart", {
        id: generationId,
        type: 'variation',
        options: generationOptions,
        timestamp: Date.now()
      });
      
      // Generate variations using the appropriate provider
      let result;
      
      switch (provider) {
        case 'openai':
          result = await this.generateVariationWithOpenAI(image, generationOptions);
          break;
        
        case 'stability':
          result = await this.generateVariationWithStability(image, generationOptions);
          break;
        
        case 'midjourney':
          result = await this.generateVariationWithMidjourney(image, generationOptions);
          break;
        
        case 'local':
          result = await this.generateVariationLocally(image, generationOptions);
          break;
        
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
      
      // Add generation metadata
      result.id = generationId;
      result.timestamp = Date.now();
      result.processingTime = result.timestamp - this._currentGenerations.get(generationId).startTime;
      
      // Update generation status
      const currentGeneration = this._currentGenerations.get(generationId);
      currentGeneration.status = 'completed';
      currentGeneration.result = result;
      
      // Notify listeners
      this._notifyListeners("onGenerationComplete", {
        id: generationId,
        ...result,
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      // Generate a unique ID if not already tracking
      const generationId = options.id || this.generateId();
      
      // Notify listeners
      this._notifyListeners("onGenerationError", {
        id: generationId,
        type: 'variation',
        error: error.message,
        timestamp: Date.now()
      });
      
      console.error("Image variation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate an image edit (inpainting/outpainting)
   * @param {Blob|string} image - Original image
   * @param {string} prompt - Text prompt for the edit
   * @param {Blob|string} mask - Edit mask (white areas will be edited)
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   */
  async generateEdit(image, prompt, mask, options = {}) {
    if (!this.initialized) {
      throw new Error("Text-to-Image system not initialized");
    }
    
    if (!image) {
      throw new Error("Valid image is required");
    }
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw new Error("Valid prompt is required");
    }
    
    if (!mask) {
      throw new Error("Valid edit mask is required");
    }
    
    // Validate API key availability based on provider
    const provider = options.provider || this.provider;
    if (provider !== 'local' && !this.apiKeys[provider]) {
      throw new Error(`No API key found for provider: ${provider}`);
    }
    
    try {
      // Sanitize and limit prompt length
      let processedPrompt = prompt.trim();
      
      if (processedPrompt.length > this.maxPromptLength) {
        processedPrompt = processedPrompt.substring(0, this.maxPromptLength);
      }
      
      // Apply prompt optimization if enabled
      if (this.enablePromptOptimization && !options.skipOptimization) {
        processedPrompt = this.optimizePrompt(processedPrompt, options);
      }
      
      // Generate a unique ID for this generation
      const generationId = this.generateId();
      
      // Prepare options
      const generationOptions = {
        size: options.size || this.defaultImageSize,
        format: options.format || this.defaultImageFormat,
        quality: options.quality || this.defaultQuality,
        model: options.model || this.model,
        negativePrompt: options.negativePrompt || null,
        ...options
      };
      
      // Track current generation
      this._currentGenerations.set(generationId, {
        type: 'edit',
        prompt,
        processedPrompt,
        options: generationOptions,
        startTime: Date.now(),
        status: 'processing'
      });
      
      // Notify listeners
      this._notifyListeners("onGenerationStart", {
        id: generationId,
        type: 'edit',
        prompt,
        processedPrompt,
        options: generationOptions,
        timestamp: Date.now()
      });
      
      // Generate edit using the appropriate provider
      let result;
      
      switch (provider) {
        case 'openai':
          result = await this.generateEditWithOpenAI(image, processedPrompt, mask, generationOptions);
          break;
        
        case 'stability':
          result = await this.generateEditWithStability(image, processedPrompt, mask, generationOptions);
          break;
        
        case 'midjourney':
          result = await this.generateEditWithMidjourney(image, processedPrompt, mask, generationOptions);
          break;
        
        case 'local':
          result = await this.generateEditLocally(image, processedPrompt, mask, generationOptions);
          break;
        
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
      
      // Add generation metadata
      result.id = generationId;
      result.prompt = prompt;
      result.processedPrompt = processedPrompt;
      result.timestamp = Date.now();
      result.processingTime = result.timestamp - this._currentGenerations.get(generationId).startTime;
      
      // Update generation status
      const currentGeneration = this._currentGenerations.get(generationId);
      currentGeneration.status = 'completed';
      currentGeneration.result = result;
      
      // Notify listeners
      this._notifyListeners("onGenerationComplete", {
        id: generationId,
        ...result,
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      // Generate a unique ID if not already tracking
      const generationId = options.id || this.generateId();
      
      // Notify listeners
      this._notifyListeners("onGenerationError", {
        id: generationId,
        type: 'edit',
        prompt,
        error: error.message,
        timestamp: Date.now()
      });
      
      console.error("Image edit error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image with OpenAI (DALL-E)
   * @param {string} prompt - Text prompt
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateWithOpenAI(prompt, options) {
    // Ensure we have an API key
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key is required");
    }
    
    try {
      console.log(`Generating image with OpenAI: "${prompt.substring(0, 30)}..."`);
      
      // Prepare the API request
      const apiEndpoint = "https://api.openai.com/v1/images/generations";
      
      // Map our internal size format to OpenAI's format
      let size = options.size || this.defaultImageSize;
      // Ensure size is in OpenAI's allowed sizes
      const allowedSizes = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];
      
      if (!allowedSizes.includes(size)) {
        console.warn(`Unsupported size for OpenAI: ${size}, defaulting to 1024x1024`);
        size = "1024x1024";
      }
      
      // Determine the response format
      const responseFormat = options.format === "jpg" ? "url" : "b64_json";
      
      // Prepare the request body
      const requestBody = {
        prompt,
        model: options.model || "dall-e-3",
        n: options.n || 1,
        size,
        quality: options.quality || "standard",
        style: options.style || "vivid", // "vivid" or "natural"
        response_format: responseFormat
      };
      
      // Make the API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKeys.openai}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      if (responseFormat === "b64_json") {
        // Convert base64 data to image URLs
        for (const image of data.data) {
          const base64Data = image.b64_json;
          const imgUrl = `data:image/${options.format || 'png'};base64,${base64Data}`;
          images.push({
            url: imgUrl,
            base64: base64Data,
            width: parseInt(size.split('x')[0]),
            height: parseInt(size.split('x')[1])
          });
        }
      } else {
        // Process URL responses
        for (const image of data.data) {
          images.push({
            url: image.url,
            width: parseInt(size.split('x')[0]),
            height: parseInt(size.split('x')[1])
          });
        }
      }
      
      return {
        success: true,
        model: requestBody.model,
        images,
        provider: "openai"
      };
    } catch (error) {
      console.error("OpenAI generation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image with Stability AI
   * @param {string} prompt - Text prompt
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateWithStability(prompt, options) {
    // Ensure we have an API key
    if (!this.apiKeys.stability) {
      throw new Error("Stability AI API key is required");
    }
    
    try {
      console.log(`Generating image with Stability AI: "${prompt.substring(0, 30)}..."`);
      
      // Prepare the API request
      const apiEndpoint = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
      
      // Parse dimensions from size
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Map quality to stability's cfg_scale (1-30)
      let cfgScale = 7;
      if (options.quality === "hd") {
        cfgScale = 12;
      } else if (options.quality === "low") {
        cfgScale = 4;
      }
      
      // Prepare the request body
      const requestBody = {
        text_prompts: [
          {
            text: prompt,
            weight: 1.0
          }
        ],
        height,
        width,
        cfg_scale: cfgScale,
        samples: options.n || 1,
        steps: options.steps || 30
      };
      
      // Add negative prompt if provided
      if (options.negativePrompt) {
        requestBody.text_prompts.push({
          text: options.negativePrompt,
          weight: -1.0
        });
      }
      
      // Add seed if provided
      if (options.seed !== undefined) {
        requestBody.seed = options.seed;
      }
      
      // Make the API request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${this.apiKeys.stability}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability AI API error: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      for (const image of data.artifacts) {
        const base64Data = image.base64;
        const imgUrl = `data:image/${options.format || 'png'};base64,${base64Data}`;
        images.push({
          url: imgUrl,
          base64: base64Data,
          seed: image.seed,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "stable-diffusion-xl",
        images,
        provider: "stability"
      };
    } catch (error) {
      console.error("Stability AI generation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image with Midjourney
   * @param {string} prompt - Text prompt
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateWithMidjourney(prompt, options) {
    // Ensure we have an API key
    if (!this.apiKeys.midjourney) {
      throw new Error("Midjourney API key is required");
    }
    
    try {
      console.log(`Generating image with Midjourney: "${prompt.substring(0, 30)}..."`);
      
      // Note: Midjourney doesn't have a public API, so this is a simplified simulation
      // In a real implementation, this might use a third-party API or interface with Discord
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Parse dimensions from size
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Generate a placeholder image
      // In a real implementation, this would be the result from Midjourney
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        images.push({
          url: `https://picsum.photos/${width}/${height}?random=${Date.now() + i}`,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "midjourney-v5",
        images,
        provider: "midjourney"
      };
    } catch (error) {
      console.error("Midjourney generation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image locally (fallback)
   * @param {string} prompt - Text prompt
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateLocally(prompt, options) {
    try {
      console.log(`Generating image locally: "${prompt.substring(0, 30)}..."`);
      
      // Parse dimensions from size
      let width = 512;
      let height = 512;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Generate a placeholder image
      // In a real implementation, this might use a local model like Stable Diffusion
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        // Create a colored rectangle with text
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Generate a gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, this.getRandomColor());
        gradient.addColorStop(1, this.getRandomColor());
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add prompt as text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Wrap text
        const maxWidth = width - 40;
        const lineHeight = 24;
        let words = prompt.split(' ');
        let line = '';
        let y = height / 2 - (Math.min(words.length, 5) * lineHeight) / 2;
        
        for(let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, width / 2, y);
            line = words[n] + ' ';
            y += lineHeight;
            
            // Limit to 5 lines of text
            if (y > height / 2 + lineHeight * 2) {
              line += '...';
              break;
            }
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, width / 2, y);
        
        // Add disclaimer
        ctx.font = 'italic 12px Arial';
        ctx.fillText('Placeholder Image (Local Generation)', width / 2, height - 20);
        
        // Convert to dataURL
        const base64 = canvas.toDataURL(`image/${options.format || 'png'}`);
        const base64Data = base64.split(',')[1];
        
        images.push({
          url: base64,
          base64: base64Data,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "local-placeholder",
        images,
        provider: "local"
      };
    } catch (error) {
      console.error("Local generation error:", error);
      
      // Fallback to colored rectangle with text
      return {
        success: false,
        error: error.message,
        model: "error-fallback",
        images: [{
          url: `https://dummyimage.com/${options.size || '512x512'}/FF0000/FFFFFF.png&text=Error:+${encodeURIComponent(error.message)}`,
          width: parseInt((options.size || '512x512').split('x')[0]),
          height: parseInt((options.size || '512x512').split('x')[1])
        }],
        provider: "error"
      };
    }
  }
  
  /**
   * Generate image variation with OpenAI
   * @param {Blob|string} image - Source image
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateVariationWithOpenAI(image, options) {
    // Ensure we have an API key
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key is required");
    }
    
    try {
      console.log("Generating image variation with OpenAI");
      
      // Prepare the image data
      let imageData;
      
      if (typeof image === 'string') {
        // If it's a base64 string
        if (image.startsWith('data:image')) {
          // Extract base64 data from data URL
          imageData = image.split(',')[1];
        } else if (image.startsWith('http')) {
          // Fetch from URL
          const response = await fetch(image);
          const blob = await response.blob();
          imageData = await this.blobToBase64(blob);
        } else {
          // Assume it's already a base64 string
          imageData = image;
        }
      } else if (image instanceof Blob) {
        // Convert Blob to base64
        imageData = await this.blobToBase64(image);
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Convert base64 to binary
      const binaryData = atob(imageData);
      const bytes = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('image', new Blob([bytes], { type: 'image/png' }));
      formData.append('n', options.n || 1);
      
      if (options.size) {
        formData.append('size', options.size);
      }
      
      if (options.responseFormat) {
        formData.append('response_format', options.responseFormat);
      }
      
      // Make the API request
      const response = await fetch('https://api.openai.com/v1/images/variations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKeys.openai}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      // Determine image dimensions
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      for (const image of data.data) {
        images.push({
          url: image.url,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "dall-e-2", // Variations are only available with DALL-E 2
        images,
        provider: "openai"
      };
    } catch (error) {
      console.error("OpenAI variation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image variation with Stability AI
   * @param {Blob|string} image - Source image
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateVariationWithStability(image, options) {
    // Ensure we have an API key
    if (!this.apiKeys.stability) {
      throw new Error("Stability AI API key is required");
    }
    
    try {
      console.log("Generating image variation with Stability AI");
      
      // Prepare the image data
      let imageBlob;
      
      if (typeof image === 'string') {
        // If it's a base64 string
        if (image.startsWith('data:image')) {
          // Convert data URL to Blob
          imageBlob = await fetch(image).then(r => r.blob());
        } else if (image.startsWith('http')) {
          // Fetch from URL
          imageBlob = await fetch(image).then(r => r.blob());
        } else {
          // Convert base64 to Blob
          const byteChars = atob(image);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteChars.length; offset += 1024) {
            const slice = byteChars.slice(offset, offset + 1024);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          
          imageBlob = new Blob(byteArrays, { type: 'image/png' });
        }
      } else if (image instanceof Blob) {
        imageBlob = image;
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('init_image', imageBlob);
      formData.append('init_image_mode', 'image_strength');
      formData.append('image_strength', 1 - (options.variationStrength || 0.5));
      
      if (options.prompt) {
        formData.append('text_prompts[0][text]', options.prompt);
        formData.append('text_prompts[0][weight]', 1);
      } else {
        // Default prompt for image variations
        formData.append('text_prompts[0][text]', 'Variation of the original image');
        formData.append('text_prompts[0][weight]', 1);
      }
      
      if (options.negativePrompt) {
        formData.append('text_prompts[1][text]', options.negativePrompt);
        formData.append('text_prompts[1][weight]', -1);
      }
      
      formData.append('cfg_scale', options.cfgScale || 7);
      formData.append('samples', options.n || 1);
      formData.append('steps', options.steps || 30);
      
      if (options.seed !== undefined) {
        formData.append('seed', options.seed);
      }
      
      // Parse dimensions from size
      let width = 512;
      let height = 512;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      formData.append('width', width);
      formData.append('height', height);
      
      // Make the API request
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKeys.stability}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability AI API error: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      for (const image of data.artifacts) {
        const base64Data = image.base64;
        const imgUrl = `data:image/${options.format || 'png'};base64,${base64Data}`;
        images.push({
          url: imgUrl,
          base64: base64Data,
          seed: image.seed,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "stable-diffusion-xl",
        images,
        provider: "stability"
      };
    } catch (error) {
      console.error("Stability AI variation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image variation with Midjourney
   * @param {Blob|string} image - Source image
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateVariationWithMidjourney(image, options) {
    // Ensure we have an API key
    if (!this.apiKeys.midjourney) {
      throw new Error("Midjourney API key is required");
    }
    
    try {
      console.log("Generating image variation with Midjourney");
      
      // Note: Midjourney doesn't have a public API, so this is a simplified simulation
      // In a real implementation, this might use a third-party API or interface with Discord
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Parse dimensions from size
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Generate a placeholder image
      // In a real implementation, this would be the result from Midjourney
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        images.push({
          url: `https://picsum.photos/${width}/${height}?random=${Date.now() + i}`,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "midjourney-v5",
        images,
        provider: "midjourney"
      };
    } catch (error) {
      console.error("Midjourney variation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image variation locally (fallback)
   * @param {Blob|string} image - Source image
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateVariationLocally(image, options) {
    try {
      console.log("Generating image variation locally");
      
      // Parse dimensions from size
      let width = 512;
      let height = 512;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Load the source image
      let imageElement;
      
      if (typeof image === 'string') {
        // Create an image element and load the image
        imageElement = document.createElement('img');
        imageElement.src = image.startsWith('data:') ? image : `data:image/png;base64,${image}`;
        
        // Wait for the image to load
        await new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
        });
      } else if (image instanceof Blob) {
        // Convert Blob to data URL
        const dataUrl = await this.blobToDataURL(image);
        
        // Create an image element and load the image
        imageElement = document.createElement('img');
        imageElement.src = dataUrl;
        
        // Wait for the image to load
        await new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
        });
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Generate variations
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        // Create a canvas and draw the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Draw the original image
        ctx.drawImage(imageElement, 0, 0, width, height);
        
        // Apply variations
        const variationStrength = options.variationStrength || 0.5;
        
        // Apply a color shift
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let j = 0; j < data.length; j += 4) {
          // Randomly adjust RGB values based on variation strength
          data[j] = Math.min(255, Math.max(0, data[j] + (Math.random() * 2 - 1) * variationStrength * 50));
          data[j + 1] = Math.min(255, Math.max(0, data[j + 1] + (Math.random() * 2 - 1) * variationStrength * 50));
          data[j + 2] = Math.min(255, Math.max(0, data[j + 2] + (Math.random() * 2 - 1) * variationStrength * 50));
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Add a slight blur or distortion
        if (variationStrength > 0.3) {
          ctx.filter = `blur(${variationStrength * 2}px)`;
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = 'none';
        }
        
        // Add disclaimer
        ctx.fillStyle = 'white';
        ctx.font = 'italic 12px Arial';
        ctx.fillText('Variation (Local Generation)', 10, height - 10);
        
        // Convert to dataURL
        const base64 = canvas.toDataURL(`image/${options.format || 'png'}`);
        const base64Data = base64.split(',')[1];
        
        images.push({
          url: base64,
          base64: base64Data,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "local-variation",
        images,
        provider: "local"
      };
    } catch (error) {
      console.error("Local variation error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image edit with OpenAI
   * @param {Blob|string} image - Original image
   * @param {string} prompt - Edit prompt
   * @param {Blob|string} mask - Edit mask
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateEditWithOpenAI(image, prompt, mask, options) {
    // Ensure we have an API key
    if (!this.apiKeys.openai) {
      throw new Error("OpenAI API key is required");
    }
    
    try {
      console.log(`Generating image edit with OpenAI: "${prompt.substring(0, 30)}..."`);
      
      // Prepare the image and mask data
      let imageBlob, maskBlob;
      
      // Process image
      if (typeof image === 'string') {
        if (image.startsWith('data:image')) {
          imageBlob = await fetch(image).then(r => r.blob());
        } else if (image.startsWith('http')) {
          imageBlob = await fetch(image).then(r => r.blob());
        } else {
          // Convert base64 to Blob
          const byteChars = atob(image);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteChars.length; offset += 1024) {
            const slice = byteChars.slice(offset, offset + 1024);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          
          imageBlob = new Blob(byteArrays, { type: 'image/png' });
        }
      } else if (image instanceof Blob) {
        imageBlob = image;
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Process mask
      if (typeof mask === 'string') {
        if (mask.startsWith('data:image')) {
          maskBlob = await fetch(mask).then(r => r.blob());
        } else if (mask.startsWith('http')) {
          maskBlob = await fetch(mask).then(r => r.blob());
        } else {
          // Convert base64 to Blob
          const byteChars = atob(mask);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteChars.length; offset += 1024) {
            const slice = byteChars.slice(offset, offset + 1024);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          
          maskBlob = new Blob(byteArrays, { type: 'image/png' });
        }
      } else if (mask instanceof Blob) {
        maskBlob = mask;
      } else {
        throw new Error("Unsupported mask format");
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('image', imageBlob);
      formData.append('mask', maskBlob);
      formData.append('prompt', prompt);
      formData.append('n', options.n || 1);
      
      if (options.size) {
        formData.append('size', options.size);
      }
      
      if (options.responseFormat) {
        formData.append('response_format', options.responseFormat);
      }
      
      // Make the API request
      const response = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKeys.openai}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      // Determine image dimensions
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      for (const image of data.data) {
        images.push({
          url: image.url,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "dall-e-2", // Edits are only available with DALL-E 2
        images,
        provider: "openai"
      };
    } catch (error) {
      console.error("OpenAI edit error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image edit with Stability AI
   * @param {Blob|string} image - Original image
   * @param {string} prompt - Edit prompt
   * @param {Blob|string} mask - Edit mask
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateEditWithStability(image, prompt, mask, options) {
    // Ensure we have an API key
    if (!this.apiKeys.stability) {
      throw new Error("Stability AI API key is required");
    }
    
    try {
      console.log(`Generating image edit with Stability AI: "${prompt.substring(0, 30)}..."`);
      
      // Prepare the image and mask data
      let imageBlob, maskBlob;
      
      // Process image
      if (typeof image === 'string') {
        if (image.startsWith('data:image')) {
          imageBlob = await fetch(image).then(r => r.blob());
        } else if (image.startsWith('http')) {
          imageBlob = await fetch(image).then(r => r.blob());
        } else {
          // Convert base64 to Blob
          const byteChars = atob(image);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteChars.length; offset += 1024) {
            const slice = byteChars.slice(offset, offset + 1024);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          
          imageBlob = new Blob(byteArrays, { type: 'image/png' });
        }
      } else if (image instanceof Blob) {
        imageBlob = image;
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Process mask
      if (typeof mask === 'string') {
        if (mask.startsWith('data:image')) {
          maskBlob = await fetch(mask).then(r => r.blob());
        } else if (mask.startsWith('http')) {
          maskBlob = await fetch(mask).then(r => r.blob());
        } else {
          // Convert base64 to Blob
          const byteChars = atob(mask);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteChars.length; offset += 1024) {
            const slice = byteChars.slice(offset, offset + 1024);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            
            byteArrays.push(new Uint8Array(byteNumbers));
          }
          
          maskBlob = new Blob(byteArrays, { type: 'image/png' });
        }
      } else if (mask instanceof Blob) {
        maskBlob = mask;
      } else {
        throw new Error("Unsupported mask format");
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('init_image', imageBlob);
      formData.append('mask_image', maskBlob);
      
      // Add prompt
      formData.append('text_prompts[0][text]', prompt);
      formData.append('text_prompts[0][weight]', 1);
      
      if (options.negativePrompt) {
        formData.append('text_prompts[1][text]', options.negativePrompt);
        formData.append('text_prompts[1][weight]', -1);
      }
      
      // Add other parameters
      formData.append('cfg_scale', options.cfgScale || 7);
      formData.append('samples', options.n || 1);
      formData.append('steps', options.steps || 30);
      
      if (options.seed !== undefined) {
        formData.append('seed', options.seed);
      }
      
      // Parse dimensions from size
      let width = 512;
      let height = 512;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      formData.append('width', width);
      formData.append('height', height);
      
      // Make the API request
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-inpainting/image-to-image/masking', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKeys.stability}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability AI API error: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the response
      const images = [];
      
      for (const image of data.artifacts) {
        const base64Data = image.base64;
        const imgUrl = `data:image/${options.format || 'png'};base64,${base64Data}`;
        images.push({
          url: imgUrl,
          base64: base64Data,
          seed: image.seed,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "stable-diffusion-inpainting",
        images,
        provider: "stability"
      };
    } catch (error) {
      console.error("Stability AI edit error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image edit with Midjourney
   * @param {Blob|string} image - Original image
   * @param {string} prompt - Edit prompt
   * @param {Blob|string} mask - Edit mask
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateEditWithMidjourney(image, prompt, mask, options) {
    // Ensure we have an API key
    if (!this.apiKeys.midjourney) {
      throw new Error("Midjourney API key is required");
    }
    
    try {
      console.log(`Generating image edit with Midjourney: "${prompt.substring(0, 30)}..."`);
      
      // Note: Midjourney doesn't have a public API, so this is a simplified simulation
      // In a real implementation, this might use a third-party API or interface with Discord
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Parse dimensions from size
      let width = 1024;
      let height = 1024;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Generate a placeholder image
      // In a real implementation, this would be the result from Midjourney
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        images.push({
          url: `https://picsum.photos/${width}/${height}?random=${Date.now() + i}`,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "midjourney-v5",
        images,
        provider: "midjourney"
      };
    } catch (error) {
      console.error("Midjourney edit error:", error);
      throw error;
    }
  }
  
  /**
   * Generate image edit locally (fallback)
   * @param {Blob|string} image - Original image
   * @param {string} prompt - Edit prompt
   * @param {Blob|string} mask - Edit mask
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generation result
   * @private
   */
  async generateEditLocally(image, prompt, mask, options) {
    try {
      console.log(`Generating image edit locally: "${prompt.substring(0, 30)}..."`);
      
      // Parse dimensions from size
      let width = 512;
      let height = 512;
      
      if (options.size) {
        const dimensions = options.size.split('x');
        width = parseInt(dimensions[0]);
        height = parseInt(dimensions[1]);
      }
      
      // Load the source image
      let imageElement, maskElement;
      
      // Load image
      if (typeof image === 'string') {
        imageElement = document.createElement('img');
        imageElement.src = image.startsWith('data:') ? image : `data:image/png;base64,${image}`;
        
        await new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
        });
      } else if (image instanceof Blob) {
        const dataUrl = await this.blobToDataURL(image);
        
        imageElement = document.createElement('img');
        imageElement.src = dataUrl;
        
        await new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
        });
      } else {
        throw new Error("Unsupported image format");
      }
      
      // Load mask
      if (typeof mask === 'string') {
        maskElement = document.createElement('img');
        maskElement.src = mask.startsWith('data:') ? mask : `data:image/png;base64,${mask}`;
        
        await new Promise((resolve, reject) => {
          maskElement.onload = resolve;
          maskElement.onerror = reject;
        });
      } else if (mask instanceof Blob) {
        const dataUrl = await this.blobToDataURL(mask);
        
        maskElement = document.createElement('img');
        maskElement.src = dataUrl;
        
        await new Promise((resolve, reject) => {
          maskElement.onload = resolve;
          maskElement.onerror = reject;
        });
      } else {
        throw new Error("Unsupported mask format");
      }
      
      // Generate edited images
      const images = [];
      
      for (let i = 0; i < (options.n || 1); i++) {
        // Create a canvas and draw the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Draw the original image
        ctx.drawImage(imageElement, 0, 0, width, height);
        
        // Apply the edit based on mask
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(maskElement, 0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
        
        // Fill the masked area with a gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, this.getRandomColor());
        gradient.addColorStop(1, this.getRandomColor());
        
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        
        // Add prompt text to the edited area
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''), width / 2, height / 2);
        
        // Add disclaimer
        ctx.font = 'italic 12px Arial';
        ctx.fillText('Edit (Local Generation)', width / 2, height - 10);
        
        // Convert to dataURL
        const base64 = canvas.toDataURL(`image/${options.format || 'png'}`);
        const base64Data = base64.split(',')[1];
        
        images.push({
          url: base64,
          base64: base64Data,
          width,
          height
        });
      }
      
      return {
        success: true,
        model: "local-edit",
        images,
        provider: "local"
      };
    } catch (error) {
      console.error("Local edit error:", error);
      throw error;
    }
  }
  
  /**
   * Optimize a prompt
   * @param {string} prompt - Original prompt
   * @param {Object} options - Optimization options
   * @returns {string} Optimized prompt
   * @private
   */
  optimizePrompt(prompt, options = {}) {
    if (!this.enablePromptOptimization) {
      return prompt;
    }
    
    // Apply each prompt enhancer in sequence
    let optimizedPrompt = prompt;
    
    // Apply specific enhancers if requested
    if (options.enhancers && Array.isArray(options.enhancers)) {
      for (const enhancerName of options.enhancers) {
        if (this._promptEnhancers[enhancerName]) {
          optimizedPrompt = this._promptEnhancers[enhancerName].process(optimizedPrompt, options);
        }
      }
    } else {
      // Apply all enhancers
      for (const enhancer of Object.values(this._promptEnhancers)) {
        optimizedPrompt = enhancer.process(optimizedPrompt, options);
      }
    }
    
    return optimizedPrompt;
  }
  
  /**
   * Get a random color
   * @returns {string} Random color in hex format
   * @private
   */
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  /**
   * Convert a Blob to base64
   * @param {Blob} blob - Blob to convert
   * @returns {Promise<string>} Base64 string
   * @private
   */
  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  /**
   * Convert a Blob to data URL
   * @param {Blob} blob - Blob to convert
   * @returns {Promise<string>} Data URL
   * @private
   */
  blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  /**
   * Get cache key for an image generation
   * @param {string} prompt - Prompt text
   * @param {Object} options - Generation options
   * @returns {string} Cache key
   * @private
   */
  getCacheKey(prompt, options) {
    // Create a cache key based on prompt and relevant options
    const relevantOptions = {
      provider: options.provider || this.provider,
      model: options.model || this.model,
      size: options.size || this.defaultImageSize,
      quality: options.quality || this.defaultQuality,
      style: options.style,
      stylePreset: options.stylePreset,
      negativePrompt: options.negativePrompt,
      seed: options.seed
    };
    
    return `${prompt}|${JSON.stringify(relevantOptions)}`;
  }
  
  /**
   * Trim the generation cache
   * @private
   */
  trimCache() {
    const cacheKeys = Object.keys(this._generationCache);
    
    if (cacheKeys.length > this.maxCacheSize) {
      // Remove oldest entries first
      const entriesToRemove = cacheKeys.length - this.maxCacheSize;
      
      // Sort by timestamp (oldest first)
      const sortedKeys = cacheKeys.sort((a, b) => {
        const timeA = this._generationCache[a].timestamp || 0;
        const timeB = this._generationCache[b].timestamp || 0;
        return timeA - timeB;
      });
      
      // Remove oldest entries
      for (let i = 0; i < entriesToRemove; i++) {
        delete this._generationCache[sortedKeys[i]];
      }
    }
  }
  
  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   * @private
   */
  generateId() {
    return `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Register an event listener
   * @param {string} event - Event type
   * @param {Function} callback - Callback function
   * @returns {string} Listener ID
   */
  on(event, callback) {
    if (!this._listeners[event]) {
      throw new Error(`Unknown event: ${event}`);
    }
    
    if (typeof callback !== 'function') {
      throw new Error("Callback must be a function");
    }
    
    const id = this.generateListenerId();
    this._listeners[event].push({ id, callback });
    
    return id;
  }
  
  /**
   * Remove an event listener
   * @param {string} event - Event type
   * @param {string|Function} idOrCallback - Listener ID or callback function
   * @returns {boolean} Success status
   */
  off(event, idOrCallback) {
    if (!this._listeners[event]) {
      throw new Error(`Unknown event: ${event}`);
    }
    
    const listeners = this._listeners[event];
    let index = -1;
    
    if (typeof idOrCallback === 'string') {
      // Remove by ID
      index = listeners.findIndex(listener => listener.id === idOrCallback);
    } else if (typeof idOrCallback === 'function') {
      // Remove by callback reference
      index = listeners.findIndex(listener => listener.callback === idOrCallback);
    }
    
    if (index !== -1) {
      listeners.splice(index, 1);
      return true;
    }
    
    return false;
  }
  
  /**
   * Notify all listeners of an event
   * @param {string} event - Event type
   * @param {Object} data - Event data
   * @private
   */
  _notifyListeners(event, data) {
    if (!this._listeners[event]) {
      return;
    }
    
    for (const { callback } of this._listeners[event]) {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    }
  }
  
  /**
   * Generate a unique listener ID
   * @returns {string} Listener ID
   * @private
   */
  generateListenerId() {
    return `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  /**
   * Get list of available models
   * @returns {Object} Available models by provider
   */
  getAvailableModels() {
    const availableModels = {
      openai: [
        {
          id: "dall-e-3",
          name: "DALL-E 3",
          description: "Most advanced model with high-quality, photorealistic images",
          maxPromptLength: 1000,
          sizes: ["1024x1024", "1792x1024", "1024x1792"],
          features: ["generation"]
        },
        {
          id: "dall-e-2",
          name: "DALL-E 2",
          description: "Capable of creating realistic images and art from text descriptions",
          maxPromptLength: 1000,
          sizes: ["256x256", "512x512", "1024x1024"],
          features: ["generation", "variation", "edit"]
        }
      ],
      stability: [
        {
          id: "stable-diffusion-xl-1024-v1-0",
          name: "Stable Diffusion XL",
          description: "High-quality image generation with detailed control",
          maxPromptLength: 2000,
          sizes: ["512x512", "768x768", "1024x1024"],
          features: ["generation", "variation"]
        },
        {
          id: "stable-diffusion-inpainting",
          name: "Stable Diffusion Inpainting",
          description: "Specialized model for image editing and inpainting",
          maxPromptLength: 2000,
          sizes: ["512x512", "768x768", "1024x1024"],
          features: ["edit"]
        }
      ],
      midjourney: [
        {
          id: "midjourney-v5",
          name: "Midjourney v5",
          description: "Artistic image generation with high aesthetic quality",
          maxPromptLength: 1500,
          sizes: ["1024x1024", "1792x1024", "1024x1792"],
          features: ["generation", "variation", "edit"]
        }
      ],
      local: [
        {
          id: "local-placeholder",
          name: "Local Placeholder",
          description: "Simple placeholder image generation for demonstration",
          maxPromptLength: 2000,
          sizes: ["512x512", "1024x1024"],
          features: ["generation", "variation", "edit"]
        }
      ]
    };
    
    // Filter based on available API keys
    const result = {};
    
    for (const [provider, models] of Object.entries(availableModels)) {
      if (provider === 'local' || this.apiKeys[provider]) {
        result[provider] = models;
      }
    }
    
    return result;
  }
  
  /**
   * Get list of available style presets
   * @returns {Object} Available style presets
   */
  getAvailableStylePresets() {
    return this._stylePresets;
  }
  
  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfiguration() {
    return {
      version: this.version,
      initialized: this.initialized,
      provider: this.provider,
      model: this.model,
      defaultImageSize: this.defaultImageSize,
      defaultImageFormat: this.defaultImageFormat,
      defaultQuality: this.defaultQuality,
      features: {
        promptOptimization: this.enablePromptOptimization,
        negativePrompts: this.enableNegativePrompts,
        styleTransfer: this.enableStyleTransfer,
        cache: this.enableCache
      },
      limits: {
        maxPromptLength: this.maxPromptLength,
        maxBatchSize: this.maxBatchSize,
        maxCacheSize: this.maxCacheSize
      },
      availableProviders: Object.keys(this._recognitionProviders),
      stylePresets: Object.keys(this._stylePresets),
      promptEnhancers: Object.keys(this._promptEnhancers)
    };
  }
}

// Export the class for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextToImage;
} else if (typeof window !== 'undefined') {
  window.TextToImage = TextToImage;
}