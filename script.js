let objectDetectionModel = null;

const inputImage = document.querySelector("#inputImage");
const detectButton = document.querySelector("#detectButton");
const resultDiv = document.querySelector("#result");
inputImage.crossOrigin = "Anonymous"; //anonim olarak tanımlar. kullanıcı kimliğini göndermemesini sağlar.

detectButton.addEventListener("click", async () => {
    if (!objectDetectionModel) {
        resultDiv.innerHTML = "Model is not loaded!";
        return;
    }

    objectDetectionModel.detect(inputImage).then(predictions => { //resimdeki nesne
        console.log('Predictions: ', predictions); //sonuçlar
        if (predictions.length > 0) {
            resultDiv.innerHTML = `Detected ${predictions[0].class}!`;
        } else {
            resultDiv.innerHTML = "No objects detected!";
        }
    });
});

// Load the COCO-SSD model
cocoSsd.load().then(model => {
    objectDetectionModel = model;
    resultDiv.innerHTML = "Model loaded successfully!";
}).catch(error => {
    console.error('Failed to load model:', error);
    resultDiv.innerHTML = "Failed to load model!";
});
