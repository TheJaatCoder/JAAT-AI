/**
 * JAAT-AI Emoji Translator Feature
 * Translate text to emoji and emoji to text, enhancing chat messages
 */

class EmojiTranslator {
    constructor() {
        // Common word to emoji mappings
        this.wordToEmoji = {
            // Emotions
            'happy': '😊',
            'sad': '😢',
            'angry': '😠',
            'laugh': '😂',
            'smile': '😄',
            'cry': '😭',
            'love': '❤️',
            'heart': '❤️',
            'like': '👍',
            'dislike': '👎',
            'surprised': '😲',
            'shocked': '😱',
            'confused': '😕',
            'thinking': '🤔',
            'tired': '😴',
            'sleepy': '😴',
            'sick': '🤒',
            'crazy': '🤪',
            'cool': '😎',
            'nervous': '😬',
            'worried': '😟',
            'scared': '😨',
            'angry': '😡',
            'mad': '😡',
            'evil': '😈',
            'devil': '😈',
            'angel': '😇',
            'silly': '🙃',
            'funny': '😄',
            'quiet': '🤫',
            'secret': '🤫',
            'lying': '🤥',
            
            // People
            'person': '👤',
            'man': '👨',
            'woman': '👩',
            'boy': '👦',
            'girl': '👧',
            'baby': '👶',
            'child': '👶',
            'people': '👥',
            'family': '👪',
            
            // Hand gestures
            'wave': '👋',
            'hello': '👋',
            'hi': '👋',
            'bye': '👋',
            'clap': '👏',
            'pray': '🙏',
            'please': '🙏',
            'thank': '🙏',
            'thanks': '🙏',
            'fist': '👊',
            'punch': '👊',
            'peace': '✌️',
            'victory': '✌️',
            'ok': '👌',
            'perfect': '👌',
            'pinch': '🤏',
            'point': '👉',
            
            // Actions
            'run': '🏃',
            'running': '🏃',
            'walk': '🚶',
            'walking': '🚶',
            'dance': '💃',
            'dancing': '💃',
            'jump': '🦘',
            'swimming': '🏊',
            'swim': '🏊',
            'climb': '🧗',
            'climbing': '🧗',
            'sleep': '😴',
            'sleeping': '😴',
            'eat': '🍽️',
            'eating': '🍽️',
            'drink': '🥤',
            'drinking': '🥤',
            'cook': '👨‍🍳',
            'cooking': '👨‍🍳',
            'write': '✍️',
            'writing': '✍️',
            'read': '📚',
            'reading': '📚',
            'watch': '👀',
            'watching': '👀',
            'listen': '👂',
            'listening': '👂',
            'search': '🔍',
            'searching': '🔍',
            'find': '🔍',
            'finding': '🔍',
            
            // Objects
            'phone': '📱',
            'computer': '💻',
            'laptop': '💻',
            'tv': '📺',
            'television': '📺',
            'camera': '📷',
            'photo': '📷',
            'picture': '🖼️',
            'movie': '🎬',
            'film': '🎬',
            'book': '📚',
            'mail': '📧',
            'email': '📧',
            'letter': '✉️',
            'money': '💰',
            'dollar': '💵',
            'cash': '💵',
            'credit': '💳',
            'card': '💳',
            'gift': '🎁',
            'present': '🎁',
            'clock': '🕒',
            'time': '⏰',
            'alarm': '⏰',
            'watch': '⌚',
            'hourglass': '⌛',
            'bell': '🔔',
            'key': '🔑',
            'lock': '🔒',
            'unlock': '🔓',
            'tool': '🔧',
            'hammer': '🔨',
            'knife': '🔪',
            'scissors': '✂️',
            'bomb': '💣',
            'gun': '🔫',
            'medicine': '💊',
            'pill': '💊',
            'syringe': '💉',
            'injection': '💉',
            
            // Food and drinks
            'food': '🍲',
            'breakfast': '🍳',
            'lunch': '🍱',
            'dinner': '🍽️',
            'fruit': '🍎',
            'apple': '🍎',
            'banana': '🍌',
            'orange': '🍊',
            'lemon': '🍋',
            'strawberry': '🍓',
            'grapes': '🍇',
            'watermelon': '🍉',
            'pizza': '🍕',
            'hamburger': '🍔',
            'burger': '🍔',
            'fries': '🍟',
            'popcorn': '🍿',
            'sweet': '🍬',
            'candy': '🍬',
            'chocolate': '🍫',
            'ice': '🧊',
            'icecream': '🍦',
            'cake': '🍰',
            'cookie': '🍪',
            'bread': '🍞',
            'coffee': '☕',
            'tea': '🍵',
            'milk': '🥛',
            'beer': '🍺',
            'wine': '🍷',
            'cocktail': '🍸',
            
            // Animals
            'animal': '🐾',
            'dog': '🐶',
            'cat': '🐱',
            'mouse': '🐭',
            'hamster': '🐹',
            'rabbit': '🐰',
            'fox': '🦊',
            'bear': '🐻',
            'panda': '🐼',
            'koala': '🐨',
            'tiger': '🐯',
            'lion': '🦁',
            'cow': '🐮',
            'pig': '🐷',
            'frog': '🐸',
            'monkey': '🐵',
            'chicken': '🐔',
            'penguin': '🐧',
            'bird': '🐦',
            'eagle': '🦅',
            'duck': '🦆',
            'swan': '🦢',
            'owl': '🦉',
            'insect': '🐞',
            'butterfly': '🦋',
            'bee': '🐝',
            'ant': '🐜',
            'mosquito': '🦟',
            'spider': '🕷️',
            'snail': '🐌',
            'fish': '🐟',
            'shark': '🦈',
            'dolphin': '🐬',
            'whale': '🐳',
            'octopus': '🐙',
            
            // Nature
            'flower': '🌸',
            'rose': '🌹',
            'sunflower': '🌻',
            'tree': '🌳',
            'plant': '🌱',
            'leaf': '🍃',
            'herb': '🌿',
            'mushroom': '🍄',
            'cactus': '🌵',
            'mountain': '⛰️',
            'volcano': '🌋',
            'camping': '🏕️',
            'beach': '🏖️',
            'desert': '🏜️',
            'island': '🏝️',
            'ocean': '🌊',
            'wave': '🌊',
            'water': '💧',
            'rain': '🌧️',
            'snow': '❄️',
            'snowman': '☃️',
            'cloud': '☁️',
            'sun': '☀️',
            'sunny': '☀️',
            'moon': '🌙',
            'night': '🌃',
            'star': '⭐',
            'rainbow': '🌈',
            'fire': '🔥',
            'hot': '🔥',
            
            // Places
            'home': '🏠',
            'house': '🏠',
            'building': '🏢',
            'office': '🏢',
            'school': '🏫',
            'hospital': '🏥',
            'hotel': '🏨',
            'castle': '🏰',
            'church': '⛪',
            'city': '🏙️',
            'village': '🏘️',
            'park': '🏞️',
            'bridge': '🌉',
            'fountain': '⛲',
            'statue': '🗽',
            
            // Transportation
            'car': '🚗',
            'taxi': '🚕',
            'bus': '🚌',
            'truck': '🚚',
            'ambulance': '🚑',
            'police': '🚓',
            'fire': '🚒',
            'motorcycle': '🏍️',
            'bicycle': '🚲',
            'bike': '🚲',
            'train': '🚆',
            'metro': '🚇',
            'subway': '🚇',
            'tram': '🚊',
            'ship': '🚢',
            'boat': '⛵',
            'airplane': '✈️',
            'plane': '✈️',
            'flight': '✈️',
            'helicopter': '🚁',
            'rocket': '🚀',
            'satellite': '🛰️',
            
            // Activities
            'sport': '🏅',
            'sports': '🏅',
            'football': '⚽',
            'soccer': '⚽',
            'basketball': '🏀',
            'baseball': '⚾',
            'tennis': '🎾',
            'volleyball': '🏐',
            'rugby': '🏉',
            'golf': '⛳',
            'pool': '🎱',
            'swim': '🏊',
            'skiing': '⛷️',
            'skate': '⛸️',
            'skateboard': '🛹',
            'fishing': '🎣',
            'game': '🎮',
            'gaming': '🎮',
            'video': '🎮',
            'dice': '🎲',
            'chess': '♟️',
            'music': '🎵',
            'musical': '🎵',
            'song': '🎵',
            'guitar': '🎸',
            'piano': '🎹',
            'trumpet': '🎺',
            'violin': '🎻',
            'drum': '🥁',
            'microphone': '🎤',
            'headphone': '🎧',
            'art': '🎨',
            'painting': '🎨',
            'drawing': '✏️',
            'theater': '🎭',
            'circus': '🎪',
            'graduation': '🎓',
            
            // Symbols
            'heart': '❤️',
            'love': '❤️',
            'break': '💔',
            'broken': '💔',
            'star': '⭐',
            'sparkle': '✨',
            'fire': '🔥',
            'lit': '🔥',
            'anger': '💢',
            'sleep': '💤',
            'idea': '💡',
            'warning': '⚠️',
            'caution': '⚠️',
            'question': '❓',
            'answer': '✅',
            'check': '✅',
            'yes': '✅',
            'no': '❌',
            'stop': '🛑',
            'prohibited': '🚫',
            'forbidden': '🚫',
            
            // Time
            'soon': '🔜',
            'back': '🔙',
            'end': '🔚',
            'top': '🔝',
            'new': '🆕',
            'free': '🆓',
            
            // Tech terms
            'internet': '🌐',
            'web': '🕸️',
            'link': '🔗',
            'website': '🌐',
            'wifi': '📶',
            'signal': '📶',
            'battery': '🔋',
            'power': '🔋',
            'charging': '🔌',
            'light': '💡',
            'mobile': '📱',
            'smartphone': '📱',
            'message': '💬',
            'talk': '💬',
            'chat': '💬',
            'comment': '💬',
            'contact': '📞',
            'call': '📞',
            'audio': '🔊',
            'volume': '🔊',
            'sound': '🔊',
            'mute': '🔇',
            'silent': '🔇',
            'disk': '💿',
            'download': '⏬',
            'upload': '⏫',
            'search': '🔍',
            'find': '🔍',
            'zoom': '🔍',
            'bug': '🐛',
            'error': '🐛',
            'virus': '🦠',
            'secure': '🔒',
            'private': '🔒',
            'public': '🔓',
            'key': '🔑',
            'password': '🔑',
            
            // Weather
            'weather': '🌦️',
            'sunny': '☀️',
            'cloudy': '☁️',
            'rainy': '🌧️',
            'storm': '⛈️',
            'lightning': '⚡',
            'thunder': '⚡',
            'snowy': '❄️',
            'foggy': '🌫️',
            'windy': '💨',
            'rainbow': '🌈',
            'umbrella': '☂️',
            
            // Celebrations
            'party': '🎉',
            'celebrate': '🎉',
            'birthday': '🎂',
            'cake': '🎂',
            'candle': '🕯️',
            'balloon': '🎈',
            'gift': '🎁',
            'present': '🎁',
            'christmas': '🎄',
            'halloween': '🎃',
            'pumpkin': '🎃',
            'fireworks': '🎆',
            'sparkler': '🎇',
            'confetti': '🎊',
            'medal': '🏅',
            'trophy': '🏆',
            'award': '🏆',
            'win': '🏆',
            'ribbon': '🎀',
            'ticket': '🎫',
            
            // Social media
            'like': '👍',
            'dislike': '👎',
            'share': '📤',
            'follow': '➡️',
            'trending': '📈',
            'viral': '📈',
            'hashtag': '#️⃣',
            'favorite': '⭐',
            'bookmark': '🔖',
            'save': '💾',
            'chat': '💬',
            'comment': '💬',
            'notification': '🔔',
            'alert': '🔔',
            'tag': '🏷️',
            'location': '📍',
            'selfie': '🤳',
            'photo': '📸',
            'video': '📹',
            'live': '🔴',
            'streaming': '🔴'
        };
        
        // Special emoji to word mappings (for emoji-to-text translation)
        this.emojiToWord = {
            '😊': 'happy',
            '😢': 'sad',
            '😠': 'angry',
            '😂': 'laughing',
            '😄': 'smiling',
            '😭': 'crying',
            '❤️': 'love',
            '👍': 'like',
            '👎': 'dislike',
            '😲': 'surprised',
            '😱': 'shocked',
            '😕': 'confused',
            '🤔': 'thinking',
            '😴': 'sleeping',
            '🤒': 'sick',
            '🤪': 'crazy',
            '😎': 'cool',
            '😬': 'nervous',
            '😟': 'worried',
            '😨': 'scared',
            '😡': 'angry',
            '😈': 'evil',
            '😇': 'innocent',
            '🙃': 'silly',
            '🤫': 'quiet',
            '🤥': 'lying',
            '👤': 'person',
            '👨': 'man',
            '👩': 'woman',
            '👦': 'boy',
            '👧': 'girl',
            '👶': 'baby',
            '👥': 'people',
            '👪': 'family',
            '👋': 'waving',
            '👏': 'clapping',
            '🙏': 'praying',
            '👊': 'fist',
            '✌️': 'peace',
            '👌': 'ok',
            '🤏': 'pinch',
            '👉': 'pointing',
            '🏃': 'running',
            '🚶': 'walking',
            '💃': 'dancing',
            '🦘': 'jumping',
            '🏊': 'swimming',
            '🧗': 'climbing',
            '🍽️': 'eating',
            '🥤': 'drinking',
            '👨‍🍳': 'cooking',
            '✍️': 'writing',
            '📚': 'reading',
            '👀': 'watching',
            '👂': 'listening',
            '🔍': 'searching',
            '📱': 'phone',
            '💻': 'computer',
            '📺': 'TV',
            '📷': 'camera',
            '🖼️': 'picture',
            '🎬': 'movie',
            '📧': 'email',
            '✉️': 'letter',
            '💰': 'money',
            '💵': 'cash',
            '💳': 'card',
            '🎁': 'gift',
            '🕒': 'clock',
            '⏰': 'alarm',
            '⌚': 'watch',
            '⌛': 'time',
            '🔔': 'notification',
            '🔑': 'key',
            '🔒': 'locked',
            '🔓': 'unlocked',
            '🔧': 'tool',
            '🔨': 'hammer',
            '🔪': 'knife',
            '✂️': 'cut',
            '💣': 'explosive',
            '🔫': 'gun',
            '💊': 'medicine',
            '💉': 'injection',
            '🍲': 'food',
            '🍳': 'cooking',
            '🍱': 'meal',
            '🍎': 'apple',
            '🍌': 'banana',
            '🍊': 'orange',
            '🍋': 'lemon',
            '🍓': 'strawberry',
            '🍇': 'grapes',
            '🍉': 'watermelon',
            '🍕': 'pizza',
            '🍔': 'burger',
            '🍟': 'fries',
            '🍿': 'popcorn',
            '🍬': 'candy',
            '🍫': 'chocolate',
            '🧊': 'ice',
            '🍦': 'ice cream',
            '🍰': 'cake',
            '🍪': 'cookie',
            '🍞': 'bread',
            '☕': 'coffee',
            '🍵': 'tea',
            '🥛': 'milk',
            '🍺': 'beer',
            '🍷': 'wine',
            '🍸': 'cocktail',
            '🐾': 'animal',
            '🐶': 'dog',
            '🐱': 'cat',
            '🐭': 'mouse',
            '🐹': 'hamster',
            '🐰': 'rabbit',
            '🦊': 'fox',
            '🐻': 'bear',
            '🐼': 'panda',
            '🐨': 'koala',
            '🐯': 'tiger',
            '🦁': 'lion',
            '🐮': 'cow',
            '🐷': 'pig',
            '🐸': 'frog',
            '🐵': 'monkey',
            '🐔': 'chicken',
            '🐧': 'penguin',
            '🐦': 'bird',
            '🦅': 'eagle',
            '🦆': 'duck',
            '🦢': 'swan',
            '🦉': 'owl',
            '🐞': 'ladybug',
            '🦋': 'butterfly',
            '🐝': 'bee',
            '🐜': 'ant',
            '🦟': 'mosquito',
            '🕷️': 'spider',
            '🐌': 'snail',
            '🐟': 'fish',
            '🦈': 'shark',
            '🐬': 'dolphin',
            '🐳': 'whale',
            '🐙': 'octopus',
            '🌸': 'flower',
            '🌹': 'rose',
            '🌻': 'sunflower',
            '🌳': 'tree',
            '🌱': 'plant',
            '🍃': 'leaf',
            '🌿': 'herb',
            '🍄': 'mushroom',
            '🌵': 'cactus',
            '⛰️': 'mountain',
            '🌋': 'volcano',
            '🏕️': 'camping',
            '🏖️': 'beach',
            '🏜️': 'desert',
            '🏝️': 'island',
            '🌊': 'wave',
            '💧': 'water',
            '🌧️': 'rain',
            '❄️': 'snow',
            '☃️': 'snowman',
            '☁️': 'cloud',
            '☀️': 'sun',
            '🌙': 'moon',
            '🌃': 'night',
            '⭐': 'star',
            '🌈': 'rainbow',
            '🔥': 'fire',
            '🏠': 'home',
            '🏢': 'building',
            '🏫': 'school',
            '🏥': 'hospital',
            '🏨': 'hotel',
            '🏰': 'castle',
            '⛪': 'church',
            '🏙️': 'city',
            '🏘️': 'neighborhood',
            '🏞️': 'park',
            '🌉': 'bridge',
            '⛲': 'fountain',
            '🗽': 'statue',
            '🚗': 'car',
            '🚕': 'taxi',
            '🚌': 'bus',
            '🚚': 'truck',
            '🚑': 'ambulance',
            '🚓': 'police',
            '🚒': 'firetruck',
            '🏍️': 'motorcycle',
            '🚲': 'bicycle',
            '🚆': 'train',
            '🚇': 'subway',
            '🚊': 'tram',
            '🚢': 'ship',
            '⛵': 'boat',
            '✈️': 'airplane',
            '🚁': 'helicopter',
            '🚀': 'rocket',
            '🛰️': 'satellite',
            '🏅': 'medal',
            '⚽': 'soccer',
            '🏀': 'basketball',
            '⚾': 'baseball',
            '🎾': 'tennis',
            '🏐': 'volleyball',
            '🏉': 'rugby',
            '⛳': 'golf',
            '🎱': 'billiards',
            '⛷️': 'skiing',
            '⛸️': 'skating',
            '🛹': 'skateboard',
            '🎣': 'fishing',
            '🎮': 'gaming',
            '🎲': 'dice',
            '♟️': 'chess',
            '🎵': 'music',
            '🎸': 'guitar',
            '🎹': 'piano',
            '🎺': 'trumpet',
            '🎻': 'violin',
            '🥁': 'drum',
            '🎤': 'microphone',
            '🎧': 'headphones',
            '🎨': 'art',
            '✏️': 'drawing',
            '🎭': 'theater',
            '🎪': 'circus',
            '🎓': 'graduation',
            '❤️': 'heart',
            '💔': 'heartbreak',
            '✨': 'sparkle',
            '💢': 'anger',
            '💤': 'sleep',
            '💡': 'idea',
            '⚠️': 'warning',
            '❓': 'question',
            '✅': 'check',
            '❌': 'wrong',
            '🛑': 'stop',
            '🚫': 'prohibited',
            '🔜': 'soon',
            '🔙': 'back',
            '🔚': 'end',
            '🔝': 'top',
            '🆕': 'new',
            '🆓': 'free',
            '🌐': 'internet',
            '🕸️': 'web',
            '🔗': 'link',
            '📶': 'signal',
            '🔋': 'battery',
            '🔌': 'power',
            '💡': 'lightbulb',
            '📱': 'smartphone',
            '💬': 'message',
            '📞': 'phone',
            '🔊': 'sound',
            '🔇': 'mute',
            '💿': 'disk',
            '⏬': 'download',
            '⏫': 'upload',
            '🔍': 'search',
            '🐛': 'bug',
            '🦠': 'virus',
            '🔒': 'secure',
            '🔓': 'unlocked',
            '🌦️': 'weather',
            '⛈️': 'storm',
            '⚡': 'lightning',
            '🌫️': 'fog',
            '💨': 'wind',
            '☂️': 'umbrella',
            '🎉': 'celebration',
            '🎂': 'birthday',
            '🕯️': 'candle',
            '🎈': 'balloon',
            '🎄': 'christmas',
            '🎃': 'halloween',
            '🎆': 'fireworks',
            '🎇': 'sparkler',
            '🎊': 'party',
            '🏆': 'trophy',
            '🎀': 'ribbon',
            '🎫': 'ticket',
            '📈': 'trending',
            '#️⃣': 'hashtag',
            '🔖': 'bookmark',
            '💾': 'save',
            '🏷️': 'tag',
            '📍': 'location',
            '🤳': 'selfie',
            '📸': 'photo',
            '📹': 'video',
            '🔴': 'live'
        };
        
        // Emoji name to unicode mappings (for debugging and display)
        this.emojiNames = {
            ':)': '😊',
            ':-)': '😊',
            ':D': '😄',
            ':-D': '😄',
            ':(': '😢',
            ':-(': '😢',
            ';)': '😉',
            ';-)': '😉',
            ':P': '😛',
            ':-P': '😛',
            ':p': '😛',
            ':-p': '😛',
            ':O': '😲',
            ':-O': '😲',
            ':o': '😲',
            ':-o': '😲',
            ':0': '😲',
            ':-0': '😲',
            ':/': '😕',
            ':-/': '😕',
            ':\\': '😕',
            ':-\\': '😕',
            ':*': '😘',
            ':-*': '😘',
            ':|': '😐',
            ':-|': '😐',
            ':$': '😳',
            ':-$': '😳',
            ':^)': '😊',
            ':3': '😊',
            '>:(': '😠',
            '>:-(': '😠',
            '<3': '❤️',
            '</3': '💔',
            '*_*': '😍',
            'O.O': '😳',
            'o.o': '😳',
            'O_O': '😳',
            'o_o': '😳',
            '-_-': '😑',
            '^_^': '😊',
            '^-^': '😊',
            '^^': '😊',
            ':>': '😏',
            ':->': '😏',
            ':<': '😞',
            ':-<': '😞',
            'T_T': '😭',
            'T.T': '😭',
            ':thumbsup:': '👍',
            ':thumbsdown:': '👎',
            ':heart:': '❤️',
            ':fire:': '🔥',
            ':smile:': '😊',
            ':sad:': '😢',
            ':laugh:': '😂',
            ':cry:': '😭',
            ':angry:': '😠',
            ':shock:': '😲',
            ':confused:': '😕',
            ':thinking:': '🤔',
            ':cool:': '😎',
            ':love:': '❤️',
            ':like:': '👍',
            ':dislike:': '👎',
            ':clap:': '👏',
            ':pray:': '🙏'
        };
        
        // Emoji categories for UI organization
        this.categories = [
            { id: 'recent', name: 'Recently Used' },
            { id: 'emotions', name: 'Emotions' },
            { id: 'people', name: 'People & Body' },
            { id: 'animals', name: 'Animals & Nature' },
            { id: 'food', name: 'Food & Drink' },
            { id: 'travel', name: 'Travel & Places' },
            { id: 'activities', name: 'Activities' },
            { id: 'objects', name: 'Objects' },
            { id: 'symbols', name: 'Symbols' }
        ];
        
        // Emoji category mappings
        this.categoryEmojis = {
            emotions: ['😊', '😢', '😠', '😂', '😄', '😭', '❤️', '👍', '👎', '😲', '😱', '😕', '🤔', '😴', '🤒', '🤪', '😎', '😬', '😟', '😨', '😡', '😈', '😇', '🙃', '🤫', '🤥'],
            people: ['👤', '👨', '👩', '👦', '👧', '👶', '👥', '👪', '👋', '👏', '🙏', '👊', '✌️', '👌', '🤏', '👉', '🏃', '🚶', '💃', '🦘', '🏊', '🧗', '😴', '🍽️', '🥤', '👨‍🍳', '✍️', '📚', '👀', '👂', '🔍'],
            animals: ['🐾', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦅', '🦆', '🦢', '🦉', '🐞', '🦋', '🐝', '🐜', '🦟', '🕷️', '🐌', '🐟', '🦈', '🐬', '🐳', '🐙'],
            food: ['🍲', '🍳', '🍱', '🍽️', '🍎', '🍌', '🍊', '🍋', '🍓', '🍇', '🍉', '🍕', '🍔', '🍟', '🍿', '🍬', '🍫', '🧊', '🍦', '🍰', '🍪', '🍞', '☕', '🍵', '🥛', '🍺', '🍷', '🍸'],
            travel: ['🏠', '🏢', '🏫', '🏥', '🏨', '🏰', '⛪', '🏙️', '🏘️', '🏞️', '🌉', '⛲', '🗽', '🚗', '🚕', '🚌', '🚚', '🚑', '🚓', '🚒', '🏍️', '🚲', '🚆', '🚇', '🚊', '🚢', '⛵', '✈️', '🚁', '🚀', '🛰️'],
            activities: ['🏅', '⚽', '🏀', '⚾', '🎾', '🏐', '🏉', '⛳', '🎱', '⛷️', '⛸️', '🛹', '🎣', '🎮', '🎲', '♟️', '🎵', '🎸', '🎹', '🎺', '🎻', '🥁', '🎤', '🎧', '🎨', '✏️', '🎭', '🎪', '🎓'],
            objects: ['📱', '💻', '📺', '📷', '🖼️', '🎬', '📚', '📧', '✉️', '💰', '💵', '💳', '🎁', '🕒', '⏰', '⌚', '⌛', '🔔', '🔑', '🔒', '🔓', '🔧', '🔨', '🔪', '✂️', '💣', '🔫', '💊', '💉'],
            symbols: ['❤️', '💔', '⭐', '✨', '🔥', '💢', '💤', '💡', '⚠️', '❓', '✅', '❌', '🛑', '🚫', '🔜', '🔙', '🔚', '🔝', '🆕', '🆓']
        };
        
        // Recent emojis storage
        this.recentEmojis = [];
        
        // Maximum number of recent emojis to store
        this.maxRecentEmojis = 30;
        
        // Storage key
        this.storageKey = 'jaat-recent-emojis';
        
        // Translation options
        this.translationOptions = {
            wordToEmoji: true,          // Enable word-to-emoji translation
            emojiToWord: true,          // Enable emoji-to-word translation
            textSmileys: true,          // Convert text smileys like :) to emojis
            replaceInText: true,        // Replace matching words in text with emojis
            emojiPercentage: 30,        // Percentage of matching words to convert to emojis (0-100)
            smartWordContext: true,     // Consider word context for better translations
            emojiToWordTooltips: true,  // Show word meanings on emoji hover
            phraseDetection: true       // Detect and translate common phrases
        };
    }

    /**
     * Initialize emoji translator
     * @param {Object} options - Configuration options
     * @returns {EmojiTranslator} This instance
     */
    init(options = {}) {
        // Apply custom options
        if (options.translationOptions) {
            this.translationOptions = { ...this.translationOptions, ...options.translationOptions };
        }
        
        // Load recent emojis
        this.loadRecentEmojis();
        
        console.log('Emoji Translator initialized');
        return this;
    }

    /**
     * Load recent emojis from localStorage
     */
    loadRecentEmojis() {
        try {
            const recentEmojisStr = localStorage.getItem(this.storageKey);
            if (recentEmojisStr) {
                this.recentEmojis = JSON.parse(recentEmojisStr);
            }
        } catch (error) {
            console.error('Error loading recent emojis:', error);
            this.recentEmojis = [];
        }
    }

    /**
     * Save recent emojis to localStorage
     */
    saveRecentEmojis() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.recentEmojis));
        } catch (error) {
            console.error('Error saving recent emojis:', error);
        }
    }

    /**
     * Add an emoji to the recent emojis list
     * @param {string} emoji - Emoji to add
     */
    addToRecentEmojis(emoji) {
        // Remove existing instance of this emoji
        this.recentEmojis = this.recentEmojis.filter(e => e !== emoji);
        
        // Add to the beginning
        this.recentEmojis.unshift(emoji);
        
        // Trim to max length
        if (this.recentEmojis.length > this.maxRecentEmojis) {
            this.recentEmojis = this.recentEmojis.slice(0, this.maxRecentEmojis);
        }
        
        // Save to localStorage
        this.saveRecentEmojis();
    }

    /**
     * Translate text to emoji
     * @param {string} text - Text to translate
     * @param {Object} options - Translation options
     * @returns {string} Text with emojis
     */
    textToEmoji(text, options = {}) {
        if (!text) {
            return '';
        }
        
        // Merge options with default options
        const mergedOptions = { ...this.translationOptions, ...options };
        
        // Convert text smileys to emojis
        if (mergedOptions.textSmileys) {
            for (const [smiley, emoji] of Object.entries(this.emojiNames)) {
                text = text.replace(new RegExp(this.escapeRegExp(smiley), 'g'), emoji);
            }
        }
        
        if (!mergedOptions.replaceInText) {
            // If not replacing in text, just convert words directly
            return text;
        }
        
        // Replace words with emojis
        if (mergedOptions.wordToEmoji) {
            // Split text into words
            const words = text.split(/(\s+)/);
            
            // Keep track of words eligible for emoji replacement
            const eligibleIndices = [];
            
            words.forEach((word, index) => {
                // Skip spaces and punctuation
                if (word.trim() === '' || /^[^\w]$/.test(word)) {
                    return;
                }
                
                // Check if word exists in mapping (ignoring case)
                const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                if (this.wordToEmoji[cleanWord]) {
                    eligibleIndices.push(index);
                }
            });
            
            // Calculate how many words to replace with emojis
            const replaceCount = Math.ceil(eligibleIndices.length * (mergedOptions.emojiPercentage / 100));
            
            // Randomly select indices to replace
            const indicesToReplace = this.getRandomIndices(eligibleIndices, replaceCount);
            
            // Replace selected words with emojis
            indicesToReplace.forEach(index => {
                const word = words[index];
                const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                
                const emoji = this.wordToEmoji[cleanWord];
                if (emoji) {
                    // Add to recent emojis
                    this.addToRecentEmojis(emoji);
                    
                    // Replace word with emoji
                    words[index] = emoji;
                }
            });
            
            // Reconstruct text
            text = words.join('');
        }
        
        return text;
    }

    /**
     * Translate emoji to text
     * @param {string} text - Text with emojis
     * @param {Object} options - Translation options
     * @returns {string} Text with emojis explained
     */
    emojiToText(text, options = {}) {
        if (!text) {
            return '';
        }
        
        // Merge options with default options
        const mergedOptions = { ...this.translationOptions, ...options };
        
        if (!mergedOptions.emojiToWord) {
            return text;
        }
        
        // Replace each emoji with its text description
        Object.entries(this.emojiToWord).forEach(([emoji, word]) => {
            if (text.includes(emoji)) {
                text = text.replace(new RegExp(this.escapeRegExp(emoji), 'g'), `${emoji} (${word})`);
            }
        });
        
        return text;
    }

    /**
     * Get random indices from an array
     * @param {Array} arr - Array of indices
     * @param {number} count - Number of indices to select
     * @returns {Array} Selected indices
     */
    getRandomIndices(arr, count) {
        // Ensure count is not greater than array length
        count = Math.min(count, arr.length);
        
        // Copy array to avoid modifying original
        const copy = [...arr];
        
        // Shuffle array using Fisher-Yates algorithm
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        
        // Return first 'count' elements
        return copy.slice(0, count);
    }

    /**
     * Escape special characters for RegExp
     * @param {string} string - String to escape
     * @returns {string} Escaped string
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Analyze text for emoji translation
     * @param {string} text - Text to analyze
     * @returns {Object} Analysis result
     */
    analyzeText(text) {
        if (!text) {
            return {
                originalText: text,
                translatedText: text,
                matchedWords: [],
                emojisUsed: [],
                emojiPercentage: 0
            };
        }
        
        // Split text into words
        const words = text.toLowerCase().split(/\s+/);
        
        // Find words that can be translated to emojis
        const matchedWords = words
            .map(word => word.replace(/[^\w]/g, ''))
            .filter(word => this.wordToEmoji[word]);
        
        // Generate translated text
        const translatedText = this.textToEmoji(text);
        
        // Count emojis used in translation
        const emojisUsed = Array.from(translatedText).filter(char => {
            const emojiRegex = /\p{Emoji}/u;
            return emojiRegex.test(char);
        });
        
        // Calculate emoji percentage
        const emojiPercentage = words.length > 0 ? (emojisUsed.length / words.length) * 100 : 0;
        
        return {
            originalText: text,
            translatedText,
            matchedWords,
            emojisUsed,
            emojiPercentage
        };
    }

    /**
     * Get the emoji picker HTML for integration
     * @returns {string} Emoji picker HTML
     */
    getEmojiPickerHTML() {
        let html = `
            <div class="emoji-picker-container">
                <div class="emoji-picker-header">
                    <div class="emoji-picker-title">Emojis</div>
                    <button class="emoji-picker-close">&times;</button>
                </div>
                <div class="emoji-picker-search">
                    <input type="text" placeholder="Search emojis..." class="emoji-search-input" />
                </div>
                <div class="emoji-picker-tabs">
        `;
        
        // Add tabs for each category
        this.categories.forEach((category, index) => {
            html += `
                <button class="emoji-category-tab${index === 0 ? ' active' : ''}" data-category="${category.id}">${category.id === 'recent' ? '🕒' : this.categoryEmojis[category.id]?.[0] || '😊'}</button>
            `;
        });
        
        html += `
                </div>
                <div class="emoji-picker-content">
        `;
        
        // Add emoji grids for each category
        this.categories.forEach((category, index) => {
            html += `
                <div class="emoji-category-content${index === 0 ? ' active' : ''}" data-category="${category.id}">
                    <div class="emoji-category-title">${category.name}</div>
                    <div class="emoji-grid">
            `;
            
            // Add emojis for this category
            const emojis = category.id === 'recent' ? 
                this.recentEmojis : 
                this.categoryEmojis[category.id] || [];
            
            if (emojis.length === 0 && category.id === 'recent') {
                html += `<div class="emoji-empty-message">No recent emojis</div>`;
            } else {
                emojis.forEach(emoji => {
                    const meaning = this.emojiToWord[emoji] || '';
                    html += `<button class="emoji-item" data-emoji="${emoji}" title="${meaning}">${emoji}</button>`;
                });
            }
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="emoji-picker-footer">
                    <div class="emoji-translator-toggle">
                        <label>
                            <input type="checkbox" class="emoji-translator-checkbox" ${this.translationOptions.wordToEmoji ? 'checked' : ''} />
                            Auto-translate words to emoji
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    /**
     * Create UI for emoji translator
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} Created UI element
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'emoji-translator-container';
        container.appendChild(uiContainer);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'emoji-translator-header';
        uiContainer.appendChild(header);
        
        const title = document.createElement('h3');
        title.className = 'emoji-translator-title';
        title.textContent = 'Emoji Translator';
        header.appendChild(title);
        
        // Create translator section
        const translatorSection = document.createElement('div');
        translatorSection.className = 'emoji-translator-section';
        uiContainer.appendChild(translatorSection);
        
        // Create input area
        const inputArea = document.createElement('div');
        inputArea.className = 'emoji-translator-input-area';
        translatorSection.appendChild(inputArea);
        
        const inputLabel = document.createElement('label');
        inputLabel.className = 'emoji-translator-label';
        inputLabel.textContent = 'Enter text to translate:';
        inputArea.appendChild(inputLabel);
        
        const inputTextarea = document.createElement('textarea');
        inputTextarea.className = 'emoji-translator-textarea';
        inputTextarea.placeholder = 'Type your message here...';
        inputTextarea.rows = 4;
        inputArea.appendChild(inputTextarea);
        
        // Create output area
        const outputArea = document.createElement('div');
        outputArea.className = 'emoji-translator-output-area';
        translatorSection.appendChild(outputArea);
        
        const outputLabel = document.createElement('label');
        outputLabel.className = 'emoji-translator-label';
        outputLabel.textContent = 'Translated text:';
        outputArea.appendChild(outputLabel);
        
        const outputDisplay = document.createElement('div');
        outputDisplay.className = 'emoji-translator-output';
        outputArea.appendChild(outputDisplay);
        
        // Create translation controls
        const controlsArea = document.createElement('div');
        controlsArea.className = 'emoji-translator-controls';
        translatorSection.appendChild(controlsArea);
        
        // Add translation direction control
        const directionControl = document.createElement('div');
        directionControl.className = 'emoji-translator-direction';
        controlsArea.appendChild(directionControl);
        
        const textToEmojiBtn = document.createElement('button');
        textToEmojiBtn.className = 'emoji-direction-btn active';
        textToEmojiBtn.textContent = 'Text → Emoji';
        textToEmojiBtn.dataset.direction = 'text-to-emoji';
        directionControl.appendChild(textToEmojiBtn);
        
        const emojiToTextBtn = document.createElement('button');
        emojiToTextBtn.className = 'emoji-direction-btn';
        emojiToTextBtn.textContent = 'Emoji → Text';
        emojiToTextBtn.dataset.direction = 'emoji-to-text';
        directionControl.appendChild(emojiToTextBtn);
        
        // Add translation button
        const translateBtn = document.createElement('button');
        translateBtn.className = 'emoji-translate-btn';
        translateBtn.textContent = 'Translate';
        controlsArea.appendChild(translateBtn);
        
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'emoji-copy-btn';
        copyBtn.textContent = 'Copy Result';
        controlsArea.appendChild(copyBtn);
        
        // Create emoji picker section
        const pickerSection = document.createElement('div');
        pickerSection.className = 'emoji-translator-section';
        uiContainer.appendChild(pickerSection);
        
        const pickerTitle = document.createElement('h4');
        pickerTitle.className = 'section-title';
        pickerTitle.textContent = 'Emoji Picker';
        pickerSection.appendChild(pickerTitle);
        
        const pickerContainer = document.createElement('div');
        pickerContainer.className = 'emoji-picker-wrapper';
        pickerContainer.innerHTML = this.getEmojiPickerHTML();
        pickerSection.appendChild(pickerContainer);
        
        // Add event listeners
        
        // Translation direction buttons
        textToEmojiBtn.addEventListener('click', () => {
            textToEmojiBtn.classList.add('active');
            emojiToTextBtn.classList.remove('active');
        });
        
        emojiToTextBtn.addEventListener('click', () => {
            emojiToTextBtn.classList.add('active');
            textToEmojiBtn.classList.remove('active');
        });
        
        // Category tabs
        pickerContainer.querySelectorAll('.emoji-category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and content
                pickerContainer.querySelectorAll('.emoji-category-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                pickerContainer.querySelectorAll('.emoji-category-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const category = tab.dataset.category;
                pickerContainer.querySelector(`.emoji-category-content[data-category="${category}"]`).classList.add('active');
            });
        });
        
        // Emoji item click
        pickerContainer.querySelectorAll('.emoji-item').forEach(item => {
            item.addEventListener('click', () => {
                const emoji = item.dataset.emoji;
                
                // Add to recent emojis
                this.addToRecentEmojis(emoji);
                
                // Insert emoji into textarea at cursor position
                const textarea = inputTextarea;
                const startPos = textarea.selectionStart;
                const endPos = textarea.selectionEnd;
                
                textarea.value = 
                    textarea.value.substring(0, startPos) + 
                    emoji + 
                    textarea.value.substring(endPos);
                
                // Update cursor position
                textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
                
                // Focus textarea
                textarea.focus();
            });
        });
        
        // Emoji search
        const searchInput = pickerContainer.querySelector('.emoji-search-input');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            if (!searchTerm) {
                // Show all categories if search is empty
                pickerContainer.querySelectorAll('.emoji-category-content').forEach(content => {
                    content.style.display = '';
                });
                
                // Activate first tab
                pickerContainer.querySelectorAll('.emoji-category-tab')[0].click();
                return;
            }
            
            // Hide all category content
            pickerContainer.querySelectorAll('.emoji-category-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Create search results container if not exists
            let searchResults = pickerContainer.querySelector('.emoji-search-results');
            if (!searchResults) {
                searchResults = document.createElement('div');
                searchResults.className = 'emoji-search-results';
                pickerContainer.querySelector('.emoji-picker-content').appendChild(searchResults);
            }
            
            // Clear previous search results
            searchResults.innerHTML = '';
            
            // Find matching emojis
            const matchingEmojis = [];
            
            // Check emoji meanings
            Object.entries(this.emojiToWord).forEach(([emoji, meaning]) => {
                if (meaning.toLowerCase().includes(searchTerm)) {
                    matchingEmojis.push({ emoji, meaning });
                }
            });
            
            // Check word to emoji mappings
            Object.entries(this.wordToEmoji).forEach(([word, emoji]) => {
                if (word.toLowerCase().includes(searchTerm) && 
                    !matchingEmojis.some(e => e.emoji === emoji)) {
                    
                    const meaning = this.emojiToWord[emoji] || word;
                    matchingEmojis.push({ emoji, meaning });
                }
            });
            
            // Display search results
            if (matchingEmojis.length > 0) {
                searchResults.innerHTML = `
                    <div class="emoji-category-title">Search Results</div>
                    <div class="emoji-grid"></div>
                `;
                
                const grid = searchResults.querySelector('.emoji-grid');
                
                matchingEmojis.forEach(({ emoji, meaning }) => {
                    const emojiItem = document.createElement('button');
                    emojiItem.className = 'emoji-item';
                    emojiItem.dataset.emoji = emoji;
                    emojiItem.title = meaning;
                    emojiItem.textContent = emoji;
                    
                    emojiItem.addEventListener('click', () => {
                        // Add to recent emojis
                        this.addToRecentEmojis(emoji);
                        
                        // Insert emoji into textarea
                        const textarea = inputTextarea;
                        const startPos = textarea.selectionStart;
                        const endPos = textarea.selectionEnd;
                        
                        textarea.value = 
                            textarea.value.substring(0, startPos) + 
                            emoji + 
                            textarea.value.substring(endPos);
                        
                        // Update cursor position
                        textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
                        
                        // Focus textarea
                        textarea.focus();
                    });
                    
                    grid.appendChild(emojiItem);
                });
                
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = `
                    <div class="emoji-category-title">Search Results</div>
                    <div class="emoji-empty-message">No matching emojis found</div>
                `;
                searchResults.style.display = 'block';
            }
        });
        
        // Translation button click
        translateBtn.addEventListener('click', () => {
            const text = inputTextarea.value;
            const direction = textToEmojiBtn.classList.contains('active') ? 'text-to-emoji' : 'emoji-to-text';
            
            let result;
            if (direction === 'text-to-emoji') {
                result = this.textToEmoji(text);
            } else {
                result = this.emojiToText(text);
            }
            
            outputDisplay.textContent = result;
        });
        
        // Copy button click
        copyBtn.addEventListener('click', () => {
            const text = outputDisplay.textContent;
            
            if (!text) {
                return;
            }
            
            // Copy to clipboard
            navigator.clipboard.writeText(text)
                .then(() => {
                    // Show success message
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text:', err);
                });
        });
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles
     */
    addUIStyles() {
        const styleId = 'emoji-translator-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .emoji-translator-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1.5rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                color: var(--text-primary, #f0f6fc);
                max-width: 100%;
            }
            
            .emoji-translator-header {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color, #30363d);
                padding-bottom: 0.75rem;
            }
            
            .emoji-translator-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
            
            .emoji-translator-section {
                margin-bottom: 1.5rem;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
            }
            
            .section-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 1rem;
                color: var(--text-secondary, #8b949e);
            }
            
            .emoji-translator-input-area,
            .emoji-translator-output-area {
                margin-bottom: 1rem;
            }
            
            .emoji-translator-label {
                display: block;
                font-size: 0.875rem;
                color: var(--text-secondary, #8b949e);
                margin-bottom: 0.5rem;
            }
            
            .emoji-translator-textarea {
                width: 100%;
                padding: 0.75rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
                font-family: inherit;
                resize: vertical;
                min-height: 80px;
            }
            
            .emoji-translator-textarea:focus {
                outline: none;
                border-color: var(--accent-primary, #7c3aed);
            }
            
            .emoji-translator-output {
                width: 100%;
                min-height: 80px;
                padding: 0.75rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
                white-space: pre-wrap;
                overflow-wrap: break-word;
            }
            
            .emoji-translator-controls {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                align-items: center;
                justify-content: space-between;
            }
            
            .emoji-translator-direction {
                display: flex;
                border: 1px solid var(--border-color, #30363d);
                border-radius: var(--radius-sm, 0.375rem);
                overflow: hidden;
            }
            
            .emoji-direction-btn {
                padding: 0.5rem 1rem;
                background-color: var(--bg-secondary, #161b22);
                border: none;
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .emoji-direction-btn:not(:last-child) {
                border-right: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-direction-btn.active {
                background-color: var(--accent-primary, #7c3aed);
                color: white;
            }
            
            .emoji-translate-btn,
            .emoji-copy-btn {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-sm, 0.375rem);
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .emoji-translate-btn {
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                border: none;
            }
            
            .emoji-translate-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
            }
            
            .emoji-copy-btn {
                background-color: var(--bg-secondary, #161b22);
                color: var(--text-primary, #f0f6fc);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-copy-btn:hover {
                border-color: var(--accent-primary, #7c3aed);
            }
            
            /* Emoji Picker Styles */
            .emoji-picker-wrapper {
                position: relative;
                max-width: 100%;
                min-height: 300px;
            }
            
            .emoji-picker-container {
                width: 100%;
                border-radius: var(--radius-sm, 0.375rem);
                background-color: var(--bg-secondary, #161b22);
                overflow: hidden;
                font-size: 14px;
            }
            
            .emoji-picker-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-picker-title {
                font-weight: 600;
            }
            
            .emoji-picker-close {
                background: none;
                border: none;
                font-size: 18px;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
            }
            
            .emoji-picker-search {
                padding: 0.75rem 1rem;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-search-input {
                width: 100%;
                padding: 0.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .emoji-picker-tabs {
                display: flex;
                overflow-x: auto;
                scrollbar-width: thin;
                border-bottom: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-category-tab {
                padding: 0.5rem;
                min-width: 40px;
                text-align: center;
                background: none;
                border: none;
                color: var(--text-secondary, #8b949e);
                cursor: pointer;
                position: relative;
                font-size: 1.25rem;
            }
            
            .emoji-category-tab.active {
                color: var(--accent-primary, #7c3aed);
            }
            
            .emoji-category-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: var(--accent-primary, #7c3aed);
            }
            
            .emoji-picker-content {
                height: 250px;
                overflow-y: auto;
                padding: 0.5rem;
            }
            
            .emoji-category-content {
                display: none;
            }
            
            .emoji-category-content.active,
            .emoji-search-results {
                display: block;
            }
            
            .emoji-category-title {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--text-secondary, #8b949e);
                margin: 0.5rem 0;
                padding: 0 0.5rem;
            }
            
            .emoji-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 0.25rem;
                padding: 0.5rem;
            }
            
            .emoji-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                font-size: 1.5rem;
                border-radius: var(--radius-sm, 0.375rem);
                border: none;
                background: none;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .emoji-item:hover {
                background-color: var(--bg-primary, #0d1117);
            }
            
            .emoji-empty-message {
                padding: 1rem;
                text-align: center;
                color: var(--text-secondary, #8b949e);
                font-style: italic;
            }
            
            .emoji-picker-footer {
                padding: 0.75rem 1rem;
                border-top: 1px solid var(--border-color, #30363d);
            }
            
            .emoji-translator-toggle {
                font-size: 0.875rem;
            }
            
            .emoji-translator-toggle label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .emoji-translator-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .emoji-translator-direction {
                    width: 100%;
                }
                
                .emoji-grid {
                    grid-template-columns: repeat(6, 1fr);
                }
            }
            
            @media (max-width: 480px) {
                .emoji-grid {
                    grid-template-columns: repeat(5, 1fr);
                }
                
                .emoji-item {
                    width: 32px;
                    height: 32px;
                    font-size: 1.25rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmojiTranslator };
} else {
    // Add to global scope for browser usage
    window.EmojiTranslator = EmojiTranslator;
}