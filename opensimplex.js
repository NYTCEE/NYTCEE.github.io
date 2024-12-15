// opensimplex.js
(function() {
      // First add Alea implementation
  function Alea(seed) {
    let mash = Mash();
    
    // Initialize states
    let s0 = mash(' ');
    let s1 = mash(' ');
    let s2 = mash(' ');
    
    // Mash seed
    s0 -= mash(seed);
    if (s0 < 0) s0 += 1;
    s1 -= mash(seed);
    if (s1 < 0) s1 += 1;
    s2 -= mash(seed);
    if (s2 < 0) s2 += 1;

    // Implementation detail
    return function() {
      let t = 2091639 * s0 + 2.3283064365386963e-10 * 2.3283064365386963e-10;
      s0 = s1;
      s1 = s2;
      return s2 = t - (s2 = Math.floor(t));
    };
  }

  function Mash() {
    let n = 0xefc8249d;
    return function(data) {
      data = data.toString();
      for(let i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        let h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000;
      }
      return (n >>> 0) * 2.3283064365386963e-10;
    };
  }
    const NORM_2D = 1.0 / 47.0;
    const NORM_3D = 1.0 / 103.0;
    const NORM_4D = 1.0 / 30.0;
    const SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
    const SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
    const SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
    const STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
    const STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
    const STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
    const base2D = [[1, 1, 0, 1, 0, 1, 0, 0, 0]];
    const base3D = [[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1]];
    const base4D = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1]];
    const gradients2D = [[5, 2], [2, 5], [-5, 2], [-2, 5], [5, -2], [2, -5], [-5, -2], [-2, -5]];
    const gradients3D = [[11, 4, 4], [4, 11, 4], [4, 4, 11], [-11, 4, 4], [-4, 11, 4], [-4, 4, 11],
                         [11, -4, 4], [4, -11, 4], [4, -4, 11], [-11, -4, 4], [-4, -11, 4], [-4, -4, 11],
                         [11, 4, -4], [4, 11, -4], [4, 4, -11], [-11, 4, -4], [-4, 11, -4], [-4, 4, -11],
                         [11, -4, -4], [4, -11, -4], [4, -4, -11], [-11, -4, -4], [-4, -11, -4], [-4, -4, -11]];
    
    class OpenSimplexNoise {
        constructor(seed) {
            this.seed = seed || Math.random();
        }

        noise3D(x, y, z) {
            // Simplified Perlin-like noise implementation
            let nx = Math.sin(x * this.seed) * 43758.5453123;
            let ny = Math.sin(y * this.seed) * 22578.1459123;
            let nz = Math.sin(z * this.seed) * 19642.3490423;
            
            return (Math.sin(nx + ny + nz) + 1) * 0.5;
        }
    }
  
    window.OpenSimplexNoise = OpenSimplexNoise;
  })();