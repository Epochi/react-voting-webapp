exports.TagReader = function (tags){
  let tagsArray = tags.split(/\b#| /);
  tagsArray.forEach(function(tag, index){
     tagsArray[index] = tag.replace(/(^[^#]*$)/ , '#$1');
  });
  return tagsArray;
};
