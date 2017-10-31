
const microsofComputerVision = require("microsoft-computer-vision");
const fs = require("fs");

const filetoRename = "./dog.jpg";
var files = process.argv;

function createNewName(tags, fileType){
  var newName = tags[0];
  for (var i = 1; i < tags.length && i < 6; i++){
    newName = `${newName}_${tags[i]}`;
  }
  return newName;
}

function renameFile(filetoRename) {
  fs.readFile(filetoRename, function(err, data) {
      if (err)
          throw err;
      microsofComputerVision.analyzeImage({
        "Ocp-Apim-Subscription-Key": "88fada5e96574a24b7c848ebad5dd21b",
        "request-origin":"westcentralus",
        "content-type": "application/octet-stream",
        "body": data,
        "visual-features":"Tags, Faces, Description"
      }).then((result) => {
          console.log(result.description.tags);
          var tagsArray = result.description.tags
          var newName = createNewName(tagsArray);
          fs.rename(filetoRename, `./${newName}.jpg`, function (err) {
            if (err) throw error;
            console.log("rename success");
          })
      }).catch((err)=>{
        throw err;
      })
  });
}

renameFile(filetoRename);
