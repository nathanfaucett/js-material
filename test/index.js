var tape = require("tape"),
    Material = require("..");


tape("material", function(assert) {
    var material = Material.create("material", "");

    assert.equal(material.cullFace, 1028);

    assert.end();
});