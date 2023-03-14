function convertFile() {
  const input = document.getElementById("fileToConvert");
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result;
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob((blob) => {
          const fileName = prompt(
            "Enter a file name:",
            file.name.replace(/\.[^/.]+$/, "") + ".png"
          );
          if (fileName) {
            const fileContent = new Blob([blob]);
            window.webkitRequestFileSystem(
              window.PERSISTENT,
              1024 * 1024,
              (fs) => {
                fs.root.getFile(
                  fileName,
                  { create: true },
                  (fileEntry) => {
                    fileEntry.createWriter(
                      (fileWriter) => {
                        fileWriter.write(fileContent);
                        alert("File saved successfully.");
                      },
                      (err) => {
                        alert(`Failed to write file: ${err}`);
                      }
                    );
                  },
                  (err) => {
                    alert(`Failed to get file entry: ${err}`);
                  }
                );
              },
              (err) => {
                alert(`Failed to request filesystem: ${err}`);
              }
            );
          }
        }, "image/png");
      };
    };
  } else {
    alert("Please select a file to convert.");
  }
}
