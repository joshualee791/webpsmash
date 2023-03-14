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
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            setTimeout(() => {
              document.body.removeChild(downloadLink);
            }, 0);
          }
        }, "image/png");
      };
    };
  } else {
    alert("Please select a file to convert.");
  }
}
