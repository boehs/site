export default { "eleventy": { "compatibility": ">=2" },
"buildTimeData": {},
"nunjucksPrecompiled": {
  "EleventyEdgeNunjucksPrecompile:a0f683db143bb6be105529ed187e1a97df646f745b9ab8fe0fbbbb141a277120": (function() {function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += " ";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("random").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "deets")),"is"))), env.opts.autoescape);
output += " ";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
}()),
} }