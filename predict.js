let model;
(async ()=> {
	model = await tf.loadLayersModel('./model.json');
})();	

function preprocess(image){
    // let result = new Array(1);
    // result[0] = new Array(1);
    // result[0][0] = new Array(28);
    // for(var i=0; i<28; i++){
    //     result[0][0][i] = new Array(28);
    // }
    let tensor = tf.browser.fromPixels(image)            
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(0)
        .expandDims(0)
        .toFloat();    
        console.log(tensor.shape);
    return tensor.div(255.0);
}


//-----------------------------------------------
// preprocess the canvas to be MLP friendly
//-----------------------------------------------
// function preprocessCanvas(image) {
//     let tensor = tf.browser.fromPixels(image)
//         .resizeNearestNeighbor([28, 28])
//         .mean(2)
//         .expandDims(0)
//         .expandDims(0)
//         .toFloat();
//     console.log(tensor.shape);
//     console.log(tensor.div(255.0).data());
//     return tensor.div(255.0);
// }


//--------------------------------------------
// predict function for digit recognizer mlp
//--------------------------------------------
async function predict() {

	// get image data from canvas
	var imageData = canvas.toDataURL();
    // preprocess canvas
    let tensor = preprocess(canvas);

	// make predictions on the preprocessed image tensor
	let predictions = await model.predict(tensor).data();

	// get the model's prediction results
	let results = Array.from(predictions)
    // console.log(predictions);
    // console.log(results);
	// display the predictions in chart
    let max_id = 0;
    let max_val = 0;
    for(var i = 0; i<results.length; i++){
        console.log(i + ": " + results[i]);
        
        if(results[i]>max_val){
            max_val = results[i];
            max_id = i;
            // console.log("UVNITRZ - " + i + ": " + results[i]);
        }
    }
    console.log(max_id);
    console.log("istota na: "+ max_val*100 +"%");
}
