define([
  'audioBufferToWav'
], function(toWav){

  function IDB(){

    const DB_NAME = 'music-app';
    const DB_VERSION = 1;
    const DB_STORE_NAME = 'track';
    //
    this.db = null;
    //
    this.getDBConfig = function(){
      return {
        DB_NAME: DB_NAME,
        DB_VERSION: DB_VERSION,
        DB_STORE_NAME: DB_STORE_NAME
      }
    };
  };

  IDB.prototype.openDB = function(callback){
    //
    var self = this;
    var config = this.getDBConfig();
    var req = indexedDB.open(config.DB_NAME, config.DB_VERSION);
    //
    req.onsuccess = function (e) {
      self.db = this.result;
      callback();
    };

    req.onerror = function (e) {
      console.error("openDB:", e.target.errorCode);
    };

    req.onupgradeneeded = function (e) {

      var store = e.currentTarget.result.createObjectStore(config.DB_STORE_NAME, { 
        keyPath: 'id'
      });

      store.createIndex('bufferList', 'bufferList', { unique: false });

    };

  };

  IDB.prototype.getObjectStore = function(storeName, operation) {
    var transation = this.db.transaction(storeName, operation);
    return transation.objectStore(storeName);
  };

  IDB.prototype.saveBuffer = function(params){

    var params = params || {};

    for (var i = 0; i < params.bufferList.length; i++ ){
      //  Convert the AudioBuffer to an ArrayBuffer
      var wavArrayBuffer = toWav(params.bufferList[i].buffer);
      //  Turn it into a file (blob)
      var blob = new Blob([ new DataView(wavArrayBuffer) ], {
        type: 'audio/wav'
      });
      params.bufferList[i].buffer = blob;
    }

    var data = { 
      id: params.id, 
      bufferList: params.bufferList
    };

    var store = this.getObjectStore(this.getDBConfig().DB_STORE_NAME, 'readwrite');
    var req = store.put(data);

    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
      params.onComplete();
    };

    req.onerror = function() {
      console.error("addPublication error", this.error);
    };

  };

  IDB.prototype.getBlob = function(id, callback){
    var store = this.getObjectStore(this.getDBConfig().DB_STORE_NAME, 'readonly');
    var req = store.get(id);
    req.onsuccess = function (evt) {
      callback(evt.target.result);
    };
  }

  IDB.prototype.getTrackList = function(){

    var store = this.getObjectStore(this.getDBConfig().DB_STORE_NAME, 'readonly');
    var req = store.count();

    req.onsuccess = function(evt) {
      console.log('Count: ' + evt.target.result);
    };

    req.onerror = function(evt) {
      console.error('add error', this.error);
    };

    req = store.openCursor();

    req.onsuccess = function(evt) {
      var cursor = evt.target.result;
      if (cursor) {
        req = store.get(cursor.key);
        req.onsuccess = function (evt) {
          //
          var value = evt.target.result;
          //
          console.log(value);
          //
          cursor.continue();
        }
      }
    };
  }

  IDB.prototype.usedQuota = function(){
    navigator.webkitTemporaryStorage.queryUsageAndQuota ( 
      function(usedBytes, grantedBytes) {  
          console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
      }, 
      function(e) { 
        console.log('Error', e);  
      }
    );
  }

  IDB.prototype.requestQuota = function(){
    var requestedBytes = 1024*1024*280; 
    navigator.webkitPersistentStorage.requestQuota (
      requestedBytes, function(grantedBytes) {  
        console.log('we were granted ', grantedBytes, 'bytes');
      }, function(e) { 
        console.log('Error', e); 
      }
    );
  }

  IDB.prototype.deleteDB = function(){

    this.db.close();
    //
    var req = indexedDB.deleteDatabase(this.getDBConfig().DB_NAME);
    //
    req.onsuccess = function (e) {
        console.log("Deleted database successfully");
    };
    //
    req.onerror = function (e) {
        console.log("Couldn't delete database");
    };
    //
    req.onblocked = function (e) {
        console.log("Couldn't delete database due to the operation being blocked");
    };

  };

  return IDB;
})