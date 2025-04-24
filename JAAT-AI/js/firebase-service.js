/**
 * JAAT-AI Firebase Integration Service
 * Handles all Firebase interactions including authentication, storage, and Firestore
 */

// Firebase configuration
const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Firebase Service object
const FirebaseService = {
    // Firebase app instance
    app: null,
    
    // Firebase auth instance
    auth: null,
    
    // Firebase firestore instance
    firestore: null,
    
    // Firebase storage instance
    storage: null,
    
    /**
     * Initialize Firebase services
     * @returns {Promise<void>}
     */
    initialize: async function() {
        if (this.app) return;
        
        try {
            // Import Firebase modules dynamically
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js');
            const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js');
            const { getFirestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');
            const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js');
            
            // Initialize Firebase app
            this.app = initializeApp(FIREBASE_CONFIG);
            
            // Initialize Firebase auth
            this.auth = getAuth(this.app);
            
            // Initialize Firebase firestore
            this.firestore = getFirestore(this.app);
            
            // Initialize Firebase storage
            this.storage = getStorage(this.app);
            
            // Save Firebase modules as methods
            this.Firebase = {
                auth: {
                    onAuthStateChanged,
                    signInWithEmailAndPassword,
                    createUserWithEmailAndPassword,
                    signOut,
                    GoogleAuthProvider,
                    signInWithPopup
                },
                firestore: {
                    collection,
                    doc,
                    getDoc,
                    setDoc,
                    updateDoc,
                    deleteDoc,
                    query,
                    where,
                    getDocs
                },
                storage: {
                    ref,
                    uploadBytes,
                    getDownloadURL,
                    deleteObject
                }
            };
            
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    },
    
    /**
     * Get the current authenticated user
     * @returns {Promise<Object|null>} - Current user or null if not authenticated
     */
    getCurrentUser: function() {
        return new Promise((resolve) => {
            if (!this.auth) {
                resolve(null);
                return;
            }
            
            const unsubscribe = this.Firebase.auth.onAuthStateChanged(this.auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    },
    
    /**
     * Sign in with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} - User credential
     */
    signIn: async function(email, password) {
        if (!this.auth) await this.initialize();
        return await this.Firebase.auth.signInWithEmailAndPassword(this.auth, email, password);
    },
    
    /**
     * Sign in with Google
     * @returns {Promise<Object>} - User credential
     */
    signInWithGoogle: async function() {
        if (!this.auth) await this.initialize();
        const provider = new this.Firebase.auth.GoogleAuthProvider();
        return await this.Firebase.auth.signInWithPopup(this.auth, provider);
    },
    
    /**
     * Create a new user account
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {Object} userData - Additional user data
     * @returns {Promise<Object>} - User credential
     */
    createAccount: async function(email, password, userData = {}) {
        if (!this.auth || !this.firestore) await this.initialize();
        
        // Create user account
        const userCredential = await this.Firebase.auth.createUserWithEmailAndPassword(this.auth, email, password);
        
        // Save additional user data to Firestore
        if (userCredential.user) {
            const userRef = this.Firebase.firestore.doc(this.firestore, 'users', userCredential.user.uid);
            await this.Firebase.firestore.setDoc(userRef, {
                email: userCredential.user.email,
                createdAt: new Date(),
                ...userData
            });
        }
        
        return userCredential;
    },
    
    /**
     * Sign out the current user
     * @returns {Promise<void>}
     */
    signOut: async function() {
        if (!this.auth) await this.initialize();
        return await this.Firebase.auth.signOut(this.auth);
    },
    
    /**
     * Save data to Firestore
     * @param {string} collection - Collection name
     * @param {string} documentId - Document ID (optional)
     * @param {Object} data - Data to save
     * @returns {Promise<string>} - Document ID
     */
    saveData: async function(collection, documentId = null, data = {}) {
        if (!this.firestore) await this.initialize();
        
        try {
            if (documentId) {
                // Update existing document
                const docRef = this.Firebase.firestore.doc(this.firestore, collection, documentId);
                await this.Firebase.firestore.updateDoc(docRef, { ...data, updatedAt: new Date() });
                return documentId;
            } else {
                // Create new document with auto-generated ID
                const collectionRef = this.Firebase.firestore.collection(this.firestore, collection);
                const newDocRef = this.Firebase.firestore.doc(collectionRef);
                await this.Firebase.firestore.setDoc(newDocRef, { ...data, createdAt: new Date(), updatedAt: new Date() });
                return newDocRef.id;
            }
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
            throw error;
        }
    },
    
    /**
     * Get data from Firestore
     * @param {string} collection - Collection name
     * @param {string} documentId - Document ID
     * @returns {Promise<Object|null>} - Document data or null if not found
     */
    getData: async function(collection, documentId) {
        if (!this.firestore) await this.initialize();
        
        try {
            const docRef = this.Firebase.firestore.doc(this.firestore, collection, documentId);
            const docSnap = await this.Firebase.firestore.getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting data from Firestore:', error);
            throw error;
        }
    },
    
    /**
     * Query data from Firestore
     * @param {string} collection - Collection name
     * @param {string} field - Field to query
     * @param {string} operator - Query operator ('==', '>', '<', etc.)
     * @param {any} value - Value to compare
     * @returns {Promise<Array>} - Array of documents
     */
    queryData: async function(collection, field, operator, value) {
        if (!this.firestore) await this.initialize();
        
        try {
            const collectionRef = this.Firebase.firestore.collection(this.firestore, collection);
            const q = this.Firebase.firestore.query(collectionRef, this.Firebase.firestore.where(field, operator, value));
            const querySnapshot = await this.Firebase.firestore.getDocs(q);
            
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            
            return results;
        } catch (error) {
            console.error('Error querying data from Firestore:', error);
            throw error;
        }
    },
    
    /**
     * Delete data from Firestore
     * @param {string} collection - Collection name
     * @param {string} documentId - Document ID
     * @returns {Promise<void>}
     */
    deleteData: async function(collection, documentId) {
        if (!this.firestore) await this.initialize();
        
        try {
            const docRef = this.Firebase.firestore.doc(this.firestore, collection, documentId);
            await this.Firebase.firestore.deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting data from Firestore:', error);
            throw error;
        }
    },
    
    /**
     * Upload a file to Firebase Storage
     * @param {File} file - File to upload
     * @param {string} path - Storage path
     * @param {Object} metadata - File metadata
     * @returns {Promise<string>} - Download URL
     */
    uploadFile: async function(file, path, metadata = {}) {
        if (!this.storage) await this.initialize();
        
        try {
            const storageRef = this.Firebase.storage.ref(this.storage, path);
            await this.Firebase.storage.uploadBytes(storageRef, file, metadata);
            return await this.Firebase.storage.getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading file to Firebase Storage:', error);
            throw error;
        }
    },
    
    /**
     * Delete a file from Firebase Storage
     * @param {string} path - Storage path
     * @returns {Promise<void>}
     */
    deleteFile: async function(path) {
        if (!this.storage) await this.initialize();
        
        try {
            const storageRef = this.Firebase.storage.ref(this.storage, path);
            await this.Firebase.storage.deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting file from Firebase Storage:', error);
            throw error;
        }
    }
};

// Export the Firebase Service
window.FirebaseService = FirebaseService;