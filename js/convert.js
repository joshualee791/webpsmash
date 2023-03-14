function convertWebP() {
  const input = document.querySelector('input[type="file"]');
  const file = input.files[0];
  if (file.type === "image/webp") {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "converted.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    };
  } else {
    alert("Please select a WebP file to convert.");
  }
}
