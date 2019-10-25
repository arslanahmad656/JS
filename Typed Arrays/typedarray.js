/*
   - Javascript typed arrays are array like objects which provide mechanism to manipulate the raw binary data.
   - Typed arrays are array-like objects, and these are not true arrays. Array.isArray will return false for typed arrays.

   - Typed arrays uses buffer and views to function. A buffer represents arbitrary byte level binary data of fixed length. This buffer has no meaning
      unless contained in a view; which will provide context to the buffer data. While a buffer is just an arbitrary data, a view provides meaning to
      the data in a sense that the buffer data when viewed through a certain view, appears structured. Multiple views can contain the same buffer. This
      will result in different meanings of data when accessed through different views.

    - ArrayBuffer does not allow its contents to be read/writtern directly; the contents can only be manipulated through a view.
    - The alignment of the bits in the buffer depends on the endianness of the machine.
    - When created, the ArrayBuffer object is initialized to all zeros.

    - A typed array can be converted in to a true array (for examply by using Array.from)

    - References:
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
      YDKJS p139
*/

(function runner() {
  typedArrayDemo();
})();

function typedArrayDemo() {
  // First create a raw buffer
  var buffer = new ArrayBuffer(16);  // created a 16 bytes of raw memory which has no meaning

  // create a view (of Int32Array) on the data
  var int32Array = new Int32Array(buffer);  // through this view, the data in buffer is viewed as blocks of 32-bit signed integers
  for (let i = 0; i < int32Array.length; i++) {
    int32Array[i] = i * -2;  // the data inside buffer can be read/written only through views
  }

  // Reading data
  console.log('Reading through 32-bit int view...');
  console.log('Length of data:', int32Array.length);
  console.log('Data:');
  for (let i = 0; i < int32Array.length; i++) {
    console.log(int32Array[i]);
  }

  // Multiple views can contain the same buffer
  var int16Array = new Int16Array(buffer);  // the same buffer is viewed as blocks of 16-bit signed integers when when through this view
  console.log('Reading through 16-bit int view...');
  console.log('Length of data:', int16Array.length);
  console.log('Data:');
  for (let i = 0; i < int16Array.length; i++) {
    console.log(int16Array[i]);
  }

  var uint16Array = new Uint16Array(buffer);  // the same buffer is viewed as blocks of 16-bit unsigned integers when when through this view
  console.log('Reading through 16-bit unsigned int view...');
  console.log('Length of data:', uint16Array.length);
  console.log('Data:');
  for (let i = 0; i < uint16Array.length; i++) {
    console.log(uint16Array[i]);
  }
}

function simulatingCStruct() {
  /*
    Simulating the following struct using typed arrays:
    struct someStruct
    {
      unsigned long id; // 4 byte
      char username[16];  // 16 bytes
      double amountDue;  // 8 bytes
    };

    Layout (Little endian):
    ******** **************** ****
   */

   var buffer = new ArrayBuffer(28);  // an array buffer of 4 + 16 + 8 = 28 bytes

   // set first 4 bytes of the buffer as Uint32Array:
   var id = new Uint32Array(buffer, 0, 1);  // from 0, 1 block (where each block is 32-bit long)
   var username = new Uint8Array(buffer, 4, 16); // from 4, 16 blocks (where each block is 8-bit long)
   var amountDue = new Float64Array(buffer, 20, 1); // from 20, 1 block (where each block is 64-bit long)

   // Now manipulate buffer using id, username, and amountDue
}
