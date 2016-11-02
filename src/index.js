var assets = require("@nathanfaucett/assets"),
    Shader = require("@nathanfaucett/shader"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined"),
    enums = require("@nathanfaucett/webgl_context/src/enums");


var JSONAsset = assets.JSONAsset,
    JSONAssetPrototype = JSONAsset.prototype,
    MaterialPrototype;


module.exports = Material;


function Material() {

    JSONAsset.call(this);

    this.shader = null;

    this.cullFace = null;
    this.blending = null;

    this.wireframe = null;
    this.wireframeLineWidth = null;

    this.receiveShadow = null;
    this.castShadow = null;

    this.uniforms = null;
}
JSONAsset.extend(Material, "odin.Material");
MaterialPrototype = Material.prototype;

MaterialPrototype.construct = function(options) {

    JSONAssetPrototype.construct.call(this, options);

    options = options || {};

    if (options.shader) {
        this.shader = options.shader;
    } else {
        if (options.vertex && options.fragment) {
            this.shader = Shader.create(options.vertex, options.fragment);
        }
    }

    this.uniforms = options.uniforms || {};

    this.cullFace = isNullOrUndefined(options.cullFace) ? enums.cullFace.BACK : options.cullFace;
    this.blending = isNullOrUndefined(options.blending) ? enums.blending.DEFAULT : options.blending;

    this.wireframe = isNullOrUndefined(options.wireframe) ? false : !!options.wireframe;
    this.wireframeLineWidth = isNullOrUndefined(options.wireframeLineWidth) ? 1 : options.wireframeLineWidth;

    this.receiveShadow = isNullOrUndefined(options.receiveShadow) ? true : !!options.receiveShadow;
    this.castShadow = isNullOrUndefined(options.castShadow) ? true : !!options.castShadow;

    return this;
};

MaterialPrototype.destructor = function() {

    JSONAssetPrototype.destructor.call(this);

    this.cullFace = null;
    this.blending = null;

    this.wireframe = null;
    this.wireframeLineWidth = null;

    this.receiveShadow = null;
    this.castShadow = null;

    this.uniforms = null;

    return this;
};