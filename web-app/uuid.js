(function() {
  // Precomputed hex lookup table for speed
  const hex = [];
  for (let i = 0; i < 256; ++i) {
    hex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(bytes, offset) {
    offset = offset || 0;
    return [
      hex[bytes[offset+0]], hex[bytes[offset+1]], hex[bytes[offset+2]], hex[bytes[offset+3]],
      '-', 
      hex[bytes[offset+4]], hex[bytes[offset+5]], '-', 
      hex[bytes[offset+6]], hex[bytes[offset+7]], '-', 
      hex[bytes[offset+8]], hex[bytes[offset+9]], '-', 
      hex[bytes[offset+10]], hex[bytes[offset+11]], 
      hex[bytes[offset+12]], hex[bytes[offset+13]], 
      hex[bytes[offset+14]], hex[bytes[offset+15]]
    ].join('');
  }

  function rng() {
    const crypto = window.crypto || window.msCrypto;
    if (crypto && crypto.getRandomValues) {
      const rnds = new Uint8Array(16);
      crypto.getRandomValues(rnds);
      return rnds;
    } else {
      // Math.random() fallback
      const rnds = new Array(16);
      for (let i = 0; i < 16; i++) {
        if ((i & 0x03) === 0) {
          const rnd = Math.random() * 0x100000000;
          rnds[i] = rnd >>> ((i & 0x03) << 3) & 0xff;
        }
      }
      return rnds;
    }
  }

  window.uuidv4 = function(options, buf, offset) {
    const i = buf && offset || 0;
    
    if (typeof options === 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
    
    const rnds = options && options.random || (options && options.rng) || rng();
    
    // Set version 4 bits (RFC 4122)
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    
    if (buf) {
      for (let ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
      return buf;
    }
    
    return bytesToUuid(rnds);
  };
})();
