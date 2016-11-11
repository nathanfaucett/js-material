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

MaterialPrototype.toJSON = function(json) {

    json = JSONAssetPrototype.toJSON.call(this, json);

    json.cullFace = this.cullFace;
    json.blending = this.blending;

    json.wireframe = this.wireframe;
    json.wireframeLineWidth = this.wireframeLineWidth;

    json.receiveShadow = this.receiveShadow;
    json.castShadow = this.castShadow;

    json.uniforms = this.uniforms;

    return json;
};

MaterialPrototype.fromJSON = function(json) {

    JSONAssetPrototype.fromJSON.call(this, json);

    this.shader = this.assets ? this.assets.get(json.shader) : json.shader;

    this.cullFace = json.cullFace;
    this.blending = json.blending;

    this.wireframe = json.wireframe;
    this.wireframeLineWidth = json.wireframeLineWidth;

    this.receiveShadow = json.receiveShadow;
    this.castShadow = json.castShadow;

    this.uniforms = json.uniforms;

    return this;
};